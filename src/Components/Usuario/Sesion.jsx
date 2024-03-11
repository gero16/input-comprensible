import { useContext, useState } from "react"
import { Context } from "../../context/context"
import { Link as Navigate, NavLink, useNavigate, useParams } from "react-router-dom";
import "./Usuario.css"

const IniciarSesion = () => {
    const { urlBackend_Produccion, urlBackend_Desarrollo } = useContext(Context)
    const navigate = useNavigate()
    console.log(urlBackend_Produccion)
    
    const [sesion, setSesion] = useState({
        correo : "",
        password: "",
    })

    const [error, setError] = useState(false)

    console.log(sesion)

    const fetchIniciarSesion = async (usuario) => {
        const response = await fetch(`${ urlBackend_Desarrollo }/usuario/iniciar-sesion`,  
            {
                method: 'POST',
                headers: new Headers({
                    "Origin": "https://localhost:5173",
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                }),
                body : JSON.stringify(usuario),
            })
        console.log(response)
        const resp = await response.json()
            // geronicola1696@gmail.com
        if(response.status === 200) {
            console.log(resp)
            const objeto = {usuario : resp.usuario, rol : resp.rol}
            localStorage.setItem("sesion", JSON.stringify(objeto));
            navigate(`/usuario/${resp.usuario}`)
        }
        if(response.status === 401) {
            setError(true)
        }
    }
        
    
    return (
    <>
       
        {
            
            error === false 
             ? <> 
              <h1> Iniciar Sesion </h1>
                <NavLink to={`/`}> 
                    <h3 className="subtitulo-volver"> Volver a la página principal </h3>
                </NavLink>
                <form>
                <ul className="lista-registro">
                    <li>
                        <label htmlFor=""> Correo </label>
                        <input 
                            type="text" 
                            onChange={(e) => setSesion({ 
                                ...sesion,
                                correo : e.target.value,
                            })} 
                        />
                    </li>
                    
                    <li>
                        <label htmlFor=""> Contraseña </label>
                        <input 
                            type="text" 
                            onChange={(e) => setSesion({ 
                                ...sesion,
                                password : e.target.value,
                            })} 
                        />
    
                    </li>
                    <button type="button" onClick={() => fetchIniciarSesion(sesion)}> Iniciar Sesion </button>
                </ul>
 
 
                </form>
             </>
             
            
             : <> 
              <h1> Error al iniciar Sesion </h1>
                <NavLink to={`/`}> 
                    <h3> Volver a la página principal </h3>
                </NavLink>
             <p className="mensaje-error"> Su contraseña es incorrecta! </p>
           
            <button className="btn-volver-intentar" onClick={() => setError(false)}> Volver a intentar </button>
             
            
             
             </>
             
        }
        
        


    </>
    )
}

export default IniciarSesion
