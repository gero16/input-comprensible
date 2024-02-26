import YouTube from 'react-youtube';
import { Link as Navigate, NavLink, useNavigate, useParams, useLocation } from "react-router-dom";
import "./Recursos.css"


const Recurso = () => {
    let { recurso } = useParams();
    const location = useLocation()

    console.log(recurso)
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
          end: 10,
          fs: 0
        },
    }

// getSecondsLoaded()	
    return (
        //   location.pathname === `/recursos` 
        <>
            <nav className='nav'>
                
                <ul className="lista-navbar navbar-principal flex-center-column">
                 
                    <li className="li-nav">
                        <NavLink to={`/recursos/practica`} > 
                            <span className="span-link "> Práctica </span>
                        </NavLink>
                    </li>
                    <li className="li-nav">
                        <NavLink to={`/recursos/podcast`} > 
                            <span className="span-link "> Podcasts </span>
                        </NavLink>
                    </li>
                    <li className="li-nav">
                        <NavLink to={`/recursos/conversations`} > 
                            <span className="span-link "> Conversaciones </span>
                        </NavLink>
                    </li>
                    <li className="li-nav">
                        <NavLink to={`/recursos/mejorar`} > 
                            <span className="span-link "> Mejorar </span>
                        </NavLink>
                    </li>
                    <li className="li-nav">
                        <NavLink to={`/recursos`} > 
                            <span className="span-link "> Inicio  </span>
                        </NavLink>
                    </li>
                 
                </ul>
            </nav>

            <main>
                {
                    location.pathname === `/recursos/practica` 
                    ? <>
                     
                        <h2> Listenings </h2>
                        <section>
                            <h3> Advanced Listening Practice </h3>
                            <YouTube 
                                videoId="QO66N1LrNCg?si=_fOzXOdG8CpczOFu" 
                                opts={opts2} 
                                />
                        </section>
              
                     
                    </>
                    : <> </>
                }
                {
                    location.pathname === `/recursos/conversations` 
                    ? <>
                        <h2> Conversations </h2>
                        <h3>  </h3>

                        <section>
                            <h3> </h3>
                            <YouTube 
                                videoId="LeYIndII13w?si=Ou3TzcNJze46AcjZ" 
                                opts={opts2} 
                                loading={"lazy"}
                                />
                        </section>
                        <section>
                            <h3> </h3>
                            <YouTube 
                                videoId="b-PzAyZae-g?si=9rOCNXHoFMd8hyfb" 
                                opts={opts2} 
                                loading={"lazy"}
                                />
                        </section>
                        <section>
                            <h3> </h3>
                            <YouTube 
                                videoId="QO66N1LrNCg?si=_fOzXOdG8CpczOFu" 
                                opts={opts2} 
                                loading={"lazy"}
                                />
                        </section>
                      
                    </>
                    : <> </>
                }

                {
                      location.pathname === `/recursos/mejorar` 
                        ? <>
                          <h2> Mejorar Comprensión oral </h2>
                           
                          <section>
                                <h3> Como unir palabras en inglés </h3>
                                <YouTube 
                                    videoId="nbGZtHRKOo4" 
                                    opts={opts2} 
                                    />
                            </section>
                            <section>
                                <h3> How to Understand Fast English </h3>
                                <YouTube 
                                    videoId="D6_qpaSxAQc?si=Nq4LlaCUHqxD1A3m" 
                                    opts={opts2} 
                                />
                            </section>

                            <section>
                                <h3> Correspondencia en la pronunciación del castellano y el inglés </h3>
                                <YouTube 
                                    videoId="Rjwh7OOraIs?si=QrNzH9oBsJpkVoWG" 
                                    opts={opts2} 
                                />

                            
                            </section>
                            <section>
                                <h3>  </h3>
                                <YouTube 
                                    videoId="52MSH5pmHk0?si=FI0IVQF-tbBaO8hD" 
                                    opts={opts2} 
                                />

                            
                            </section>
                            <section>
                                <h3>  </h3>
                                <YouTube 
                                    videoId="h0AEBxmEDBo?si=v1w5Y4W3uXSy_SNw" 
                                    opts={opts2} 
                                />
                            </section>
                            
                  
                           
                        </>
                        : <> </>
                }
                 {
                      location.pathname === `/recursos/podcasts` 
                        ? <>
                          <h2> Podcasts </h2>
                           
                          <section>
                                <h3>  </h3>
                                <YouTube 
                                    videoId="ZnJCowa9RWE?si=ZHsuejcko4d-g66c" 
                                    opts={opts2} 
                                    />
                            </section>
                            <section>
                                <h3> sh </h3>
                                <YouTube 
                                    videoId="Pgwbvpu9F9E?si=JbLvfXWf3N8Wh0AW" 
                                    opts={opts2} 
                                />
                            </section>
                            
                  
                           
                        </>
                        : <> </>
                }
          
              
            </main>
        </>
    )
}

export default Recurso