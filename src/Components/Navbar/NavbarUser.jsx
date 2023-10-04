import { useContext, useEffect, useState } from "react";
import  "./Navbar.css"
import { Link as Navigate, NavLink, useNavigate, useParams } from "react-router-dom";
import { Context } from "../../context/context";


const NavbarUser = () => {
    const [titulos, setTitulos] = useState([])
    const navigate = useNavigate()
    const { fetchTitulos, urlBackend_Produccion } = useContext(Context)
    
    let { usuario } = useParams();

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

    const cerrarSesion = () => {
        localStorage.removeItem("sesion");
        navigate("/")
    }

    useEffect(() => {
        fetchTitulos(titulos, setTitulos)
    }, [])
    
    return (
        <>
        <nav className="navbar flex-between">

            <ul className="lista-navbar flex-center-column">
                <li className="p-2 li-nav">
                    <NavLink to={`/agregar-clip`} className="flex-center-column"> 
                        <span className="span-link "> Agregar Clip </span>
                    </NavLink>
                </li>
                <li className="p-2 li-nav" onClick={(e) => cerrarSesion() }>
                    <span className="span-link "> Cerrar Sesión </span>
                   
                </li>
                {
                    titulos 
                        ? 
                        titulos.map((element, key) => {
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