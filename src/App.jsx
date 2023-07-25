import { useState } from 'react'
import AudioSerie from './Components/Audio'
import './App.css'
import Navbar from './Components/Navbar'
import { listaScream, listaBojack, listaSimpsons } from './data/database'
import HarryPotter from "../src/assets/harry-potter-logo.png"
import Simpsons from "../src/assets/simpsons.png"
import Bojack from "../src/assets/bojack.png"
import Scream from "../src/assets/scream.png"
import Got from "../src/assets/got.png"
import Friends from "../src/assets/friends-logo.png"
import Gumball from "../src/assets/gumball.webp"


function App() {

  return (
    <>
      <div>
        <Navbar></Navbar>
        <h1>Audio Movies </h1>

        <main className='container'>

          
          
          <AudioSerie 
            titulo={"Scream"}
            img={Scream}
            subtitulo={"scream"} 
            listaAudios={listaScream}
          />

          <AudioSerie 
            titulo={"Bojack Hoerseman"}
            subtitulo={"bojack"} 
            img={Bojack}
            listaAudios={listaBojack}
          />

          <AudioSerie 
            titulo={"The Simpsons"}
            img={Simpsons}
            subtitulo={"simpsons"} 
            listaAudios={listaSimpsons}
          />

          <AudioSerie 
            titulo={"Harry Potter"}
            img={HarryPotter}
            subtitulo={"harry"} 
            listaAudios={listaSimpsons}
          />

          <AudioSerie 
            titulo={"Game of Thrones"}
            img={Got}
            subtitulo={"got"} 
            listaAudios={listaSimpsons}
          />

          <AudioSerie 
            titulo={"Friends"}
            img={Friends}
            subtitulo={"friends"} 
            listaAudios={listaSimpsons}
          />

          <AudioSerie 
            titulo={"The amazing world of Gumball"}
            img={Gumball}
            subtitulo={"gumball"} 
            listaAudios={listaSimpsons}
          />
           
           
        </main>

      </div>
     
    </>
  )
}

export default App