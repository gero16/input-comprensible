import { useEffect,useLayoutEffect,useState } from "react";
import { AudioRecorder, useAudioRecorder } from 'react-audio-voice-recorder';

const AudioSerie = ({titulo, subtitulo, listaAudios, img}) => {
    const { recordingBlob } = useAudioRecorder();
    
    const [evaluarAudio, setEvaluarAudio] = useState([false])
    
    const recorderControls = useAudioRecorder()

    const [grabaciones, setGrabaciones] = useState()
    useEffect(() => {
      
        setGrabaciones( JSON.parse(localStorage.getItem(subtitulo)))
        return grabaciones;
      }, [])

    const [idGrabar, setIdGrabar] = useState()

    let arrayAudios = []
    const clickGrabar = (e) => {
        console.log(e)
        setIdGrabar(e.classList[1])
    
    }

    useEffect(() => {
        if (!recordingBlob) return;

        console.log(recordingBlob)
      }, [recordingBlob])

    

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
 
        console.log(idGrabar)
        const found = audiosLocalStorage.find((objetoAudio) => `audio-recorder-${Number(objetoAudio.id)}` === idGrabar);
        console.log(found)
        if(found && `audio-recorder-${id}` === idGrabar ){
            found.audio = reader.result
            console.log(found)
            const audio = document.createElement("audio");
            audio.src = reader.result;
            audio.controls = true;
            audio.setAttribute(`id`, `audio-${subtitulo}-${id}`)
            document.querySelector(`.div-grabaciones-${subtitulo}`).appendChild(audio)

            console.log(audiosLocalStorage)

           localStorage.setItem(`${subtitulo}`, JSON.stringify(audiosLocalStorage))
        }
      }
     };

    return (
        <>
            <article className={`article-audio ${subtitulo}`} name={subtitulo}>

                {img ?  <img src={img} alt="" className={`imagen-titulo imagen-${subtitulo}`} /> : <h2 className={`subtitulo-${subtitulo}`}> {titulo} </h2>}
               
                <section className='flex-center'>
                    {
                        listaAudios.map((element, key) => {
                            arrayAudios.push({
                                id : `${key}`,
                                audio: ""
                            })

                            localStorage.setItem(`${subtitulo}`, JSON.stringify( arrayAudios))
                            ;

                           // console.log(arrayAudios)
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

                                    <section className="flex-center no-select" id={`grabar-${ subtitulo }-${ key }`} onClick={(e) => clickGrabar(e.target)}>
                                        <h4> Grabar Audio </h4>
                                        <AudioRecorder 
                                            onRecordingComplete={(blob) => addAudioElement(blob, subtitulo, key)}
                                            recorderControls={recorderControls}
                                            audioTrackConstraints={{
                                                noiseSuppression: true,
                                                echoCancellation: true,
                                                channelCount:true,
                                              }} 
                                              downloadFileExtension="mp3"
                                              showVisualizer={true}
                                              classes={{
                                                //AudioRecorderClass: `audio-recorder-${key}`,
                                                AudioRecorderStartSaveClass : `audio-recorder-${key}`,
                                              }} 
                                       
                                        />
                                       
                                    <div className={`div-grabaciones-${subtitulo}`}>
                                              
                                        <embed src={grabaciones} />
                                    
                                    </div>
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