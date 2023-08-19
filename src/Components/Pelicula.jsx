import { useEffect } from "react"
import Video from "./Video"

const Pelicula = ({data}) => {
    let arrayAudios = []

    
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
                        data.titulo 
                        ? data.videos.map((element, index) => {
                        return (
                            <Video 
                                titulo={data.titulo}
                                subtitulo={data.subtitulo}
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