import { useContext, useEffect, useState } from "react";
import  "./ListaPeliculas.css"
import { Link as Navigate, NavLink, useParams,} from "react-router-dom";
import { Context } from "../../context/context";
import Navbar from "../Navbar/Navbar";

const ListaPeliculas = () => {
    const [titulos, setTitulos] = useState([])
    const { fetchTitulosPelicula,fetchTitulos, urlBackend_Produccion, traerImagenFomato, evaluarSesion, nombreUsuario } = useContext(Context)
    const { usuario } = useParams()
    
    useEffect(() => {
        fetchTitulosPelicula(titulos, setTitulos)
   
        console.log(titulos)
        evaluarSesion()
    }, [])

    let url;
    const linkDinamico = (pelicula) => {
        if(usuario) url = `/usuario/${ usuario }/peliculas/${ pelicula } `
        if(!usuario) url = `/peliculas/${ pelicula }/ `
        return url
    }

    return (
        <>
            <Navbar> </Navbar>
            <section className="flex-center gap-30 section-peliculas"> 
            
            { titulos ?
                titulos.map((element, key) => {
                    return (
                        
                        <NavLink to={ linkDinamico(element[1] )} className="link-pelicula" > 
                            <article key={key} className="article-pelicula"> 
                                <img src={element[5]} alt={`imagen portada de la pelicula ${ element[0] }`} className="img-pelicula" title={ element[0] }/>
                                <h2 className="h2-lista-pelicula"> { element[0] } </h2>
                            </article>
                        </NavLink> 
                    )
                }) 
                : <> </>
            }
            </section>
        </>
    )
}

export default ListaPeliculas