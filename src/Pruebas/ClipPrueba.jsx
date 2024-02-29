import { useContext, useEffect, useState } from "react";
import { Routes, Route, useParams } from 'react-router-dom';
import { AudioRecorder, useAudioRecorder } from 'react-audio-voice-recorder';
import { Context } from "../context/context"
import "../Components/Clip/Clip.css"
import { urlBackend_Desarrollo, urlBackend_Produccion } from "../context/helpers";

const opts = { height: '400', width: '800', playerVars: { autoplay: 1,}, };

const ClipPrueba = ({ id, imagen, categoria, subtitulo, video, index, frase, dificultad, 
                capitulo, grabacionBD, numero_clip }) => {


    console.log(grabacionBD)
    const { clickGrabar, evaluar, mostrarRespuesta, addAudioElement, grabacionLocalStorage, transformarMayuscula } = useContext(Context)
    let {  usuario, temporada } = useParams();
    const recorderControls = useAudioRecorder()

    const [width, setWidth] = useState(window.innerWidth);

    const separarDificultad = dificultad.split("-")
    const primeraPalabra = separarDificultad[0].charAt(0).toUpperCase() + separarDificultad[0].slice(1)
    const segundaPalabra = dificultad.includes("-") ? separarDificultad[1].charAt(0).toUpperCase() + separarDificultad[1].slice(1) : " "
    const newDificultad = dificultad.includes("-") ? `${primeraPalabra} ${segundaPalabra}` : primeraPalabra
    
    const credentials = {
        access_token: 'ya29.a0AfB_byAXbRTE1Acg8yHwIam0R1RSQcXIy4yzYrAqbsYGNrDe_EhTnDD6FY9sXEKam2KjR6bAmm4xgSP3buTZcgSFOdv-B02jq9v-HK_ydV91eqNydCyqu-O8XEwN5oH6T-omP7gnNuVUZ0-YBccjEtQStRDRhmTriXvQaCgYKAbQSARESFQHGX2MiO-S8RPQb8LolXUdygejhwg0171',
        refresh_token: '1//045h4fx4xDyMLCgYIARAAGAQSNgF-L9IrdT-pzdiUlhpsaSUzOcEuzYX1ZwUqc6qufXvS8TcYuLNQFc9ta8crd2lBc-fVOQtnwQ',
        client_email: 'gero-331@input-comprensible.iam.gserviceaccount.com',
        client_id: '589821553246-n7bue2ob8a0mva6mg3bp15in2ffeh1i2.apps.googleusercontent.com',
        client_secret: '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',
    }

    const guardarFoto = async (elemento, indice) => {
        console.log(elemento.target.files[0])
        
        var file = elemento.firstElementChild.src//the file
        console.log(file)
        const formData = new FormData();

        formData.append("grabacion", file);
      
        fetch("http://localhost:3000/agregar-grabacion/peliculas/shrek-2/geronicola", {
          method: "POST",
          body: formData,
        });
      
    }
   
    const guardarGrabacion = async (elemento, indice) => {
        const urlBlob = elemento.firstElementChild.src
        const response = await fetch(urlBlob);
        if (response.ok) {
            const blob = await response.blob();
            console.log(blob)

            const formData = new FormData()
            formData.append("grabacion", blob);

            fetch("http://localhost:3000/agregar-grabacion/peliculas/shrek-2/geronicola", {
            method: "POST",
            body: formData,
            });
        
        } else {
            console.error('Error al obtener el archivo de audio:', response.statusText);
        }
    }
    

    return (
        <>
            <article className={`article-video`} id={`id-BD-${id}`}>
            <input type="file"  className="input-file" onChange={(e) => guardarFoto(e)}/>
            
            {
                <h3> Id {id} - Numero de clip {numero_clip}  </h3> 
            }
                {imagen ?  <img src={imagen} alt="" /> : <> </>}
               
                <section className="section-video">

                    <section className="section-audio">
                            
                        <span className={`ocultar ${ subtitulo }-${ index } frase`} > { frase } </span>
                        <span className={`ocultar ${subtitulo}-mostrar-${index}` }> Incorrecto! </span>

                        <span className={`bold ${dificultad} `}> {newDificultad} </span>
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
                        />
                        
                        : <iframe 
                            width={ width <= 1511 ? "410" : "450"} 
                            height={ width <= 1511 ? "210" : "260"} 
                            src={`${video}`}
                            title="YouTube video player"  
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                            loading="lazy"
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
                                downloadOnSavePress={true}
                            />
                    
                        </div>
                       
                        
                        <div className={`div-grabaciones-${subtitulo} div-grabaciones`}>
                           
                            { grabacionBD
                                ? <audio src={ "https://drive.google.com/uc?export=view&id=10wyIuY6ajIymVboPZsAc0hE71j3fOea3" } className={`grabacionBD-${subtitulo}-${index}`} controls /> 
                                : <div className="div-nohay-grabaciones"> Aun no hay grabación para este Clip </div> 
                            }

                            {
                                /*  <iframe src="https://drive.google.com/file/d/id=10wyIuY6ajIymVboPZsAc0hE71j3fOea3/" width="640" height="480"></iframe>
                                */
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
                            
                            
                            {
                                /*
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
                                      */
                            }
                        </div>
                    </section>

                </section>

            </article>                      
          
        </>
    )
}

export default ClipPrueba