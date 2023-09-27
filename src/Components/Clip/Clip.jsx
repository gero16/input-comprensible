import { useContext, useEffect, useState } from "react";
import { Routes, Route, useParams } from 'react-router-dom';
import { AudioRecorder, useAudioRecorder } from 'react-audio-voice-recorder';
import { Context } from "../../context/context"

const Clip = ({ id, titulo, subtitulo, video, index, frase, dificultad, capitulo, grabacion }) => {
    const { clickGrabar, evaluar, mostrarRespuesta, addAudioElement } = useContext(Context)
    let {  usuario } = useParams();

    const recorderControls = useAudioRecorder()
    const [grabaciones, setGrabaciones] = useState([])
    const [grabacionesPrueba, setGrabacionesPrueba] = useState([])
    const [records, setRecords] = useState()
    //const [width, setWidth] = useState(window.innerWidth);

    const separarDificultad = dificultad.split("-")
    const newDificultad = dificultad.includes("-") ? `${separarDificultad[0]} ${separarDificultad[1]}` : separarDificultad
  

    const guardarGrabacion = async (elemento, indice) => {
        const url = `http://localhost:3000/agregar-grabacion/${subtitulo}/${usuario}`
        const objetoGrabacion = {
                "fecha": "2023-09-22",
                "grabacion": elemento.src, 
                "subtitulo": `${subtitulo}`,
                "id_clip": id
        }
        const response = await fetch(url,  
            {
                method: 'POST',
                headers: new Headers({
                    "Origin": "https://localhost:5173",
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                }),
                body : JSON.stringify(objetoGrabacion)
            })
        const resp= await response.json();
        if(!resp) console.log("No hay data")
        
    }

    const actualizarGrabacion = async (elemento, indice) => {
        const url = `http://localhost:3000/actualizar-grabacion/${subtitulo}/${usuario}`
        const objetoGrabacion = {
                "fecha": "2023-09-27",
                "grabacion": elemento.src, 
                "subtitulo": `${subtitulo}`,
                "id_clip": id
        }
        const response = await fetch(url,  
            {
                method: 'PUT',
                headers: new Headers({
                    "Origin": "https://localhost:5173",
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                }),
                body : JSON.stringify(objetoGrabacion)
            })
        const resp= await response.json();
        if(!resp) console.log("No hay data")
        
    }

    /** Grabaciones me esta dando problemaaaaaaaa  **/
    useEffect(() => {
        if(JSON.parse(localStorage.getItem(subtitulo))) { 
            //console.log(JSON.parse(localStorage.getItem(subtitulo)))
            setGrabaciones(JSON.parse(localStorage.getItem(subtitulo)))
        }
        console.log(records)
      }, [])

    

    return (
        <>
            <article className={`article-video `} id={id}>
    
                <section className="section-video">
                {capitulo ? <h3> Capitulo {capitulo} </h3> : ""}

                    <section className="section-audio">
                            
                        <span className={`ocultar ${ subtitulo }-${ index } frase`} > { frase } </span>
                        <span className={`ocultar ${subtitulo}-mostrar-${index}` }> Incorrecto! </span>

                        <span className={`bold ${dificultad} `}> {newDificultad} </span>
                    
                        <input type="text" className={`input-${ subtitulo }-${ index }`} />
                        <input type="text" className={`ocultar inputRespuesta-${ subtitulo }-${ index } `} defaultValue={ frase} />
                        <button onClick={(e) => evaluar(subtitulo, index)} id="btn-evaluar">Evaluar</button>
                        <button onClick={(e) => mostrarRespuesta(subtitulo, index)} id="btn-mostar-respuesta"> Mostrar Respuesta </button>

                    </section>


                    <iframe 
                        width="400" 
                        height="230" 
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
                           
                            { grabacion
                                ? <embed src={grabacion} className={`grabacionBD-${subtitulo}-${index}`} /> 
                                : <div> No hay grabaciones </div> 
                            }

                            <embed src={""}className={`grabacion-${subtitulo}-${index}`}  />

                            {
                                document.querySelector(`.grabacionBD-${subtitulo}-${index}`)
                                    ? <button onClick={(e) => actualizarGrabacion(e.target.previousElementSibling) } > 
                                        Actualizar Grabación 
                                      </button>
                                
                                    : <button onClick={(e) => guardarGrabacion(e.target.previousElementSibling) } > 
                                        Guardar Grabación 
                                      </button>
                            }
                            
                        </div>
                    </section>

                </section>

            </article>                      
          
        </>
    )
}

export default Clip