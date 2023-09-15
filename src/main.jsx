import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import ContenedorSerie from './Components/ContenedorSerie.jsx'
import Pelicula from './Components/Pelicula.jsx'
import InputComprensivo from './Components/InputComprensivo'
import { createBrowserRouter, RouterProvider, useParams  } from "react-router-dom";
import ContenedorPelicula from './Components/ContenedorPelicula.jsx'
import ContenedorAgregarClip from './Components/ContenedorAgregarClip.jsx'
// No se si el fetch en vite funciono por esto pero por las dudas lo dejo
//import 'vite/modulepreload-polyfill'

const router = createBrowserRouter([
      {
        path: "/",
        element: <App /> ,
      },
      {
        path: "/series/:serie/:temporada/",
        element:  <ContenedorSerie />,
      },
      {
        path: "/peliculas/:pelicula",
        element:  <ContenedorPelicula />,
      },
      {
        path: "/input-comprensivo",
        element:  <InputComprensivo />,
      },
      {
        path: "/agregar-clip",
        element:  <ContenedorAgregarClip />,
      },
    
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={ router }   />
  </React.StrictMode>

    
)
