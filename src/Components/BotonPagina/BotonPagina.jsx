const BotonPagina = ({paginaActual, cambiarPagina, numeroPagina}) => {
    return (
        <button 
            className={`button-pagina ${paginaActual == numeroPagina ? "button-selected" : ""  }`} 
            onClick={() => cambiarPagina(numeroPagina)}>  {numeroPagina}
        </button>
    )
}

export default BotonPagina