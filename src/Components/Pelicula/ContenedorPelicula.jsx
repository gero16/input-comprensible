
import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import Pelicula from './Pelicula';
import NavbarUser from '../Navbar/NavbarUser';
import { Context } from '../../context/context';

const ContenedorPelicula = () => {
    let { pelicula, usuario } = useParams();
    const { urlBackend_Produccion, setearClipsPagina, cambiarPagina, 
            paginaActual, paginaClips, fetchClips, data,   
    } = useContext(Context)
    const urlGrabaciones = `${ urlBackend_Produccion }/grabaciones/${pelicula}/${usuario}`
    const urlClips = `${ urlBackend_Produccion }/pelicula/${ pelicula }`

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
            <footer id='footer'>
                <button onClick={() => cambiarPagina(1)}>  1  </button>
                <button onClick={() => cambiarPagina(2)}>  2  </button>
                <button onClick={() => cambiarPagina(3)}>  3  </button>
            </footer>
        </>
    )
}

export default ContenedorPelicula