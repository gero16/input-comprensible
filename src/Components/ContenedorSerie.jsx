
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ListaVideos from '../data/videos'
import NewNavbar from './NewNavbar';
import Serie from './Serie';
//import fetch from 'node-fetch'

const ContenedorSerie = () => {
    let { serie, temporada } = useParams();

    const [data, setData] = useState([])
    const [season, setSeason] = useState([])

    const fetchData = async () => {

        const response = await fetch(`http://localhost:3000/serie/${serie}/temporada/${temporada}`);
        const resp= await response.json();
        console.log(resp)
        if(!resp) console.log("No hay data")

            /*
        let numTemporada = temporada.split("-")
 

        const { series } = ListaVideos
        const serieElegida = series.find((element) => element.subtitulo === serie )

        if(serieElegida.temporadas)  {
            const result = serieElegida.temporadas.forEach((e) => {
                if(e[`${numTemporada[0]}_${numTemporada[1]}`]) {
                    serieElegida["temporada_seleccionada"] = e[`${numTemporada[0]}_${numTemporada[1]}`]
                }  
            })
        }

        
        */
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