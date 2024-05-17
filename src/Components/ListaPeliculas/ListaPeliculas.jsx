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
            {titulos ? 
                titulos.map((element, key) => {
                    console.log(element)
                    return (
                        <article className="container-pelicula" key={key}>
                            <NavLink to={linkDinamico(element[1])} className="link-pelicula">
                                <picture>
                                    <source srcSet={element[5]} media="(min-width: 1550px)" width="500" height="300"/>
                                    <source srcSet={element[7]} media="(min-width: 800px)" width="380" height="210"/>
                                    <img 
                                        src={element[6]} alt={`imagen portada de la pelicula ${element[1]}`} 
                                        className="img-pelicula" title={element[0]}
                                        width="300" height="180" loading="lazy" decoding="async" 
                                    />
                                    </picture>
                                </NavLink>
                                <h2 className="h2-lista-pelicula">{element[0]}</h2>
                            </article>
                        )
                    }) 
                    : <> </>
                }


            </section>
        </>
    )
}

export default ListaPeliculas