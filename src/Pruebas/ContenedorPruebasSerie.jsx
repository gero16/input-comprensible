
import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';

import Navbar from '../Components/Navbar/Navbar';
import { Context } from '../context/context';
import BotonPagina from '../Components/BotonPagina/BotonPagina';
import PruebasSerie from './PruebasSerie';

const ContenedorPruebasSerie = () => {
    let { serie, temporada, usuario, capitulo } = useParams();
    const { fetchCapitulos, urlBackend_Produccion, urlBackend_Desarrollo, 
            setearClipsPagina, cambiarPagina,  paginaActual, paginaClips, fetchClips,
            data, totalPaginas, setData 
        } = useContext(Context)
    
    const [season, setSeason] = useState([])
    const [capitulos, setCapitulos] = useState([])
     

    const urlClips = `${ urlBackend_Desarrollo }/series/${serie}/${temporada}/${capitulo}`
    const urlGrabaciones = `${ urlBackend_Desarrollo }/grabaciones/series/${ serie }/${ temporada }/${ usuario }`
 
    const traerCapitulos = async () => {
        const dataCapitulos = await fetchCapitulos(serie)
        setCapitulos(dataCapitulos)
    }

    const traerGrabacion = async () => {
        const response = await fetch(urlGrabaciones,  
        {
                method: 'GET',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                })
            })
        if(response) {
            const resp = await response.json();
            if(!resp) console.log("No hay data")
            
            console.log(resp)
            return resp;
        }
    }

    const traerGrabaciones = () => {
        const resultado = traerGrabacion();

        resultado.then((result) => {
   
            // result - no es un state como data
            result.grabaciones.forEach((grabacion, index) => {
    
                if(grabacion.id_clip === result.clips[index].numero_clip ) {
                    console.log("hola")
                    result.clips[index].grabacion_id = grabacion.id_drive_grabacion
                }
                console.log(result.clips)
            });

            setData(result.clips)
        });

    }



    useEffect(() => {
        fetchClips(urlClips, urlGrabaciones)
        traerCapitulos()
        setearClipsPagina(data)
        traerGrabaciones()
    }, [serie])

    useEffect(() => {
        fetchClips(urlClips, urlGrabaciones)
        setSeason(temporada)
        setearClipsPagina(data)
        traerGrabaciones()
    }, [temporada])

    useEffect(() => {
        fetchClips(urlClips, urlGrabaciones)
        setearClipsPagina(data)
        traerGrabaciones()
    }, [capitulo])

   
    useEffect(() => {
        setearClipsPagina(data)
        console.log(paginaActual)
        traerGrabaciones()
    }, [paginaActual])


    
    return (
        <>
            { usuario 
                ? <> 
                    <PruebasSerie 
                        data={data} 
                        cambiarPagina={cambiarPagina} 
                        temporada={temporada} 
                        serie={serie} 
                        capitulos={capitulos} 
                        capitulo={capitulo} />      
                </>
                :  <> 
                    <Navbar/>
                    <PruebasSerie 
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

export default ContenedorPruebasSerie