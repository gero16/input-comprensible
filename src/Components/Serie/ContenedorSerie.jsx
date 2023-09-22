
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import NewNavbar from '../Navbar/NewNavbar';
import Serie from './Serie';
//import fetch from 'node-fetch'

const ContenedorSerie = () => {
    let { serie, temporada } = useParams();
    const urlBackend = import.meta.env.VITE_URL_BACKEND
    const urlBackend2 = import.meta.env.VITE_URL_BACKEND2

    const [data, setData] = useState([])
    const [season, setSeason] = useState([])

    const fetchData = async () => {
        const url = `${urlBackend}/serie/${serie}/temporada/${temporada}`

        const response = await fetch(url,  
            {
                method: 'GET',
                headers: new Headers({
                    "Origin": "https://localhost:5173",
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                })
            })

        console.log(response)
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

            <Serie data={data} temporada={temporada} serie={serie}/>  
        </>
    )
}

export default ContenedorSerie