import { useContext, useEffect, useState } from "react";
import { Routes, Route, useParams } from 'react-router-dom';
import { AudioRecorder, useAudioRecorder } from 'react-audio-voice-recorder';
import { Context } from "../../context/context"

const Clip = ({ id, titulo, subtitulo, video, index, frase, dificultad, capitulo }) => {
    const { clickGrabar, evaluar, mostrarRespuesta, addAudioElement } = useContext(Context)
    const recorderControls = useAudioRecorder()
    const [grabaciones, setGrabaciones] = useState([])
    const [records, setRecords] = useState()
    //const [width, setWidth] = useState(window.innerWidth);

    
    
    const separarDificultad = dificultad.split("-")
    const newDificultad = dificultad.includes("-") ? `${separarDificultad[0]} ${separarDificultad[1]}` : separarDificultad
  
    const fetchData = async () => {
        const url = `http://localhost:3000/grabaciones`
        const response = await fetch(url,  
            {
                method: 'GET',
                headers: new Headers({
                    "Origin": "https://localhost:5173",
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                })
            })
        const resp= await response.json();
        //console.log(resp[0].grabacion)
        if(!resp) console.log("No hay data")

        let arrayGrabaciones = []

        resp.forEach(element => {
            //console.log(element)
            arrayGrabaciones.push(element.grabacion)
        });

        setGrabaciones(arrayGrabaciones)
        
        
        console.log(arrayGrabaciones)
        console.log(grabaciones)
        return grabaciones
    }

    /** Grabaciones me esta dando problemaaaaaaaa  **/
    useEffect(() => {
        
        if(JSON.parse(localStorage.getItem(subtitulo))) { 
            //console.log(JSON.parse(localStorage.getItem(subtitulo)))
            setGrabaciones( JSON.parse(localStorage.getItem(subtitulo)))
        }

        fetchData()
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

                    <embed 
                        src={records}
                         id="HOLAAAAA"
                    
                    />

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
                            
                            { grabaciones.length > 0
                                ? <embed src={grabaciones[0]} className={`grabacion-${subtitulo}-${index}`} /> 
                                : <div> Cargando grabaciones.. </div> 
                            }
                            
                        </div>
                    </section>

                </section>

            </article>                      
          
        </>
    )
}

export default Clip