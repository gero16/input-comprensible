import { useContext, useState } from "react"
import "./AgregarClip.css"
import Navbar from '../Navbar/Navbar'
import { Context } from "../../context/context"
import { useEffect } from "react"
import AgregarClipMulti from "./AgregarClipMulti"
import AgregarClipSerie from "./AgregarClipSerie"
import { useParams } from "react-router-dom"

const ContenedorAgregarClip = () => {
    let { pelicula, serie, temporada, usuario, capitulo } = useParams();
    
    return (
        <>
            <Navbar> </Navbar>
            <div className="contenedor-agregar-clip">
                {
                    !pelicula && !temporada  
                    ? <AgregarClipMulti> </AgregarClipMulti>
                    : pelicula 
                        ? <AgregarClipSerie> </AgregarClipSerie> 
                        : <AgregarClipSerie> </AgregarClipSerie> 
                }
            </div>

        </>
    )
}

export default ContenedorAgregarClip