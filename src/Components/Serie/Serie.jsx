import { useEffect } from "react"
import Clip from "../Clip/Clip"
import "./Serie.css"
import { useNavigate } from "react-router-dom"

const Serie = ({data, serie, temporada ,capitulos, capitulo }) => {
    const navigate = useNavigate()
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

       
    const separarCapitulo2 = (capitulo) => {
        const result = capitulo.split("-")
        return result
    }
    
    const formatearCapitulo = (capitulo) => {
        const result = separarCapitulo2(capitulo)
        const resultado = result[0].charAt(0).toUpperCase() + result[0].slice(1)
        const resultadoFinal = `${resultado} ${result[1]}`
        console.log(resultadoFinal)
        return resultadoFinal
    }



    return (
        <>
            <img src={`/src/assets/${data.subtitulo}.png`} alt="" className={`imagen-titulo imagen-${data.subtitulo}`} />
           
            <section className="serie-capitulos">
                <h1>Temporada {numTemporada[1]} - Capitulos </h1>
                <ul className="ul-capitulos">
                        { capitulos.map((element, key) => {
                            return (
                                <li className="li-capitulos" onClick={() => navigate(`/series/${serie}/${temporada}/${transformarMinuscula(element)}`)}>
                                    {separarCapitulo(element)}
                                </li>
                            )
                        })}
                   
                </ul>
            </section>

            <article className={`article-clip ${data.subtitulo}`} name={data.subtitulo}>  
                    <h2> {  formatearCapitulo(capitulo) } </h2>
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