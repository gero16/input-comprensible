import { useEffect } from "react"
import Clip from "../Clip/Clip"

const Serie = ({data, temporada}) => {
    console.log(data)
    let arrayAudios = []
    let numTemporada = temporada.split("-")

    useEffect(() => {
        if(!JSON.parse(localStorage.getItem(data.subtitulo))) {
            if(data.temporadas) {

                data.temporadas[0]["temporada_1"].forEach((element, index) => {
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
                                        titulo={data.titulo}
                                        subtitulo={data.subtitulo}
                                        video={element.url}
                                        key={key}
                                        frase={element.frase}
                                        dificultad={element.dificultad}
                                        capitulo={element.capitulo}
                                        index={key}
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