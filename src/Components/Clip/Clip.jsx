import { useContext, useEffect, useState } from "react";
import { Routes, Route, useParams, NavLink } from 'react-router-dom';
import { AudioRecorder, useAudioRecorder } from 'react-audio-voice-recorder';
import { Context } from "../../context/context"
import "./Clip.css"
import { urlBackend_Desarrollo, urlBackend_Produccion } from "../../context/helpers";
import IframeGrabacion from "../Iframes/Iframe";


const Clip = ({ id, imagen, categoria, subtitulo, video, index, frase, dificultad, capitulo, 
    grabacionID, numero_clip, editar, mostrarDificultad, multiplesVideos, borrar }) => {

    const {  evaluar, mostrarRespuesta, transformarMayuscula, 
        dificultadIdioma, dificultadEsp, } = useContext(Context);

    const { usuario, temporada, serie } = useParams();
    const recorderControls = useAudioRecorder();

    const [width, setWidth] = useState(window.innerWidth);
    // const [hayGrabacionPorGuardar, setHayGrabacionPorGuardar] = useState(false);
    const [error, setError] = useState(false)
    const [mensaje, setMensaje] = useState("")
    const [modoActualizar, setModoActualizar] = useState(false)
    const [idGrabar, setIdGrabar] = useState()
    const [grabacionPorGuardar, setGrabacionPorGuardar] = useState("");
    const [hayGrabacion, setHayGrabacion] = useState(false);
    

    const separarDificultad = dificultad.split("-");
    const primeraPalabra = separarDificultad[0].charAt(0).toUpperCase() + separarDificultad[0].slice(1);
    const segundaPalabra = dificultad.includes("-") ? separarDificultad[1].charAt(0).toUpperCase() + separarDificultad[1].slice(1) : " ";

    const newDificultad = dificultad.includes("-") ? `${primeraPalabra} ${segundaPalabra}` : primeraPalabra;
  
    

    useEffect(() => {
        window.addEventListener("resize", () => {
            setWidth(window.innerWidth);
        });
    }, []);

   

 

    const informarMensaje = (mensaje, posMensaje, tiempo) => {
        setMensaje(mensaje);
        setTimeout(() => {
            setMensaje(posMensaje);
        },
         tiempo);
    };

    const guardarGrabacion = async (elemento, indice) => {
        const urlBlob = elemento.firstElementChild.src;
        const response = await fetch(urlBlob);
        if (response.ok) {
            const blob = await response.blob();
            const formData = new FormData()
            formData.append("grabacion", blob);
            formData.append("subtitulo", subtitulo);
            formData.append("id_clip", id);
            formData.append("numero_clip", indice);
            const urlGuardarGrabacion =  serie 
                ? `${ urlBackend_Produccion }/agregar-grabacion/series/${ subtitulo }/${ temporada }/${ capitulo }/${ usuario }`
                : `${ urlBackend_Desarrollo }/agregar-grabacion/peliculas/${ subtitulo }/${ usuario }`;

                try {
                    const resultado = await fetch(urlGuardarGrabacion, { method: "POST", body: formData });
                    console.log(resultado)
                    if(!resultado.ok) {
                        const result = await resultado.json()
                        if(result) setMensaje(result.mensaje)
                        if(!result) setMensaje("Error - Ocurrio un error al guardar la grabacion")
                    }
                    if(resultado.ok) {
                        console.log(resultado)
                        const result = await resultado.json()
                        console.log(result)
                        informarMensaje("Grabación agregada correctamente", "", 5000);
                    }
                    
                } catch (error) {
                    console.log(error)
                    informarMensaje("Ocurrió un error de CORS al guardar la grabación!", "", 5000);
                }
        } else {
            console.error('Error al obtener el archivo de audio:', response.statusText);
            informarMensaje("Ocurrió un error al guardar la grabación!", "", 5000);
        }
    };

    const actualizarGrabacion = async (elemento, indice) => {
        const url = categoria === "serie"
            ? `${ urlBackend_Produccion }/actualizar-grabacion/series/${subtitulo}/${temporada}/${usuario}`
            : `${ urlBackend_Produccion }/actualizar-grabacion/peliculas/${subtitulo}/${usuario}`;
        const objetoGrabacion = {
            "fecha": "2023-09-27",
            "grabacion":  elemento.firstElementChild.src, 
            "subtitulo": `${subtitulo}`,
            "id_clip": id
        };
        const response = await fetch(url,  
            {
                method: 'PUT',
                headers: new Headers({
                    "Origin": "https://localhost:5173",
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                }),
                body : JSON.stringify(objetoGrabacion)
            });
        const resp= await response.json();
        if(!resp) console.log("No hay data")
    };

    const addAudioElement = (blob, subtitulo, index, actualizar) => {
        let grabacion;
      if(`audio-mic-${index}` === idGrabar ){ 
        const url = URL.createObjectURL(blob);
 
        grabacion = {
            grabacion : url,
            usuario: "anonimus",
            id_usuario: "1GagaF",
            id_clip: index,
        }
        
        setGrabacionPorGuardar(grabacion)
        setHayGrabacion(true)
        return grabacion
        }

    }
    const clickGrabar = (e) => {
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


    return (
        <>
            <article className={`article-video`} id={`id-BD-${id}`}>
                {
                     /* <span> id : {id} || numero_clip : {numero_clip} || index : {index} </span> */
                }
             
                { imagen ?  <img src={imagen} alt="imagen portada" /> : <> </> }
                <section className="section-video">
                    <section className="section-audio">
                        {
                            editar ? <NavLink to={`${id}`}  className="span-editar-clip"> Editar </NavLink> : <> </>
                        }
                        
                        {
                            borrar ? <NavLink to={`/borrar/${id}`}  className="span-editar-clip"> Borrar </NavLink> : <> </>
                        }
                        

                        <span className={`ocultar ${ subtitulo }-${ index } frase`} > { frase } </span>
                        <span className={`ocultar ${subtitulo}-mostrar-${index}` }> Incorrecto! </span>
                        <>
                            <span className={`bold ${dificultad} `}> { mostrarDificultad ? dificultadEsp(dificultad, true) : "" } </span>
                            
                        </>
                        

                        <input type="text" className={`input-${ subtitulo }-${ index } input-frase`} />
                        <input type="text" className={`ocultar inputRespuesta-${ subtitulo }-${ index } `} defaultValue={ frase} />

                        <section className="flex-between">
                            <button className="button" onClick={(e) => evaluar(subtitulo, index)} id="btn-evaluar">Evaluar</button>
                            <button className="button" onClick={(e) => mostrarRespuesta(subtitulo, index)} id="btn-mostar-respuesta"> Mostrar Respuesta </button>
                        </section>
                    </section>

                    <section id={`grabar-${ subtitulo }-${ index } section-video`} onClick={(e) => clickGrabar(e.target)}>
                        
                        { !multiplesVideos 
                            ? <iframe 
                                width={"800"} 
                                height={"400"} 
                                src={`${video}`}
                                title="YouTube video player"  
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                                loading="lazy"
                                autoplay="1"
                                className="arcoiris"
                                onReady={(event) => onPlayerStateChange(event)}
                            />
                        : width < 540 
                            ? <iframe 
                                width={"300"} 
                                height={"160"} 
                                src={`${video}`}
                                title="YouTube video player"  
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                                loading="lazy"
                                autoplay="1"
                                className="arcoiris"
                                onReady={(event) => onPlayerStateChange(event)}
                            />
                            : <iframe 
                                width={ width <= 1511 ? "410" : "450"} 
                                height={ width <= 1511 ? "210" : "260"} 
                                src={`${video}`}
                                title="YouTube video player"  
                                autoplay="1"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                                loading="lazy"
                                className="arcoiris"
                                onReady={(event) => onPlayerStateChange(event)}
                            />
                        }
                        
                        
                        <div className={ width > 1300 ? "flex-center mb-10" : "mb-10"}>
                            <span className="grabar-audio"> { width > 1300 ? "Grabar Audio" : "Grabar Audio -"} </span>
                            <AudioRecorder onRecordingComplete={(blob) => addAudioElement(blob, subtitulo, index)}
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
                            }} />
                        </div>
                        
                        <div className={`div-grabaciones-${subtitulo} div-grabaciones`}>
                            { grabacionID 
                                ?  <IframeGrabacion grabacionID={grabacionID} subtitulo={subtitulo}index={index} width={"410"} height={"60"} />                            
                                :  <>  { mensaje } </>
                            }
                            <div className={`div-grabacion-${subtitulo}-${index}`}>
                                { hayGrabacion 
                                    ? <audio src={ grabacionPorGuardar.grabacion } className={`audio-clip grabacion-${subtitulo}-${index}`}  controls /> 
                                    : <audio> </audio> 
                                }  
                            </div>

                            { grabacionID 
                                ? <> </>
                                : modoActualizar
                                    ? <button className="button" onClick={(e) => actualizarGrabacion(e.target.previousElementSibling) } > 
                                        Actualizar Grabación 
                                    </button>
                                
                                    : grabacionPorGuardar && index === grabacionPorGuardar.id_clip
                                        ? <button className="button" onClick={(e) => guardarGrabacion(e.target.previousElementSibling, index, id) } > 
                                            Guardar Grabación
                                        </button>
                                        : <span className="button"> No hay grabacion! </span>
                            }
                        </div>
                    </section>
                </section>
            </article>                      
        </>
    )
}

export default Clip;
