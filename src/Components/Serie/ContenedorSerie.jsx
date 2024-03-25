
import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../Navbar/Navbar'
import Serie from './Serie';
import NavbarUser from '../Navbar/NavbarUser';
import { Context } from '../../context/context';
import BotonPagina from '../BotonPagina/BotonPagina';
//import fetch from 'node-fetch'


const ContenedorSerie = () => {
    let { serie, temporada, usuario, capitulo } = useParams();
    const { fetchCapitulos, urlBackend_Produccion, urlBackend_Desarrollo, 
            setearClipsPagina, cambiarPagina,  paginaActual, paginaClips, fetchClips,
            data, totalPaginas, setData, traerGrabaciones, traerGrabacion
        } = useContext(Context)
    
    const [season, setSeason] = useState([])
    const [capitulos, setCapitulos] = useState([])
     

    const urlClips = `${ urlBackend_Produccion }/series/${serie}/${temporada}/${capitulo}`
    const urlGrabaciones = `${ urlBackend_Produccion }/grabaciones/series/${ serie }/${ temporada }/${capitulo}/${ usuario }`
 
    const traerCapitulos = async () => {
        const dataCapitulos = await fetchCapitulos(serie)
        setCapitulos(dataCapitulos)
    }

   

    useEffect(() => {
        fetchClips(urlClips, urlGrabaciones)
        traerCapitulos()
        setearClipsPagina(data)

        if(usuario) {
            const resultado = traerGrabacion(urlGrabaciones);
            traerGrabaciones(resultado)
        }

    }, [serie])

    useEffect(() => {
        fetchClips(urlClips, urlGrabaciones)
        setSeason(temporada)
        setearClipsPagina(data)

        if(usuario) {
            const resultado = traerGrabacion(urlGrabaciones);
            traerGrabaciones(resultado)
        }

    }, [temporada])

    useEffect(() => {
        fetchClips(urlClips, urlGrabaciones)
        setearClipsPagina(data)

        if(usuario) {
            const resultado = traerGrabacion(urlGrabaciones);
            traerGrabaciones(resultado)
        }
    }, [capitulo])

   
    useEffect(() => {
        setearClipsPagina(data)
        console.log(paginaActual)

        if(usuario) {
            const resultado = traerGrabacion(urlGrabaciones);
            traerGrabaciones(resultado)
        }

    }, [paginaActual])

 
    return (
        <>
            { usuario 
                ? <> 
                    <Serie 
                        data={data} 
                        cambiarPagina={cambiarPagina} 
                        temporada={temporada} 
                        serie={serie} 
                        capitulos={capitulos} 
                        capitulo={capitulo} />      
                </>
                :  <> 
                    <Navbar/>
                    <Serie 
                        data={paginaClips} 
                        temporada={temporada} 
                        serie={serie} 
                        capitulos={capitulos} 
                        capitulo={capitulo}
                    />    

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
            } 
        </>
    )
}

export default ContenedorSerie