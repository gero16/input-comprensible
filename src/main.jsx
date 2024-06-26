import React from 'react'
import ReactDOM from 'react-dom/client'

import { createBrowserRouter, RouterProvider, useParams  } from "react-router-dom";

import { CustomProvider } from './context/context';
import { PaginasProvider } from './context/contextPaginas';

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
import ListaPeliculas from './Components/ListaPeliculas/ListaPeliculas.jsx';
import ListaSeries from './Components/ListaSeries/ListaSeries.jsx';
import ContenedorClipDificultad from './Components/ClipDificultad/ContenedorClipDificultad.jsx';
import AgregarTitulo from './Components/AgregarTitulo/AgregarTitulo.jsx';
import ContenedorPeliculaEditar from './Components/PeliculaEditar/ContenedorPeliculaEditar.jsx';
import EditarClipPelicula from './Components/EditarClip/EditarClipPelicula.jsx';
import EditarClipSerie from './Components/EditarClip/EditarClipSerie.jsx';
import ContenedorSerieEditar from './Components/SerieEditar/ContenedorSerieEditar.jsx';
import Buscador from './Components/Buscador/Buscador.jsx';



const router = createBrowserRouter([
      {
        path: "/",
        element: <Index /> ,
      },
      {
        path: "/series",
        element:  <ListaSeries />,
      },
      {
        path: "/series/:serie/:temporada/:capitulo",
        element:  <ContenedorSerie />,
      },
      {
        path: "/peliculas",
        element:  <ListaPeliculas />,
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
        path: "/agregar-titulo",
        element:  <AgregarTitulo />,
      },

      {
        path: "/buscador/frase",
        element:  <Buscador />,
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
            path: "/usuario/:usuario/series/:serie/:temporada/:capitulo",
            element:  <ContenedorSerie />,
          },
          {
            path: "/usuario/:usuario/peliculas/:pelicula",
            element:  <ContenedorPelicula />,
          },
          {
            path: "/usuario/:usuario/series",
            element:  <ListaSeries />,
          },
          {
            path: "/usuario/:usuario/peliculas",
            element:  <ListaPeliculas />,
          },
          {
            path: "/usuario/:usuario/clips/dificultad/:dificultad",
            element:  <ContenedorClipDificultad />,
          },
          {
            path: "/usuario/:usuario/peliculas/:pelicula/editar",
            element:  <ContenedorPeliculaEditar />,
          },
          {
            path: "/usuario/:usuario/series/:serie/:temporada/:capitulo/editar",
            element:  <ContenedorSerieEditar />,
          },
           {
            path: "/usuario/:usuario/peliculas/:pelicula/editar/:idclip",
            element:  <EditarClipPelicula />,
          },
          {
            path: "/usuario/:usuario/series/:serie/:temporada/:capitulo/editar/:idclip",
            element:  <EditarClipSerie />,
          },
        ]
      },
    
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode> </React.StrictMode>
  <PaginasProvider> 

      <CustomProvider>
          <RouterProvider router={ router } />
      </CustomProvider>

  </PaginasProvider>
 

    
)
