import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../../context/context";

const AgregarClipSerie = () => {
    let { serie, temporada, usuario, capitulo } = useParams();
    const { fetchTitulos, urlBackend_Produccion, urlBackend_Desarrollo, separarTexto, transformarMayuscula  } = useContext(Context)
    
    const [titulos, setTitulos] = useState([])
    const [infoSerie, setInfoSerie] = useState({
        capitulos: [],
        temporadas: []
    })
    const [categoriaSeleccionada, setCategoriaSelecionada] = useState('serie');

    const separarTemporada = separarTexto(temporada, "-")
    const separarCapitulo = separarTexto(capitulo, "-")

    const [clip, setClip] = useState({
        titulo : transformarMayuscula(serie),
        subtitulo: serie,
        categoria: "serie",
        temporada: temporada,
        numero_temporada: separarTemporada[1],
        capitulo: capitulo,
        numero_capitulo : separarCapitulo[1],
        url: "https://www.youtube.com/embed/",
        frase: "",
        dificultad: "easy",
        nombre_clip: `${serie}-${separarTemporada[1]}x0${separarCapitulo[1]}-1`,
        numero_clip: 1
    })

    console.log(clip)

    useEffect(() => {
        fetchTitulos(titulos, setTitulos)  
        console.log(titulos)   
    }, [])

    const agregarClip = async (data) => {
        console.log(data)
        
        let response = await fetch(`${urlBackend_Desarrollo}/agregar-clip`, {
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
                <h1> Agregar Clip - Serie </h1>
                <ul className="lista-formulario-clip">
                    <li>
                        <label htmlFor=""> Nombre de la Serie/Pelicula  </label>
                        <select name="select">
                           <option value={serie}> {clip.titulo}</option>
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
           
                    <li>
                        <label htmlFor=""> Temporada </label>
                            <select name="select"  onChange={(e) =>  seleccionarTemporada(e.target.value)}  >
                                <option value={ temporada }> { transformarMayuscula(temporada) } </option>
                            </select>
                    </li>
                    <li>
                        <label htmlFor="">  Capitulo </label>
                        <select name="select"  onChange={(e) =>  seleccionarCapitulo(e.target.value)}  >       
                            <option value={ capitulo }> { transformarMayuscula(capitulo) } </option>
                        </select>
                    </li>

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


export default AgregarClipSerie