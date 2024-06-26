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

        <header className="div-titulo">
          <h1 className='titulo-principal'> Input Comprensible </h1>
        </header>

        <main className="main" >

          <ul className='ul-contenido flex-column gap-50'>

            <li className="flex wrap li-index fondo-li p-30 flex-column-center">
 
                <h3 className="p-index"> En esta página podrás encontrar un lugar donde practicar tanto input comprensible como el 
                   shadowing mediante clips cortos de series y peliculas. Actualmente solo se encuentran clips de peliculas y 
                    series en inglés. Tanto inglesas como estado unidenses
                </h3>
                <h2> ¿ Que es el Input Comprensible ?</h2>
                <h4 className="p-index">
                  Con input comprensible nos referimos a un término relacionado con la adquision de un nueva lengua,
                  que se deriva de la teoría de la Adquisición del Lenguaje de Stephen Krashen. 
                </h4>
                <h4 className="p-index">
                  Esta teoria se refiere a la idea de que para que una persona aprenda un idioma de manera efectiva, el material 
                  de entrada o input (como textos, conversaciones, videos, etc.) debe ser comprensible para el mismo.
                </h4>
             
         
              </li>
 

            <li className="flex wrap li-index fondo-li-2 p-30 flex-column-center">
 
                <h4 className="p-index">  Es decir, se entiende por input comprensible todo aquella entrada de información que reprepresente un 
                    nivel lingüístico ligeramente por encima del conocimiento actual del estudiante.
                </h4>
                <h4 className="p-index">
                    En otras palabras, que debe ser lo suficientemente desafiante para que el estudiante tenga 
                    que esforzarse para entenderlo, pero no tan difícil como para que resulte incomprensible 
                    o abrumador.
                </h4>
                <h4 className="p-index">
                  La idea del concepto propone que cuando un estudiante se expone a una entrada de información
                  un poco más avanzada que su nivel actual de competencia, se encuentra en una "zona de 
                  desarrollo próximo". Zona en la que el aprendizaje es más efectivo, debido a que el estudiante está 
                  en condiciones de adquirir nuevo conocimiento y construir sobre lo que ya conoce.
                </h4>
              
                <h4 className="p-index"> Por lo que su práctica fomentaria la adquisición natural del lenguaje a través de la exposición 
                  constante y gradual a estructuras lingüísticas más complejas. 
                </h4>
              
            </li>
    

            <li className="flex wrap li-index fondo-li-3 p-30 flex-column-center" >
              <h2> Shadowing </h2>
              <h3 className='p-index' > El shadowing es una técnica de aprendizaje de idiomas en la que que se busca repetir un audio justo después de escucharlo. La idea es tratar de actuar como un "eco" o una "sombra" (de ahí el nombre "shadowing). 
                Se escucha, en base a ello se trata de repeir las palabras en voz alta. 
              </h3>
              <h2> ¿Cómo ayuda el shadowing? </h2>
              <h3 className='p-index'> 
              El objetivo principal de la técnica del shadowing es el de familiarizarse con el idioma extranjero. A la larga se busca acostumbrarse eficazmente al sonido del idioma extranjero cuando se lo repita. 
              Esto te ayudará especialmente a entrenar tu comprensión auditiva. El shadowing también ayuda a mejorar la pronunciación. Cuando haces shadowing, entrenas los movimientos de la lengua y boca típicos de tu idioma extranjero.

              </h3>

          
            </li>
      
            <li className="flex wrap li-index fondo-li-4 p-30 flex-column-center" >
            
              <h5 className="p-index">   Para la clasificacion de la dificultad de los clips se trato de guiarme por mi propia comprensión de los mismos, pero teniendo en cuenta también otros factores importantes.
               Entre ellos: La complejidad de la situación en la cual los dialogos se desarrollan; La complejidad del vocabulario utilizado; El grado de dependencia que puedan llegar de datos externos o previos;
              La forma en la que los personajes se expresan, su claridad, acento, modismos, etc. 
              </h5>
              <h5 className="p-index"> Para que la actividad resulte efectiva se recomienda buscar clips de series/peliculas que puedan 
                estar acorde a su nivel. Así como también haber visto la pelicula o el capitulo de interés con anterioridad. Tener un contexto de la situacion en la que el clip se desarrolla 
                aporta informacion valiosa al momento de comprender diálogos que quizas aisladamente puedan resultar muy complicados o imposibles.
              </h5>

            </li>

            
            <li className="flex wrap li-index fondo-li-5 p-30 flex-column-center" >
            
              <h6 className="p-index">
               Para cada clip se recomienda escucharlo varias veces y luego tratar de replicar lo entendido grabandolo en audio. Tambien 
               se puede evaluar su comprension escribiendo en el campo de texto correspondiente y tocar el boton "Evaluar" para verificarlo.
              </h6>

              <h6 className="p-index"> La opcion "Mostrar Respuesta" siempre esta disponible; Para realizar grabaciones, debera registrase. Una vez tenga un usuario 
               las grabacaciones podran guardarse, tanto como actualizarse o borrarse. 
              </h6>
          
            </li>
            

          </ul>

        </main>
     
    </>
  )
}

export default App
