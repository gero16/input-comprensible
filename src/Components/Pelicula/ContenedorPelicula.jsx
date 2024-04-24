
import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import Pelicula from './Pelicula';
import { Context } from '../../context/context';
import { PaginasContext } from '../../context/contextPaginas';
import BotonPagina from '../BotonPagina/BotonPagina';
import { urlBackend_Desarrollo } from '../../context/helpers';

const ContenedorPelicula = () => {
    let { pelicula, usuario } = useParams();
    const { urlBackend_Produccion, fetchClips, data, setData } = useContext(Context)
    const { cambiarPagina, paginaActual, paginaClips,  totalPaginas, setearClipsPagina } = useContext(PaginasContext)

    const urlGrabaciones = `${ urlBackend_Produccion }/grabaciones/peliculas/${pelicula}/${usuario}`
    const urlClips = `${ urlBackend_Produccion }/pelicula/${ pelicula }`

    
    useEffect(() => {
        fetchClips(urlClips, urlGrabaciones)

        console.log(totalPaginas)
        setearClipsPagina(data, paginaActual)
    
    
    }, [pelicula])
    
    useEffect(() => {
        
        setearClipsPagina(data, paginaActual)
    }, [paginaActual])

    return (
        <>
       
            {
                usuario 
                ? <> <Pelicula data={paginaClips} setData={setData}/> </>
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