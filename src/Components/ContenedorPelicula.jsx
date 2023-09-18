
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ListaVideos from '../data/videos'
import NewNavbar from './NewNavbar';
import Pelicula from './Pelicula';

const ContenedorPelicula = () => {
    let { pelicula } = useParams();

    const [data, setData] = useState([])

    // LA IDEA ES QUE ESTO SE EJECUTE SOLO UNA PRIMERA VEZ PARA LLENAR LOCALSTORAGE

    const fetchData = () =>{
        const { peliculas } = ListaVideos
        const encontrarPelicula = peliculas.find((e) => e.subtitulo == pelicula)
        setData(encontrarPelicula)
        return data
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