import { useContext, useEffect, useState } from "react"
import Clip from "../Clip/Clip"
import { useNavigate, useParams } from "react-router-dom";
import { Context } from "../../context/context";


const Pelicula = ({data}) => {
    let {  usuario, pelicula } = useParams();
    const { transformarMayuscula, urlBackend_Desarrollo, urlBackend_Produccion  } = useContext(Context)
    const navigate = useNavigate();
    


    let arrayAudios = []
    console.log(data)
    useEffect(() => {
        if(!JSON.parse(localStorage.getItem(data.subtitulo))) {
            if(data.videos) {
               // console.log(data.videos)
                data.videos.forEach((element, index) => {
                    arrayAudios.push({
                        id : `${index}`,
                        audio: ""
                    })
                    
                });
                localStorage.setItem(`${data.subtitulo}`, JSON.stringify( arrayAudios))
            }
        }
    })

    useEffect(() => {
        //fetchGrabaciones()
       
        //console.log(grabacion)
    }, [])

    const posicionImagen = {
        "shrek-2": 27,
        "super-mario-bros": 63,
        "scream-2022":  33,
        "the-room-2003": 60,
        "kill-bill": 35,
        "bastardos-sin-gloria": 15,
        "harry-potter-1": 32
    }
    const style = {
        backgroundImage:  usuario ? `url("/${pelicula}-portada.jpg")` : `url("../${pelicula}-portada.jpg")`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: `5% ${posicionImagen[pelicula]}%`,
        backgroundSize: 'cover',
        filter: 'brightness(0.7)'
    }

    return (
        <>
          
            <article className={`article-clip article-audio ${data.subtitulo}`} name={data.subtitulo}>  

               

                <div className={`portada portada-${pelicula} flex-center`} style={style}>
                </div>
              
                <section className='flex-center'>
                    

                    {
                        data.length > 0
                        ? data.map((element, index) => {
                        return (
                            <Clip 
                                id={element.id}
                                titulo={element.titulo}
                                subtitulo={element.subtitulo}
                                video={element.url}
                                index={index}
                                frase={element.frase}
                                dificultad={element.dificultad}
                                grabacionBD={element.grabacion}
                                numero_clip={element["numero_clip"]}
                                imagen={element.imagen}
                            />
                        )
                        })
                        : <div> 
                            <h2> Lo siento! </h2>

                            <h2> Todavia no hay clips para esta pelicula </h2>
                            <h3> Si quiere agregar uno - 
                                <button 
                                    onClick={() => navigate(`/agregar-clip/${pelicula}`)}
                                    className="btn-ir-agregar-clip"
                                    > 
                                    Ir a Agregar Clip 
                                </button></h3>
                          
                        </div>
                    }
                </section>

                <button 
                    onClick={() => navigate(`/agregar-clip/${pelicula}`)}
                    className="btn-ir-agregar-clip"
                    > Ir a Agregar Clip 
                </button> 
            </article>

        </>
    )
}

export default Pelicula



