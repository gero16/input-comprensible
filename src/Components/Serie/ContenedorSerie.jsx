
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import NewNavbar from '../Navbar/NewNavbar';
import Serie from './Serie';
import NavbarUser from '../Navbar/NavbarUser';
//import fetch from 'node-fetch'

const ContenedorSerie = () => {
    let { serie, temporada, usuario } = useParams();
    const urlBackend_Produccion = import.meta.env.VITE_URL_BACKEND_PRODUCCION
    const urlBackend_Desarrollo = import.meta.env.VITE_URL_BACKEND_DESARROLLO

    const [data, setData] = useState([])
    const [season, setSeason] = useState([])

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
        console.log(resp.grabaciones)
        arrayClips.forEach(clip => {
            resp.grabaciones.forEach((grabacion) => {
                if(clip.id ===  grabacion.id_clip) {
                    clip.grabacion = grabacion.grabacion 
                }
            })
        });

        console.log(arrayClips)
       return arrayClips
    }

    const fetchData = async () => {
        const url = `${urlBackend_Desarrollo}/serie/${serie}/temporada/${temporada}`

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

        setData(respuesta)
        return data;
    }

    useEffect(() => {
        fetchData()
    }, [serie])

    useEffect(() => {
        fetchData()
        setSeason(temporada)
    }, [temporada])

 
    return (
        <>
            {
                usuario ?
                <> 
                    <NavbarUser />
                    <Serie data={data} temporada={temporada} serie={serie} />      
                </>
                :  <> 
                <NewNavbar/>
                <Serie data={data} temporada={temporada} serie={serie} />      
                </>
            } 
        </>
    )
}

export default ContenedorSerie