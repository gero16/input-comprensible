import { useContext, useEffect, useState } from "react";
import { Routes, Route, useParams } from 'react-router-dom';
import { AudioRecorder, useAudioRecorder } from 'react-audio-voice-recorder';
import { Context } from "../../context/context"
import "./Clip.css"
import { urlBackend_Desarrollo, urlBackend_Produccion } from "../../context/helpers";

const opts = { height: '400', width: '800', playerVars: { autoplay: 1,}, };


const Clip = ({ id, imagen, categoria, subtitulo, video, index, frase, dificultad, 
                capitulo, grabacionID, numero_clip }) => {

    const { clickGrabar, evaluar, mostrarRespuesta, addAudioElement, transformarMayuscula } = useContext(Context)
    let {  usuario, temporada, serie } = useParams();
    const recorderControls = useAudioRecorder()

    const [width, setWidth] = useState(window.innerWidth);

    const separarDificultad = dificultad.split("-")
    const primeraPalabra = separarDificultad[0].charAt(0).toUpperCase() + separarDificultad[0].slice(1)
    const segundaPalabra = dificultad.includes("-") ? separarDificultad[1].charAt(0).toUpperCase() + separarDificultad[1].slice(1) : " "
    const newDificultad = dificultad.includes("-") ? `${primeraPalabra} ${segundaPalabra}` : primeraPalabra
    
    const [grabacion, setGrabacion] = useState([])
  
    const guardarGrabacion = async (elemento, indice) => {
        const urlBlob = elemento.firstElementChild.src
        const response = await fetch(urlBlob);
        if (response.ok) {
            const blob = await response.blob();
   
            const objetoGrabacion = {
                    "fecha": "2023/09/22",
                    "grabacion": blob, 
                    "subtitulo": `${subtitulo}`,
                    "id_clip": indice,
            }
            const formData = new FormData()
            formData.append("grabacion", blob);
            formData.append("subtitulo", subtitulo);
            formData.append("id_clip", id);
            formData.append("numero_clip", indice);
            
            const urlGuardarGrabacion =  serie 
                ? `${ urlBackend_Produccion }/agregar-grabacion/series/${subtitulo}/${temporada}/${capitulo}/${usuario}`
                : `${ urlBackend_Produccion }/agregar-grabacion/peliculas/${ subtitulo }/${ usuario }`
            
                console.log(urlGuardarGrabacion)
            const resultado = fetch(urlGuardarGrabacion, { method: "POST", body: formData });
            console.log(resultado)

            //window.localStorage.clear();
        
        } else {
            console.error('Error al obtener el archivo de audio:', response.statusText);
        }
    }

    const actualizarGrabacion = async (elemento, indice) => {
        const url = 
            categoria === "serie"
            ? `${ urlBackend_Produccion }/actualizar-grabacion/series/${subtitulo}/${temporada}/${usuario}`
            : `${ urlBackend_Produccion }/actualizar-grabacion/peliculas/${subtitulo}/${usuario}`
            
        const objetoGrabacion = {
                "fecha": "2023-09-27",
                "grabacion":  elemento.firstElementChild.src, 
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
   
    
    useEffect(() => {
        setGrabacion(grabacionID)
    }, [])

    return (
        <>
            <article className={`article-video`} id={`id-BD-${id}`}>
            
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
                            />
                    
                        </div>
                       
                        
                        <div className={`div-grabaciones-${subtitulo} div-grabaciones`}>
                           
                        { grabacion 
                                ?  <iframe 
                                    src={`https://drive.google.com/file/d/${grabacion}/preview`} 
                                    width="410" 
                                    height="60" 
                                    allow="autoplay"
                                    className={`iframe-${subtitulo}-${index}`}>
                                    </iframe>
                                    
                                : 
                                <> </>
                        }

  
                            <div className={`div-grabacion-${subtitulo}-${index}`}>
                                <audio src={""} className={`grabacion-${subtitulo}-${index}`}  />
                            </div>
                            
                  
                            {
                                document.querySelector(`.iframe-${subtitulo}-${index}`)
                                    ? <>
                                      <button className="button" onClick={(e) => actualizarGrabacion(e.target.previousElementSibling) } > 
                                        Actualizar Grabación 
                                      </button>
                                 
                                    </>
                                  
                                
                                    : document.querySelector(`.grabacion-${subtitulo}-${index}`) 
                                        ? <button className="button" onClick={(e) => guardarGrabacion(e.target.previousElementSibling, index, id) } > 
                                          Guardar Grabación
                                        </button>
                                        : <button className="button"> No hay grabacion! </button>
                            }
                            
                            
                        </div>
                    </section>

                </section>

            </article>                      
          
        </>
    )
}

export default Clip