
import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import Pelicula from './Pelicula';
import NavbarUser from '../Navbar/NavbarUser';
import { Context } from '../../context/context';
import BotonPagina from '../BotonPagina/BotonPagina';
import { urlBackend_Desarrollo } from '../../context/helpers';

const ContenedorPelicula = () => {
    let { pelicula, usuario } = useParams();
    const { urlBackend_Produccion, setearClipsPagina, cambiarPagina, 
            paginaActual, paginaClips, fetchClips, data,  totalPaginas  
    } = useContext(Context)
    const urlGrabaciones = `${ urlBackend_Desarrollo }/grabaciones/peliculas/${pelicula}/${usuario}`
    const urlClips = `${ urlBackend_Desarrollo }/pelicula/${ pelicula }`

    useEffect(() => {
        fetchClips(urlClips, urlGrabaciones);
        setearClipsPagina(data)
    }, [pelicula])
    
    useEffect(() => {
        setearClipsPagina(data)
    }, [paginaActual])
    return (
        <>
            {
                usuario 
                ? <> <Pelicula data={data} /> </>
                : <> 
                    <Navbar/>
                    
                    <Pelicula data={paginaClips}  />      
                </>
            }

            <footer className='footer'>
                { totalPaginas.map((element, key) => {
                    console.log(element)
                        return (
                            
                            <BotonPagina 
                                paginaActual={paginaActual}
                                cambiarPagina={cambiarPagina} 
                                numeroPagina={element}
                            /> 
                        
                        )
                    })}
  
            </footer>
        </>
    )
}

export default ContenedorPelicula