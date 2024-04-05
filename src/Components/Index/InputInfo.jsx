import Fondo from "../../assets/fondo.jpg"
import Fondo2 from "../../../public/harry-potter-1-portada.jpg" 
import Fondo3 from "../../../public/bastardos-sin-gloria-portada.jpg" 

const InputInfo = () => {
    return (
        <div className='fondo'>
          <div className="div-titulo">
            <h1 className='titulo-principal'> Input Comprensible </h1>
          </div>

        <main className="main" >

          <ul className='ul-contenido flex-column gap-50'>

            <li className="flex wrap fondo-li p-30">
              
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

            <li className="flex wrap fondo-li-2 p-30">

           
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
              
                <p className="p-index"> Por lo que su práctica fomentaria la adquisición natural del lenguaje a través de la exposición constante 
                  y gradual a estructuras lingüísticas más complejas. </p>
              
            </li>
    
      
            <li className="flex wrap fondo-li-3 p-30" >
            
       
                  <p className="p-index">   Para clasificar la dificultad de comprensión de los clips se tomaron en cuenta diferentes factores.
                      Entre ellos estan la complejidad de la situación que representan, la forma en la que los actores se expresan, sus modismos, etc. </p>
                  <p className="p-index"> Para que la actividad resulte efectiva se recomienda buscar clips de series/peliculas que puedan estar acorde a su nivel.  </p>
                  <p className="p-index"> Asi como ya haber visto la pelicula o el capitulo de su interés. Para tener el contexto suficiente para la comprensión del mismo </p>

              <p className="p-index">
                En cada clip se presenta la posibilidad de evaluar su comprensión escribiendo en su campo correspondiente y seleccionado el boton 'Evaluar'. 
        
              </p>
              <p className="p-index"> También se puede practicar el output correspondiente al clip grabando un audio, que puede guardar o actualizar. </p>
          
              </li>
            

          </ul>

        </main>

      </div>
    )
}

export default InputInfo