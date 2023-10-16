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

            <article className={`article-clip ${data.subtitulo}`} name={data.subtitulo}>  
                <header className="header-serie">
                    <h1> {data.length > 0 ?  ` ${data[0].titulo} - Temporada ${numTemporada[1]} `  : ""} </h1>

                    <h2> {  transformarMayuscula(capitulo) } </h2>

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
                        data ?
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
                            <h2> Loading .... </h2>
                        }
                </section>
            </article>

        </>
    )
}


export default Serie