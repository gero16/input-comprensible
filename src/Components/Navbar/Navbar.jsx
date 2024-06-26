import { useContext, useEffect, useState } from "react";
import  "./navbar.css"
import { Link as Navigate, NavLink, useNavigate, useParams } from "react-router-dom";
import { Context } from "../../context/context";


const Navbar = () => {
    const [titulos, setTitulos] = useState([])
    const navigate = useNavigate()
    const { fetchTitulos, urlBackend_Produccion, evaluarSesion, usuarioSesion,setUsuarioSesion, nombreUsuario } = useContext(Context)
    
  
    let { usuario } = useParams();


    const transformarTitulo = (titulo) => {
        const nuevo = titulo.toLocaleLowerCase().split(" ").join("-")
        return nuevo
    }

    const cerrarSesion = () => {
        localStorage.removeItem("sesion");
        setUsuarioSesion(false)
        navigate("/")
    }

    useEffect(() => {
     
        evaluarSesion()
        fetchTitulos(titulos, setTitulos)
    }, [])


    
    return (
        <>
        
        <nav className="nav flex-between">  

            <ul className="lista-navbar navbar-principal flex-center-column">
                
                    { !usuarioSesion 
                        ? <> 
                        
                            <li className="li-nav">
                            <NavLink to={`/iniciar-sesion`} > 
                                <span className="span-link "> Iniciar Sesión </span>
                            </NavLink>
                            </li>
                              
                            <li className="li-nav">
                                <NavLink to={`/buscador/frases`} > 
                                    <span className="span-link "> Buscador </span>
                                </NavLink>
                            </li>
                            <li className="li-nav">
                                <NavLink to={`/registro`} > 
                                    <span className="span-link "> Registrarse </span>
                                </NavLink>
                            </li>
                            <li className="li-nav">
                                <NavLink to={`/agregar-titulo`} > 
                                    <span className="span-link "> Agregar Titulo </span>
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
                                <NavLink to={`/peliculas`}> 
                                    <span className="span-link "> Peliculas </span>
                                </NavLink>
                            </li>
                            <li className="li-nav">
                                <NavLink to={`/series`}> 
                                    <span className="span-link "> Series </span>
                                </NavLink>
                            </li>
                            <li className="li-nav">
                                <NavLink to={`/`}> 
                                    <span className="span-link "> Inicio </span>
                                </NavLink>
                            </li>
                            
                        </>
                        

                        : <>
                          
                      
                            <li>
                                <span className="span-link" onClick={() => cerrarSesion() }> Cerrar Sesion </span>
                            </li>

                            <li className="li-nav">
                                <NavLink to={`/recursos`} > 
                                    <span className="span-link "> Recursos </span>
                                </NavLink>
                            </li>
                            <li className="li-nav">
                                <NavLink to={`/buscador/frases`} > 
                                    <span className="span-link "> Buscador </span>
                                </NavLink>
                            </li>
                            <li className="li-nav">
                                <NavLink to={`/agregar-clip`} > 
                                    <span className="span-link "> Agregar Clip </span>
                                </NavLink>
                            </li>
                            <li className="li-nav">
                                <NavLink to={`/usuario/${ nombreUsuario }/clips/dificultad/principiante`}> 
                                    <span className="span-link "> Dificultad </span>
                                </NavLink>
                            </li>
                            <li className="li-nav">
                                <NavLink to={`/agregar-titulo`} > 
                                    <span className="span-link "> Agregar Titulo </span>
                                </NavLink>
                            </li>
                            <li className="li-nav">
                                <NavLink to={`/usuario/${ nombreUsuario }/peliculas`}> 
                                    <span className="span-link "> Peliculas </span>
                                </NavLink>
                            </li>
                            <li className="li-nav">
                                <NavLink to={`/usuario/${ nombreUsuario }/series`}> 
                                    <span className="span-link "> Series </span>
                                </NavLink>
                            </li>
                            <li className="li-nav">
                                <NavLink to={`/usuario/${ nombreUsuario }`}> 
                                    <span className="span-link "> Inicio </span>
                                </NavLink>
                            </li>
                    </>
                }

            </ul>
        </nav>
        </>
    )
}
export default Navbar