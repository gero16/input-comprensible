import Video from "./Video"

const Serie = ({data}) => {
   console.log(data.temporadas)
    return (
        <>
            <img src={`/src/assets/${data.subtitulo}.png`} alt="" className={`imagen-titulo imagen-${data.subtitulo}`} />
            <h2>Temporada 1</h2>    

            <article className={`article-audio ${data.subtitulo}`} name={data.subtitulo}>  
                <section className='flex-center'>
                   
                {
                    /*
                    data.titulo
                    ? data.temporadas["temporada_1"].map((element, key) => {
                        return (
                            <Video 
                                titulo={data.titulo}
                                subtitulo={data.subtitulo}
                                video={element.url}
                                key={key}
                                frase={element.frase}
                                dificultad={element.dificultad}
                            />
                        )
                        
                    }) 
                    : 
              
                <div> Loading... </div>
                */
            }
                </section>
            </article>
         

     
           
            
          
     
      
            </>
    )
}


export default Serie