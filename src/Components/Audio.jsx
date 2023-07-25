import { useState } from "react"

const AudioSerie = ({titulo, subtitulo, listaAudios}) => {
    
    const [evaluarAudio, setEvaluarAudio] = useState([false])

    const evaluar = (subtitulo, id) => {
        const valorAudio = document.querySelector(`.${subtitulo}-${id}`)
        const subtituloIncorrecto = document.querySelector(`.${subtitulo}-mostrar-${id}`)
        const valueInput = document.querySelector(`.input-${subtitulo}-${id}`)
        const respInput = document.querySelector(`.inputRespuesta-${subtitulo}-${id}`)
   
        if(valueInput.value == respInput.value) {
            setEvaluarAudio(true)
            valorAudio.classList.toggle("ocultar")
            subtituloIncorrecto.classList.add("ocultar")
        } else {
            console.log("No son iguales!")
            valorAudio.classList.add("ocultar")
            subtituloIncorrecto.classList.toggle("ocultar")
        }
    }

    const mostrarRespuesta = (subtitulo, id) => {
        const valorAudio = document.querySelector(`.${subtitulo}-${id}`)
        valorAudio.classList.toggle("ocultar")
    }

    return (
        <>
            <article className="article-audio">
                <h2 className={`subtitulo-${subtitulo}`}> {titulo} </h2>
                <section className='flex-center'>
                    {
                        listaAudios.map((element, key) => {
                            return(
                                <article className={`subtitulo-${ titulo }`} key={ key+1 }>
                                    <section className='section-audio'>

                                        <h3 className={`ocultar ${ subtitulo }-${ key+1 }`}> { element[0] } </h3>
                                        <h4 className={`ocultar ${subtitulo}-mostrar-${key+1}` }> Incorrecto! </h4>

                                        <span className={`bold ${element[2]} `}> {element[2]}</span>
                                        <audio controls className="audio">
                                            <source src={element[1]}/>
                                        </audio>

                                        <input type="text" className={`input-${ subtitulo }-${ key + 1 }`} onChange={(e) => setState(e.target.value)}/>
                                        <input type="text" className={`ocultar inputRespuesta-${ subtitulo }-${ key+1 } `} defaultValue={ element[0] } />
                                        <button onClick={(e) => evaluar(subtitulo, key+1)}>Evaluar</button>
                                        <button onClick={(e) => mostrarRespuesta(subtitulo, key+1)}> Mostrar Respuesta </button>

                                    </section>
                                </article>
                            )
                        })
                    }
                </section>
            </article>
        </>
    )
}

export default AudioSerie