import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider, useParams  } from "react-router-dom";

import { CustomProvider } from './context/context';

import Index from './Components/Index/Index'
import ContenedorSerie from './Components/Serie/ContenedorSerie.jsx'
import InputComprensivo from './Components/InputComprensivo'
import ContenedorPelicula from './Components/Pelicula/ContenedorPelicula.jsx'
import ContenedorAgregarClip from './Components/AgregarClip/ContenedorAgregarClip.jsx'
import Registro from './Components/Usuario/Registro';
import IniciarSesion from './Components/Usuario/Sesion';

const router = createBrowserRouter([
      {
        path: "/",
        element: <Index /> ,
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
      {
        path: "/registro",
        element:  <Registro />,
      },
      {
        path: "/iniciar-sesion",
        element:  <IniciarSesion />,
      },
    
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <CustomProvider>
          <RouterProvider router={ router } />
      </CustomProvider>
  </React.StrictMode>

    
)
