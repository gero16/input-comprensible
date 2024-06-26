
import { Link as Navigate, NavLink, Outlet as Page, useLocation } from "react-router-dom";
import "./Recursos.css"
import ImageConversations from "../../assets/conversation.jpg"
import ImageSpeaking from "../../assets/speaking.png"
import ImageListening from "../../assets/listening.jpg"
import ImagePodcast from "../../assets/podcast.png"
import Navbar from "../Navbar/Navbar";
import { useContext, useEffect } from 'react';
import { Context } from '../../context/context';
const Recursos = () => {
    const location = useLocation()
    const { fetchTitulos, urlBackend_Produccion, urlBackend_Desarrollo, fetchCantidadClips,evaluarSesion  } = useContext(Context)


    useEffect(() => {
        evaluarSesion()
    },[])


  
    return (
        
        <>

        {
            location.pathname === `/recursos` 
                ? <> 
                
                <Navbar> </Navbar>
           
                <main className='main-recursos'>
                    <section className='grid-2'>
                        <article>
                            <h2 className='h2-recursos'> Práctica </h2>
                            <NavLink to={`/recursos/practica`}> 
                                <img src={ImageSpeaking}   className='image-listenings' alt="imagen del recurso practica" />
                            </NavLink>
                        </article>
                    
                        <article>
                            <h2 className='h2-recursos'> Conversaciones Reales </h2>
                            <NavLink to={`/recursos/conversations`}> 
                                <img src={ImageConversations}  className='image-conversations' alt="imagen del recurso conversaciones" />
                            </NavLink>
                        </article>
        
                    
                    </section>

                    <section className='grid-2'>
                        <article className=''>
                                <h2 className='h2-recursos'> Mejorar </h2>
                                <NavLink to={`/recursos/mejorar`}> 
                                    <img src={ImageListening} className='image-speaking' alt="imagen del recurso mejorar" />
                                </NavLink>
                            </article>
                        <article>
                            <h2 className='h2-recursos'> Podcasts & AudioLibros </h2>
                            <NavLink to={`/recursos/podcasts`}> 
                                <img src={ImagePodcast}  className='image-podcast' alt="imagen del recurso podcast y audiolibros" />
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