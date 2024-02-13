import YouTube from 'react-youtube';
import { Link as Navigate, NavLink, useNavigate, useParams } from "react-router-dom";
import "./Ingles.css"

const Ingles = () => {
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
            <nav className='nav'>
                <ul className="lista-navbar navbar-principal flex-center-column">
                 
                    <li className="li-nav">
                        <NavLink to={`/iniciar-sesion`} > 
                            <span className="span-link "> Listenings <noscript></noscript> </span>
                        </NavLink>
                    </li>
                    <li className="li-nav">
                        <NavLink to={`/clases`} > 
                            <span className="span-link "> Practice Speaking  </span>
                        </NavLink>
                    </li>
                    <li className="li-nav">
                        <NavLink to={`/registro`} > 
                            <span className="span-link "> Real Conversations </span>
                        </NavLink>
                    </li>
                    <li className="li-nav">
                        <NavLink to={`/agregar-clip`} > 
                            <span className="span-link "> Pronunciation </span>
                        </NavLink>
                    </li>
                    <li className="li-nav">
                        <NavLink to={`/`} > 
                            <span className="span-link "> Inicio  </span>
                        </NavLink>
                    </li>
                 
                </ul>
            </nav>
            <h1> Info Speaking </h1>
            

            <main>
                <section className=''>
                    <h2> Listenings </h2>
                    <h3> How to Understand Fast English </h3>
                    <YouTube 
                        videoId="D6_qpaSxAQc?si=3mpgVFfIGmwN7I74" 
                        opts={opts2} 
                    />
                       <YouTube 
                        videoId="52MSH5pmHk0?si=dsUBBDJxBGhzJFqO" 
                        opts={opts} 
                    />
                </section>
               

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
               
            </main>
        </>
    )
}

export default Ingles