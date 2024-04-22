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
              
                <p className="p-index"> En esta página podrás encontrar un lugar donde practicar el Input Comprensible
                    mediante clips cortos de series y peliculas. Actualmente solo se encuentran clips de peliculas y 
                    series en inglés. Tanto inglesas como estado unidenses
                </p>
                <h2> ¿ Que es el Input Comprensible ?</h2>
                <p className="p-index">
                  Con input comprensible nos referimos a un término relacionado con la adquision de un nueva lengua,
                  que se deriva de la teoría de la Adquisición del Lenguaje de Stephen Krashen. 
                </p>
                <p className="p-index">
                  Esta teoria se refiere a la idea de que para que una persona aprenda un idioma de manera efectiva, el material 
                  de entrada o input (como textos, conversaciones, videos, etc.) debe ser comprensible para el mismo.
                </p>
             
         
            </li>

            <li className="flex wrap li-index fondo-li-2 p-30 flex-column-center">
 
                <p className="p-index">  Es decir, se entiende por input comprensible todo aquella entrada de información que reprepresente un 
                    nivel lingüístico ligeramente por encima del conocimiento actual del estudiante.
                </p>
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
            
              <p className="p-index">   Para clasificar la dificultad de los clips traté de guiarme por mi propia comprensión de los mismos, pero teniendo en cuenta también otros factores importantes.
               Entre ellos: La complejidad de la situación en la cual los dialogos se desarrollan; La complejidad del vocabulario utilizado; El grado de dependencia que puedan llegar de datos externos o previos;
              La forma en la que los personajes se expresan, su claridad, acento, modismos, etc. 
              </p>
              <p className="p-index"> Para que la actividad resulte efectiva se recomienda buscar clips de series/peliculas que puedan 
                estar acorde a su nivel. Así como también haber visto la pelicula o el capitulo de interés con anterioridad. Tener un contexto de la situacion en la que el clip se desarrolla 
                aporta informacion valiosa al momento de comprender diálogos que quizas aisladamente puedan resultar muy complicados o imposibles.
              </p>

            </li>

            
            <li className="flex wrap li-index fondo-li-4 p-30 flex-column-center" >
            
              <p className="p-index">
               Para cada clip se recomienda escucharlo varias veces y luego tratar de replicar lo entendido grabandolo en audio. Tambien 
               se puede evaluar su comprension escribiendo en el campo de texto correspondiente y tocar el boton "Evaluar" para verificarlo.
              </p>

              <p className="p-index"> La opcion "Mostrar Respuesta" siempre esta disponible; Para realizar grabaciones, debera registrase. Una vez tenga un usuario 
               las grabacaciones podran guardarse, tanto como actualizarse o borrarse. 
              </p>
          
            </li>
            

          </ul>

        </main>
     
    </>
  )
}

export default App
