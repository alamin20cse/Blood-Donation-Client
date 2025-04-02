import { NavLink } from "react-router-dom";
import Bannar from "../Bannar";
import ExtraSection from "../ExtraSection";
import Contact from "../Contact";
import Bannar1 from "../../Layout/Bannar1";

import { Helmet } from "react-helmet-async";


const Home = () => {
   
    return (
        <div className="pt-16">
             <Helmet>
    <title>Blood Donation Application | Home</title>
</Helmet>
            <Bannar></Bannar>
            <div className="flex lg:flex-row flex-col gap-3
            ">
                <Bannar1></Bannar1>

            </div>
            <ExtraSection></ExtraSection>
            <Contact></Contact>
           
            
        </div>
    );
};

export default Home;