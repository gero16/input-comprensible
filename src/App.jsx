import { useState } from 'react'
import AudioSerie from './Components/Audio'
import './App.css'
import { listaScream, listaBojack, listaSimpsons } from './data/database'

function App() {

  return (
    <>
      <div>
        <h1>Audio Movies </h1>

        <main className='container'>

          
          <AudioSerie 
            titulo={"Scream"}
            subtitulo={"scream"} 
            listaAudios={listaScream}
          />

          <AudioSerie 
            titulo={"Bojack Hoerseman"}
            subtitulo={"bojack"} 
            listaAudios={listaBojack}
          />

          <AudioSerie 
            titulo={"The Simpsons"}
            subtitulo={"simpsons"} 
            listaAudios={listaSimpsons}
          />
           
        </main>

      </div>
     
    </>
  )
}

export default App
