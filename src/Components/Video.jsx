import { useEffect, useState } from "react";
import { Routes, Route, useParams } from 'react-router-dom';
import { AudioRecorder, useAudioRecorder } from 'react-audio-voice-recorder';

const Video = ({titulo, subtitulo, video, index, frase, dificultad, capitulo}) => {

    
    const [evaluarAudio, setEvaluarAudio] = useState([false])
    const recorderControls = useAudioRecorder()
    const [grabaciones, setGrabaciones] = useState()
    const [idGrabar, setIdGrabar] = useState()

    /** Grabaciones me esta dando problemaaaaaaaa  **/
    useEffect(() => {
        if(JSON.parse(localStorage.getItem(subtitulo))) { 
            setGrabaciones( JSON.parse(localStorage.getItem(subtitulo)))
            console.log(grabaciones)
        }
      }, [])

      
    const clickGrabar = (e) => {
        console.log(e)
        const idGrabar = e.classList[1]
        const claseNombrePelicula = e.classList[2]
        // Tengo un error si toco el btn pausar 
        if(claseNombrePelicula) {
            const separar = claseNombrePelicula.split("-")
            const nombrePelicula = separar[2]
            const arrayRecorders = document.querySelectorAll(`.audio-recorder-${nombrePelicula}`)
            const separar2 = idGrabar.split("-")
            const idSolo = separar2[2]

            const nodelistToArray = Array.apply(null, arrayRecorders);
            nodelistToArray.forEach(element => {
                if(!element.classList.contains(`audio-recorder-${idSolo}`))  element.style.display = "none"
                if(element.children[0].title === "Save recording") element.style.display = "flex"
            });
            setIdGrabar(e.classList[1])
        }
    }

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

    const addAudioElement = (blob, subtitulo, id) => {
      let reader = new FileReader();
      reader.readAsDataURL(blob); // convierte el blob a base64 y llama a onload
  
      reader.onload = function() {
        const audiosLocalStorage = JSON.parse(localStorage.getItem(subtitulo))
        const found = audiosLocalStorage.find((objetoAudio) => `audio-mic-${Number(objetoAudio.id)}` === idGrabar);

        if(found && `audio-mic-${id}` === idGrabar ){  
            const aud = document.querySelector(`.grabacion-${subtitulo}-${id}`) 
            console.log(aud)
            aud.src = reader.result
            audiosLocalStorage[id].audio = reader.result
            localStorage.setItem(`${subtitulo}`, JSON.stringify(audiosLocalStorage))
        }
      }
     };

    return (
        <>
            <article className={`article-video  `} id={ index }>
            
                <section className="section-video">
                {capitulo ? <h3> Capitulo {capitulo}</h3> : ""}

                    <section className="section-audio">
                            
                        <span className={`ocultar ${ subtitulo }-${ index }`} > { frase } </span>
                        <span className={`ocultar ${subtitulo}-mostrar-${index}` }> Incorrecto! </span>

                        <span className={`bold ${dificultad} `}> {dificultad}</span>
                    

                        <input type="text" className={`input-${ subtitulo }-${ index }`} />
                        <input type="text" className={`ocultar inputRespuesta-${ subtitulo }-${ index } `} defaultValue={ frase} />
                        <button onClick={(e) => evaluar(subtitulo, index)} id="btn-evaluar">Evaluar</button>
                        <button onClick={(e) => mostrarRespuesta(subtitulo, index)} id="btn-mostar-respuesta"> Mostrar Respuesta </button>

                    </section>

                  
                    <iframe 
                            width="400" 
                            height="250" 
                            src={video}
                            title="YouTube video player"  
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                        />


                    <section className="" id={`grabar-${ subtitulo }-${ index }`} onClick={(e) => clickGrabar(e.target)}>
                        <h4> Grabar Audio </h4>
                        <AudioRecorder 
                            onRecordingComplete={(blob) => addAudioElement(blob, subtitulo, index)}
                            recorderControls={recorderControls}
                            audioTrackConstraints={{
                                noiseSuppression: true,
                                echoCancellation: true,
                                channelCount:true,
                            }} 
                            downloadFileExtension="mp3"
                            showVisualizer={true}
                            classes={{
                                AudioRecorderClass: `audio-recorder-${index} audio-recorder-${subtitulo}`,
                                AudioRecorderStartSaveClass : `audio-mic-${index} audio-mic-${subtitulo}`,
                            }} 
                    
                        />
                        
                        <div className={`div-grabaciones-${subtitulo}`}>

                            { grabaciones
                                ? <embed src={grabaciones[index].audio} className={`grabacion-${subtitulo}-${index}`} /> 
                                : <div> Loading </div> 
                            }
                            
                        </div>
                    </section>

                </section>

            </article>                      
          
        </>
    )
}

export default Video