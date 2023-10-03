import { useContext, useEffect } from "react"
import Clip from "../Clip/Clip"
import { useParams } from "react-router-dom";
import { Context } from "../../context/context";

const Pelicula = ({data}) => {
    let {  usuario, pelicula } = useParams();
    const { transformarMayuscula } = useContext(Context)

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
    }, [])

    return (
        <>
            <h1> { transformarMayuscula(pelicula) } </h1>
            <img src={data.imagen} className={`imagen-${data.subtitulo}`} alt="" />
            <article className={`article-audio ${data.subtitulo}`} name={data.subtitulo}>  
                <section className='flex-center'>
                    {
                        data
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
                                grabacion={element.grabacion}
                            />
                        )
                        })
                        : <div> Loading ... </div>
                    }
                </section>
            </article>

        </>
    )
}

export default Pelicula