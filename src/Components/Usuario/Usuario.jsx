import { Outlet as Page, useLocation, useParams  } from "react-router-dom"
import NavbarUser from "../Navbar/NavbarUser"

const Usuario = () => {
    const location = useLocation()
    let { usuario } = useParams();

    return (
        <>

            <NavbarUser> </NavbarUser>
            {
                location.pathname === `/usuario/${usuario}` 
                ?  <h1> Bienvenido </h1>
                : <> </>
            }
           
            <Page> </Page>
           
        </>
    )
   
}

export default Usuario
