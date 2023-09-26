import { useEffect } from "react"
import Clip from "../Clip/Clip"

const Pelicula = ({data}) => {
    let arrayAudios = []
    console.log(data)
    useEffect(() => {
        if(!JSON.parse(localStorage.getItem(data.subtitulo))) {
            if(data.videos) {
                console.log(data.videos)
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

    return (
        <>
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