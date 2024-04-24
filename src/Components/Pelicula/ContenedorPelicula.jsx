
import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import Pelicula from './Pelicula';
import NavbarUser from '../Navbar/Navbar';
import { Context } from '../../context/context';
import BotonPagina from '../BotonPagina/BotonPagina';
import { urlBackend_Desarrollo } from '../../context/helpers';

const ContenedorPelicula = () => {
    let { pelicula, usuario } = useParams();
    const { urlBackend_Produccion, setearClipsPagina, cambiarPagina, 
            paginaActual, paginaClips, fetchClips, data, totalPaginas, setData  
    } = useContext(Context)
    const urlGrabaciones = `${ urlBackend_Produccion }/grabaciones/peliculas/${pelicula}/${usuario}`
    const urlClips = `${ urlBackend_Produccion }/pelicula/${ pelicula }`

    useEffect(() => {
        fetchClips(urlClips, urlGrabaciones);
        setearClipsPagina(data)
        console.log(totalPaginas)
    }, [])
    
    useEffect(() => {
        fetchClips(urlClips, urlGrabaciones);
        setearClipsPagina(data)
    }, [pelicula])
    
    useEffect(() => {
        fetchClips(urlClips, urlGrabaciones);
        setearClipsPagina(data)
    }, [paginaActual])
    return (
        <>
            {
                usuario 
                ? <> <Pelicula data={data} setData={setData}/> </>
                : <> 
                    <Navbar/>
                    
                    <Pelicula data={paginaClips} setData={setData} jpg={true} />      
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