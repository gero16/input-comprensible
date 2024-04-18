import { useContext, useEffect, useState } from "react";
import  "./navbar.css"
import { Link as Navigate, NavLink,} from "react-router-dom";
import { Context } from "../../context/context";


const Navbar = () => {
    const [titulos, setTitulos] = useState([])
    const { fetchTitulos, urlBackend_Produccion } = useContext(Context)



    const transformarMinuscula = (texto) => {
        const nuevo = texto.toLocaleLowerCase().split(" ").join("-")
        return nuevo
    }

    useEffect(() => {
        fetchTitulos(titulos, setTitulos)
    }, [])
    
    return (
        <>
        <nav className="nav flex-between">

            <ul className="lista-navbar navbar-principal flex-center-column">
                <li className="li-nav">
                    <NavLink to={`/iniciar-sesion`} > 
                        <span className="span-link "> Iniciar Sesión <noscript></noscript> </span>
                    </NavLink>
                </li>
              
                <li className="li-nav">
                    <NavLink to={`/registro`} > 
                        <span className="span-link "> Registrarse </span>
                    </NavLink>
                </li>
                <li className="li-nav">
                    <NavLink to={`/recursos`} > 
                        <span className="span-link "> Recursos </span>
                    </NavLink>
                </li>
                <li className="li-nav">
                    <NavLink to={`/agregar-clip`} > 
                        <span className="span-link "> Agregar Clip </span>
                    </NavLink>
                </li>
                <li className="li-nav">
                    <NavLink to={`/`}> 
                        <span className="span-link "> Inicio </span>
                    </NavLink>
                </li>
            </ul>
            <ul className="lista-navbar flex-center-column">
                { titulos 
                    ? titulos.map((element, key) => {
                        return (
                            <>

                                { element[2] === "pelicula"
                                    ?    <li key={key}  className="li-nav" >
                                    
                                    <NavLink to={`/peliculas/${element[1]}`} className="flex-center-column"> 
                                        <span className="span-link"> {element[0]} </span>
                                    </NavLink>
                                    </li>
                                    : <li className="li-nav-serie" key={key} > 
                                        <span className="link-serie span-link"> {element[0]} </span> 
                                        
                                        <ul className="lista-temporadas"> 
                                            {
                                                element[3].map((elemento, key) => 
                                                <> 
                                                    <NavLink 
                                                        to={`/series/${element[1]}/${transformarMinuscula(elemento)}/${transformarMinuscula(element[4][0])}`} 
                                                        className={"temporada-serie font-medium"}

                                                        > 
                                                        <span className="link-serie span-link" key={key}>   { elemento } </span> 
                                                    
                                                    </NavLink>
                                                </>
                                                )
                                            }
                                        </ul>
                                    </li>
                                }
                            </>
                        )
                    }) 

                    : <> No hay Titulos </>
                }
            </ul>
        </nav>
        </>
    )
}
export default Navbar