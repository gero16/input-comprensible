import { Link } from "react-router-dom";

const InputComprensivo = () => {
    return (
        <>
        <ul className="flex-center">
            <li> 
                <Link to="/">    Volver a la página Principal  </Link>
            </li>
        </ul>
        <h1> Input Comprensivo</h1>
            <ul className="lista-input">
                <li>
                    La Hipótesis del input afirma que los estudiantes de idiomas mejoran en una lengua cuando se les da un input lingüístico ligeramente más avanzado que su nivel actual. 
                    Krashen denominó a esto "i + 1" donde "i" es el nivel de lengua actual de una persona y "+1" representa una lengua que es ligeramente más avanzada que su nivel actual.
                </li>
                <li>
                    La hipótesis de adquisición-aprendizaje afirma que la adquisición de una lengua es diferente a aprender una lengua. Krashen sostenía que el aprendizaje -lo que hacemos 
                    cuando estudiamos las reglas gramaticales- no funciona tan bien. En su lugar, el lenguaje se adquiere y eso ocurre a través de un proceso inconsciente cuando estamos 
                    expuestos a un input comprensible.
                </li>
                <li>
                    La hipótesis del monitor afirma que aprender conscientemente el lenguaje (como estudiar reglas gramaticales o hacer ejercicios de vocabulario) puede ayudar a una 
                    persona a monitorizar el output del lenguaje, pero no resulta en mejoras para usar el lenguaje. En otras palabras, aprender reglas gramaticales puede ayudarte 
                    a medir tu capacidad lingüística, pero no a mejorarla realmente. 
                </li>
                <li>
                    La hipótesis del orden natural afirma que la adquisición del lenguaje se produce en un orden natural, que es prácticamente el mismo para todo el mundo. Además, 
                    afirma que la enseñanza de idiomas no cambia este orden "natural". 
                </li>
                <li>
                    La hipótesis del filtro afectivo afirma que el afecto -cómo te sientes- cambia la capacidad de adquisición del lenguaje. Krashen sostiene que las emociones negativas, 
                    como la vergüenza o el miedo, hacen que una persona sea menos capaz de adquirir un idioma.

                </li>

                <li>
                    Los inputs lingüísticos son cosas que oyes (como podcasts, la radio, conversaciones, etc.) así como cosas que lees (como libros, artículos, artículos de blogs en inglés, etc.).
                    Krashen tiene cuidado de especificar que no puedes leer o escuchar cualquier cosa y mejorar tu idioma. Se tiene que leer o escuchar cosas que puedas entender. 
                    La adquisición del lenguaje se produce mejor cuando el input es ligeramente más avanzado que tu propio nivel. 
                </li>

                <li>
                    Krashen sugiere además que el input no sólo debe ser comprensible sino también compulsivo. Esto significa que debe ser interesante para el alumno. 
                    El input convincente sería aquel que es tan interesante que uno se olvida de que está en otro idioma
                </li>
            </ul>
     
        </>
    )
}

export default InputComprensivo