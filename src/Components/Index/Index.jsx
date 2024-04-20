import './Index.css'
import Navbar from '../Navbar/Navbar'
import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Context } from '../../context/context'
import { inject } from '@vercel/analytics';

function App() {
  inject();
  const { urlBackend_Produccion, urlBackend_Desarrollo } = useContext(Context)
  const navigate = useNavigate()
  
   useEffect(() => {
    let traerSesion = localStorage.getItem("sesion")
    const sesion = traerSesion ? JSON.parse(traerSesion) : ""
    console.log(sesion)
    if(sesion) navigate(`/usuario/${sesion.usuario}`)
   
   }, [])

  return (
    <>

      <Navbar> </Navbar>

      <div className="div-titulo">
          <h1 className='titulo-principal'> Input Comprensible </h1>
        </div>

        <main className="main" >

          <ul className='ul-contenido flex-column gap-50'>

            <li className="flex wrap li-index fondo-li p-30 flex-column-center">
              
                <p className="p-index"> En esta página podrás encontrar un lugar donde practicar el input comprensible
                    mediante clips cortos de series y peliculas 
                </p>
                <p className="p-index">
                  Con input comprensible nos referimos a un término relacionado con la adquision de un nueva lengua,
                  que se deriva de la teoría de la Adquisición del Lenguaje de Stephen Krashen. 
                </p>
                <p className="p-index">
                  Esta teoria se refiere a la idea de que para que una persona aprenda un idioma de manera efectiva, el material 
                  de entrada o input (como textos, conversaciones, videos, etc.) debe ser comprensible para el mismo.
                </p>
              
                <p className="p-index">  Es decir, se entiende por input comprensible todo aquella entrada de información que reprepresente un 
                    nivel lingüístico ligeramente por encima del conocimiento actual del estudiante.
                </p>
         
            </li>

            <li className="flex wrap li-index fondo-li-2 p-30 flex-column-center">

                <p className="p-index">
                    En otras palabras, que debe ser lo suficientemente desafiante para que el estudiante tenga 
                    que esforzarse para entenderlo, pero no tan difícil como para que resulte incomprensible 
                    o abrumador.
                </p>
                <p className="p-index">
                  La idea del concepto propone que cuando un estudiante se expone a una entrada de información
                  un poco más avanzada que su nivel actual de competencia, se encuentra en una "zona de 
                  desarrollo próximo". Zona en la que el aprendizaje es más efectivo, debido a que el estudiante está 
                  en condiciones de adquirir nuevo conocimiento y construir sobre lo que ya conoce.
                </p>
              
                <p className="p-index"> Por lo que su práctica fomentaria la adquisición natural del lenguaje a través de la exposición 
                  constante y gradual a estructuras lingüísticas más complejas. 
                </p>
              
            </li>
    
      
            <li className="flex wrap li-index fondo-li-3 p-30 flex-column-center" >
            
              <p className="p-index">   Para clasificar la dificultad de comprensión de los clips trare de basarme en mi propia comprension 
                de los modismos pero teniendo también en cuenta en cuenta diferentes factores. Entre ellos estan la complejidad de la 
                situación que  representan, la forma en la que los actores se expresan, sus modismos, etc. 
              </p>
              <p className="p-index"> Para que la actividad resulte efectiva se recomienda buscar clips de series/peliculas que puedan 
                estar acorde a su nivel. Asi como haber visto la pelicula o el capitulo de su interés con anterioridad. De forma de tener
                  un mejor contexto ayude en su omprensión 
              </p>

              <p className="p-index">
               Para cada clip se recomienda escucharlo y en base a lo entendido grabar un audio para compararse con el original. Tambien 
               puede evaluarsu comprension escribiendo en el campo de texto correspondiente y tocar el boton "Evaluar" para verificarlo.
              </p>

              <p className="p-index"> La opcion "Mostrar Respuesta" siempre esta disponible. Y las grabacaciones pueden quedar guardadas 
                tanto como actualizarse o borrarse. 
              </p>
          
            </li>
            

          </ul>

        </main>
     
    </>
  )
}

export default App
