import './Index.css'
import Navbar from '../Navbar/Navbar'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function App() {

  console.log(import.meta.env.VITE_URL_BACKEND)   
  const navigate = useNavigate()
  
   useEffect(() => {
    const sesion = localStorage.getItem("sesion");
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
