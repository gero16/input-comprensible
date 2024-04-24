// Todos los helpers del Context que no usan useState 

export const urlBackend_Produccion = import.meta.env.VITE_URL_BACKEND_PRODUCCION
export const urlBackend_Desarrollo = import.meta.env.VITE_URL_BACKEND_DESARROLLO
export const urlOrigin = "https://input-comprensible.vercel.app/" 

export const urlBackend_Produccion1 = import.meta.env.VITE_URL_BACKEND_PRODUCCION
export const urlBackend_Desarrollo1 = import.meta.env.VITE_URL_BACKEND_DESARROLLO

export const mostrarRespuesta = (subtitulo, id) => {
    const valorAudio = document.querySelector(`.${subtitulo}-${id}`)
    valorAudio.classList.toggle("ocultar")
}
export const separarTexto = (texto, separador) => {
    if(texto.split(separador)) {
        const result = texto.split(separador)
        return result
    }
}

export const transformarMayuscula = (texto, palabras) => {
        const textoSeparado = separarTexto(texto, "-")
        if(palabras > 1) {
            let tituloFinal = ""
            for (let i = 0; i < textoSeparado.length; i++) {
                const palabra = textoSeparado[i].charAt(0).toUpperCase() + textoSeparado[i].slice(1)
                tituloFinal = tituloFinal +  " " + palabra
            }
            return tituloFinal
        }

        if(palabras === 1) {
            const resultadoFinal = texto.charAt(0).toUpperCase() + texto.slice(1)
            return resultadoFinal
        }
}


export const fetchCapitulos = async (titulo) => {
    let arrayCapitulos = []
    const url = `${ urlBackend_Produccion }/titulos/todos/${titulo}`
    const response = await fetch(url,  
        {
            method: 'GET',
            headers: new Headers({
                "Origin": urlOrigin,
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            })
    })

    if(response.status === 200) {
        const resp = await response.json(); 
        if(!resp) console.log("No hay data")
        console.log(resp.data)
        return resp.data
    }

    if(response.status === 404) console.log("Ocurrio un error") 
}

export const fetchGrabaciones = async (clips, urlGrabaciones) => {
    const response = await fetch(urlGrabaciones,  
        {
            method: 'GET',
            headers: new Headers({
                "Origin": urlOrigin,
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            })
        })

        if(response) {
            const resp= await response.json();
            
            if(!resp) console.log("No hay data")
        
            if(clips) {

                let arrayClips = clips
                //console.log(resp.grabaciones)
                arrayClips.forEach(clip => {
                    resp.grabaciones.forEach((grabacion) => {
                        if(clip.id ===  grabacion.id_clip) {
                            clip.grabacion = grabacion.grabacion 
                        }
                    })
                });
            return arrayClips
            }
        }
}

export const fetchCantidadClips = async (urlClips) => {
    const response = await fetch(urlClips,  {
            method: 'GET',
            headers: new Headers({
                "Origin": urlOrigin,
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            })
        })

    if(response) {
        const resp= await response.json();
        if(!resp) console.log("No hay data")
        
        console.log(resp.Numero_Siguiente)
        
        return resp.Numero_Siguiente
    }
}

    