import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import ContenedorSerie from './Components/ContenedorSerie.jsx'
import Pelicula from './Components/Pelicula.jsx'
import InputComprensivo from './Components/InputComprensivo'
import { createBrowserRouter, RouterProvider, useParams  } from "react-router-dom";
import ContenedorPelicula from './Components/ContenedorPelicula.jsx'

const router = createBrowserRouter([
      {
        path: "/",
        element: <App /> ,
      },
      {
        path: "/series/:serie",
        element:  <ContenedorSerie />,
      },
      {
        path: "/peliculas/:pelicula",
        element:  <ContenedorPelicula/>,
      },
      {
        path: "/input-comprensivo",
        element:  <InputComprensivo/>,
      },
    
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={ router }   />
  </React.StrictMode>

    
)
