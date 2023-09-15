import { useEffect } from "react";
import  "./navbar.css"
import { Link as Navigate, NavLink } from "react-router-dom";


const NewNavbar = () => {

    const seleccionarSerie = (e) => {
       if(!e.target.classList.contains("temporada-serie")) {
           e.target.nextSibling.classList.toggle("inactive")
           e.target.nextSibling.classList.toggle("lista-temporadas")

       }
    }
    useEffect(() => {

    }, [])
    
    return (
        <>
        <nav className="flex-between">

            <ul className="lista-navbar flex-center-column">
                <li className="p-2 li-nav project">
                    <NavLink to={`/agregar-clip`} className="flex-center-column scream"> 
                        <span> Agregar Clip </span>
                    </NavLink>
                </li>

                <li className="serie" onClick={(e)=> seleccionarSerie(e)}> 
                    <span className="serie"> Peaky Blinders  </span>

                    <ul className="inactive">
                        <li>
                            <NavLink to={`/series/peaky-blinders/temporada-1`} > 
                                <span className="temporada-serie"> Temporada 1 </span>
                            </NavLink>
                        </li>
                        <li>      
                            <NavLink to={`/series/peaky-blinders/temporada-2`}> 
                                <span className="temporada-serie"> Temporada 2 </span>
                            </NavLink>
                        </li>
                    </ul>
               
                </li>
                
                <li className="serie" onClick={(e)=> seleccionarSerie(e)}> 
                    <span className="serie"> Bojack Horseman </span>

                    <ul className="inactive">
                        <li>
                            <NavLink to={`/series/bojack/temporada-1`} > 
                                <span className="temporada-serie"> Temporada 1 </span>
                            </NavLink>
                        </li>
                        <li>      
                            <NavLink to={`/series/bojack/temporada-2`}> 
                                <span className="temporada-serie"> Temporada 2 </span>
                            </NavLink>
                        </li>
                        <li>      
                            <NavLink to={`/series/bojack/temporada-3`}> 
                                <span  className="temporada-serie"> Temporada 3 </span>
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