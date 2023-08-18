import Video from "./Video"

const Pelicula = ({data}) => {
    console.log(data)
    return (
        <>
            <img src={data.imagen} className={`imagen-${data.subtitulo}`} alt="" />
            <article className={`article-audio ${data.subtitulo}`} name={data.subtitulo}>  
                <section className='flex-center'>
                    {
                        data.titulo 
                        ? data.videos.map((element, key) => {
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
                        : <div> Loading ... </div>
                    }
                </section>
            </article>

        </>
    )
}

export default Pelicula