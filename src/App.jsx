import './App.css'
import { listaBojackVideo } from './data/database'
import NewNavBar from './Components/Navbar/NewNavbar'

function App() {

  console.log(import.meta.env.VITE_URL_BACKEND)
  return (
    <>
      <div>
       <NewNavBar> </NewNavBar>
        
        <h1 className='titulo-principal'> Inmersion con peliculas </h1>

        {
          /*
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

          */
        }

      

      </div>
     
    </>
  )
}

export default App
