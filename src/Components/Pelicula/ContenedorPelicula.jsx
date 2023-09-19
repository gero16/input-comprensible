
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import NewNavbar from '../Navbar/NewNavbar';
import Pelicula from './Pelicula';

const ContenedorPelicula = () => {
    let { pelicula } = useParams();
    const urlBackend = import.meta.env.VITE_URL_BACKEND
    const [data, setData] = useState([])

    // LA IDEA ES QUE ESTO SE EJECUTE SOLO UNA PRIMERA VEZ PARA LLENAR LOCALSTORAGE

    const fetchData = async () =>{
        
        const response = await fetch(`${ urlBackend }/pelicula/${ pelicula }`);
        const resp= await response.json();
        console.log(resp)
        if(!resp) console.log("No hay data")

        setData(resp.data)
        return data;
    }

    useEffect(() => {
        fetchData() ;
    }, [pelicula])

    

   
    return (
        <>
            <NewNavbar> </NewNavbar>

            <Pelicula data={data} />      
        </>
    )
}

export default ContenedorPelicula