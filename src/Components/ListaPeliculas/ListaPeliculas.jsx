import { useContext, useEffect, useState } from "react";
import "./ListaPeliculas.css";
import { NavLink, useParams } from "react-router-dom";
import { Context } from "../../context/context";
import Navbar from "../Navbar/Navbar";

const ListaPeliculas = () => {
    const { usuario } = useParams();
    const { fetchTitulosPelicula, evaluarSesion, setUsuarioSesion, usuarioSesion } = useContext(Context);

    const [titulos, setTitulos] = useState([]);
    const [esAdmin, setEsAdmin] = useState(false);
    const [modoEditar, setModoEditar] = useState(false);
    const [mensaje, setMensaje] = useState("")
    const [error, setError] = useState(false)

    console.log(usuarioSesion)

    const linkDinamico = (pelicula) => {
        let url;
        if (usuario) url = `/usuario/${usuario}/peliculas/${pelicula}`;
        if (!usuario) url = `/peliculas/${pelicula}/`;
        if (modoEditar) url = `/usuario/${usuario}/peliculas/${pelicula}/editar`;
        return url;
    };

    const cambiarModoEditar = () => {
        setModoEditar((prevModoEditar) => !prevModoEditar);
    };

    useEffect(() => {
        const fetchData = async () => {

            try {
                const resultadoTitulos = await fetchTitulosPelicula(titulos, setTitulos);
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
        };

        fetchData();

    }, [fetchTitulosPelicula, mensaje]);

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

    return (
        <>

            { !usuarioSesion ? <Navbar> </Navbar> : <> </> }
      
       
            <section className="flex-center gap-30 section-peliculas">

                <h3 className="h3-mensaje"> { mensaje }</h3>

             
                    { usuarioSesion && esAdmin 
                        ?   <section className="section-edicion flex-center-center mb-10">
                                <h3 className="h3-modo-editar m-10 link-pelicula" onClick={ cambiarModoEditar } > 
                                    { modoEditar ?  "Desactivar Modo Edición" : "Activar Modo Edicion"}  
                                    
                                    </h3>  
        
                                    </section>
                        : <h3> </h3>
                    }
     

                {titulos && error === false
                    ? titulos.map((element, key) => (
                          <article className="container-pelicula" key={key}>
                              <NavLink to={linkDinamico(element[1])} className="link-pelicula">
                                  <picture>
                                      <source srcSet={element[5]} media="(min-width: 1550px)" width="500" height="300" />
                                      <source srcSet={element[7]} media="(min-width: 800px)" width="380" height="210" />
                                      <img
                                          src={element[6]}
                                          alt={`imagen portada de la pelicula ${element[1]}`}
                                          className="img-pelicula"
                                          title={element[0]}
                                          width="300"
                                          height="180"
                                          loading="lazy"
                                          decoding="async"
                                      />
                                  </picture>
                              </NavLink>
                              <h2 className="h2-lista-pelicula">{element[0]}</h2>
                          </article>
                      ))
                    : <h3 className="h3-mensaje"> { mensaje } </h3>
                    }
            </section>
        </>
    );
};

export default ListaPeliculas;
