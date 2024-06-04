import { useContext, useEffect, useState } from "react";
import  "./ListaPeliculas.css"
import { Link as Navigate, NavLink, useParams,} from "react-router-dom";
import { Context } from "../../context/context";
import Navbar from "../Navbar/Navbar";

const ListaPeliculas = () => {
    const [titulos, setTitulos] = useState([])
    const [esAdmin, setEsAdmin] = useState(false)
    const [modoEditar, setModoEditar] = useState(false)
    const { fetchTitulosPelicula,fetchTitulos, urlBackend_Produccion, traerImagenFomato, evaluarSesion, nombreUsuario } = useContext(Context)
    const { usuario } = useParams()
    
    useEffect(() => {
        fetchTitulosPelicula(titulos, setTitulos)
   
        console.log(titulos)
        const resultado = evaluarSesion()
        console.log(resultado)
        if(resultado.rol === "ADMIN") {
            setEsAdmin(true)
            setModoEditar(true)
        }
        if(resultado.rol !== "USER"  || !resultado.rol) setEsAdmin(false)
    }, [])

    let url;
    const linkDinamico = (pelicula) => {
        if(usuario) url = `/usuario/${ usuario }/peliculas/${ pelicula } `
        if(!usuario) url = `/peliculas/${ pelicula }/ `
        if(modoEditar) url = `/usuario/${ usuario }/peliculas/${ pelicula }/editar `
        return url
    }

    return (
        <>
            <Navbar> </Navbar>

            { esAdmin 
                ? <h3> </h3>
                : <h3 className="h3-modo-editar" onClick={ ((e)=> setModoEditar(!modoEditar)) } > { modoEditar ?  "Desactivar Modo Edición" : "Activar Modo Edicion"}  </h3>  
            }
            <section className="flex-center gap-30 section-peliculas"> 
          
    
            { titulos 
                ? titulos.map((element, key) => {
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