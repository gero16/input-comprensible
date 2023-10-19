import { useContext, useState } from "react"
import "./AgregarClip.css"
import Navbar from '../Navbar/Navbar'
import { Context } from "../../context/context"
import { useEffect } from "react"

const ContenedorAgregarClip = () => {
    const { fetchTitulos, urlBackend_Produccion, fetchClips  } = useContext(Context)
    
    const [titulos, setTitulos] = useState([])
    const [infoSerie, setInfoSerie] = useState({
        capitulos: [],
        temporadas: []
    })
    const [categoriaSeleccionada, setCategoriaSelecionada] = useState('pelicula');
    const [esSerie, setEsSerie] = useState(false);

    const [cantidadClips, setCantidadClips] = useState(0);
    
    const [clip, setClip] = useState({
        titulo : "Scream 2022",
        subtitulo: "scream-2022",
        categoria: "pelicula",
        temporada: "temporada-1",
        capitulo: "capitulo-1",
        link: "https://www.youtube.com/embed/",
        frase: "",
        dificultad: "easy"
    })

    const fetchCantidadClips = async (urlClips) => {
        const response = await fetch(urlClips,  {
                method: 'GET',
                headers: new Headers({
                    "Origin": "https://localhost:5173",
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                })
            })
        const resp= await response.json();
        if(!resp) console.log("No hay data")
        setCantidadClips(resp.Cantidad)
    }

    const seleccionarTemporada = (valor) => {
        setClip({ ...clip,temporada : valor })
    }

    const seleccionarCapitulo = (valor) => {
        setClip({...clip, capitulo : valor })
    }

    useEffect(() => {
        fetchTitulos(titulos, setTitulos)
        fetchCantidadClips(`${urlBackend_Produccion}/pelicula/scream-2022/cantidad`)
        setCantidadClips()
    }, [])


    useEffect(() => {
        const encontrarSerie = titulos.find((element) => element[1] === clip.titulo )
        console.log(encontrarSerie)
        if(encontrarSerie && encontrarSerie[2]  ==="serie") {
            const urlCantidadSerie = `${urlBackend_Produccion}/serie/${clip.subtitulo}/temporada/${clip.temporada}/capitulo/${clip.capitulo}/cantidad`
            setEsSerie(true)
            setCategoriaSelecionada("serie")
            setClip({...clip, categoria : "serie",})
            setInfoSerie({
                temporadas : encontrarSerie[3],
                capitulos : encontrarSerie[4]
            })

            fetchCantidadClips(urlCantidadSerie)
        }
        if(encontrarSerie && encontrarSerie[2] === "pelicula") {
            const urlCantidadPelicula = `${urlBackend_Produccion}/pelicula/${clip.subtitulo}/cantidad`
            setCategoriaSelecionada("pelicula")
            setEsSerie(false)
            setClip({ ...clip,categoria : "pelicula"})
            fetchCantidadClips(urlCantidadPelicula)
        }

        setCantidadClips()

    }, [clip.subtitulo])

    useEffect(() => {
        const urlCantidadSerie = `${urlBackend_Produccion}/serie/${clip.subtitulo}/temporada/${clip.temporada}/capitulo/${clip.capitulo}/cantidad`
        fetchCantidadClips(urlCantidadSerie)
        setCantidadClips()
        console.log(clip)

    }, [clip.capitulo])

    useEffect(() => {
        const urlCantidadSerie = `${urlBackend_Produccion}/serie/${clip.subtitulo}/temporada/${clip.temporada}/capitulo/${clip.capitulo}/cantidad`
        fetchCantidadClips(urlCantidadSerie)
        setCantidadClips()
        console.log(clip)
    }, [clip.temporada])


    return (
        <>
            <Navbar> </Navbar>
            <div className="div-agregar-video">
                <h1> Agregar Clip </h1>
                <ul className="lista-formulario-clip">
                    <li>
                        <label htmlFor=""> Nombre de la Serie/Pelicula  </label>
                        <select name="select"
                            onChange={(e) => setClip({ 
                                ...clip,
                                titulo : e.target.value,
                                subtitulo: e.target.value.toLowerCase().split(" ").join("-")
                            })} 
                            
                        >
                            { titulos ?
                                titulos.map((element, key) => {
                                    return (
                                        <option key={key} value={element[1]} defaultValue> {element[0]} </option>
                                    )
                                }) 
                                : <> </>
                            }
                         
                        </select>
                    </li>
                    
                    <li>
                        <label htmlFor=""> Categoria </label>

                        <div className="div-categoria">
                            <span>
                                <input 
                                    type="radio"  
                                    name="categoria" 
                                    value="pelicula" 
                                    id="radio"  
                                    checked={categoriaSeleccionada === 'pelicula'}
                                />
                    
                                <label htmlFor="html"> Pelicula </label>

                            </span>
                            <span>
                                <input 
                                    type="radio" 
                                    name="categoria" 
                                    value="serie" 
                                    id="radio"  
                                    checked={categoriaSeleccionada === 'serie'}
                                />
                                <label htmlFor="css">Serie </label>

                            </span>

                        </div>
                    </li>

                    {  clip.categoria === "serie" 
                    ? <>
                        <li>
                            <label htmlFor=""> Temporada </label>
                        
                                    <select name="select"  onChange={(e) =>  seleccionarTemporada(e.target.value)}  >
                                        { infoSerie.temporadas.map((element, key) => {
                                            let newTemporada = element.toLowerCase().split(" ")
                                            return (
                                                <option 
                                                key={key} 
                                                value={newTemporada.join("-")} 
                                                defaultValue> 
                                                {element} 
                                            </option>
                                            )
                                        })}
                                    </select>
                                
                        </li>
                        <li>
                            <label htmlFor="">  Capitulo </label>
                            <select name="select"  onChange={(e) =>  seleccionarCapitulo(e.target.value)}  >       
                                { infoSerie.capitulos.map((element, key) => {
                                        let newCapitulo = element.toLowerCase().split(" ")
                                        return (
                                            <option                                           
                                                key={key} 
                                                value={newCapitulo.join("-")}
                                                defaultValue> 
                                                {element} 
                                            </option>
                                        )
                                    })}
                            </select>
                        </li>
                    </>

                    : <> </>
                    }

                    <li>
                        <label htmlFor=""> Link del video </label>
                        <input 
                            type="text" name="link" 
                            onChange={(e) => setClip({ 
                                ...clip,
                                link : e.target.value
                            })} 
                            value={clip.link}
                        />
                    </li>


                    <li>
                        <label htmlFor=""> Frase </label>
                        <input type="text" name="frase" 
                            onChange={(e) => setClip({ 
                                ...clip,
                                frase : e.target.value
                            })} 
                            placeholder="It’s so good to be home!"
                        />
                    </li>
                    <li>
                        <label htmlFor=""> Dificultad </label>
                        <select name="dificultad" 
                            onChange={(e) => setClip({ 
                                ...clip,
                                dificultad: e.target.value.split(" ").join("-")
                            })} 
                        
                        >
                            <option value="very-easy" >  very easy </option>
                            <option value="easy" defaultValue> easy </option>
                            <option value="medium"> medium  </option>
                            <option value="hard"> hard  </option>
                            <option value="very-hard"> very hard  </option>
                        </select>
                    </li>
                    <li>
                        <label htmlFor=""> Nombre del Clip </label>
                        <input 
                            type="text" 
                            onChange={(e) => setClip({ ...clip, nombre_clip: e.target.value })} 
                            placeholder="scream-2022-1x01-22"
                            value={cantidadClips === 0 ? `${ clip.subtitulo }-1x01-0` : `${ clip.subtitulo }-1x01-${ cantidadClips + 1}`}
                            />
                    </li>
                    <li>
                        <label htmlFor=""> Numero del Clip </label>
                        <input 
                            type="number" 
                            onChange={(e) => setClip({ ...clip, nnumero_clip: e.target.value })} 
                            placeholder="10"
                            value={cantidadClips === 0 ? 0 : `${cantidadClips + 1}`}
                            />
                    </li>
                    <li id="li-agregar-clip">
                        <button> Agregar Clip </button>
                    </li>
                </ul>
            </div>

        </>
    )
}

export default ContenedorAgregarClip