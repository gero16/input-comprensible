
import { Link as Navigate, NavLink, Outlet as Page, useLocation, useParams } from "react-router-dom";
import "../Components/Index/Index.css"



const Pruebas = () => {
    let { usuario } = useParams();
    return (
        <>
            <h1> Pruebas </h1>

            <main className="flex">

                <section className="flex-center section-pruebas"> 
            
                    <NavLink to={`/pruebas/house-of-the-dragon/temporada-1-capitulo-1`}> 
                        <h2> Pruebas Serie </h2> 
                        <img 
                            src="https://i0.wp.com/lopezdoriga.com/wp-content/uploads/2015/09/Serie.jpg?w=2048&ssl=1"  
                            className='image-conversations' 
                            alt="" 
                            width={"300"}
                            height={"200"}
                            />
                    </NavLink>
                   
                </section>
                <section className="flex-center section-pruebas"> 
                    <NavLink to={`/pruebas/shrek-2/geronicola`} > 
                        <h2> Pruebas Pelicula </h2>
                       
                        <img 
                            src="https://cdn.hobbyconsolas.com/sites/navi.axelspringer.es/public/media/image/2016/06/607612-proximas-peliculas-pixar-despues-buscando-dory.jpg?tf=1200x"  
                            className='image-conversations' 
                            alt=""
                            width={"300"}
                            height={"200"}
                            />
                    </NavLink>
                </section>

            </main> 
        </>
    )
}

export default Pruebas