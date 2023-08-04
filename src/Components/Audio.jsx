import { useEffect,useLayoutEffect,useState } from "react";
import { AudioRecorder, useAudioRecorder } from 'react-audio-voice-recorder';

const AudioSerie = ({titulo, subtitulo, listaAudios, img}) => {
    const { recordingBlob } = useAudioRecorder();
    const [evaluarAudio, setEvaluarAudio] = useState([false])
    const recorderControls = useAudioRecorder()
    const [grabaciones, setGrabaciones] = useState()
    const [idGrabar, setIdGrabar] = useState()
    let arrayAudios = []

    useEffect(() => {
        setGrabaciones( JSON.parse(localStorage.getItem(subtitulo)))
        console.log(grabaciones)
      }, [])

      // LA IDEA ES QUE ESTO SE EJECUTE SOLO UNA PRIMERA VEZ PARA LLENAR LOCALSTORAGE
      useEffect(() => {
        if(!JSON.parse(localStorage.getItem(subtitulo))) {
            listaAudios.forEach((element, index) => {
                arrayAudios.push({
                    id : `${index}`,
                    audio: ""
                })
                
            });

           
           localStorage.setItem(`${subtitulo}`, JSON.stringify( arrayAudios))
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
            <article className={`article-audio ${subtitulo}`} name={subtitulo}>

                {img ?  <img src={img} alt="" className={`imagen-titulo imagen-${subtitulo}`} /> : <h2 className={`subtitulo-${subtitulo}`}> {titulo} </h2>}
               
                <section className='flex-center'>
                    {
                        listaAudios.map((element, key) => {
                            
                            return(
                                <article className={`subtitulo-${ titulo }`} key={ key }>
                                    <section className='section-audio'>

                                        <h3 className={`ocultar ${ subtitulo }-${ key }`}> { element[0] } </h3>
                                        <h4 className={`ocultar ${subtitulo}-mostrar-${key}` }> Incorrecto! </h4>

                                        <span className={`bold ${element[2]} `}> {element[2]}</span>
                                        <audio controls className="audio">
                                            <source src={element[1]}/>
                                        </audio>

                                        <input type="text" className={`input-${ subtitulo }-${ key }`} />
                                        <input type="text" className={`ocultar inputRespuesta-${ subtitulo }-${ key } `} defaultValue={ element[0] } />
                                        <button onClick={(e) => evaluar(subtitulo, key)}>Evaluar</button>
                                        <button onClick={(e) => mostrarRespuesta(subtitulo, key)}> Mostrar Respuesta </button>

                                    </section>

                                    <section className="" id={`grabar-${ subtitulo }-${ key }`} onClick={(e) => clickGrabar(e.target)}>
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
                                                AudioRecorderClass: `audio-recorder-${key} audio-recorder-${subtitulo}`,
                                                AudioRecorderStartSaveClass : `audio-mic-${key} audio-mic-${subtitulo}`,
                                              }} 
                                       
                                        />
                                       
                                    <div className={`div-grabaciones-${subtitulo}`}>

                                        { grabaciones ?<embed src={grabaciones[key].audio} className={`grabacion-${subtitulo}-${key}`} /> : "" }
                                        
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