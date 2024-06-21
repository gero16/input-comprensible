import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../../context/context";
import { urlOrigin } from "../../context/helpers";

import "./EditarClip.css"

const EditarClipPelicula = () => {
    
    let { pelicula, temporada, usuario, capitulo, idclip } = useParams();
    const { fetchTitulos, urlBackend_Produccion, urlBackend_Desarrollo, separarTexto, transformarMayuscula, 
        fetchCantidadClips, evaluarSesion  } = useContext(Context)
     
    const [titulos, setTitulos] = useState([])
    const [infoClip, setInfoClip] = useState([])

    const [mensaje, setMensaje] = useState("")

    const separarSubtitulo = separarTexto(pelicula, "-")

    const [clip, setClip] = useState({
        titulo : transformarMayuscula(pelicula, separarSubtitulo.length),
        subtitulo: pelicula,
        categoria: "pelicula",
        url: "https://www.youtube.com/embed/",
        frase: "",
        dificultad: "easy",
        nombre_clip: `${pelicula}-0`,
        numero_clip: 0
    })

   
    const fetchClip = async (urlClips) => {
        console.log(urlClips)
        const respuestaClip = await fetch(urlClips,  
            {
                method: 'GET',
                headers: new Headers({
                    "Origin": urlOrigin,
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                })
            })
        if(respuestaClip) {
            const respClip = await respuestaClip.json();
            //console.log(resp)
            if(!respClip) console.log("No hay data")
            if(respClip) {
                console.log(respClip.data)
                setClip({
                    titulo : respClip.data.titulo,
                    subtitulo: respClip.data.subtitulo,
                    categoria: "pelicula",
                    url: respClip.data.url,
                    frase: respClip.data.frase,
                    dificultad: respClip.data.dificultad,
                    nombre_clip: respClip.data.nombre_clip,
                    numero_clip: respClip.data.numero_clip
                })
            }
        }
    }


    useEffect(() => {
        fetchTitulos(titulos, setTitulos)  
       
        const urlClipPelicula = `${ urlBackend_Produccion }/info-clip/peliculas/${idclip}`
        console.log(idclip)
        fetchClip(urlClipPelicula)
       
        evaluarSesion()
     
    }, [])

    const actualizarClip = async (data, idClip) => {
        console.log(data)
        let response = await fetch(`${ urlBackend_Produccion }/editar/peliculas/clip/${ idClip }`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(data)
          });
          
          console.log(response)

          if(response.status === 200) {
            let result = await response.json();
            console.log(result)
            console.log(result.Mensaje)
            setMensaje(result.Mensaje)
        
          }
    }

    return (
        <> 
            <div className="div-editar-clip">
                <h1 className="h1-agregar-clip"> Editar Clip - Pelicula </h1>

                <ul className="lista-formulario-clip">
                    <li>
                        <label htmlFor=""> Nombre de la Pelicula  </label>
                     
                           <input 
                            value={clip.titulo} 
                            onChange={(e) => setClip({ 
                                ...clip,
                                titulo : e.target.value
                            })} 
                           
                           /> 
                
                    </li>
                    
                    <li>
                        <label htmlFor=""> Subtitulo de la Pelicula  </label>
                     
                           <input 
                            value={clip.subtitulo} 
                            onChange={(e) => setClip({ 
                                ...clip,
                                subtitulo : e.target.value
                            })} 
                           
                           /> 
                
                    </li>
                    
                    <li>
                        <label htmlFor=""> Categoria </label>

                    <div className="div-categoria">
                            <span>
                                <input 
                                    type="radio"  
                                    name="categoria" 
                                    value="pelicula" 
                                    id="radio"  
                                    checked='pelicula'
                                />
                    
                                <label htmlFor="html"> Pelicula </label>

                            </span>
                          
                        </div>
                    </li>
           
                    <li>
                        <label htmlFor=""> Link del video </label>
                        <input 
                            type="text" name="url" 
                            onChange={(e) => setClip({ 
                                ...clip,
                                url : e.target.value
                            })} 
                            value={clip.url}
                        />
                    </li>


                    <li>
                        <label htmlFor=""> Frase </label>
                        <input type="text" name="frase" 
                            onChange={(e) => setClip({ 
                                ...clip,
                                frase : e.target.value
                            })} 
                            placeholder="It’s so good to be home!"
                            value={clip.frase}
                        />
                    </li>
                    <li>
                        <label htmlFor=""> Dificultad </label>
                        <select name="dificultad" 
                            onChange={(e) => setClip({ 
                                ...clip,
                                dificultad: e.target.value
                            })} 
                            value={clip.dificultad}
                        >
                            <option value="very-easy" >  very easy </option>
                            <option value="easy"> easy </option>
                            <option value="medium"> medium  </option>
                            <option value="hard"> hard  </option>
                            <option value="very-hard"> very hard  </option>
                        </select>
                    </li>
                    <li>
                        <label htmlFor=""> Nombre del Clip </label>
                        <input 
                            type="text" 
                            onChange={(e) => setClip({ ...clip, nombre_clip: e.target.value })} 
                            placeholder="scream-2022-1x01-22"
                            value={clip.nombre_clip}
                            />
                    </li>
                    <li>
                        <label htmlFor=""> Numero del Clip </label>
                        <input 
                            type="number" 
                            onChange={(e) => setClip({ ...clip, numero_clip: e.target.value })} 
                            placeholder="10"
                            value={clip.numero_clip}
                            />
                    </li>
                    <li id="li-agregar-clip">
                        <button onClick={() => actualizarClip(clip, idclip) }> Actualizar Info del Clip </button>
                    </li>

                    <li>
                        <span className="mensaje"> {mensaje !== ""  ? mensaje : ""} </span>
                    </li>
                </ul>
            </div>
        </>
    )
}


export default EditarClipPelicula