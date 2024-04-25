
import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../Navbar/Navbar'
import Serie from './Serie';
import NavbarUser from '../Navbar/Navbar';
import { Context } from '../../context/context';
import BotonPagina from '../BotonPagina/BotonPagina';
import { PaginasContext } from '../../context/contextPaginas';
//import fetch from 'node-fetch'


const ContenedorSerie = () => {
    let { serie, temporada, usuario, capitulo } = useParams();
    const { fetchCapitulos, urlBackend_Produccion, urlBackend_Desarrollo, fetchClips, data,  traerImagenPortada, imagenPortada, urlImagen
        } = useContext(Context)

    const { cambiarPagina, paginaActual, paginaClips,  totalPaginas, setearClipsPagina } = useContext(PaginasContext)
    
    const [season, setSeason] = useState([])
    const [capitulos, setCapitulos] = useState([])
     
    const urlClipsGrabaciones = `${ urlBackend_Produccion }/clips-grabaciones/series/${ serie }/${ temporada }/${capitulo}/${ usuario }`
 
    const traerCapitulos = async () => {
        const dataCapitulos = await fetchCapitulos(serie)
        setCapitulos(dataCapitulos)
    }

    

    useEffect(() => {
        fetchClips(urlClipsGrabaciones)
        traerCapitulos()
        setearClipsPagina(data, paginaActual)

        console.log(paginaClips)
        traerImagenPortada(serie)
    }, [serie])

    useEffect(() => {
        fetchClips(urlClipsGrabaciones)
        setSeason(temporada)
        setearClipsPagina(data, paginaActual)

    }, [temporada])

    useEffect(() => {
        fetchClips(urlClipsGrabaciones)
        setearClipsPagina(data, paginaActual)

    }, [capitulo])

   
    useEffect(() => {
        setearClipsPagina(data, paginaActual)

    }, [paginaActual])

 
    return (
        <>
            { usuario 
                ? <> 
                    <Serie 
                        data={paginaClips} 
                        cambiarPagina={cambiarPagina} 
                        temporada={temporada} 
                        serie={serie} 
                        capitulos={capitulos} 
                        capitulo={capitulo} 
                        imagenPortada={imagenPortada}
                        />      
                        
                </>
                :  <> 
                    <Navbar/>
                    <Serie 
                        data={paginaClips} 
                        temporada={temporada} 
                        serie={serie} 
                        capitulos={capitulos} 
                        capitulo={capitulo}
                        imagenPortada={imagenPortada}
                    />    

                    <footer className='footer'>
                        { totalPaginas.map((element, key) => {
                            console.log(element)
                                return (
                                 
                                    <BotonPagina 
                                        paginaActual={paginaActual}
                                        cambiarPagina={cambiarPagina} 
                                        numeroPagina={element}
                                        key={key}
                                    /> 
                                
                                )
                            })}
                        
                    </footer>

                </>
            } 
        </>
    )
}

export default ContenedorSerie