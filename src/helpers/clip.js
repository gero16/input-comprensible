import { useEffect, useState } from "react";
export const clickGrabar = (e) => {
    const [idGrabar, setIdGrabar] = useState()

    const idAGrabar = e.classList[1]
    const claseNombrePelicula = e.classList[2]
    // Tengo un error si toco el btn pausar 
    if(claseNombrePelicula) {
        const separar = claseNombrePelicula.split("-")
        const nombrePelicula = separar[2]
        const arrayRecorders = document.querySelectorAll(`.audio-recorder-${nombrePelicula}`)
        const separar2 = idAGrabar.split("-")
        const idSolo = separar2[2]

        const nodelistToArray = Array.apply(null, arrayRecorders);
        nodelistToArray.forEach(element => {
            if(!element.classList.contains(`audio-recorder-${idSolo}`))  element.style.display = "none"
            if(element.children[0].title === "Save recording") element.style.display = "flex"
        });
        setIdGrabar(e.classList[1])
    }
}


export const evaluar = (subtitulo, id) => {
    const [evaluarAudio, setEvaluarAudio] = useState([false])
    
    const valorAudio = document.querySelector(`.${subtitulo}-${id}`)
    const subtituloIncorrecto = document.querySelector(`.${subtitulo}-mostrar-${id}`)
    const valueInput = document.querySelector(`.input-${subtitulo}-${id}`)
    const respInput = document.querySelector(`.inputRespuesta-${subtitulo}-${id}`)

    if(valueInput.value == respInput.value) {
        setEvaluarAudio(true)
        valorAudio.classList.toggle("ocultar")
        subtituloIncorrecto.classList.add("ocultar")
    } else {
        console.log("No son iguales!")
        valorAudio.classList.add("ocultar")
        subtituloIncorrecto.classList.toggle("ocultar")
    }
}

export const mostrarRespuesta = (subtitulo, id) => {
    const valorAudio = document.querySelector(`.${subtitulo}-${id}`)
    valorAudio.classList.toggle("ocultar")
}

export const addAudioElement = (blob, subtitulo, id) => {
    let reader = new FileReader();
    reader.readAsDataURL(blob); // convierte el blob a base64 y llama a onload

    reader.onload = function() {
      const audiosLocalStorage = JSON.parse(localStorage.getItem(subtitulo))
      const found = audiosLocalStorage.find((objetoAudio) => `audio-mic-${Number(objetoAudio.id)}` === idGrabar);

      if(found && `audio-mic-${id}` === idGrabar ){  
          const aud = document.querySelector(`.grabacion-${subtitulo}-${id}`) 
          console.log(aud)
          aud.src = reader.result
          audiosLocalStorage[id].audio = reader.result
          localStorage.setItem(`${subtitulo}`, JSON.stringify(audiosLocalStorage))
      }
    }
   };