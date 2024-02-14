import YouTube from 'react-youtube';
import { Link as Navigate, NavLink, useNavigate, useParams } from "react-router-dom";
import "./Recursos.css"

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
                        <NavLink to={`/recursos/listenings`} > 
                            <span className="span-link "> Listenings <noscript></noscript> </span>
                        </NavLink>
                    </li>
                    <li className="li-nav">
                        <NavLink to={`/recursos/speakings`} > 
                            <span className="span-link "> Practice Speaking  </span>
                        </NavLink>
                    </li>
                    <li className="li-nav">
                        <NavLink to={`/recursos/real-conversations`} > 
                            <span className="span-link "> Real Conversations </span>
                        </NavLink>
                    </li>
                    <li className="li-nav">
                        <NavLink to={`recursos//pronunciation`} > 
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
            </main>
        </>
    )
}

export default Ingles