
import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../Navbar/Navbar'
import Serie from './Serie';
import NavbarUser from '../Navbar/NavbarUser';
import { Context } from '../../context/context';
import Pagination from '@mui/material/Pagination';
//import fetch from 'node-fetch'

const ContenedorSerie = () => {
    let { serie, temporada, usuario, capitulo } = useParams();
    const { fetchCapitulos, urlBackend_Produccion, setearClipsPagina, cambiarPagina, 
        paginaActual, paginaClips, mostrarClipsPagina  } = useContext(Context)
    
    const [data, setData] = useState([])
    const [season, setSeason] = useState([])
    const [capitulos, setCapitulos] = useState([])
    
   
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
        console.log(respuesta)

        mostrarClipsPagina(respuesta, 0, 19)
            
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
        console.log(paginaClips)
    }, [paginaActual])


    return (
        <>
            { usuario 
                ? <> 
                    <Serie data={data} cambiarPagina={cambiarPagina} temporada={temporada} serie={serie} capitulos={capitulos} capitulo={capitulo} />      
                </>
                :  <> 
                    <Navbar/>
                    <Serie data={paginaClips} temporada={temporada} serie={serie} capitulos={capitulos} capitulo={capitulo}/>    

                    <footer id='footer'>
                        <button onClick={() => cambiarPagina(1)}>  1  </button>
                        <button onClick={() => cambiarPagina(2)}>  2  </button>
                        <button onClick={() => cambiarPagina(3)}>  3  </button>
                    </footer>
                
                </>
            } 
        </>
    )
}

export default ContenedorSerie