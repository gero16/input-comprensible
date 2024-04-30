import { useContext, useEffect, useState } from "react";
import  "./ListaSeries.css"
import { Link as Navigate, NavLink, useParams,} from "react-router-dom";
import { Context } from "../../context/context";
import Navbar from "../Navbar/Navbar";


const ListaSeries = () => {
    const { usuario } = useParams()
    const [titulos, setTitulos] = useState([])

    const { fetchTitulosSeries ,fetchTitulos, urlBackend_Produccion,  evaluarSesion } = useContext(Context)

    
    useEffect(() => {
        fetchTitulosSeries(titulos, setTitulos)
        evaluarSesion()
    }, [])


    let url;
    const linkDinamico = (serie) => {
        if(usuario) url = `/usuario/${usuario}/series/${ serie}/temporada-1/capitulo-1 `
        if(!usuario) url = `/series/${ serie }/temporada-1/capitulo-1 `
        return url
    }

    return (

        <>
            <Navbar> </Navbar>
            <section className="flex-center gap-30 section-series"> 
            
            { titulos ?
                titulos.map((element, key) => {

                    return (
                        <NavLink to={ linkDinamico(element[1]) } className="link-pelicula" > 
                            <article key={key} className="article-pelicula"> 
                                <img src={element[5]} alt={`imagen portada de la serie ${ element[0] }`} className="img-pelicula" title={element[0]}/>
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

export default ListaSeries