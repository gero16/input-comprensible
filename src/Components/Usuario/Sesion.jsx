import { useContext, useState } from "react"
import { Context } from "../../context/context"
import { Link as Navigate, NavLink, useNavigate, useParams } from "react-router-dom";
import ImageVolver from "../../../public/volver-flecha.png"
import "./Usuario.css"
import Navbar from "../Navbar/Navbar";

const IniciarSesion = () => {
    const { urlBackend_Produccion, urlBackend_Desarrollo, setUsuarioSesion, usuarioSesion  } = useContext(Context)
    const navigate = useNavigate()
    console.log(urlBackend_Produccion)
    
    const [sesion, setSesion] = useState({
        correo : "",
        password: "",
    })

    const [error, setError] = useState(false)

    console.log(sesion)

    const fetchIniciarSesion = async (usuario) => {
        const response = await fetch(`${ urlBackend_Produccion }/usuario/iniciar-sesion`,  
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
            setUsuarioSesion(true)
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
             ? <section className="div-sesion"> 
                <Navbar> </Navbar>
                <form>
                <h1 className="h1-sesion"> Iniciar Sesion </h1>
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
             </section>
             
            
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
