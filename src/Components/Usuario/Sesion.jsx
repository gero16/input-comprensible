import { useState } from "react"
import { useNavigate } from "react-router-dom"

const IniciarSesion = () => {
    const navigate = useNavigate()
    
    const [sesion, setSesion] = useState({
        correo : "",
        password: "",
    })
    const urlBackend_Desarrollo = import.meta.env.VITE_URL_BACKEND_DESARROLLO
    console.log(sesion)
    const fetchIniciarSesion = async (usuario) => {
        const response = await fetch(`${urlBackend_Desarrollo}/usuario/iniciar-sesion`,  
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
        console.log(resp)

        if(response.status === 200) {
            localStorage.setItem("sesion", resp.usuario);
            navigate(`/usuario/${resp.usuario}`)
        }
    }
        
    
    return (
    <>
        <h1> Iniciar Sesion </h1>
        <form>
            <ul>
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
    )
}

export default IniciarSesion
