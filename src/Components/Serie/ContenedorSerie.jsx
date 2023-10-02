
import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../Navbar/Navbar'
import Serie from './Serie';
import NavbarUser from '../Navbar/NavbarUser';
import { Context } from '../../context/context';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
//import fetch from 'node-fetch'

const ContenedorSerie = () => {
    let { serie, temporada, usuario, capitulo } = useParams();
    const { fetchCapitulos } = useContext(Context)
    
    const urlBackend_Produccion = import.meta.env.VITE_URL_BACKEND_PRODUCCION
    const urlBackend_Desarrollo = import.meta.env.VITE_URL_BACKEND_DESARROLLO
    
    const [data, setData] = useState([])
    const [season, setSeason] = useState([])
    const [capitulos, setCapitulos] = useState([])
    const [capituloSeleccionado, setCapituloSeleccionado] = useState([])
 
    const fetchGrabaciones = async (clips) => {
        const url = `http://localhost:3000/grabaciones/series/${serie}/temporada/${temporada}/${usuario}`
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
        const url = `${urlBackend_Desarrollo}/serie/${serie}/temporada/${temporada}/${capitulo}`

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
        //console.log(respuesta)
            
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
        //setCapituloSeleccionado(capitulo)
    }, [serie])

    useEffect(() => {
        fetchData()
        setSeason(temporada)
    }, [temporada])

    useEffect(() => {
        fetchData()
    }, [capitulo])
 

    return (
        <>
            {
                usuario ?
                <> 
                    <NavbarUser />
                    <Serie data={data} temporada={temporada} serie={serie} capitulos={capitulos} />      
                </>
                :  <> 
                <Navbar/>
                <Serie data={data} temporada={temporada} serie={serie} capitulos={capitulos}/>    

                <footer id='footer'>
                    <Pagination count={6} variant="outlined" />
               
                </footer>
               
                </>
            } 
        </>
    )
}

export default ContenedorSerie