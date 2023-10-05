
import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import Pelicula from './Pelicula';
import NavbarUser from '../Navbar/NavbarUser';
import { Context } from '../../context/context';

const ContenedorPelicula = () => {
    let { pelicula, usuario } = useParams();
    const { urlBackend_Produccion, setearClipsPagina, cambiarPagina, 
        paginaActual, paginaClips, mostrarClipsPagina  } = useContext(Context)
    let [data, setData] = useState([])

    const fetchGrabaciones = async (clips) => {
        const url = `${ urlBackend_Produccion }/grabaciones/${pelicula}/${usuario}`
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
        arrayClips.forEach(clip => {
            resp.grabaciones.forEach((grabacion) => {
                if(clip.id ===  grabacion.id_clip) {
                    clip.grabacion = grabacion.grabacion 
                }
            })
        });
        
  
       return arrayClips
    }
    const fetchData = async () =>{
        const response = await fetch(`${ urlBackend_Produccion }/pelicula/${ pelicula }`);
        const resp= await response.json();
        if(!resp) console.log("No hay data")
        const respuesta = await fetchGrabaciones(resp.data)
        console.log(respuesta)
        mostrarClipsPagina(respuesta, 0, 19)  
        setData(respuesta)
        return data;
    }

    useEffect(() => {
        fetchData();
        setearClipsPagina(data)
    }, [pelicula])
    
    useEffect(() => {
        setearClipsPagina(data)
    }, [paginaActual])
    return (
        <>
            {
                usuario 
                ? <> <Pelicula data={data} /> </>
                : <> 
                    <Navbar/>
                    <Pelicula data={paginaClips}  />      
                </>
            }
            <footer id='footer'>
                <button onClick={() => cambiarPagina(1)}>  1  </button>
                <button onClick={() => cambiarPagina(2)}>  2  </button>
                <button onClick={() => cambiarPagina(3)}>  3  </button>
            </footer>
        </>
    )
}

export default ContenedorPelicula