import { useState, createContext } from "react"
import 'react-audio-voice-recorder';
import { fetchTitulos } from "./titulos";

export const Context2 = createContext()


export const CustomProvider = ({ children }) => {

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


    
return (
    <Context2.Provider 
        value={{ evaluar }}> 
            
        { children } 

    </Context2.Provider>
    )
}