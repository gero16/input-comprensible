
import { useState, useEffect, useContext } from 'react';
import Navbar from '../Navbar/Navbar';
import Pelicula from './Pelicula';
import { Context } from '../../context/context';
import { PaginasContext } from '../../context/contextPaginas';
import BotonPagina from '../BotonPagina/BotonPagina';
import { urlBackend_Desarrollo } from '../../context/helpers';
import { Link as Navigate, NavLink, useNavigate, useParams } from "react-router-dom";

const ContenedorPelicula = () => {
    let { pelicula, usuario } = useParams();
    const { urlBackend_Produccion, fetchClips, data, setData, traerImagenPortada, imagenPortada  } = useContext(Context)
    const { cambiarPagina, paginaActual, paginaClips,  totalPaginas, setearClipsPagina, } = useContext(PaginasContext)

    const urlClips = `${ urlBackend_Produccion }/clips-grabaciones/peliculas/${pelicula}/${usuario}`

    useEffect(() => {
        fetchClips(urlClips)

        console.log(totalPaginas)
        setearClipsPagina(data, paginaActual)
    
       traerImagenPortada(pelicula)

    }, [pelicula])
    
    useEffect(() => {
        
        setearClipsPagina(data, paginaActual)
      
    }, [paginaActual])

    return (
        <>
       
            {
                usuario 
                ? <> <Pelicula data={paginaClips} setData={setData} imagenPortada={imagenPortada} /> </>
                : <> 
                    <Navbar/>
                    
                    <Pelicula data={paginaClips} setData={setData} jpg={true} imagenPortada={imagenPortada} />      
                </>
            }

            <footer className='footer'>
                { totalPaginas ? 
                
                    totalPaginas.map((element, key) => {
                            return (
                                
                                <BotonPagina 
                                    paginaActual={paginaActual}
                                    cambiarPagina={cambiarPagina} 
                                    numeroPagina={element}
                                    key={key}
                                    
                                /> 
                            
                            )
                        })
                        : <> </>
                }
  
            </footer>
        </>
    )
}

export default ContenedorPelicula