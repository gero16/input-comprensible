import './Index.css'
import Navbar from '../Navbar/Navbar'
import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Context } from '../../context/context'

function App() {
  const { urlBackend_Produccion, urlBackend_Desarrollo } = useContext(Context)
  const navigate = useNavigate()
  
   useEffect(() => {
    const sesion = localStorage.getItem("sesion");
    const hola = localStorage.getItem('sex-education-0')
    console.log(hola)
    
    if(sesion) navigate(`/usuario/${sesion}`)
   

   }, [])
  return (
    <>
      <div>
   
        <Navbar> </Navbar>
        <h1 className='titulo-principal'> Inmersion con peliculas </h1>

      </div>
     
    </>
  )
}

export default App
