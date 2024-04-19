import { useContext, useEffect, useState } from "react";
import  "./ListaPeliculas.css"
import { Link as Navigate, NavLink,} from "react-router-dom";
import { Context } from "../../context/context";
import Navbar from "../Navbar/Navbar";

const ListaPeliculas = () => {
    const [titulos, setTitulos] = useState([])
    const { fetchTitulosPelicula,fetchTitulos, urlBackend_Produccion, traerImagenFomato } = useContext(Context)

    
    useEffect(() => {
        fetchTitulosPelicula(titulos, setTitulos)
   
        console.log(titulos)

    }, [])

    console.log(titulos)

    return (
        <>
            <Navbar> </Navbar>
            <section className="flex-center gap-30 section-peliculas"> 
            
            { titulos ?
                titulos.map((element, key) => {
                    console.log(element)
                    return (
                        <article key={key} className="article-pelicula"> 
                            <img src={element[5]} alt="" className="img-peliculas" title={element[0]}/>
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