import './Index.css'
import NewNavBar from '../Navbar/NewNavbar'
import NavbarUser from '../Navbar/NavbarUser'
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
   
        <NewNavBar> </NewNavBar>
        <h1 className='titulo-principal'> Inmersion con peliculas </h1>

      </div>
     
    </>
  )
}

export default App
