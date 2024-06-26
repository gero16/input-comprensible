import { useEffect, useState } from "react"
import { urlBackend_Produccion, urlOrigin } from "../../context/helpers"
import Clip from "../Clip/Clip"
import ClipMini from "../Clip/ClipMini"
import Navbar from "../Navbar/Navbar"
import "./Buscador.css"

const Buscador = () => {

    const [ frase, setFrase ] = useState("") 
    const [ clipBusqueda, setClipBusqueda ] = useState([]) 

    const urlBuscador = `${urlBackend_Produccion}/buscador/frases`

    const fetchFrase =  async () => {
        try {
            const respuestaClips = await fetch(urlBuscador,  
                {
                    method: 'GET',
                    headers: new Headers({
                        "Origin": urlOrigin,
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*',
                    })
                })
            if(respuestaClips) {
                console.log(respuestaClips) 
                const totalClips = await respuestaClips.json()
                console.log(totalClips)

                console.log(frase.length)
                if(frase !== "" && frase.length > 2) {

                    const busqueda = totalClips.filter((clip) => {
                     
                        return clip.frase.includes(frase);
               
                    })
                    console.log(busqueda)
    
                    setClipBusqueda(busqueda)
                }
            }
            
        
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        console.log(frase)
        //fetchFrase()

        
    }, [frase])


    return (
        <> 

            <Navbar> </Navbar>
            <header className="header-buscador">

                <h1 className="h1-buscador"> Buscador </h1>
                <section className="flex-center gap-20">

                    <input type="text" value={frase} onChange={(e) => setFrase(e.target.value)} className="input-buscar"/>
                    <button onClick={() => fetchFrase()}> Buscar </button>
                </section>
            </header>


            <section className="flex-center gap-20">
            {clipBusqueda.length > 0 
                    ? clipBusqueda.map((element, index) => {

                        return (
     
                                <ClipMini 
                                    id={element.id}
                                    titulo={element.titulo}
                                    subtitulo={element.subtitulo}
                                    video={element.url}
                                    index={index}
                                    frase={element.frase}
                                    dificultad={element.dificultad}
                                    grabacionID={ element.drive_grabacion ? element.drive_grabacion  : ""}
                                    numero_clip={element["numero_clip"]}
                                    imagen={element.imagen}
                                    key={index}
                                />

                            )
                            
                        })
                        : <h3 className="h3-mensaje-buscar"> No hay clips </h3>
                    }
                    </section>
        </>
    )
}

export default Buscador