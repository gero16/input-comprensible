import { useContext, useEffect, useState } from "react"
import Clip from "../Clip/Clip"
import "./Serie.css"
import { useNavigate, useParams } from "react-router-dom"
import { Context } from "../../context/context"

const Serie = ({data, serie, temporada ,capitulos, capitulo }) => {
    const navigate = useNavigate();
    const { transformarMayuscula } = useContext(Context)

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

   
    return (
        <>
            <img src={`../../../${serie}.png`} className={`imagen-${serie}`} alt="" />
            <article className={`article-clip ${data.subtitulo}`} name={data.subtitulo}>  
                <header className="header-serie">

                    <h1 className="titulo-temporada"> Temporada {numTemporada[1]} - {  transformarMayuscula(capitulo) } </h1>

                    <ul className="ul-capitulos">
                            { capitulos.map((element, key) => {
                                return (
                                    <li className="li-capitulos" 
                                        onClick={() => navigate(`/series/${serie}/${temporada}/${transformarMinuscula(element)}`)}>
                                        {separarCapitulo(element)}
                                    </li>
                                )
                            })}
                    
                    </ul>
                </header>
                  
                <section className='flex-center'>
                    
                    {
                        data.length > 0 ?
                            data.map((element, key) => {
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
                                        grabacionBD={element.grabacion}
                                        categoria={element.categoria}
                                        numero_clip={element["numero_clip"]}
                                    />
                                )
                            })
                            :
                             <div> 
                                 <h2> Lo siento! </h2>
                                 <h2> Todavia no hay clips en el capitulo de esta temporada</h2>
                                 <h3> Si quiere agregar uno </h3>
                                 <button onClick={() => navigate(`/agregar-clip/${serie}/${temporada}/${capitulo}`)}> Ir a Agregar Clip </button>
                             </div>
                        }
                </section>
            </article>

        </>
    )
}


export default Serie