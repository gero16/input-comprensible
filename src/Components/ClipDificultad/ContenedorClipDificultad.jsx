import { useContext, useEffect, useState } from "react"
import Clip from "../Clip/Clip"
import "../Serie/Serie.css"
import { useNavigate, useParams } from "react-router-dom"
import { Context } from "../../context/context"
import {  urlBackend_Desarrollo, urlOrigin } from "../../context/helpers"
import ClipDificultad from "./ClipDificultad"
import BotonPagina from "../BotonPagina/BotonPagina"

const ContenedorClipDificultad = () => {

    const { dificultad } = useParams()
    const navigate = useNavigate();
    const {  urlGrabaciones,  traerGrabacion, traerGrabaciones } = useContext(Context)
    const [data, setData] = useState([])
    let {  usuario } = useParams();

    const [paginaClips, setPaginaClips] = useState([])
    const [paginaActual, setPaginaActual] = useState([1])
    const [totalPaginas, setTotalPaginas] = useState([]) 

    const setearClipsPagina = (data) => {
        if(paginaActual === 1) mostrarClipsPagina(data, 0, 41)
        if(paginaActual === 2) mostrarClipsPagina(data, 42, 82)
        if(paginaActual === 3) mostrarClipsPagina(data, 83, 123)
        if(paginaActual === 4) mostrarClipsPagina(data, 124, 164)
        if(paginaActual === 5) mostrarClipsPagina(data, 165, 205)
        if(paginaActual === 6) mostrarClipsPagina(data, 206, 246)
    }

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

const cambiarPagina = (numero) => {
    setPaginaActual(numero)
    return paginaActual
}
    const urlClips = `${urlBackend_Desarrollo}/clips/dificultad/${dificultad}`

    const fetchClips = async (urlClips) => {
        const response = await fetch(urlClips,  
            {
                method: 'GET',
                headers: new Headers({
                    "Origin": urlOrigin,
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                })
            })
        
        if(response) {
            const resp = await response.json();
            console.log(resp.data)
            if(!resp) console.log("No hay data")
            if(resp) {
                // console.log(respuesta)
                const arrayPaginas = cantidadPaginasHtml(resp.data)
                console.log(arrayPaginas)
                setTotalPaginas(arrayPaginas)

        
                mostrarClipsPagina(resp.data, 0, 51)
                setData(resp.data)
                return data;
            }
        }
    }


    useEffect(() => {
        fetchClips(urlClips)
        setearClipsPagina(data)

        if(usuario) {
            
            
        }

    }, [])

    useEffect(() => {
        fetchClips(urlClips)
        setearClipsPagina(data)

        if(usuario) {
            
        }

    }, [dificultad])
    return (
        <>
            <article className={`article-clip`} name={ data.id }>
                <div className={`portada  flex-center`} >
                </div>  

                <header className="flex-center">

                <ul className="flex gap-20 ul-dificultad"> 
                    <li className="very-easy"> Muy facil</li>
                    <li className="easy"> Facil</li>
                    <li className="medium"> Intermedio </li>
                    <li className="hard"> Dificil </li>
                    <li className="very-hard"> Muy Dificil </li>
                </ul>
                  

                </header>
                  
                <section className='flex-center'>
                    

                    { data.length > 0 
                        ? data.map((element, key) => {
                            
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