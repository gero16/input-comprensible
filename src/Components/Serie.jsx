import Video from "./Video"

const Serie = ({data}) => {
    if(data.temporadas)  console.log(data.temporadas[0]["temporada_1"][0].capitulo)

    return (
        <>
            <img src={`/src/assets/${data.subtitulo}.png`} alt="" className={`imagen-titulo imagen-${data.subtitulo}`} />
            <h2>Temporada 1</h2>    

            <article className={`article-audio ${data.subtitulo}`} name={data.subtitulo}>  
                <section className='flex-center'>
                   
                {
                    
                    data.temporadas
                    ? 
                    <>
                        {
                            data.temporadas[0]["temporada_1"].map((element, key) => {
                                return (
                                    <Video 
                                        titulo={data.titulo}
                                        subtitulo={data.subtitulo}
                                        video={element.url}
                                        key={key}
                                        frase={element.frase}
                                        dificultad={element.dificultad}
                                        capitulo={data.temporadas[0]["temporada_1"][0].capitulo}
                                    />
                                )
                                
                            }) 
                        }
                    </>
                    : 
              
                <div> Loading... </div>
                
            }
                </section>
            </article>
         

     
           
            
          
     
      
            </>
    )
}


export default Serie