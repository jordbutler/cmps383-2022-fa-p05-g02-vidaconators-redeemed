import { Outlet } from "react-router-dom";
import { WebAppBar } from "../Components/AppBar"
const Layout = () => {
  return (
    <>
      <nav>

        <WebAppBar />
        
      </nav>

      <Outlet />
    </>
  )
};

export default Layout;