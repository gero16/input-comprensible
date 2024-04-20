import { useState } from "react"
import "./Usuario.css"
import { Link as Navigate, NavLink, useNavigate, useParams } from "react-router-dom";
import ImageVolver from "../../../public/volver-flecha.png"
import Navbar from "../Navbar/Navbar";

const Registro = () => {

    const [usuario, setUsuario] = useState({
        usuario : "",
        correo: "",
        password: "",
    })

    const [usuarioConfirmado, setUsuarioConfirmado] = useState(false)

    const urlBackend_Produccion = import.meta.env.VITE_URL_BACKEND_PRODUCCION
    const urlBackend_Desarrollo = import.meta.env.VITE_URL_BACKEND_DESARROLLO

    const fetchRegistrarse = async (usuario) => {
        const response = await fetch(`${ urlBackend_Produccion }/usuario/agregar-usuario`,  
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
            setUsuarioConfirmado(true)
        }
    }

    console.log(usuario)
    return (
        <>

        {
            usuarioConfirmado === false
             ? <section className="div-sesion"> 
                <Navbar> </Navbar>
         
                <form className="formulario-usuario">
                    <h1 className="h1-sesion"> Registrarse </h1>
                    <ul className="lista-registro gap-10">
                
                        <li>
                            <label>Usuario</label>
                            <input type="text"  onChange={(e) => setUsuario({ ...usuario,  usuario : e.target.value }) } />
                
                        </li>
                        <li>
                            <label> Correo </label>
                            <input type="text" onChange={(e) => setUsuario({ ...usuario,  correo : e.target.value }) } />
                        </li>
                        
                        <li>
                            <label> Contraseña </label>
                            <input type="password" onChange={(e) => setUsuario({ ...usuario,  password : e.target.value }) } />
                
                        </li>
                        <button type="button" onClick={ () => fetchRegistrarse(usuario) }> Confirmar </button>
                    </ul>
                </form>
             </section>
             : <> 
                <h1> Usuario Confirmado !</h1>
                <h2> Volver a la Página Principal </h2>
             </>
                
        }
            
           
        </>
    )
   
}

export default Registro
