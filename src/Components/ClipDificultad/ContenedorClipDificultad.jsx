import { useContext, useEffect, useState } from "react"
import Clip from "../Clip/Clip"
import "../Serie/Serie.css"
import { useNavigate, useParams } from "react-router-dom"
import { Context } from "../../context/context"
import {  urlBackend_Desarrollo, urlOrigin } from "../../context/helpers"
import ClipDificultad from "./ClipDificultad"
import BotonPagina from "../BotonPagina/BotonPagina"
import { PaginasContext } from "../../context/contextPaginas"
import "./ClipDificultad.css"

const ContenedorClipDificultad = () => {

    const { dificultad } = useParams()
    const navigate = useNavigate();
    const {  urlGrabaciones,  traerGrabacion, traerGrabaciones } = useContext(Context)
    const { cambiarPagina, paginaActual, paginaClips,  totalPaginas, setearClipsPagina, setTotalPaginas, setPaginaClips  } = useContext(PaginasContext)

    const [data, setData] = useState([])
    let {  usuario } = useParams();


    const mostrarClipsPagina = (datos, primerValor, ultimoValor) => {
        let paginas = []
    
        for (let index = primerValor; index < ultimoValor; index++) {
            if(datos[index] === undefined) break
            paginas.push(datos[index])
        }      
        setPaginaClips(paginas, primerValor, ultimoValor)
    
        return paginaClips
    }
    
    const cantidadPaginasHtml = (data) => { 
        let arrayPaginas = []
        if(data.length <= 41) arrayPaginas = [1]
        if(data.length > 41 && data.length < 81) arrayPaginas = [1,2]
        if(data.length > 84 && data.length < 124) arrayPaginas = [1,2,3]
        if(data.length > 125 && data.length < 164) arrayPaginas = [1,2,3,4]
        if(data.length > 165 && data.length < 205) arrayPaginas = [1,2,3,4,5]
        if(data.length > 206 && data.length < 246) arrayPaginas = [1,2,3,4,5,6]
        
        return arrayPaginas
    }


    const urlClips = `${urlBackend_Desarrollo}/clips/dificultad/${ dificultad }`

    const fetchClips = async (urlClips) => {
        const respuestaClips = await fetch(urlClips,  
            {
                method: 'GET',
                headers: new Headers({
                    "Origin": urlOrigin,
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                })
            })
        if(respuestaClips) {
            const respClips = await respuestaClips.json();
            //console.log(resp)
            if(!respClips) console.log("No hay data")
            if(respClips) {
                // console.log(respGrabacionesClips)
                const arrayPaginas = cantidadPaginasHtml(respClips.data)

                setTotalPaginas(arrayPaginas)
                mostrarClipsPagina(respClips.data, 0, 21)
                setData(respClips.data)
            }
        }
    }


    useEffect(() => {
        fetchClips(urlClips)

        setearClipsPagina(data, paginaActual)

        if(usuario) {
            
        }

    }, [])

    useEffect(() => {
        setearClipsPagina(data, paginaActual)

        if(usuario) {
            
        }
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
                    <li className="very-easy"> Muy facil</li>
                    <li className="easy"> Facil</li>
                    <li className="medium"> Intermedio </li>
                    <li className="hard"> Dificil </li>
                    <li className="very-hard"> Muy Dificil </li>
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
                                        grabacionID={ element.grabacion_id ? element.grabacion_id : ""}
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