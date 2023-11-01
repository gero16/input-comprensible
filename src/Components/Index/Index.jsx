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
              <span>
                Con input comprensible nos referimos a un término relacionado con la adquision de un nueva lengua,
                que se deriva de la teoría de la Adquisición del Lenguaje de Stephen Krashen. Esta teoria se 
                refiere a la idea de que para que una persona aprenda un idioma de manera efectiva, el material 
                de entrada o input (como textos, conversaciones, videos, etc.) debe ser comprensible para el mismo.
              </span>
            
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
              <span>
                Es decir, que entenderiamos por comprensible todo aquel input aquel que se presente en un 
                nivel lingüístico ligeramente por encima del conocimiento actual del idioma del estudiante. 
                En otras palabras, que debe ser lo suficientemente desafiante como para que el estudiante tenga 
                que esforzarse un poco para entenderlo, pero no tan difícil como para que resulte incomprensible 
                o abrumador.
              </span>
              
            </li>
            <li className="flex-center div-meme" >
              La idea de este concepto es que cuando un estudiante se expone a una entrada de informacion
              un poco más avanzada que su nivel actual de competencia en el idioma, se encuentra en una "zona de 
              desarrollo próximo". Esta es la zona en la que el aprendizaje es más efectivo, ya que el estudiante está 
              en condiciones de adquirir nuevo conocimiento y construir sobre lo que ya sabe. Por lo que su practica
              fomentaria la adquisición natural del lenguaje a través de la exposición constante y gradual a 
              estructuras lingüísticas más complejas.
            <img 
              src="../../../rana3.png" 
              alt="" 
              className="img-meme"/>
            </li>

            <li className="flex-center div-meme">
              <img 
                src="../../../strong-cheems.png" 
                alt="imagen del meme cheems musculoso" 
                className="img-meme"/>
              <span>
                Hay que tener en cuenta que los clips pueden variar en su dificultad de comprension segun
                su complejidad, idiosincracia, o por el vocabulario que manejan. Por lo que para que la 
                practica del input comprensible tenga efectivad y no se vuelva algo imposible o tedioso 
                se recomienda buscar clips en series/peliculas que puedan estar acorde a su nivel. 
                Asi como haber visto con antelacion la pelicula o el capitulo de su interes. 
                Debido a que en ocaciones si no se tiene en cuenta el contexto puede resultar imposible entender 
                lo que se dice en forma aislada.

              </span>
            </li>

            <li className="flex-center div-meme">
              <span>
                 Para cada clip tiene la posibilidad de evaluar su comprension, escribiendo lo que 
                 le parecio escuchar en el mismo. Asi como practicar el output correspondiente a un 
                 clip determinado, grabando un audio, que puede guardar y actualizar, para compararlo 
                 con el input.
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
