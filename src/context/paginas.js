    const [paginaClips, setPaginaClips] = useState([])
    const [paginaActual, setPaginaActual] = useState([1])
    const [totalPaginas, setTotalPaginas] = useState([]) 

    const setearClipsPagina = (data) => {
        if(paginaActual === 1) mostrarClipsPagina(data, 0, 41)
        if(paginaActual === 2) mostrarClipsPagina(data, 42, 82)
        if(paginaActual === 3) mostrarClipsPagina(data, 83, 123)
        if(paginaActual === 4) mostrarClipsPagina(data, 124, 164)
        if(paginaActual === 5) mostrarClipsPagina(data, 165, 205)
        if(paginaActual === 6) mostrarClipsPagina(data, 206, 246)
    }

    const mostrarClipsPagina = (datos, primerValor, ultimoValor) => {
        let paginas = []
    
        for (let index = primerValor; index < ultimoValor; index++) {
            if(datos[index] === undefined) break
            paginas.push(datos[index])
        }      
        setPaginaClips(paginas, primerValor, ultimoValor)
    
        return paginaClips
    }
    
 const cantidadPaginasHtml = (data) => { 
    let arrayPaginas = []
    if(data.length <= 41) arrayPaginas = [1]
    if(data.length > 41 && data.length < 81) arrayPaginas = [1,2]
    if(data.length > 84 && data.length < 124) arrayPaginas = [1,2,3]
    if(data.length > 125 && data.length < 164) arrayPaginas = [1,2,3,4]
    if(data.length > 165 && data.length < 205) arrayPaginas = [1,2,3,4,5]
    if(data.length > 206 && data.length < 246) arrayPaginas = [1,2,3,4,5,6]
    
    return arrayPaginas
}

const cambiarPagina = (numero) => {
    setPaginaActual(numero)
    return paginaActual
}