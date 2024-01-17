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

export const cantidadPaginasHtml = (data) => { 
    let arrayPaginas = []
    if(data.length <= 21) arrayPaginas = [1]
    if(data.length > 21 && data.length < 43) arrayPaginas = [1,2]
    if(data.length > 44 && data.length < 65) arrayPaginas = [1,2,3]
    if(data.length > 65 && data.length < 76) arrayPaginas = [1,2,3,4]
    if(data.length > 77 && data.length < 99) arrayPaginas = [1,2,3,4,5]
    if(data.length > 100 && data.length < 121) arrayPaginas = [1,2,3,4,5,6]

    return arrayPaginas
}

export const setearClipsPagina = (data) => {
    if(paginaActual === 1) mostrarClipsPagina(data, 0, 21)
    if(paginaActual === 2) mostrarClipsPagina(data, 22, 42)
    if(paginaActual === 3) mostrarClipsPagina(data, 43, 63)
    if(paginaActual === 4) mostrarClipsPagina(data, 64, 84)
    if(paginaActual === 5) mostrarClipsPagina(data, 85, 105)
}