import { useState } from "react"
import "./AgregarClip.css"
import Navbar from '../Navbar/Navbar'

const ContenedorAgregarClip = () => {

    const [clip, setClip] = useState({
        titulo : "",
        subtittulo: "",
        categoria: "",
        temporada: "",
        capitulo: "",
        link: "",
        frase: "",
        dificultad: "easy"
    })

    // elements.join('-')
    console.log(clip)


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
                            <option value="Shrek 2" selected> Shrek 2 </option>
                            <option value="Peaky Blinders">  Peaky Blinders </option>
                            <option value="Bojack Horseman"> Bojack Horseman </option>
                            <option value="Scream 2022"> Scream (2022) </option>
                        </select>
                    </li>
                    
                    <li>
                        <label htmlFor=""> Categoria </label>

                        <div>
                            <input type="radio"  name="categoria" value="pelicula" 
                                onClick={(e) => setClip({ 
                                    ...clip,
                                    categoria : "pelicula",
                                    temporada: "",
                                    capitulo: "",
                                    
                                })} 
                                />
                
                            <label htmlFor="html"> Pelicula </label>
                            <input type="radio" name="categoria" value="serie" 
                                onClick={(e) => setClip({ 
                                    ...clip,
                                    categoria : "serie"
                                })} 
                                />
                            <label htmlFor="css">Serie </label>

                        </div>
                    </li>

                    <li>
                        <label htmlFor=""> Temporada </label>
                        {
                            clip.categoria === "serie" 
                                ?  
                                <select name="select" >
                                    <option value="temporada-1" selected> Temporda 1 </option>
                                    <option value="temporada-2"> Temporada 2 </option>
                                    <option value="temporada-3"> Temporada 3 </option>
                                </select>
                                :
                                <select name="select" disabled>
                                    <option value="temporada-1" selected> Temporda 1 </option>
                                </select>
                        }
                     
                       
                    </li>

                    <li>
                        <label htmlFor="">  Capitulo </label>
                        {
                            clip.categoria === "serie" 
                                ?  <input type="number"  onChange={(e) => setClip({ ...clip, capitulo : e.target.value })} /> 
                                :  <input type="number" disabled placeholder="1"/>
                        }
                    </li>


                    <li>
                        <label htmlFor=""> Link del video </label>
                        <input type="text" name="link" 
                             onChange={(e) => setClip({ 
                                ...clip,
                                link : e.target.value
                            })} 
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
                            <option value="very easy" >  very easy </option>
                            <option value="easy" selected>  easy </option>
                            <option value="medium"> medium  </option>
                            <option value="hard"> hard  </option>
                            <option value="very hard"> very hard  </option>
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
                    <li id="li-agregar-clip">
                        <button> Agregar Clip </button>
                    </li>
                </ul>
            </div>
        </>
    )
}

export default ContenedorAgregarClip