
import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../Components/Navbar/Navbar';

import { Context } from '../context/context';
import BotonPagina from '../Components/BotonPagina/BotonPagina';
import Pruebas from './Pruebas';


const ContenedorPruebas = () => {
    let { pelicula, usuario } = useParams();
    const { urlBackend_Produccion, urlBackend_Desarrollo, setearClipsPagina, cambiarPagina, 
            paginaActual, paginaClips, fetchClips, data,  totalPaginas  
    } = useContext(Context)
    const urlGrabaciones = `${ urlBackend_Desarrollo }/grabaciones/peliculas/${pelicula}/${usuario}`
    const urlClips = `${ urlBackend_Desarrollo }/pelicula/${ pelicula }`
    console.log(urlBackend_Desarrollo)

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
                ? <> <Pruebas data={data} /> </>
                : <> 
                    <Navbar/>
                    
                    <Pruebas data={paginaClips}  />      
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

export default ContenedorPruebas