import YouTube from 'react-youtube';
import { Link as Navigate, NavLink, Outlet as Page, useLocation } from "react-router-dom";
import "./Recursos.css"
import ImageConversations from "../../assets/conversation.jpg"
import ImageSpeaking from "../../assets/speaking.png"
import ImageListening from "../../assets/listening.jpg"
import ImagePodcast from "../../assets/podcast.png"
import ImageVolver from "../../assets/volver.png"

const Recursos = () => {
    const location = useLocation()
    const opts = {
        height: '400',
        width: '800',
        playerVars: {
          // https://developers.google.com/youtube/player_parameters
          autoplay: 1,
        },
      };

      const opts2 = {
        height: '400',
        width: '800',
        playerVars: {
          // https://developers.google.com/youtube/player_parameters
          autoplay: 1,
          start: 5,
          end: 10
        },
    }


    return (
        
        <>

        {
            location.pathname === `/recursos` 
                ? <> 
                    <NavLink to={`/`}> 
                        <img src={ImageVolver} className='imagen-volver' title="Volver a Inicio" alt='icono para volver a inicio' />
                    </NavLink>
           
           
                <main>
                    <section className='grid-2'>
                        <article className=''>
                            <h2> Mejorar </h2>
                    <NavLink to={`/recursos/mejorar`}> 
                            <img src={ImageSpeaking} className='image-speaking' alt="" />
                    </NavLink>
                        </article>
                        <article>
                            <h2> Conversaciones Reales </h2>
                    <NavLink to={`/recursos/conversations`}> 
                            <img src={ImageConversations}  className='image-conversations' alt="" />
                    </NavLink>
                        </article>
        
                    
                    </section>

                    <section className='grid-2'>
            
        
                        <article>
                            <h2> Listenings </h2>
                        <NavLink to={`/recursos/listening`}> 
                            <img src={ImageListening}   className='image-listenings' alt="" />
                    </NavLink>
                        </article>
                        <article>
                            <h2> Podcast & AudioBooks </h2>
                            <NavLink to={`/recursos/podcasts`}> 
                            <img src={ImagePodcast}  className='image-podcast' alt="" />
                        </NavLink>
                        </article>
        
                    </section>
                
                
                
                {
                    /* 
                    <section className=''>
                        <h2>  Practice Speaking  </h2>
                        <h3></h3>
                    
                    </section>

                    <section className=''>
                        <h2>  Real Conversations </h2>
                        <h3></h3>
                        <YouTube 
                            videoId="LeYIndII13w?si=zjjMC3ovytIUyEIN" 
                            opts={opts2} 
                        />
                    </section>
                    <section className=''>
                        <h2> Pronunciation  </h2>
                        <h3></h3>
                        <YouTube 
                            videoId="lEIaJaNv3C0?si=FFVbpshKK1osUqSh" 
                            opts={opts2} 
                        />

                        <YouTube 
                            videoId="Rjwh7OOraIs?si=ioGIpRu50ZbKZBu5" 
                            opts={opts2} 
                        />
                        
                    </section>
                    
                    */
                }
                
                
                </main>
            </>

            :  <Page> </Page>
        }
          
        

        </>
    )
}

export default Recursos