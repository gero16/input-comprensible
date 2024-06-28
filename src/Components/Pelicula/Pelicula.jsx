import { useContext, useEffect, useState } from "react"
import Clip from "../Clip/Clip"
import { useNavigate, useParams } from "react-router-dom";
import { Context } from "../../context/context";

import Cuadrados from "../../../public/cuadrados.png";
import Listado from "../../../public/listado.png";
const Pelicula = ({data, imagenPortada }) => {

    console.log(imagenPortada)
    let {  usuario, pelicula, jpg } = useParams();
    const { urlBackend_Desarrollo, urlBackend_Produccion, urlImagen, mostrarDificultad, ocultarDificultad  } = useContext(Context)

    const navigate = useNavigate();
    

    const posicionImagen = {
        "shrek-2": 27,
        "super-mario-bros": 63,
        "scream-2022":  33,
        "the-room-2003": 60,
        "kill-bill": 35,
        "bastardos-sin-gloria": 15,
        "harry-potter-1": 32,
        "spiderman-into-the-spider-verse": 70,
        "fight-club": 40,
        "harry-potter-1" : 30
    }

    const style = {
        backgroundImage: `url('${ imagenPortada }') `,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: `5% ${ posicionImagen[pelicula] }%`,
        backgroundSize: 'cover', //
        filter: 'brightness(0.8)'
    }

    const [multiplesVideos, setMultiplesVideos] = useState(true);    

    return (
        <>
            <article className={`article-clip article-audio ${ pelicula }`} name={ pelicula }> 

                <div className={`portada portada-${ pelicula } flex-center`} style={style}>
                </div>

                <section 
                    className="ocultar-dificultad"
                    onClick={() => ocultarDificultad()}> { mostrarDificultad ? "Ocultar " : "Mostrar "} 
                    Dificultad 
                </section> 

                <section className="flex-center m-10 gap-20"> 
                    <img src={Cuadrados} onClick={() => setMultiplesVideos(true)}  className="img-video img-cuadrados" width={30} height={30}/> 
                    <img src={Listado}  onClick={() => setMultiplesVideos(false)}  className="img-video img-listado" width={36} height={36} />
                </section>
              
                <section className='flex-center'>
                    { data.length > 0
                        ? data.map((element, index) => {
                        return (
                            <Clip 
                                id={element.id}
                                titulo={element.titulo}
                                subtitulo={element.subtitulo}
                                video={element.url}
                                index={index}
                                frase={element.frase}
                                dificultad={element.dificultad}
                                grabacionID={ element.drive_grabacion ? element.drive_grabacion  : ""}
                                numero_clip={element["numero_clip"]}
                                imagen={element.imagen}
                                key={index}
                                mostrarDificultad={mostrarDificultad}
                                multiplesVideos={multiplesVideos}
                            />
                        )
                        })
                        : <div> 
                            <h2> Lo siento! </h2>

                            <h2> Todavia no hay clips para esta pelicula </h2>
                            <h3> Si quiere agregar uno - 
                                <button 
                                    onClick={() => navigate(`/agregar-clip/${pelicula}`)}
                                    className="btn-ir-agregar-clip"
                                    > 
                                    Ir a Agregar Clip 
                                </button></h3>
                          
                        </div>
                    }
                </section>

                <button 
                    onClick={() => navigate(`/agregar-clip/${pelicula}`)}
                    className="btn-ir-agregar-clip"
                    > Ir a Agregar Clip 
                </button> 
            </article>

        </>
    )
}

export default Pelicula



