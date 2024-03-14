import React from 'react'
import ReactDOM from 'react-dom/client'
import "./main.css"
import { createBrowserRouter, RouterProvider, useParams  } from "react-router-dom";

import { CustomProvider } from './context/context';

import Index from './Components/Index/Index'
import ContenedorSerie from './Components/Serie/ContenedorSerie.jsx'
import InputComprensivo from './Components/InputComprensivo'
import ContenedorPelicula from './Components/Pelicula/ContenedorPelicula.jsx'
import ContenedorAgregarClip from './Components/AgregarClip/ContenedorAgregarClip.jsx'
import Registro from './Components/Usuario/Registro';
import IniciarSesion from './Components/Usuario/Sesion';
import Usuario from './Components/Usuario/Usuario';
import Recursos from './Components/Recursos/Recursos.jsx';
import Recurso from "./Components/Recursos/Recurso.jsx"

import ContenedorPruebasPelicula from './Pruebas/ContenedorPruebasPelicula.jsx';
import ContenedorPruebasSerie from './Pruebas/ContenedorPruebasSerie.jsx';
import Pruebas from './Pruebas/Pruebas.jsx';



const router = createBrowserRouter([
      {
        path: "/",
        element: <Index /> ,
      },
      {
        path: "/series/:serie/:temporada/:capitulo",
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
        path: "/agregar-clip/:serie/:temporada/:capitulo",
        element:  <ContenedorAgregarClip />,
      },
      {
        path: "/agregar-clip/:pelicula",
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
      {
        path: "/pruebas",
        element:  <Pruebas />,
      },
      {
        path: "/pruebas/peliculas/:pelicula/:usuario",
        element:  <ContenedorPruebasPelicula />,
      },
      {
        path: "/pruebas/series/:serie/:temporada/:capitulo/:usuario",
        element:  <ContenedorPruebasSerie />,
      },
      {
        path: "/recursos", 
        element:  <Recursos />,
        children : [
          {
            path: ":recurso",
            element:  <Recurso />,
          },
        ]
      },
      {
        path: "/usuario/:usuario",
        element:  <Usuario />,
        children: [
          {
            path: "series/:serie/:temporada/:capitulo",
            element:  <ContenedorSerie />,
          },
          {
            path: "peliculas/:pelicula",
            element:  <ContenedorPelicula />,
          },
        ]
      },
    
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode> </React.StrictMode>
      <CustomProvider>
          <RouterProvider router={ router } />
      </CustomProvider>
 

    
)
