import { useContext, useEffect, useState } from "react";
import { Routes, Route, useParams } from 'react-router-dom';
import { AudioRecorder, useAudioRecorder } from 'react-audio-voice-recorder';
import { Context } from "../../context/context"
import "./Clip.css"

const Clip = ({ id, categoria, subtitulo, video, index, frase, dificultad, capitulo, grabacionBD }) => {
    const { clickGrabar, evaluar, mostrarRespuesta, addAudioElement, grabacionLocalStorage } = useContext(Context)
    let {  usuario, temporada } = useParams();
  
    const recorderControls = useAudioRecorder()
    const [width, setWidth] = useState(window.innerWidth);
    console.log(width)

    const separarDificultad = dificultad.split("-")
    const newDificultad = dificultad.includes("-") ? `${separarDificultad[0]} ${separarDificultad[1]}` : separarDificultad
  
    const guardarGrabacion = async (elemento, indice) => {

        const url = 
            categoria === "serie"
            ? `${ urlBackend_Produccion }/agregar-grabacion/${subtitulo}/${temporada}/${usuario}`
            : `${ urlBackend_Produccion }/agregar-grabacion/${subtitulo}/${usuario}`

            console.log(url)
        const objetoGrabacion = {
                "fecha": "2023-09-22",
                "grabacion": elemento.src, 
                "subtitulo": `${subtitulo}`,
                "id_clip": id,
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
        const url = 
            categoria === "serie"
            ? `${ urlBackend_Produccion }/actualizar-grabacion/${subtitulo}/${temporada}/${usuario}`
            : `${ urlBackend_Produccion }/actualizar-grabacion/${subtitulo}/${usuario}`
            
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

    console.log(grabacionLocalStorage)
    console.log(grabacionLocalStorage.grabacion)
    return (
        <>
            <article className={`article-video`} id={`id-BD-${id}`}>
                <section className="section-video">

                    <section className="section-audio">
                            
                        <span className={`ocultar ${ subtitulo }-${ index } frase`} > { frase } </span>
                        <span className={`ocultar ${subtitulo}-mostrar-${index}` }> Incorrecto! </span>

                        <span className={`bold ${dificultad} `}> {newDificultad} </span>
                        <input type="text" className={`input-${ subtitulo }-${ index }`} />
                        <input type="text" className={`ocultar inputRespuesta-${ subtitulo }-${ index } `} defaultValue={ frase} />

                        <section className="flex-between">
                            <button className="button" onClick={(e) => evaluar(subtitulo, index)} id="btn-evaluar">Evaluar</button>

                            <button className="button" onClick={(e) => mostrarRespuesta(subtitulo, index)} id="btn-mostar-respuesta"> Mostrar Respuesta </button>
                        </section>

                    </section>


                    <section id={`grabar-${ subtitulo }-${ index } section-video`} onClick={(e) => clickGrabar(e.target)}>
                            
                            {
                               

                            }
                        <iframe 
                            width={ width > 1300 ? "430" : "350"} 
                            height={ width > 1300 ? "230" : "200"} 
                            src={video}
                            title="YouTube video player"  
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                        />
                      
                        
                        <div className={ width > 1300 ? "flex-center" : ""}>
                            <span className="grabar-audio"> { width > 1300 ? "Grabar Audio -" : "Grabar Audio -"} </span>
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
                                    AudioRecorderClass: `audio-recorder-${index} audio-recorder-${subtitulo} audio-recorder`,
                                    AudioRecorderStartSaveClass : `audio-mic-${index} audio-mic-${subtitulo}`,
                                }} 
                            />
                    
                        </div>
                       
                        
                        <div className={`div-grabaciones-${subtitulo} div-grabaciones`}>
                           
                            { grabacionBD
                                ? <audio src={ grabacionBD } className={`grabacionBD-${subtitulo}-${index}`} /> 
                                : <div className="div-nohay-grabaciones"> Aun no hay grabación para este clip </div> 
                            }

                        
                            <div className={`div-grabacion-${subtitulo}-${index}`}>
                                <audio src={""} className={`grabacion-${subtitulo}-${index}`}  />
                            </div>
                            
                            {
                                document.querySelector(`.grabacionBD-${subtitulo}-${index}`)
                                    ? <button className="button" onClick={(e) => actualizarGrabacion(e.target.previousElementSibling) } > 
                                        Actualizar Grabación 
                                      </button>
                                
                                    : <button className="button" onClick={(e) => guardarGrabacion(e.target.previousElementSibling) } > 
                                       {
                                         grabacionLocalStorage.grabacion === `grabacion-${subtitulo}-${index}` 
                                        ?    "Guardar Grabacion"   
                                        :    ""      
                                       }
                                   
                                       
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