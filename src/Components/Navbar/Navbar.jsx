import { useContext, useEffect, useState } from "react";
import  "./navbar.css"
import { Link as Navigate, NavLink, useNavigate, useParams } from "react-router-dom";
import { Context } from "../../context/context";


const Navbar = () => {
    const [titulos, setTitulos] = useState([])
    const navigate = useNavigate()
    const { fetchTitulos } = useContext(Context)

    const urlBackend_Produccion = import.meta.env.VITE_URL_BACKEND_PRODUCCION
    const urlBackend_Desarrollo = import.meta.env.VITE_URL_BACKEND_DESARROLLO

    const seleccionarSerie = (e) => {
       if(!e.target.classList.contains("temporada-serie")) {
           e.target.nextSibling.classList.toggle("inactive")
           e.target.nextSibling.classList.toggle("lista-temporadas")
       }
    }

    const transformarMinuscula = (texto) => {
        const nuevo = texto.toLocaleLowerCase().split(" ").join("-")
        return nuevo
    }

    useEffect(() => {
        fetchTitulos(titulos, setTitulos)
    }, [])
    
    return (
        <>
        <nav className="flex-between">

            <ul className="lista-navbar flex-center-column">
                <li className="p-2 li-nav">
                    <NavLink to={`/agregar-clip`} className="flex-center-column"> 
                        <span className="span-link "> Agregar Clip </span>
                    </NavLink>
                </li>
                <li className="p-2 li-nav">
                    <NavLink to={`/iniciar-sesion`} className="flex-center-column"> 
                        <span className="span-link "> Iniciar Sesión <noscript></noscript> </span>
                    </NavLink>
                </li>
                <li className="p-2 li-nav">
                    <NavLink to={`/registro`} className="flex-center-column"> 
                        <span className="span-link "> Registrarse </span>
                    </NavLink>
                </li>

                {
                    titulos 
                        ? 
                        titulos.map((element, key) => {
                            return (
                            <li key={key}  onClick={(e)=> seleccionarSerie(e)} >
    
                                    {
                                        element[2] === "pelicula"
                                        ? <NavLink to={`/peliculas/${element[1]}`} className="flex-center-column"> 
                                            <span className="span-link "> {element[0]} </span>
                                        </NavLink>
                                
                                        :   
                                        <> 
                                            <span> {element[0]} </span> 
                                            <ul className="inactive"> 
                                            {
                                               element[3].map((elemento, key) => 
                                                <li key={key}> 
                                                    <NavLink to={`/series/${element[1]}/${transformarMinuscula(elemento)}/${transformarMinuscula(element[4][0])}`} > 
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
export default Navbar