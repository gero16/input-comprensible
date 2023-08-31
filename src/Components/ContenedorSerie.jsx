
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ListaVideos from '../data/videos'
import NewNavbar from './NewNavbar';
import Serie from './Serie';

const ContenedorSerie = () => {
    let { serie, temporada } = useParams();

    const [data, setData] = useState([])

    const fetchData = async () => {
        let numTemporada = temporada.split("-")
        console.log(temporada)

        const { series } = ListaVideos
        const serieElegida = series.find((element) => element.subtitulo === serie )

        if(serieElegida.temporadas)  {
            const result = serieElegida.temporadas.forEach((e) => {
                if(e[`${numTemporada[0]}_${numTemporada[1]}`]) {
                    serieElegida["temporada_seleccionada"] = e[`${numTemporada[0]}_${numTemporada[1]}`]
                }
                console.log(serieElegida)
                
            })
        }

        setData(serieElegida)
        return data;
    }

    useEffect(() => {
        fetchData()
    }, [serie])

    useEffect(() => {
        fetchData()
    }, [temporada])

 
    return (
        <>
            <NewNavbar> </NewNavbar>

            <Serie data={data} temporada={temporada}/>  
        </>
    )
}

export default ContenedorSerie