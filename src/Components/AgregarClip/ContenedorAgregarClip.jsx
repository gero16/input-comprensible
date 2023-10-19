import { useContext, useState } from "react"
import "./AgregarClip.css"
import Navbar from '../Navbar/Navbar'
import { Context } from "../../context/context"
import { useEffect } from "react"

const ContenedorAgregarClip = () => {
    const { fetchTitulos, urlBackend_Produccion } = useContext(Context)

    const [titulos, setTitulos] = useState([])
    const [infoSerie, setInfoSerie] = useState({
        capitulos: [],
        temporadas: []
    })
    const [selected, setSelected] = useState('pelicula');
    const [clip, setClip] = useState({
        titulo : "",
        subtitulo: "",
        categoria: "pelicula",
        temporada: "",
        capitulo: "",
        link: "https://www.youtube.com/embed/",
        frase: "",
        dificultad: "easy"
    })


    useEffect(() => {
        fetchTitulos(titulos, setTitulos)
        console.log(titulos)
        
    }, [])

    useEffect(() => {
        console.log(titulos[3])
        console.log(titulos[4])
        const encontrarSerie = titulos.find((element) => element[1] === clip.titulo )
        if(encontrarSerie) {
            console.log(clip)
            console.log(encontrarSerie[4])
            setInfoSerie({
                ...infoSerie,
                capitulos : encontrarSerie[4],
                temporadas : encontrarSerie[3]
            })
        }
        

        console.log(infoSerie)
    }, [clip.categoria])

    const seleccionarRadioButton = (event, categoria) => {
        console.log(event.target.value);
        setSelected(event.target.value);
        if(categoria === "pelicula") {
            setClip({ 
                ...clip,
                categoria : "pelicula",
                temporada: "",
                capitulo: "",
                
            })
        }
        if(categoria === "serie") {
            setClip({ 
                ...clip,
                categoria : "serie"
            })
        }
      }

    


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
                                    checked={selected === 'pelicula'}
                                    onChange={(e) => seleccionarRadioButton (e, "pelicula")} 
                                />
                    
                                <label htmlFor="html"> Pelicula </label>

                            </span>
                            <span>
                                <input 
                                    type="radio" 
                                    name="categoria" 
                                    value="serie" 
                                    id="radio"  
                                    checked={selected === 'serie'}
                                    onChange={(e) => seleccionarRadioButton(e, "serie")} 
                                />
                                <label htmlFor="css">Serie </label>

                            </span>

                        </div>
                    </li>

                    {  clip.categoria === "serie" 
                    ? <>
                        <li>
                            <label htmlFor=""> Temporada </label>
                        
                            
                                
                                    <select name="select" >
                                        {
                                       
                                        infoSerie.temporadas.map((element, key) => {
                                            return (
                                                <option key={key} value={element} defaultValue> {element} </option>
                                            )
                                        }) 
                                            
                                        }
                                    </select>
                                
                        </li>
                        <li>
                            <label htmlFor="">  Capitulo </label>
                            <select name="select" >
                                {
                                    infoSerie.capitulos.map((element, key) => {
                                        return (
                                            <option key={key} value={element} defaultValue> {element} </option>
                                        )
                                    }) 
                                }
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
                            placeholder="Bojack1x01-10"
                            />
                    </li>
                    <li>
                        <label htmlFor=""> Numero del Clip </label>
                        <input 
                            type="number" 
                            onChange={(e) => setClip({ ...clip, nnumero_clip: e.target.value })} 
                            placeholder="10"
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