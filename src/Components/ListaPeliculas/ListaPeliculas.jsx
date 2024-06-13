import { useContext, useEffect, useState } from "react";
import "./ListaPeliculas.css";
import { NavLink, useParams } from "react-router-dom";
import { Context } from "../../context/context";
import Navbar from "../Navbar/Navbar";

const ListaPeliculas = () => {
    const [titulos, setTitulos] = useState([]);
    const [esAdmin, setEsAdmin] = useState(false);
    const [modoEditar, setModoEditar] = useState(false);
    const { fetchTitulosPelicula, evaluarSesion, setUsuarioSesion, usuarioSesion } = useContext(Context);
    const { usuario } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            await fetchTitulosPelicula(titulos, setTitulos);

            const resultado = evaluarSesion();
            console.log(resultado);
            if (!resultado) setUsuarioSesion(false);
            if(resultado) {
                setUsuarioSesion(true);
                if (resultado.rol === "ADMIN") setEsAdmin(true)
                else setEsAdmin(false);
            }
        };

        fetchData();
    }, [fetchTitulosPelicula, evaluarSesion, setUsuarioSesion, usuarioSesion]);

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

    return (
        <>
            <Navbar />

            { usuarioSesion && esAdmin 
                ? <h3 className="h3-modo-editar" onClick={cambiarModoEditar } > 
                    { modoEditar ?  "Desactivar Modo Edición" : "Activar Modo Edicion"}  </h3>  
                : <h3> </h3>
            }

            <section className="flex-center gap-30 section-peliculas">
                {titulos
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
                    : null}
            </section>
        </>
    );
};

export default ListaPeliculas;
