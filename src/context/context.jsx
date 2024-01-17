import { useState, createContext } from "react"
import 'react-audio-voice-recorder';
import { fetchTitulos } from "./titulos";
import { cantidadPaginasHtml, separarTexto, setearClipsPagina, transformarMayuscula } from "./helpers";

export const Context = createContext()

export const CustomProvider = ({ children }) => {
    const [evaluarAudio, setEvaluarAudio] = useState([false])
    const [idGrabar, setIdGrabar] = useState()
    const [paginaActual, setPaginaActual] = useState([1])
    const [paginaClips, setPaginaClips] = useState([])
    const [totalClips, setTotalClips] = useState(0) 
    const [grabacionLocalStorage, setGrabacionLocalStorage] =  useState({
        grabacion: '',
        storage: false,
      });

    const [totalPaginas, setTotalPaginas] = useState([]) 
    const [data, setData] = useState([]) 

    const urlBackend_Produccion = import.meta.env.VITE_URL_BACKEND_PRODUCCION
    const urlBackend_Desarrollo = import.meta.env.VITE_URL_BACKEND_DESARROLLO

    const urlOrigin = "https://input-comprensible.vercel.app/" 


    const fetchCapitulos = async (titulo) => {
        let arrayCapitulos = []
        const url = `${urlBackend_Desarrollo}/titulos/${titulo}`
        const response = await fetch(url,  
            {
                method: 'GET',
                headers: new Headers({
                    "Origin": urlOrigin,
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                })
            })
        const resp= await response.json();
        //console.log(resp.data)
        
        if(!resp) console.log("No hay data")
      
        return resp.data
    }

    const evaluar = (subtitulo, id) => {
        const valorAudio = document.querySelector(`.${subtitulo}-${id}`)
        const subtituloIncorrecto = document.querySelector(`.${subtitulo}-mostrar-${id}`)
        const valueInput = document.querySelector(`.input-${subtitulo}-${id}`)
        const respInput = document.querySelector(`.inputRespuesta-${subtitulo}-${id}`)
   
        if(valueInput.value == respInput.value) {
            setEvaluarAudio(true)
            valorAudio.classList.toggle("ocultar")
            subtituloIncorrecto.classList.add("ocultar")
        } else {
            valorAudio.classList.add("ocultar")
            subtituloIncorrecto.classList.toggle("ocultar")
        }
    }

    const mostrarRespuesta = (subtitulo, id) => {
        const valorAudio = document.querySelector(`.${subtitulo}-${id}`)
        valorAudio.classList.toggle("ocultar")
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

    // AudioRecorder me pasa la grabacion como un blob, con FileReader transformo el blob para insertarse como un embed
    const addAudioElement = (blob, subtitulo, id) => {
      if(`audio-mic-${id}` === idGrabar ){ 
        const url = URL.createObjectURL(blob);
        const audio = document.querySelector(`.grabacion-${subtitulo}-${id}`) 
        audio.src = url;
        audio.controls = true;       

        const grabacion = {
            grabacion : url,
            usuario: "anonimus",
            id_usuario: "1GagaF",
            id_clip: id,

        }
        setGrabacionLocalStorage({ grabacion : `grabacion-${subtitulo}-${id}`, storage : true })
        localStorage.setItem(`${ subtitulo }-${ id } `,  JSON.stringify(grabacion));
    }
    }

    const mostrarClipsPagina = (datos, primerValor, ultimoValor) => {
    let paginas = []
    console.log(datos.length)
    for (let index = primerValor; index < ultimoValor; index++) {
        if(datos[index] === undefined) break
        paginas.push(datos[index])
    }      
    setPaginaClips(paginas, primerValor, ultimoValor)

    return paginaClips
    }

   
    const cambiarPagina = (numero) => {
        setPaginaActual(numero)
        return paginaActual
    }

    const fetchGrabaciones = async (clips, urlGrabaciones) => {
    
        const response = await fetch(urlGrabaciones,  
            {
                method: 'GET',
                headers: new Headers({
                    "Origin": urlOrigin,
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                })
            })

            if(response) {
                const resp= await response.json();
                
                if(!resp) console.log("No hay data")
            
                let arrayClips = clips
                //console.log(resp.grabaciones)
                arrayClips.forEach(clip => {
                    resp.grabaciones.forEach((grabacion) => {
                        if(clip.id ===  grabacion.id_clip) {
                            clip.grabacion = grabacion.grabacion 
                        }
                    })
                });
            return arrayClips
            }
    }

    const fetchClips = async (urlClips, urlGrabaciones) => {
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
            const resp= await response.json();
            if(!resp) console.log("No hay data")
            const respuesta = await fetchGrabaciones(resp.data, urlGrabaciones)
            if(respuesta) {
                const arrayPaginas = cantidadPaginasHtml(resp.data)
                setTotalPaginas(arrayPaginas)
            
                mostrarClipsPagina(respuesta, 0, 21)
                setData(respuesta)
                console.log(respuesta)
                return data;
            }
        }
    }

    const fetchCantidadClips = async (urlClips) => {
        const response = await fetch(urlClips,  {
                method: 'GET',
                headers: new Headers({
                    "Origin": urlOrigin,
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                })
            })

        if(response) {
            const resp= await response.json();
            if(!resp) console.log("No hay data")
            
            console.log(resp.Numero_Siguiente)
            
            return resp.Numero_Siguiente
        }
        }
    

return (
    <Context.Provider 
        value={{ clickGrabar, evaluar, mostrarRespuesta, addAudioElement,
            urlBackend_Produccion, urlBackend_Desarrollo, fetchTitulos,fetchCapitulos, transformarMayuscula,
            grabacionLocalStorage, setearClipsPagina, cambiarPagina, paginaActual, paginaClips, mostrarClipsPagina, 
            cantidadPaginasHtml, fetchClips, data, setData, totalPaginas, setTotalPaginas, separarTexto, fetchCantidadClips
            }}> 
            
        { children } 

    </Context.Provider>
    )
}