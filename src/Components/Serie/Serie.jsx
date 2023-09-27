import { useEffect } from "react"
import Clip from "../Clip/Clip"

const Serie = ({data, serie, temporada}) => {
    //console.log(data)
    let arrayAudios = []
    let numTemporada = temporada.split("-")
 
    return (
        <>
            <img src={`/src/assets/${data.subtitulo}.png`} alt="" className={`imagen-titulo imagen-${data.subtitulo}`} />
            <h2>Temporada {numTemporada[1]} </h2>    

            <article className={`article-audio ${data.subtitulo}`} name={data.subtitulo}>  
                <section className='flex-center'>
                    {
                        data ?
                            data.map((element, key) => {
                                return (
                                    <Clip
                                        id={element.id} 
                                        titulo={element.titulo}
                                        subtitulo={element.subtitulo}
                                        video={element.url}
                                        key={key}
                                        frase={element.frase}
                                        dificultad={element.dificultad}
                                        capitulo={element.capitulo}
                                        index={key}
                                        grabacion={element.grabacion}
                                        categoria={element.categoria}
                                    />
                                )
                            })
                            :
                            <h2> Loading .... </h2>
                        }
                </section>
            </article>
         

     
           
            
          
     
      
            </>
    )
}


export default Serie