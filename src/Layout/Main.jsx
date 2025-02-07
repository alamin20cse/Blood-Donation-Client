import { Outlet } from "react-router-dom";
import Navbar from "./Shared/Navbar";
import Footer from "./Shared/Footer";

import { Helmet } from "react-helmet-async";


const Main = () => {
  

    return (
        <div>
              <Helmet>
    <title>Blood donation Application </title>
</Helmet>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
            
        </div>
    );
};

export default Main;
