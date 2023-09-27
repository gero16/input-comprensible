
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

        //console.log(response)
        const resp= await response.json();
        //console.log(resp)

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