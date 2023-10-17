
import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../Navbar/Navbar'
import Serie from './Serie';
import NavbarUser from '../Navbar/NavbarUser';
import { Context } from '../../context/context';
import Pagination from '@mui/material/Pagination';
import BotonPagina from '../BotonPagina/BotonPagina';
//import fetch from 'node-fetch'


const ContenedorSerie = () => {
    let { serie, temporada, usuario, capitulo } = useParams();
    const { fetchCapitulos, urlBackend_Produccion, setearClipsPagina, cambiarPagina, 
        paginaActual, paginaClips, mostrarClipsPagina, cantidadPaginasHtml,
    
    } = useContext(Context)
    
    const [data, setData] = useState([]) 
    const [totalClips, setTotalClips] = useState(0) 
    const [season, setSeason] = useState([])
    const [capitulos, setCapitulos] = useState([])
    const [totalPaginas, setTotalPaginas] = useState([]) 
    
   
    const fetchGrabaciones = async (clips) => {
        const url = `${ urlBackend_Produccion }/grabaciones/series/${ serie }/temporada/${ temporada }/${ usuario }`
        const response = await fetch(url,  
            {
                method: 'GET',
                headers: new Headers({
                    "Origin": "https://localhost:5173",
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                })
            })
        const resp= await response.json();
        if(!resp) console.log("No hay data")

        let arrayClips = clips
        //console.log(resp.grabaciones)
        arrayClips.forEach(clip => {
            resp.grabaciones.forEach((grabacion) => {
                if(clip.id ===  grabacion.id_clip) {
                    clip.grabacion = grabacion.grabacion 
                }
            })
        });
       return arrayClips
    }

    const fetchData = async () => {
        const url = `${ urlBackend_Produccion }/serie/${serie}/temporada/${temporada}/${capitulo}`

        const response = await fetch(url,  
            {
                method: 'GET',
                headers: new Headers({
                    "Origin": "https://localhost:5173",
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                })
            })
        const resp= await response.json();
        if(!resp) console.log("No hay data")
        const respuesta = await fetchGrabaciones(resp.data)
        const arrayPaginas =  cantidadPaginasHtml(resp.data)
        setTotalPaginas(arrayPaginas)

        mostrarClipsPagina(respuesta, 0, 21)
        setData(respuesta)
        return data;
    }

    const traerCapitulos = async () => {
        const dataCapitulos = await fetchCapitulos(serie)
        setCapitulos(dataCapitulos)
    }

    useEffect(() => {
        fetchData()
        traerCapitulos()
        setearClipsPagina(data)
    }, [serie])

    useEffect(() => {
        fetchData()
        setSeason(temporada)
        setearClipsPagina(data)
    }, [temporada])

    useEffect(() => {
        fetchData()
        setearClipsPagina(data)
    }, [capitulo])

   
    useEffect(() => {
        setearClipsPagina(data)
        console.log(paginaActual)
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