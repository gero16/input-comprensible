import { useState, createContext } from "react"
import 'react-audio-voice-recorder';

const urlBackend_Produccion = import.meta.env.VITE_URL_BACKEND_PRODUCCION
console.log(urlBackend_Produccion)
const urlBackend_Desarrollo = import.meta.env.VITE_URL_BACKEND_DESARROLLO
const urlOrigin = "https://input-comprensible.vercel.app/" 

export const fetchTitulos = async (titulos, setTitulos) => {
    let arrayTitulos = []
    const url = `${urlBackend_Produccion}/titulos`
    try {
        const response = await fetch(url,  
            {
                method: 'GET',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': urlOrigin,
                }),
            })
        const resp= await response.json();
        //console.log(resp.data)
        if(!resp) console.log("No hay data")

        resp.data.forEach(element => {
            const titulo = [element.titulo, element.subtitulo, element.categoria, element.temporada, element.capitulo, element.imagen]
            arrayTitulos.push(titulo)
           //console.log(arrayTitulos)
        });
        //console.log(resp.data)
        setTitulos(arrayTitulos)
        //console.log(arrayTitulos)
        return titulos
        
    } catch (error) {
        console.log(error)
        setTitulos([])
    }
        
}


