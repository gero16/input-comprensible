import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../../context/context";
import { urlOrigin } from "../../context/helpers";

import "./EditarClip.css"

const BorrarClip = () => {
    
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

    const borrarClip = async (data, idClip) => {
        console.log(data)
        let response = await fetch(`${ urlBackend_Produccion }/borrar/peliculas/clip/${ idClip }`, {
            method: 'DELETE',
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
                <h1 className="h1-agregar-clip"> Borrar Clip - Pelicula </h1>

                <ul className="lista-formulario-clip">
                    <li>
                        <label htmlFor=""> Nombre de la Pelicula  </label>
                     
                           <input 
                            value={clip.titulo} 
                          
                           /> 
                
                    </li>
                    
                    <li>
                        <label htmlFor="">  ID clip  </label>
                     
                           <input 
                            value={clip.subtitulo} 
                           
                           /> 
                
                    </li>

                    <span> {clip.frase} </span>

                    <iframe 
                        width={"800"} 
                        height={"400"} 
                        src={`${clip.url}`}
                        title="YouTube video player"  
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                        loading="lazy"
                        autoplay="1"
                        className="arcoiris"
                        onReady={(event) => onPlayerStateChange(event)}
                    />
                    
                
                  
                    <li id="li-agregar-clip">
                        <button onClick={() => borrarClip(clip, idclip) }>  Borrar Clip </button>
                    </li>

                    <li>
                        <span className="mensaje"> {mensaje !== ""  ? mensaje : ""} </span>
                    </li>
                </ul>
            </div>
        </>
    )
}


export default BorrarClip