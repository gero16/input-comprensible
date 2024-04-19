import { useContext, useEffect, useState } from "react"
import Clip from "../Clip/Clip"
import "./Serie.css"
import { useNavigate, useParams } from "react-router-dom"
import { Context } from "../../context/context"

const Serie = ({data, serie, temporada ,capitulos, capitulo, urlImagen }) => {
    console.log(capitulos)
    const navigate = useNavigate();
    const { transformarMayuscula, setData } = useContext(Context)
    let {  usuario } = useParams();
    const [width, setWidth] = useState(window.innerWidth);
    //console.log(data) 
    let numTemporada = temporada.split("-")

    const transformarMinuscula = (texto) => {
        const nuevo = texto.toLocaleLowerCase().split(" ").join("-")
        return nuevo
    }
    const separarCapitulo = (capitulo) => {
        const result = capitulo.split(" ")
        return result[1]
    }

    const posicionImagen = {
        "peaky-blinders": 39,
        "bojack-horseman": 30,
        "house-of-the-dragon": 30,
        "sex-education": 30,
        "x-men-97": 10
    }
    const style = {
        backgroundImage: urlImagen,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: `5% ${ posicionImagen[serie] }%`,
        backgroundSize: width < 540 ? "contain" : "cover",
        filter: 'brightness(0.7)'
    }

    

    const newCapitulo = transformarMayuscula(capitulo, 2)
    console.log(newCapitulo)
    return (
        <>
            <article className={`article-clip ${ data.subtitulo }`} name={ data.subtitulo }>
                <div className={`portada portada-${ serie } flex-center`} style={ style }>
                </div>  

                <header className="header-serie">

                    <h1 className="titulo-temporada"> Temporada { numTemporada[1] } - { transformarMayuscula(capitulo, 2) } </h1>

                    <ul className="ul-capitulos">
                            { capitulos.length > 0 
                                ? capitulos.map((element, key) => {
                                    return (
                                        <li className="li-capitulos" 
                                            onClick={() => navigate(`/series/${serie}/${temporada}/${transformarMinuscula(element)}`)}>
                                            { separarCapitulo(element)}
                                        </li>
                                    )})
                                : <p> Cargando capitulos... </p>
                            }
                    
                    </ul>
                </header>
                  
                <section className='flex-center'>
                    

                    { data.length > 0 
                        ? data.map((element, key) => {

                                return (
                                    <Clip
                                        id={element.id} 
                                        titulo={element.titulo}
                                        subtitulo={element.subtitulo}
                                        video={element.url}
                                        key={key}
                                        frase={element.frase}
                                        dificultad={element.dificultad}
                                        capitulo={element.capitulo}
                                        index={key}
                                        grabacionID={ element.grabacion_id ? element.grabacion_id : ""}
                                        categoria={element.categoria}
                                        numero_clip={element["numero_clip"]}
                                    />
                                )
                            })

                            : <div> 
                                 <h2> Lo siento! </h2>
                                 <h2> Todavia no hay clips en este capitulo </h2>
                                 <h3> Si quiere agregar uno -   
                                    <button 
                                        onClick={() => navigate(`/agregar-clip/${serie}/${temporada}/${capitulo}`)}
                                        className="btn-ir-agregar-clip"
                                        > Ir a Agregar Clip 
                                    </button> 
                                </h3>
                               
                             </div>
                        }
                        
                    

                                 
                </section>
                <button 
                    onClick={() => navigate(`/agregar-clip/${serie}/${temporada}/${capitulo}`)}
                    className="btn-ir-agregar-clip"
                    > Ir a Agregar Clip 
                </button> 
            </article>

        </>
    )
}


export default Serie