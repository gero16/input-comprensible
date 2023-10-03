import { useState, createContext } from "react"
import 'react-audio-voice-recorder';
export const Context = createContext()

export const CustomProvider = ({ children }) => {
    const [evaluarAudio, setEvaluarAudio] = useState([false])
    const [idGrabar, setIdGrabar] = useState()

    const urlBackend_Produccion = import.meta.env.VITE_URL_BACKEND_PRODUCCION
    const urlBackend_Desarrollo = import.meta.env.VITE_URL_BACKEND_DESARROLLO

    const fetchTitulos = async (titulos, setTitulos) => {
        let arrayTitulos = []
        const url = `${urlBackend_Produccion}/titulos`
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
        //console.log(resp.data)
        if(!resp) console.log("No hay data")

        resp.data.forEach(element => {
            const titulo = [element.titulo, element.subtitulo, element.categoria, element.temporada, element.capitulo]
            arrayTitulos.push(titulo)
           // console.log(arrayTitulos)
        });


        console.log(arrayTitulos)
        setTitulos(arrayTitulos)
        //console.log(arrayTitulos)
        return titulos
    }

    const fetchCapitulos = async (titulo) => {
        let arrayCapitulos = []
        const url = `${urlBackend_Produccion}/titulos/${titulo}`
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
            console.log("No son iguales!")
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
        console.log(idGrabar)
        
    }

    // AudioRecorder me pasa la grabacion como un blob, con FileReader transformo el blob para insertarse como un embed
    const addAudioElement = (blob, subtitulo, id) => {
       /*
      let reader = new FileReader();
      reader.readAsDataURL(blob); // convierte el blob a base64 y llama a onload
  
      reader.onload = function() {
        // ANTES con localStorage - if(found && `audio-mic-${id}` === idGrabar ){ 
        if(`audio-mic-${id}` === idGrabar ){ 
            const aud = document.querySelector(`.grabacion-${subtitulo}-${id}`) 
            console.log(aud)
            console.log(reader.result)
            aud.src = reader.result
            const grabacion = {
                grabacion : reader.result,
                usuario: "anonimus",
                id_usuario: "1GagaF",
                id_clip: id,

            }
            localStorage.setItem(`${ subtitulo }-${ id } `,  JSON.stringify(grabacion));
        }
      }
      */
      

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
    }
    
  }

return (
    <Context.Provider value={{ clickGrabar, evaluar, mostrarRespuesta, addAudioElement,
        urlBackend_Produccion, urlBackend_Desarrollo, fetchTitulos,fetchCapitulos
    }}> 
        { children } 
    </Context.Provider>
    )
}