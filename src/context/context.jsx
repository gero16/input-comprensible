import { useState, createContext, useContext } from "react"
import 'react-audio-voice-recorder';

import { fetchTitulos, fetchTitulosPelicula, fetchTitulosSeries } from "./titulos";
import {  fetchCantidadClips,  fetchCapitulos,  fetchGrabaciones,  mostrarRespuesta,  
    separarTexto, transformarMayuscula, urlBackend_Desarrollo, urlBackend_Produccion, urlOrigin } from "./helpers";

import { PaginasContext } from "./contextPaginas"

export const Context = createContext()

export const CustomProvider = ({ children }) => {
    const { setTotalPaginas, mostrarClipsPagina, cantidadPaginasHtml  } = useContext(PaginasContext)

    const [evaluarAudio, setEvaluarAudio] = useState([false])
    const [idGrabar, setIdGrabar] = useState()
    let [urlImagen, setUrlImagen] = useState()
    const [usuarioSesion, setUsuarioSesion] = useState(false)
    const [nombreUsuario, setNombreUsuario] = useState("")
   
    const [grabacionLocalStorage, setGrabacionLocalStorage] =  useState({
        grabacion: '',
        storage: false,
      });

   
    const [data, setData] = useState([]) 

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
        localStorage.setItem(`${ subtitulo }-${ id } `,  JSON.stringify(grabacion));
        setGrabacionLocalStorage({ grabacion : `grabacion-${subtitulo}-${id}`, storage : true })
    }
    }


    const fetchClips = async (urlClips) => {
        console.log(urlClips)
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
                //console.log(respClips.clips)
                const arrayPaginas = cantidadPaginasHtml(respClips.clips)

                setTotalPaginas(arrayPaginas)
                mostrarClipsPagina(respClips.clips, 0, 21)
                console.log(respClips.clips)
                setData(respClips.clips)
            }
        }
    }

  

    const traerImagenFomato = (nombre) => {
        const formatosImagen = ['.jpg', '.png', '.webp'];
        let imagenCargada = null;
    
        for (const formato of formatosImagen) {
            const imagen = `/${ nombre }-portada${ formato }`;
            
            // Intenta cargar la imagen
            fetch(imagen)
                .then(response => {             
                    if (response.ok) {
                        //console.log(response.ok)
                        imagenCargada = urlImagen;
                        setUrlImagen(`url("${ imagen }")`);
                    }
                })
                .catch(error => {
                    console.error(`Error al cargar la imagen ${ imagen }: ${error}`);
                });
    
            if (imagenCargada) {
                break; // Sale del bucle si se encontró una imagen cargada correctamente
            }
        }
    }
    
    const evaluarSesion = () => {
        const sesion = JSON.parse(localStorage.getItem("sesion"))
        if(sesion) {
            
            setUsuarioSesion(true)
            setNombreUsuario(sesion.usuario)
            return sesion
        }
    }


    const [imagenPortada, setImagenPortada] = useState("")
    const traerImagenPortada = async (titulo) => {
        const response = await fetch(`${ urlBackend_Produccion }/titulos/individual/${titulo}`,  
            {
                method: 'GET',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': urlOrigin,
                }),
            })
            
            if(!response) console.log("Peticion a url equivocada")
    
            if(response.status === 200) {
                const resp = await response.json();
                //console.log(resp)
                if(!resp) console.log("No hay data")
                
                
                console.log(resp.data)
    
               setImagenPortada(resp.data.imagen)
            }
         
    }

    const dificultadIdioma = {
        "very-easy" : "Principiante",
        "easy"      : "Novato",
        "medium"    : "Intermedio",
        "hard"      : "Avanzado",
        "very-hard" : "Experto"
     }
    
    
     const dificultadEsp = (dificultad, valor) => {
        if(valor) {
            console.log(dificultad)
            const nuevo = dificultadIdioma[`${dificultad}`]
            console.log(nuevo)
            return nuevo
        }
        if(!valor) {
            const encontrarClave = dificultad;

            const entry = Object.entries(dificultadIdioma).find(([key, value]) => value === encontrarClave);
            const nuevo = entry ? entry[0] : null;
            console.log(nuevo)
            return nuevo
            
        }
      return nuevo
    }



return (
    <Context.Provider 
        value={{ clickGrabar, mostrarRespuesta, addAudioElement,
            urlBackend_Produccion, urlBackend_Desarrollo, fetchTitulos,fetchCapitulos, transformarMayuscula,
            grabacionLocalStorage, setGrabacionLocalStorage, 
            cantidadPaginasHtml, fetchClips, data, setData, separarTexto, fetchCantidadClips, 
            traerImagenFomato, urlImagen, fetchTitulosPelicula, fetchTitulosSeries, evaluarSesion,
             usuarioSesion, setUsuarioSesion,nombreUsuario, traerImagenPortada, imagenPortada,
             dificultadIdioma,dificultadEsp
            }}> 
            
        { children } 

    </Context.Provider>
    )
}