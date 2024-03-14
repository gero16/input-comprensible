import { Outlet as Page, useLocation, useParams  } from "react-router-dom"
import NavbarUser from "../Navbar/NavbarUser"
import InputInfo from "../Index/InputInfo"

const Usuario = () => {
    const location = useLocation()
    let { usuario } = useParams();

    return (
        <>

            <NavbarUser> </NavbarUser>
            {
                location.pathname === `/usuario/${usuario}` 
                ? <> 
             
                    <InputInfo></InputInfo>
                </>
                : <> </>
            }
           
            <Page> </Page>
           
        </>
    )
   
}

export default Usuario
