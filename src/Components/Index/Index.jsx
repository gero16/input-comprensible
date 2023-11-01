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
    const sesion = localStorage.getItem("sesion");
    const hola = localStorage.getItem('sex-education-0')
    console.log(hola)
    
    if(sesion) navigate(`/usuario/${sesion}`)
   

   }, [])
  return (
    <>
      <div>

        <Navbar> </Navbar>
        <h1 className='titulo-principal'> Input Comprensible </h1>

        <main className="main" >
        <p> En esta página podrás encontrar un lugar donde practicar el input comprensible
          mediante clips cortos de series y peliculas</p>
          <ul>
            <li className="flex-center div-meme"> 
              <img src="../../../rana.png" className="png-inicio" alt="imagen del meme rene" />
              <h2> Pero ¿Que es el input comprensible? </h2>
          
            </li>
            <li className='flex-center div-meme'  >
              <div>
                <p>
                Con input comprensible nos referimos a un término relacionado con la adquision de un nueva lengua,
                que se deriva de la teoría de la Adquisición del Lenguaje de Stephen Krashen. 
                </p>
                <p>
                Esta teoria se refiere a la idea de que para que una persona aprenda un idioma de manera efectiva, el material 
                de entrada o input (como textos, conversaciones, videos, etc.) debe ser comprensible para el mismo.
                </p>
              </div>
      
            <img 
              src="../../../viejo.png" 
              alt="imagen del meme de un hombre que se rie incomododamente" 
              className="img-meme"/>
            </li>
            <li className="flex-center div-meme">
              <img 
                src="../../../cheems.png" 
                alt="imagen del meme de cheems" 
                className="img-meme"/>
                <div>
                  <p>   Es decir, que entenderiamos por input comprensible todo aquel input que reprepresente un 
                nivel lingüístico ligeramente por encima del conocimiento actual del estudiante. </p>
                  <p>   En otras palabras, que debe ser lo suficientemente desafiante como para que el estudiante tenga 
                que esforzarse un poco para entenderlo, pero no tan difícil como para que resulte incomprensible 
                o abrumador.</p>
                </div>
          
            
            </li>
            <li className="flex-center div-meme" >
              <div>
                <p> La idea del concepto propone que cuando un estudiante se expone a una entrada de informacion
                    un poco más avanzada que su nivel actual de competencia, se encuentra en una "zona de 
                    desarrollo próximo". Esta es la zona en la que el aprendizaje es más efectivo, ya que el estudiante está 
                    en condiciones de adquirir nuevo conocimiento y construir sobre lo que ya sabe. </p>
                <p>Por lo que su practica fomentaria la adquisición natural del lenguaje a través de la exposición constante 
                  y gradual a estructuras lingüísticas más complejas.</p>
              </div>
            <img 
              src="../../../rana3.png" 
              alt="" 
              className="img-meme rana2"/>

            </li>

            <li className="flex-center div-meme">
              <img 
                src="../../../strong-cheems.png" 
                alt="imagen del meme cheems musculoso" 
                className="img-meme strong-cheems"/>

                <div>
                  <p> Hay que tener en cuenta que los clips pueden variar en su dificultad de comprension según
                la complejidad de la situación que representan, la idiosincracia del pais de origen para expresarse, 
                o por la propia forma de hablar de los actores para personificar un personaje. </p>
                  <p> Por lo que para que la actividad resulte efectiva se recomienda buscar clips de series/peliculas que puedan estar acorde a su nivel.  </p>
                  <p>   Asi como también haber visto con antelacion la pelicula o el capitulo de su interes. 
                Debido a que en ocasiones si no se tiene en cuenta el contexto puede resultar imposible entender 
                lo que se dice en forma aislada. </p>
                  
                </div>
      
            </li>

            <li className="flex-center div-meme">
              <span>
                 Por cada clip presente tiene la posibilidad de evaluar su comprensión, escribiendo en su campo correspondiente. 
                 Asi como practicar el output correspondiente a un clip determinado, grabando un audio, que puede guardar o en caso de que ya exista
                 actualizar. De forma que quede un registro donde pueda evaluar la similitud entre ambos
              </span>
              <img 
                src="../../../gato.png" 
                className="png-inicio gato" 
                alt="imagen del meme de un gato negro harto" />
            </li>
          </ul>

        </main>

      </div>
     
     
    </>
  )
}

export default App
