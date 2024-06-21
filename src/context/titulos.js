import { useState, createContext } from "react"
import 'react-audio-voice-recorder';

const urlBackend_Produccion = import.meta.env.VITE_URL_BACKEND_PRODUCCION
const urlBackend_Desarrollo = import.meta.env.VITE_URL_BACKEND_DESARROLLO
const urlOrigin = "https://input-comprensible.vercel.app" 

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

            if(response.status === 200) {
                const resp = await response.json();
                //console.log(resp)
                if(!resp) console.log("No hay data")
                
                //console.log(response)
                resp.data.forEach(element => {
                    const titulo = [element.titulo, element.subtitulo, element.categoria, element.temporada, element.capitulo, element.imagen]
                    arrayTitulos.push(titulo)
             
                });
               
                setTitulos(arrayTitulos)
                //console.log(arrayTitulos)
                return titulos  

            }
            if(!response) console.log("Peticion a url equivocada")
            if(response.status === 404) console.log("No hay data")
        
    } catch (error) {

    
        console.log(error)
        
    }
}  


export const fetchTitulosPelicula = async (titulos, setTitulos,) => {
    let arrayTitulos = []
    const url = `${ urlBackend_Produccion }/titulos/peliculas`
    try {
        const response = await fetch(url,  
            {
                method: 'GET',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': urlOrigin,
                }),
            })

            if(response.status === 200) {
                const resp = await response.json();
                //console.log(resp)
                if(!resp) console.log("No hay data")
            
                resp.data.forEach(element => {    
                    const titulo = 
                    [
                        element.titulo, element.subtitulo, element.categoria, 
                        element.temporada, element.capitulo, element.imagen, 
                        element.imagen_mini, element.imagen_med, element.nacionalidad  
                    ]
                    arrayTitulos.push(titulo)
                });
               
                setTitulos(arrayTitulos)
                //console.log(arrayTitulos)
                return titulos  

            }
            if(!response) console.log("Peticion a url equivocada")
            if(response.status === 404) console.log("No hay data")
        
    } catch (error) {
        console.log(error)
        return error
        
    }
}  


export const fetchTitulosSeries = async (titulos, setTitulos,) => {
    let arrayTitulos = []
    const url = `${ urlBackend_Produccion }/titulos/series`
    try {
        const response = await fetch(url,  
            {
                method: 'GET',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': urlOrigin,
                }),
            })

            if(response.status === 200) {
                const resp = await response.json();
                //console.log(resp)
                if(!resp) console.log("No hay data")
                
                //console.log(response)
                resp.data.forEach(element => {
                    const titulo = [
                        element.titulo, element.subtitulo, element.categoria, 
                        element.temporada, element.capitulo, element.imagen,
                        element.imagen_mini, element.imagen_med, element.nacionalidad 
                    ]
                    arrayTitulos.push(titulo)
             
                });
               
                setTitulos(arrayTitulos)
                //console.log(arrayTitulos)
                return titulos  

            }
            if(!response) console.log("Peticion a url equivocada")
            if(response.status === 404) console.log("No hay data")
        
    } catch (error) {

    
        console.log(error)
        
    }
}  


