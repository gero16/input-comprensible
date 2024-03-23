import './Index.css'
import Navbar from '../Navbar/Navbar'
import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Context } from '../../context/context'
import { inject } from '@vercel/analytics';
import InputInfo from './InputInfo'


function App() {
  inject();
  const { urlBackend_Produccion, urlBackend_Desarrollo } = useContext(Context)
  const navigate = useNavigate()
  
   useEffect(() => {
    const sesion = JSON.parse(localStorage.getItem("sesion"))
    
    if(sesion) navigate(`/usuario/${sesion.usuario}`)
   
   }, [])

  return (
    <>

      <Navbar> </Navbar>

      <InputInfo></InputInfo>
     
    </>
  )
}

export default App
