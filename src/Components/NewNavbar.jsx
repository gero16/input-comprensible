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
                <li className="p-2 li-nav">
                    <NavLink to={`/agregar-clip`} className="flex-center-column"> 
                        <span className="span-link "> Agregar Clip </span>
                    </NavLink>
                </li>

                <li className="serie li-nav" onClick={(e)=> seleccionarSerie(e)}> 
                    <span className="serie span-link"> Peaky Blinders  </span>

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
                
                <li className="serie li-nav" onClick={(e)=> seleccionarSerie(e)}> 
   
                    <span className="serie span-link"> Bojack Horseman </span>
                   
                    <ul className="inactive">
                        <li>
                            <NavLink to={`/series/bojack-horseman/temporada-1`} > 
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

                <li className="li-nav">
                    <NavLink to={`/peliculas/shrek-2`}> 
                        <span className="span-link"> Shrek 2 </span>
                    </NavLink>
                </li>

                <li className="li-nav">
                    <NavLink to={`/peliculas/scream-2022`}> 
                        <span className="span-link"> Scream (2022)</span>
                    </NavLink>
                </li>

                <li className="li-nav">
                    <NavLink to={`/`}> 
                        <span className="span-link"> Inicio </span>
                    </NavLink>
                </li>
               
                
            </ul>
        </nav>
        </>
    )
}
export default NewNavbar