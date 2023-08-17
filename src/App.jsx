import { useEffect, useState } from 'react'


import AudioSerie from './Components/Audio'
import './App.css'
import Navbar from './Components/Navbar'
import { listaScream, listaBojack, listaSimpsons, listaShrek2, listaPeaky, listaRoom  } from './data/database'
import HarryPotter from "../src/assets/harry-potter-logo.png"
import Simpsons from "../src/assets/simpsons.png"
import Bojack from "../src/assets/bojack.png"
import Scream from "../src/assets/scream.png"
import Got from "../src/assets/got.png"
import Friends from "../src/assets/friends-logo.png"
import Gumball from "../src/assets/gumball.webp"
import Shrek2 from "../src/assets/shrek-2.png"
import Peaky from "../src/assets/peaky.png"
import TheRoom from "../src/assets/the-room.jpg"
import { listaBojackVideo } from './data/database'
import NewNavBar from './Components/NewNavbar'

function App() {
  return (
    <>
      <div>
       <NewNavBar> </NewNavBar>
        
        <h1 className='titulo-principal'>Audio Movies </h1>

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
           
         
          <AudioSerie 
            titulo={"Shrek 2"}
            img={Shrek2}
            subtitulo={"shrek-2"} 
            listaAudios={listaShrek2}
          />

          <AudioSerie 
            titulo={"Peaky Blinders"}
            img={Peaky}
            subtitulo={"peaky"} 
            listaAudios={listaPeaky}
          />

          <AudioSerie 
            titulo={"The Room"}
            img={TheRoom}
            subtitulo={"the-room"} 
            listaAudios={listaRoom}
          />
           
        </main>

      </div>
     
    </>
  )
}

export default App
