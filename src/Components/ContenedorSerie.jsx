
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ListaVideos from '../data/videos'
import NewNavbar from './NewNavbar';
import Serie from './Serie';
//import fetch from 'node-fetch'

const ContenedorSerie = () => {
    let { serie, temporada } = useParams();
    const urlBackend = import.meta.env.VITE_URL_BACKEND

    const [data, setData] = useState([])
    const [season, setSeason] = useState([])

    const fetchData = async () => {
        const response = await fetch(`${urlBackend}/serie/${serie}/temporada/${temporada}`);
        const resp= await response.json();
        console.log(resp)
        if(!resp) console.log("No hay data")

        setData(resp.data)
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
            <NewNavbar> </NewNavbar>

            <Serie data={data} temporada={temporada}/>  
        </>
    )
}

export default ContenedorSerie