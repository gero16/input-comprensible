import { useContext, useEffect, useState } from "react"
import Clip from "../Clip/Clip"
import "../Serie/Serie.css"
import { NavLink, useNavigate, useParams } from "react-router-dom"
import { Context } from "../../context/context"
import {  transformarMayuscula, urlBackend_Desarrollo, urlBackend_Produccion } from "../../context/helpers"
import ClipDificultad from "./ClipDificultad"
import BotonPagina from "../BotonPagina/BotonPagina"
import { PaginasContext } from "../../context/contextPaginas"
import "./ClipDificultad.css"

const ContenedorClipDificultad = () => {

    const { dificultad, usuario } = useParams()
    const {  fetchClips, dificultadEsp } = useContext(Context)
    const { cambiarPagina, paginaActual, paginaClips,  totalPaginas, setearClipsPagina, 
        setTotalPaginas, setPaginaClips,  } = useContext(PaginasContext)
    const [data, setData] = useState([])

    
    const dificultadMayuscula = transformarMayuscula(dificultad, 1)
    console.log(dificultadMayuscula)
    const nombreDificultad = dificultadEsp(dificultadMayuscula, false) 
    console.log(nombreDificultad)
    const urlClips = `${ urlBackend_Produccion }/clips-grabaciones/dificultad/${nombreDificultad }/${ usuario }`

    useEffect(() => {
        fetchClips(urlClips)
        setearClipsPagina(data, paginaActual)

    }, [dificultad])

    useEffect(() => {
        
        setearClipsPagina(data, paginaActual)
    }, [paginaActual])

    return (
        <>
            <article className={`article-clip`} name={ data.id }>
                <div className={`portada portada-dificultad  flex-center`} >
                </div>  

                <header className="flex-column-center gap-10">

                <h1 className="mt-15 h1-dificultad"> Clips clasificados por Dificultad </h1>

                <ul className="flex gap-20 ul-dificultad"> 
                    <li className="link-dificultad"> <NavLink to={`/usuario/${usuario}/clips/dificultad/principiante`} className={"very-easy"}>  Principiante </NavLink> </li>
                    <li className="link-dificultad"> <NavLink to={`/usuario/${usuario}/clips/dificultad/novato`}  className={"easy"}>  Novato  </NavLink> </li>
                    <li className="link-dificultad">  <NavLink to={`/usuario/${usuario}/clips/dificultad/intermedio`} className={"medium"}> Intermedio </NavLink> </li>
                    <li className="link-dificultad"> <NavLink to={`/usuario/${usuario}/clips/dificultad/avanzado`} className={"hard"}>  Avanzado </NavLink> </li>
                    <li className="link-dificultad"> <NavLink to={`/usuario/${usuario}/clips/dificultad/experto`} className={"very-hard"}> Experto </NavLink>  </li>
                </ul>
                  

                </header>

                <h2> Todavia no se pueden guardar grabaciones! </h2>
                  
                <section className='flex-center'>
                    

                    { paginaClips.length > 0 
                        ? paginaClips.map((element, key) => {
                            
                                return (
                                
                                    <ClipDificultad 
                                        id={element.id} 
                                        titulo={element.titulo}
                                        subtitulo={element.subtitulo}
                                        video={element.url}
                                        key={key}
                                        frase={element.frase}
                                        dificultad={element.dificultad}
                                        capitulo={element.capitulo}
                                        index={key}
                                        grabacionID={ element.drive_grabacion ? element.drive_grabacion  : ""}
                                        categoria={element.categoria}
                                        numero_clip={element["numero_clip"]}
                                    />
                                )
                            })

                            : <div> 
                                 <h2> Lo siento! </h2>
                                 <h2> Todavia no hay clips en esta dificultad </h2>
                               
                             </div>
                        }
                        
                    

                                 
                </section>
              
            </article>
            
            <footer className='footer'>
                { totalPaginas.map((element, key) => {
                    console.log(element)
                        return (
                            
                            <BotonPagina 
                                paginaActual={paginaActual}
                                cambiarPagina={cambiarPagina} 
                                numeroPagina={element}
                            /> 
                        
                        )
                    })}
  
            </footer>

        </>
    )
}


export default ContenedorClipDificultad