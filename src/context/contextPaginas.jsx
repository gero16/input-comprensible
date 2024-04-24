import { useState, createContext, useContext } from "react"
import 'react-audio-voice-recorder';
import { fetchTitulos } from "./titulos";


export const PaginasContext = createContext()

export const PaginasProvider = ({ children }) => {


    const [paginaActual, setPaginaActual] = useState(1)
    const [paginaClips, setPaginaClips] = useState([])
    const [totalPaginas, setTotalPaginas] = useState([]) 

    const setearClipsPagina = (data, paginaActual) => {

        if(paginaActual === 1)  mostrarClipsPagina(data, 0, 21)
        if(paginaActual === 2) mostrarClipsPagina(data, 22, 42)
        if(paginaActual === 3) mostrarClipsPagina(data, 43, 63)
        if(paginaActual === 4) mostrarClipsPagina(data, 64, 84)
        if(paginaActual === 5) mostrarClipsPagina(data, 85, 105)
        if(paginaActual === 6) mostrarClipsPagina(data, 106, 126)
        
    }
    
    const mostrarClipsPagina = (datos, primerValor, ultimoValor) => {
        let paginas = []
    
        for (let index = primerValor; index < ultimoValor; index++) {
            if(datos[index] === undefined) break
            paginas.push(datos[index])
        }      


        setPaginaClips(paginas)
    
        return paginaClips
    }
    
    const cambiarPagina = (numero) => {
        setPaginaActual(numero)
        return paginaActual
    }

    
const cantidadPaginasHtml = (data) => { 
    let arrayPaginas = []

    if(data.length <= 21) arrayPaginas = [1]
    if(data.length > 21 && data.length < 43) arrayPaginas = [1,2]
    if(data.length > 44 && data.length < 65) arrayPaginas = [1,2,3]
    if(data.length > 65 && data.length < 76) arrayPaginas = [1,2,3,4]
    if(data.length > 77 && data.length < 99) arrayPaginas = [1,2,3,4,5]
    if(data.length > 100 && data.length < 121) arrayPaginas = [1,2,3,4,5,6]

    return arrayPaginas
}
    
return (
    <PaginasContext.Provider 
        value={{ setearClipsPagina, mostrarClipsPagina, cambiarPagina, paginaActual, paginaClips,setTotalPaginas, cantidadPaginasHtml, totalPaginas, 
            setTotalPaginas, setPaginaClips 
        }}> 
            
        { children } 

    </PaginasContext.Provider>
    )
}