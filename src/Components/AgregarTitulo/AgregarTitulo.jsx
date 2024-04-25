import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../../context/context";
import Navbar from "../Navbar/Navbar";
import "./AgregarTitulo.css"

const AgregarTitulo = () => {
    
    let { pelicula, temporada, usuario, capitulo } = useParams();
    const { urlBackend_Produccion, urlBackend_Desarrollo  } = useContext(Context)


    const [titulo, setTitulo] = useState({
        titulo     : "",
        subtitulo  : "",
        categoria  : "serie",
        temporadas : "temporada-1",
        capitulos  : "capitulo-1",
        imagen: "",
    })

    const [mensaje, setMensaje] = useState()

   
    const agregarTitulo = async (data) => {


        const formData = new FormData();
        formData.append('titulo', JSON.stringify(titulo.titulo));
        formData.append('subtitulo', JSON.stringify(titulo.color));
        formData.append('categoria', JSON.stringify(titulo.contenido));
        formData.append('imagen', titulo.imagen);

        if(titulo.categoria === "serie") {
            formData.append('temporadas', JSON.stringify(titulo.temporadas));
            formData.append('capitulos', JSON.stringify(titulo.capitulos));
        } 

        let response = await fetch(`${ urlBackend_Produccion }/titulos/agregar-titulo`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(data)
          });
          
          console.log(response)

          if(!response) {
            console.log(response)
            console.log("dvsds")
          }
    }

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setTitulo({...titulo, imagen : reader.result});
            };
            reader.readAsDataURL(file);
        }
    };

    console.log(titulo)
    return (
        <> 
            <Navbar> </Navbar>
            <div className="div-agregar-titulo">
                <h1 className="h1-agregar-clip"> Agregar Clip - Pelicula </h1>
                <ul className="lista-formulario-clip">
                    <li>
                        <label htmlFor="" className="label-crear"> Imagen </label>
                        <div className="grid-input-img">
                            <input 
                                type="file" 
                                name="imagen" 
                                id="imagen-post" 
                                style={{display: "none"}} 
                                className="vacio input-crear" 
                                onChange={handleImageChange}
                            />
                            <label htmlFor="imagen-post" className="label-imagen">Seleccionar Archivo</label>
                       
                        </div>
                    </li>
                    <li>
                        <label htmlFor=""> Titulo  </label>
          
                        <input  onChange={(e)=> setTitulo({...titulo, titulo :  e.target.value})} />
                      
                    </li>
                    <li>
                        <label htmlFor=""> Subtitulo  </label>
                     
                        <input  onChange={(e)=> setTitulo({...titulo, subtitulo :  e.target.value}) } />
                   
                    </li>
                    
                    <li>
                        <label htmlFor=""> Categoria </label>

                    <div className="div-categoria">
                            <span>
                                <input 
                                    type="radio"  
                                    name="categoria" 
                                    value="serie" 
                                    id="radio"  
                                    checked='pelicula'
                                    onChange={(e) => setTitulo({ ...titulo, categoria: e.target.value })} 
                                />
                    
                                <label htmlFor="html"> Serie </label>

                                <input  
                                    type="radio" 
                                    name="categoria" 
                                    value="pelicula"
                                    id="radio"
                                    onChange={(e) => setTitulo({ ...titulo, categoria: e.target.value })} 
                                />
                    
                                <label htmlFor="html"> Pelicula </label>

                            </span>
                          
                        </div>
                    </li>

                    {  titulo.categoria === "serie" 
                        ? <> <li>
                            <label htmlFor=""> Temporadas </label>
                        
                                <select name="select"  
                                        onChange={(e) => setTitulo({...titulo, temporadas : e.target.value}) } >
                                
                                    <option value="1" defaultValue> Temporada 1 </option>
                                    <option value="2"> Temporada 2 </option>
                                    <option value="3"> Temporada 3 </option>
                                    <option value="4"> Temporada 4 </option>
                                    <option value="5"> Temporada 5 </option>
                                    <option value="6"> Temporada 6 </option>
                                    <option value="7"> Temporada 7 </option>
                                    <option value="8"> Temporada 8 </option>
                                    <option value="9"> Temporada 9 </option>
                                    <option value="10">Temporada 10 </option>
                                    
                                </select>
                                
                        </li>
                        <li>
                            <label htmlFor="">  Capitulos </label>
                            <select name="select"  onChange={(e) => setTitulo({...titulo, capitulos : e.target.value}) }  >       
                               
                                <option value="1" defaultValue> Capitulo 1 </option>
                                <option value="2" > Capitulo 2 </option>
                                <option value="3" > Capitulo 3 </option>
                                <option value="4" > Capitulo 4 </option>
                                <option value="5" > Capitulo 5 </option>
                                <option value="6" > Capitulo 6 </option>
                                <option value="7" > Capitulo 7 </option>
                                <option value="8" > Capitulo 8 </option>
                                <option value="9" > Capitulo 9 </option>
                                <option value="10" > Capitulo 10 </option>
                                <option value="11" > Capitulo 11 </option>
                                <option value="12" > Capitulo 12 </option>
                                <option value="13" > Capitulo 13 </option>
                                <option value="14" > Capitulo 14 </option>
                                <option value="15" > Capitulo 15 </option>
                                <option value="16" > Capitulo 16 </option>
                            </select>
                        </li>
                    </>

                    : <> </>
                    }
            
                    <li id="li-agregar-clip">
                        <button onClick={() => agregarTitulo(titulo) }> Agregar Clip </button>
                    </li>

                    <li>
                        <span className="mensaje"> {mensaje !== ""  ? mensaje : ""} </span>
                    </li>
                </ul>
            </div>
        </>
    )
}


export default AgregarTitulo