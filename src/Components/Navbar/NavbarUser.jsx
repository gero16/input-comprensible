import { useEffect, useState } from "react";
import  "./navbar.css"
import { Link as Navigate, NavLink, useParams } from "react-router-dom";


const NavbarUser = () => {
    const [data, setData] = useState([])
    let { usuario } = useParams();

    const urlBackend_Produccion = import.meta.env.VITE_URL_BACKEND_PRODUCCION
    const urlBackend_Desarrollo = import.meta.env.VITE_URL_BACKEND_DESARROLLO

    const seleccionarSerie = (e) => {
       if(!e.target.classList.contains("temporada-serie")) {
           e.target.nextSibling.classList.toggle("inactive")
           e.target.nextSibling.classList.toggle("lista-temporadas")
       }
    }

    const transformarTitulo = (titulo) => {
        const nuevo = titulo.toLocaleLowerCase().split(" ").join("-")
        return nuevo
    }

    let arrayTitulos = []
    const fetchData = async () => {
        const url = `${urlBackend_Desarrollo}/titulos`
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
        //console.log(resp.data)
        if(!resp) console.log("No hay data")

        resp.data.forEach(element => {
            const titulo = [element.titulo, element.subtitulo, element.categoria, element.temporada]
            arrayTitulos.push(titulo)
           // console.log(arrayTitulos)
        });

        setData(arrayTitulos)
        //console.log(arrayTitulos)
        return data
    }
    useEffect(() => {
        fetchData()
    }, [])
    
    return (
        <>
        <nav className="flex-between">

            <ul className="lista-navbar flex-center-column">
                <li className="p-2 li-nav">
                    <NavLink to={`/usuario`} className="flex-center-column"> 
                        <span className="span-link "> Agregar Clip </span>
                    </NavLink>
                </li>
                {
                    data 
                        ? 
                        data.map((element, key) => {
                            return (
                            <li key={key}  onClick={(e)=> seleccionarSerie(e)} >
                              
                                    {
                                        element[2] === "pelicula"
                                        ? <NavLink to={`/usuario/${usuario}/peliculas/${element[1]}`} className="flex-center-column"> 
                                            <span className="span-link "> {element[0]} </span>
                                        </NavLink>
                                
                                        :   
                                        <> 
                                            <span> {element[0]} </span> 
                                            <ul className="inactive"> 
                                            {
                                               element[3].map((elemento, key) => 
                                                <li key={key}> 
                                                    <NavLink to={`/usuario/${usuario}/series/${element[1]}/${transformarTitulo(elemento)}`} > 

                                                        <span className="temporada-serie"> {elemento} </span>
                                                        
                                                    </NavLink>
                                                </li>
                                                )
                                            }
                                            </ul>
                                        </>
                                    }
                                      
                                  
                           
                            </li>

                            )
                        }) 
                        : 
                        <> No hay Titulos </>
                }
                
            </ul>
        </nav>
        </>
    )
}
export default NavbarUser