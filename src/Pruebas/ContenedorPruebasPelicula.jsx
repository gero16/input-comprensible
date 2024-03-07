
import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../Components/Navbar/Navbar';

import { Context } from '../context/context';
import BotonPagina from '../Components/BotonPagina/BotonPagina';
import PruebasPelicula from './PruebasPelicula';


const ContenedorPruebasPelicula = () => {
    let { pelicula, usuario } = useParams();
    const { urlBackend_Produccion, urlBackend_Desarrollo, setearClipsPagina, cambiarPagina, 
            paginaActual, paginaClips, fetchClips, data,  totalPaginas, setData  
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
                ? <> <PruebasPelicula data={data} setData={setData} /> </>
                : <> 
                    <Navbar/>
                    
                    <PruebasPelicula data={paginaClips}  setData={setData} />      
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

export default ContenedorPruebasPelicula