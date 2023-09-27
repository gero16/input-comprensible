
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import NewNavbar from '../Navbar/NewNavbar';
import Pelicula from './Pelicula';
import NavbarUser from '../Navbar/NavbarUser';

const ContenedorPelicula = () => {
    let { pelicula, usuario } = useParams();
    const urlBackend_Produccion = import.meta.env.VITE_URL_BACKEND_PRODUCCION
    const urlBackend_Desarrollo = import.meta.env.VITE_URL_BACKEND_DESARROLLO
  
    let [data, setData] = useState([])

    const fetchGrabaciones = async (datos) => {
        const url = `http://localhost:3000/grabaciones/${pelicula}/${usuario}`
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

        console.log(resp)

        let arrayClips = datos
        console.log(arrayClips)
        arrayClips.forEach(clip => {
            resp.grabaciones.forEach((grabacion) => {
                if(clip.id ===  grabacion.id_clip) {
                    //arrayGrabaciones.push(element.grabacion)
                    console.log("Hay grabacion para el clip")
                    //console.log(clip)
                   //console.log(grabacion)
                    clip.grabacion = grabacion.grabacion 
                }
            })

        });
        
       console.log(arrayClips)
       return arrayClips
    }
    const fetchData = async () =>{
        const response = await fetch(`${ urlBackend_Desarrollo }/pelicula/${ pelicula }`);
        const resp= await response.json();
        if(!resp) console.log("No hay data")

        const respuesta = await fetchGrabaciones(resp.data)
        console.log(respuesta)

        setData(respuesta)
        return data;
    }

    useEffect(() => {
        fetchData() ;
        
    }, [pelicula])
    
    return (
        <>
            {
                usuario ?
                <> 
                    <NavbarUser />
                    <Pelicula data={data} />      
                </>
                :  <> 
                <NewNavbar/>
                <Pelicula data={data}  />      
                </>
            }
          
           
        </>
    )
}

export default ContenedorPelicula