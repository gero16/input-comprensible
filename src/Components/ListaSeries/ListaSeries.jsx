import { useContext, useEffect, useState } from "react";
import  "./ListaSeries.css"
import { Link as Navigate, NavLink, useParams,} from "react-router-dom";
import { Context } from "../../context/context";
import Navbar from "../Navbar/Navbar";


const ListaSeries = () => {
    const { usuario } = useParams()
    const [titulos, setTitulos] = useState([])
    const [esAdmin, setEsAdmin] = useState(false)
    const [modoEditar, setModoEditar] = useState(false)
    const { fetchTitulosSeries ,fetchTitulos, urlBackend_Produccion,  evaluarSesion, setUsuarioSesion, usuarioSesion  } = useContext(Context)
    const [mensaje, setMensaje] = useState("")
    const [error, setError] = useState(false)

    
    useEffect(() => {
        const fetchData = async () => {

        try {
            const resultadoTitulos = await fetchTitulosSeries(titulos, setTitulos)
            console.log(resultadoTitulos)

            if(!resultadoTitulos || resultadoTitulos.message.includes('Failed to fetch')) {
                setMensaje("Error CORS al traer los titulos de las peliculas")
                setError(true)
            }

            if(resultadoTitulos) setError(false)
            
        } catch (error) {
            if(error.message) {

                if (error.message.includes('Failed to fetch')) {
                    console.log("safsaffsaasfsafsaffsasafsafsafsafsaf")
                    setMensaje('Error de CORS: No se puede acceder al recurso.');
                }
            }
        }
    }

    fetchData()
    }, [fetchTitulosSeries, mensaje])

    useEffect(() => {

        if(error === false){
            const resultadoSesion = evaluarSesion();
            
            console.log(resultadoSesion);
            if (!resultadoSesion) {
                setUsuarioSesion(false);
                setMensaje("Ocurrio un error")
            }
            if(resultadoSesion) {
                console.log(resultadoSesion)
                setUsuarioSesion(true);
                setMensaje("")
                
                if (resultadoSesion.rol === "ADMIN") setEsAdmin(true)
                else setEsAdmin(false);
            }
        }

    }, []);

    let url;
    const linkDinamico = (serie) => {
        if(usuario) url = `/usuario/${ usuario }/series/${ serie }/temporada-1/capitulo-1`
        if(!usuario) url = `/series/${ serie }/temporada-1/capitulo-1`
        if(modoEditar) url = `/usuario/${ usuario }/series/${ serie }/temporada-1/capitulo-1/editar `
        return url
    }

    const cambiarModoEditar = () => {
        setModoEditar((prevModoEditar) => !prevModoEditar);
    };
    
    return (

        <>
            <Navbar> </Navbar>

            { usuarioSesion && esAdmin 
                ? <h3 className="h3-modo-editar" onClick={ ((e)=> setModoEditar(!modoEditar)) } > { modoEditar ?  "Desactivar Modo Edición" : "Activar Modo Edicion"}  </h3>  
                : <h3> </h3>
            }

            <section className="flex-center gap-30 section-series"> 

            <h3 className="h3-mensaje"> { mensaje }</h3>

             
            { usuarioSesion && esAdmin 
                ?   <section className="section-edicion flex-center-center mb-10">
                        <h3 className="h3-modo-editar m-10 link-pelicula" onClick={ cambiarModoEditar } > 
                            { modoEditar ?  "Desactivar Modo Edición" : "Activar Modo Edicion"}  
                            
                            </h3>  

                            </section>
                : <h3> </h3>
            }

            
            { titulos ?
                titulos.map((element, key) => {
                    console.log(titulos)
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

                                    <img 
                                        src={element[8]} 
                                        className="img-nacionalidad" 
                                        alt="" 
                                        width="24"
                                        height="24"
                                />
                                
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

export default ListaSeries