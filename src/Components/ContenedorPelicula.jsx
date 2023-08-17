
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { listaScream, listaBojackVideo } from '../data/database'
import ListaVideos from '../data/videos'
import NewNavbar from './NewNavbar';
import Pelicula from './Pelicula';

const ContenedorPelicula = () => {
    let { pelicula } = useParams();
    console.log(pelicula)

    const [data, setData] = useState([])

    const fetchData = async () =>{
        if(pelicula){
            const { peliculas } = ListaVideos
            setData(peliculas)
            console.log(data)
      }
    }

    useEffect(() => {
        fetchData()
    }, [])


   
    return (
        <>

            <NewNavbar> </NewNavbar>

            <Pelicula data={data} /> 

            
        </>
    )
}

export default ContenedorPelicula