import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../../context/context";
import { urlOrigin } from "../../context/helpers";

const AgregarClipSerie = () => {
    let { serie, temporada, usuario, capitulo, idclip } = useParams();
    const { fetchTitulos, urlBackend_Produccion, urlBackend_Desarrollo, separarTexto, transformarMayuscula, 
        fetchCantidadClips, evaluarSesion  } = useContext(Context)

    const [titulos, setTitulos] = useState([])
    const [infoSerie, setInfoSerie] = useState({
        capitulos: [],
        temporadas: []
    })
    const [categoriaSeleccionada, setCategoriaSelecionada] = useState('serie');

    const [mensaje, setMensaje] = useState("")

    const separarTemporada = separarTexto(temporada, "-")
    const separarCapitulo = separarTexto(capitulo, "-")
    const separarSubtitulo = separarTexto(serie, "-")


    const [clip, setClip] = useState({
        titulo : transformarMayuscula(serie, separarSubtitulo.length),
        subtitulo: serie,
        categoria: "serie",
        temporada: temporada,
        numero_temporada: separarTemporada[1],
        capitulo: capitulo,
        numero_capitulo : separarCapitulo[1],
        url: "https://www.youtube.com/embed/",
        frase: "",
        dificultad: "easy",
        nombre_clip: `${serie}-${separarTemporada[1]}x0${separarCapitulo[1]}-1`,
        numero_clip: 1
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
                    temporada: respClip.data.temporada,
                    capitulo : respClip.data.capitulo,
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
       
        const urlClipPelicula = `${ urlBackend_Produccion }/info-clip/series/${idclip}`
        console.log(idclip)
        fetchClip(urlClipPelicula)
       
        evaluarSesion()
    }, [])

    const actualizarClip = async (data, idClip) => {
        console.log(data)
        let response = await fetch(`${ urlBackend_Produccion }/editar/clip/${ idClip }`, {
            method: 'POST',
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
                <h1 className="h1-agregar-clip"> Agregar Clip - Serie </h1>
                <ul className="lista-formulario-clip lista-editar-serie">
                    <li>
                        <label htmlFor=""> Nombre de la Serie  </label>
                     
                           <input 
                            value={clip.titulo} 
                            onChange={(e) => setClip({ 
                                ...clip,
                                titulo : e.target.value
                            })} 
                           
                           /> 
                
                    </li>
                    
                    <li>
                        <label htmlFor=""> Subtitulo de la Serie  </label>
                     
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
                                    checked={categoriaSeleccionada === 'pelicula'}
                                />
                    
                                <label htmlFor="html"> Pelicula </label>

                            </span>
                            <span>
                                <input 
                                    type="radio" 
                                    name="categoria" 
                                    value="serie" 
                                    id="radio"  
                                    checked={categoriaSeleccionada === 'serie'}
                                />
                                <label htmlFor="css">Serie </label>

                            </span>

                        </div>
                    </li>
           
                    <li>
                        <label htmlFor=""> Temporada </label>
                            <input 
                                value={clip.temporada} 
                                onChange={(e) => setClip({ 
                                    ...clip,
                                    temporada : e.target.value
                                })} 
                            
                            /> 
                
                    </li>
                    <li>
                        <label htmlFor="">  Capitulo </label>
                        <input 
                            value={clip.capitulo} 
                            onChange={(e) => setClip({ 
                                ...clip,
                                capitulo : e.target.value
                            })} 
                           
                           /> 
                
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
                        
                        >
                            <option value="very-easy" >  very easy </option>
                            <option value="easy" defaultValue> easy </option>
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
                        <button onClick={() => actualizarClip(clip, idclip) }> Agregar Clip </button>
                    </li>

                    <li>
                        <span className="mensaje"> {mensaje !== ""  ? mensaje : ""} </span>
                    </li>
                </ul>
            </div>
        </>
    )
}


export default AgregarClipSerie