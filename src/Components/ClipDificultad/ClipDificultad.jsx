import { useContext, useEffect, useState } from "react";
import { Routes, Route, useParams } from 'react-router-dom';
import { AudioRecorder, useAudioRecorder } from 'react-audio-voice-recorder';
import { Context } from "../../context/context"
import "../Clip/Clip.css"
import { urlBackend_Desarrollo, urlBackend_Produccion } from "../../context/helpers";

const ClipDificultad = ({ id, subtitulo, frase, index, video, numero_clip }) => {

    const { clickGrabar, evaluar, mostrarRespuesta, addAudioElement, transformarMayuscula, 
        dificultadIdioma, dificultadEsp } = useContext(Context)
    let {  usuario, dificultad } = useParams();
    const recorderControls = useAudioRecorder()

    const [width, setWidth] = useState(window.innerWidth);

    const separarDificultad = dificultad.split("-")
    const primeraPalabra = separarDificultad[0].charAt(0).toUpperCase() + separarDificultad[0].slice(1)
    const segundaPalabra = dificultad.includes("-") ? separarDificultad[1].charAt(0).toUpperCase() + separarDificultad[1].slice(1) : " "
    const newDificultad = dificultad.includes("-") ? `${primeraPalabra} ${segundaPalabra}` : primeraPalabra

    return (
        <>
            <article className={`article-video`} id={`id-BD-${id}`}>
            
            {
                
                <h3> Id {id} - Numero de clip {numero_clip}  </h3> 
            
            }
         
               
                <section className="section-video">

                    <section className="section-audio">
                            
                        <span className={`ocultar ${ subtitulo }-${ index } frase`} > { frase } </span>
                        <span className={`ocultar ${subtitulo}-mostrar-${index}` }> Incorrecto! </span>

                        <span className={`bold ${dificultad} `}> { transformarMayuscula(dificultad, 1) } </span>
                        <input type="text" className={`input-${ subtitulo }-${ index } input-frase`} />
                        <input type="text" className={`ocultar inputRespuesta-${ subtitulo }-${ index } `} defaultValue={ frase} />

                        <section className="flex-between">
                            <button className="button" onClick={(e) => evaluar(subtitulo, index)} id="btn-evaluar">Evaluar</button>

                            <button className="button" onClick={(e) => mostrarRespuesta(subtitulo, index)} id="btn-mostar-respuesta"> Mostrar Respuesta </button>
                        </section>

                    </section>

                    <section id={`grabar-${ subtitulo }-${ index } section-video`} onClick={(e) => clickGrabar(e.target)}>
                            
                      { width < 540 
                        ? <iframe 
                            width={"300"} 
                            height={"160"} 
                            src={`${video}`}
                            title="YouTube video player"  
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                            loading="lazy"
                            className="arcoiris"
                        />
                        
                        : <iframe 
                            width={ width <= 1511 ? "410" : "450"} 
                            height={ width <= 1511 ? "210" : "260"} 
                            src={`${video}`}
                            title="YouTube video player"  
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                            loading="lazy"
                             className="arcoiris"
                        />
                      }
                        
                        <div className={ width > 1300 ? "flex-center" : ""}>
                            <span className="grabar-audio"> { width > 1300 ? "Grabar Audio" : "Grabar Audio -"} </span>
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
                       
                        
                        <div className={`div-grabaciones-${ subtitulo } div-grabaciones`}>
                  
                        </div>
                    </section>

                </section>

            </article>                      
          
        </>
    )
}

export default ClipDificultad