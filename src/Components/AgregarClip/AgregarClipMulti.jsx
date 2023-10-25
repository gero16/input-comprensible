import { useContext, useState } from "react"
import "./AgregarClip.css"
import Navbar from '../Navbar/Navbar'
import { Context } from "../../context/context"
import { useEffect } from "react"

const AgregarClipMulti = () => {
    const { fetchTitulos, urlBackend_Produccion, urlBackend_Desarrollo  } = useContext(Context)
    
    const [titulos, setTitulos] = useState([])
    const [infoSerie, setInfoSerie] = useState({
        capitulos: [],
        temporadas: []
    })
    const [categoriaSeleccionada, setCategoriaSelecionada] = useState('pelicula');

    const [clip, setClip] = useState({
        titulo : "Scream 2022",
        subtitulo: "scream-2022",
        categoria: "pelicula",
        temporada: "temporada-1",
        numero_temporada: 1,
        capitulo: "capitulo-1",
        numero_capitulo : 1,
        url: "https://www.youtube.com/embed/",
        frase: "",
        dificultad: "easy",
        nombre_clip: "scream-2022-1x01-22",
        numero_clip: 22
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
        console.log(resp.Cantidad)
  
        return resp.Cantidad
    }

    const seleccionarTemporada = (valor) => setClip({ ...clip,temporada : valor })
    const seleccionarCapitulo = (valor) => setClip({...clip, capitulo : valor })

    useEffect(() => {
        fetchTitulos(titulos, setTitulos)  
        console.log(titulos)   
    }, [])


    useEffect(() => {
        const encontrarSerie = titulos.find((element) => element[1] === clip.subtitulo )
        const separarTemporada =  clip.temporada.split("-")
        const separarCapitulo =  clip.capitulo.split("-")
        if(encontrarSerie && encontrarSerie[2]  ==="serie") {
            const urlCantidadSerie = `${urlBackend_Produccion}/serie/${clip.subtitulo}/temporada/${clip.temporada}/capitulo/${clip.capitulo}/cantidad`
            let resultado = fetchCantidadClips(urlCantidadSerie)
            resultado.then((cantidad) => {
                setCategoriaSelecionada("serie")
                setClip({
                    ...clip, 
                    categoria : "serie",
                    nombre_clip : `${clip.subtitulo}-${separarTemporada[1]}x0${separarCapitulo[1]}-${ cantidad + 1}`,
                    numero_clip : cantidad +1
                })
                setInfoSerie({
                    temporadas : encontrarSerie[3],
                    capitulos : encontrarSerie[4]
                })
    
            })
        }
        if(encontrarSerie && encontrarSerie[2] === "pelicula") {
            const urlCantidadPelicula = `${urlBackend_Produccion}/pelicula/${clip.subtitulo}/cantidad`
            let resultado =    fetchCantidadClips(urlCantidadPelicula)
            resultado.then((cantidad) => {
 
                setCategoriaSelecionada("pelicula")

                setClip({ 
                    ...clip,
                    categoria : "pelicula",
                    nombre_clip : `${clip.subtitulo}-${separarTemporada[1]}x0${separarCapitulo[1]}-${cantidad + 1}`,
                    numero_clip : cantidad + 1
                })
          
            })
        }
    
    }, [clip.subtitulo])

    useEffect(() => {
        if(categoriaSeleccionada === "serie") {

            const urlCantidadSerie = `${urlBackend_Produccion}/serie/${clip.subtitulo}/temporada/${clip.temporada}/capitulo/${clip.capitulo}/cantidad`
            let resultado = fetchCantidadClips(urlCantidadSerie)
            resultado.then((cantidad) => {
                const separarTemporada =  clip.temporada.split("-")
                const separarCapitulo =  clip.capitulo.split("-")
                setClip({
                    ...clip,
                    nombre_clip : `${clip.subtitulo}-${separarTemporada[1]}x0${separarCapitulo[1]}-${cantidad + 1}`,
                    numero_clip : cantidad +1
                })
            })  
        }      
    }, [clip.capitulo])


    useEffect(() => {
        if(categoriaSeleccionada === "serie") {
            const urlCantidadSerie = `${urlBackend_Produccion}/serie/${clip.subtitulo}/temporada/${clip.temporada}/capitulo/${clip.capitulo}/cantidad`
            const separarTemporada =  clip.temporada.split("-")
            const separarCapitulo =  clip.capitulo.split("-")
            let resultado = fetchCantidadClips(urlCantidadSerie)
            resultado.then((cantidad) => {
                const separarTemporada =  clip.temporada.split("-")
                const separarCapitulo =  clip.capitulo.split("-")
                setClip({
                    ...clip,
                    nombre_clip : `${clip.subtitulo}-${separarTemporada[1]}x0${separarCapitulo[1]}-${cantidad + 1}`,
                    numero_clip : cantidad +1
                })
                })
            } 
           
    }, [clip.temporada])

    
    const agregarClip = async (data) => {
        let response = await fetch(`${urlBackend_Produccion}/agregar-clip`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(data)
          });
          
          let result = await response.json();
          console.log(result)
    }
    return (
        <>
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
                            type="text" name="url" 
                            onChange={(e) => setClip({ 
                                ...clip,
                                url : e.target.value
                            })} 
                            value={clip.url}
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
                                dificultad: e.target.value
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
                            value={clip.nombre_clip}
                            />
                    </li>
                    <li>
                        <label htmlFor=""> Numero del Clip </label>
                        <input 
                            type="number" 
                            onChange={(e) => setClip({ ...clip, numero_clip: e.target.value })} 
                            placeholder="10"
                            value={clip.numero_clip}
                            />
                    </li>
                    <li id="li-agregar-clip">
                        <button onClick={() => agregarClip(clip) }> Agregar Clip </button>
                    </li>
                </ul>
            </div>

        </>
    )
}

export default AgregarClipMulti