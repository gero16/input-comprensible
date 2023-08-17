import  "./navbar.css"
import { Link as Navigate, NavLink } from "react-router-dom";


const NewNavbar = () => {

    
    return (
        <>
        <nav className="flex-between">

            <ul className="lista-navbar flex-center-column">
                
                <li className="p-2 li-nav project">
                    <NavLink to={`/series/bojack`} className="flex-center-column scream"> 
                        <span> Bojack Horseman </span>
                    </NavLink>
                </li>

                <li className="p-2 li-nav project">
                    <NavLink to={`/peliculas/shrek2`} className="flex-center-column scream"> 
                        <span> Shrek 2 </span>
                    </NavLink>
                </li>

                <li className="p-2 li-nav project">
                    <NavLink to={`/peliculas/prueba`} className="flex-center-column scream"> 
                        <span> Scream (2022)</span>
                    </NavLink>
                </li>

                <li className="p-2 li-nav project">
                    <NavLink to={`/`} className="flex-center-column scream"> 
                        <span> Inicio </span>
                    </NavLink>
                </li>
               
                
            </ul>
        </nav>
        </>
    )
}
export default NewNavbar