import { useContext, useEffect, useState } from "react";
import { Routes, Route, useParams, NavLink } from 'react-router-dom';

import { Context } from "../../context/context"
import "./Clip.css"
import "./ClipMini.css"
import { urlBackend_Desarrollo, urlBackend_Produccion } from "../../context/helpers";

const ClipMini = ({ id, imagen, categoria, subtitulo, video, index, frase, dificultad, capitulo, grabacionID, numero_clip, editar }) => {

    const {   mostrarRespuesta, transformarMayuscula, dificultadEsp, } = useContext(Context);

    const [width, setWidth] = useState(window.innerWidth);
    // const [hayGrabacionPorGuardar, setHayGrabacionPorGuardar] = useState(false);


    const separarDificultad = dificultad.split("-");
    const primeraPalabra = separarDificultad[0].charAt(0).toUpperCase() + separarDificultad[0].slice(1);
    const segundaPalabra = dificultad.includes("-") ? separarDificultad[1].charAt(0).toUpperCase() + separarDificultad[1].slice(1) : " ";
  

    useEffect(() => {
        window.addEventListener("resize", () => {
            setWidth(window.innerWidth);
        });
    }, []);


    return (
        <>
            <article className={`article-video`} id={`id-BD-${id}`}>
                {
                     /* <span> id : {id} || numero_clip : {numero_clip} || index : {index} </span> */
                }
             
                { imagen ?  <img src={imagen} alt="imagen portada" /> : <> </> }

                <section className="section-video-mini">
                    <section className="section-audio">
                        <span className={`ocultar ${ subtitulo }-${ index } frase`} > { frase } </span>             
                        <input type="text" className={`ocultar inputRespuesta-${ subtitulo }-${ index } `} defaultValue={ frase} />
                        <section className="flex-between">
                            <button className="button" onClick={(e) => mostrarRespuesta(subtitulo, index)} id="btn-mostar-respuesta"> Mostrar Respuesta </button>
                        </section>
                    </section>
                </section>

                    <section id={`grabar-${ subtitulo }-${ index } section-video-mini`} onClick={(e) => clickGrabar(e.target)}>
                        { width < 540 
                            ? <iframe 
                                width={"300"} 
                                height={"160"} 
                                src={`${video}`}
                                title="YouTube video player"  
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                                loading="lazy"
                                className="arcoiris"
                                onReady={(event) => onPlayerStateChange(event)}
                            />
                            : <iframe 
                                width={ width <= 1511 ? "410" : "450"} 
                                height={ width <= 1511 ? "210" : "260"} 
                                src={`${video}`}
                                title="YouTube video player"  
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                                loading="lazy"
                                className="arcoiris"
                                onReady={(event) => onPlayerStateChange(event)}
                            />
                        }
              
                    </section>
                      

            </article>                      
        </>
    )
}

export default ClipMini;
