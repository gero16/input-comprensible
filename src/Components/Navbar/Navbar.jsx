import { useContext, useEffect, useState } from "react";
import  "./navbar.css"
import { Link as Navigate, NavLink, useNavigate, useParams } from "react-router-dom";
import { Context } from "../../context/context";


const Navbar = () => {
    const [titulos, setTitulos] = useState([])
    const { fetchTitulos, urlBackend_Produccion } = useContext(Context)

    const seleccionarSerie = (e) => {
       
       if(e.target.classList.contains("link-serie")) {
           e.target.nextSibling.classList.toggle("inactive")
           e.target.nextSibling.classList.toggle("lista-temporadas")
       }
       if(e.target.classList.contains("temporada-serie")) {
        console.log(e.target.parentNode.parentNode)
        e.target.parentNode.parentNode.classList.toggle("inactive")
        e.target.parentNode.parentNode.classList.toggle("lista-temporadas")
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
                            <li key={key}  className="li-nav" onClick={(e)=> seleccionarSerie(e)} >

                                { element[2] === "pelicula"
                                    ? <NavLink to={`/peliculas/${element[1]}`} className="flex-center-column"> 
                                        <span className="span-link"> {element[0]} </span>
                                    </NavLink>
                            
                                    : <> 
                                        <span className="link-serie span-link"> {element[0]} </span> 
                                        <ul className="inactive"> 
                                        {
                                            element[3].map((elemento, key) => 
                                            <li className="li-nav" key={key} > 
                                                <NavLink 
                                                    to={`/series/${element[1]}/${transformarMinuscula(elemento)}/${transformarMinuscula(element[4][0])}`} 
                                                    className={"temporada-serie"}
                                                    > 
                                                    { elemento }
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

                    : <> No hay Titulos </>
                }
            </ul>
        </nav>
        </>
    )
}
export default Navbar