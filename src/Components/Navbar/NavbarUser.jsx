import { useContext, useEffect, useState } from "react";
import  "./navbar.css"
import { Link as Navigate, NavLink, useNavigate, useParams } from "react-router-dom";
import { Context } from "../../context/context";


const NavbarUser = () => {
    const [titulos, setTitulos] = useState([])
    const navigate = useNavigate()
    const { fetchTitulos, urlBackend_Produccion } = useContext(Context)
    
    let { usuario } = useParams();

    const [esAdmin, setEsAdmin] = useState(false)

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
        const sesion = JSON.parse(localStorage.getItem("sesion"))
        console.log(sesion)
        if(sesion.rol === "ADMIN") setEsAdmin(true)
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

            </ul>
            </nav>
        </>
    )
}
export default NavbarUser