import './App.css'
import { listaBojackVideo } from './data/database'
import NewNavBar from './Components/Navbar/NewNavbar'
import { useState } from "react"

function App() {

  console.log(import.meta.env.VITE_URL_BACKEND)
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
