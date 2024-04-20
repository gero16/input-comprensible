import { Outlet as Page, useLocation, useParams  } from "react-router-dom"
import NavbarUser from "../Navbar/NavbarUser"
import Index from "../Index/Index"

const Usuario = () => {
    const location = useLocation()
    let { usuario } = useParams();

    return (
        <>

            <NavbarUser> </NavbarUser>
            {
                location.pathname === `/usuario/${usuario}` 
                ? <> 
             
                   <Index> </Index>
                </>
                : <> </>
            }
           
            <Page> </Page>
           
        </>
    )
   
}

export default Usuario
