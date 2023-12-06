import "./AgregarClip.css"
import { useParams } from "react-router-dom"

import Navbar from '../Navbar/Navbar'
import AgregarClipMulti from "./AgregarClipMulti"
import AgregarClipSerie from "./AgregarClipSerie"
import AgregarClipPelicula from "./AgregarClipPelicula"

const ContenedorAgregarClip = () => {
    let { pelicula, serie, temporada, usuario, capitulo } = useParams();
    
    return (
        <>
            <Navbar> </Navbar>
            <div className="contenedor-agregar-clip">
                {
                    !pelicula && !temporada  
                    ? <AgregarClipMulti> </AgregarClipMulti>
                    : serie 
                        ? <AgregarClipSerie> </AgregarClipSerie> 
                        : <AgregarClipPelicula> </AgregarClipPelicula> 
                }
            </div>

        </>
    )
}

export default ContenedorAgregarClip