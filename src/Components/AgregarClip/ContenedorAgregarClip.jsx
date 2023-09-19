import { useState } from "react"


const ContenedorAgregarClip = () => {

    const [clip, setClip] = useState({
        titulo : "",
        categoria: "",
        temporada: "",
        capitulo: "",
        link: "",
        frase: "",
        dificultad: ""
    })


    console.log(clip)

    return (
        <>
            <div className="div-agregar-video">
                <h1> Agregar Clip </h1>
                <ul>
                    <li>
                        <label htmlFor=""> Nombre de la Serie/Pelicula  </label>
                        <select name="select">
                            <option value="shrek-2" selected> Shrek 2 </option>
                            <option value="peaky-blinders">  Peaky Blinders </option>
                            <option value="bojack-horseman"> Bojack Horseman </option>
                            <option value="scream-2022"> Scream (2022) </option>
                        </select>
                    </li>
                    
                    <li>
                        <label htmlFor=""> Categoria </label>
                        <input type="radio"  name="categoria" value="pelicula" 
                             onClick={(e) => setClip({ 
                                ...clip,
                                categoria : "pelicula"
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
                    </li>

                    <li>
                        <label htmlFor=""> Temporada </label>
                        <select name="select" disabled>
                            <option value="temporada-1" selected> Temporda 1 </option>
                            <option value="temporada-2"> Temporada 2 </option>
                            <option value="temporada-3"> Temporada 3 </option>
                        </select>
                    </li>

                    <li>
                        <label htmlFor="">  Capitulo </label>
                        <input type="text" disabled />
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
                        <input type="text" name="dificultad" 
                             onChange={(e) => setClip({ 
                                ...clip,
                                dificultad : e.target.value
                            })} 
                        />
                    </li>
                    <li>
                        <button> Agregar Clip </button>
                    </li>
                </ul>
            </div>
        </>
    )
}

export default ContenedorAgregarClip