
const Pelicula = ({data}) => {
    console.log(data)
    return (
        <>
            {
                data.titulo 
                ? data.map(element => {
                   return (
                    <h2> {element.titulo} </h2>
                   )
                })
                : <div> Loading ... </div>
            }

        </>
    )
}

export default Pelicula