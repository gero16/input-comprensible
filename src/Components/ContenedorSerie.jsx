
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ListaVideos from '../data/videos'
import NewNavbar from './NewNavbar';
import Serie from './Serie';

const ContenedorSerie = () => {
    let { serie, temporada } = useParams();

    console.log(temporada)

    const [data, setData] = useState([])

    const fetchData = async () =>{
          if(serie){
            const { series } = ListaVideos
            const serieElegida = series.find((element) => element.subtitulo === serie )
            setData(serieElegida)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])


   
    return (
        <>

            <NewNavbar> </NewNavbar>

            <Serie data={data} temporada={temporada}/> 

            
        </>
    )
}

export default ContenedorSerie