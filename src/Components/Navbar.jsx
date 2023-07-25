import  "./navbar.css"

import Scroll from "react-scroll";
const Link   = Scroll.Link;
const scroll = Scroll.animateScroll;


const NavBar = () => {

    const scrollMore = (e) => {
        console.log(window.innerWidth)
        console.log(e.classList.contains("project"))
        if(e.classList.contains("scream")) scroll.scrollToTop(0);
        if(e.classList.contains("bojack")) scroll.scrollTo(1500);
        if(e.classList.contains("simpsons")) scroll.scrollTo(2600);
        if(e.classList.contains("harry")) scroll.scrollTo(3200);
        if(e.classList.contains("got")) scroll.scrollTo(3900);
        if(e.classList.contains("friends")) scroll.scrollTo(4500);
        if(e.classList.contains("gumball")) scroll.scrollTo(5100);
    }
    
    return (
        <>
        <nav className="flex-between">

            <ul className="lista-navbar flex-center-column">
               
                <li className="p-2 li-nav project">
                    <Link to="" className="flex-center-column scream"  isDynamic={true} onClick={(e) => scrollMore(e.target.parentNode)}> 
                    <span> Scream</span>
                    </Link>
                    
                </li>

                <li className="p-2 li-nav project">
                    <Link to="" className="flex-center-column bojack"  isDynamic={true} onClick={(e) => scrollMore(e.target.parentNode)}> 
                    <span> Bojack Horseman</span>
                    </Link>
                    
                </li>
                <li className="p-2 li-nav main">
                    <Link to="main" className="flex-center-column simpsons" isDynamic={true} onClick={(e) => scrollMore(e.target.parentNode)}>
                        <span>The Simpsons</span>
                          
                    </Link>
                </li>
                <li className="p-2 li-nav main">
                    <Link to="main" className="flex-center-column harry" isDynamic={true} onClick={(e) => scrollMore(e.target.parentNode)}>
                        <span>Harry Potter</span>
                    </Link>
                </li>
               
                <li className="p-2 li-nav main">
                    <Link to="main" className="flex-center-column got" isDynamic={true} onClick={(e) => scrollMore(e.target.parentNode)}>
                        <span>Game Of Thrones</span>
                          
                    </Link>
                </li>
                <li className="p-2 li-nav main">
                    <Link to="main" className="flex-center-column a friends" isDynamic={true} onClick={(e) => scrollMore(e.target.parentNode)}>
                        <span>Friends </span>
                    </Link>
                </li>

                  <li className="p-2 li-nav main">
                    <Link to="main" className="flex-center-column a gumball" isDynamic={true} onClick={(e) => scrollMore(e.target.parentNode)}>
                            <span> Gumball</span>
                    </Link>
                </li>
                
            </ul>
        </nav>
        </>
    )
}
export default NavBar