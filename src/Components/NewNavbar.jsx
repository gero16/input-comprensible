import { useEffect } from "react";
import  "./navbar.css"
import { Link as Navigate, NavLink } from "react-router-dom";


const NewNavbar = () => {

    const seleccionarSerie = (e) => {
       console.log(e.target.nextSibling.classList.toggle("inactive"))
       e.target.nextSibling.classList.toggle("inactive")
       e.target.nextSibling.classList.toggle("lista-temporadas")
    }
    useEffect(() => {

    }, [])
    
    return (
        <>
        <nav className="flex-between">

            <ul className="lista-navbar flex-center-column">
                
                <li className="serie" onClick={(e)=> seleccionarSerie(e)}> 
                    <span className="serie"> Bojack Horseman </span>

                    <ul className="inactive">
                        <li>
                            <NavLink to={`/series/bojack/temporada1`} > 
                                <span className=""> Temporada 1 </span>
                            </NavLink>
                        </li>
                        <li>      
                            <NavLink to={`/series/bojack/temporada2`}> 
                                <span  className=""> Temporada 2 </span>
                            </NavLink>
                        </li>
                        <li>      
                            <NavLink to={`/series/bojack/temporada3`}> 
                                <span  className=""> Temporada 3 </span>
                            </NavLink>
                        </li>
                    </ul>
               
                </li>

                <li className="top">
                    <NavLink to={`/peliculas/shrek-2`}> 
                        <span> Shrek 2 </span>
                    </NavLink>
                </li>

                <li className="top">
                    <NavLink to={`/peliculas/scream-5`}> 
                        <span> Scream (2022)</span>
                    </NavLink>
                </li>

                <li className="top">
                    <NavLink to={`/`}> 
                        <span> Inicio </span>
                    </NavLink>
                </li>
               
                
            </ul>
        </nav>
        </>
    )
}
export default NewNavbar