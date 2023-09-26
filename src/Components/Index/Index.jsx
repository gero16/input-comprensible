import './Index.css'
import NewNavBar from '../Navbar/NewNavbar'
import NavbarUser from '../Navbar/NavbarUser'

function App() {

  console.log(import.meta.env.VITE_URL_BACKEND)   
   //
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
