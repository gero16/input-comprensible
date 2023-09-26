const Registro = () => {
    return (
        <>
            <h1> Registrarse </h1>
            <form action="/">
                <ul>
                    <li>
                        <label>Usuario</label>
                        <input type="text" />
            
                    </li>
                    <li>
                        <label> Correo </label>
                        <input type="text" />
                    </li>
                    
                    <li>
                        <label> Contraseña </label>
                        <input type="text" />
            
                    </li>
                    <button> Registrarse </button>
                </ul>
            </form>
           
        </>
    )
   
}

export default Registro
