import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../../context/context";

const EditarClipSerie = () => {
    
    let { pelicula, temporada, usuario, capitulo } = useParams();
    const { fetchTitulos, urlBackend_Produccion, urlBackend_Desarrollo, separarTexto, transformarMayuscula, 
        fetchCantidadClips, evaluarSesion  } = useContext(Context)

    const [titulos, setTitulos] = useState([])

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

   

    useEffect(() => {
        fetchTitulos(titulos, setTitulos)  
       
        const urlCantidadPelicula = `${ urlBackend_Produccion }/peliculas/${clip.subtitulo}/cantidad`
        let resultado = fetchCantidadClips(urlCantidadPelicula)
        resultado.then((cantidadClip) => {
             console.log(cantidadClip)
             setClip({
                ...clip, 
                nombre_clip : `${clip.subtitulo}-${ cantidadClip }`,
                numero_clip : cantidadClip
            })
        })

        evaluarSesion()
     
    }, [])

    const agregarClip = async (data) => {
        
        let response = await fetch(`${ urlBackend_Produccion }/agregar-clip/pelicula`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(data)
          });
          
          console.log(response)

          if(response.status === 200) {
            let result = await response.json();
            console.log(result.Clip)
            setMensaje(result.Clip)
            
            setClip({
                ...clip, 
                nombre_clip : `${clip.subtitulo}-${ clip.numero_clip + 1  }`,
                numero_clip : Number(clip.numero_clip) + 1
            })
          }
    }

    return (
        <> 
            <div className="div-agregar-video">
                <h1 className="h1-agregar-clip"> Editar Clip - Pelicula </h1>

                <ul className="lista-formulario-clip">
                    <li>
                        <label htmlFor=""> Nombre de la Pelicula  </label>
                        <select name="select">
                           <option value={pelicula}> {clip.titulo}</option>
                        </select>
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
                        <button onClick={() => agregarClip(clip) }> Agregar Clip </button>
                    </li>

                    <li>
                        <span className="mensaje"> {mensaje !== ""  ? mensaje : ""} </span>
                    </li>
                </ul>
            </div>
        </>
    )
}


export default EditarClipSerie