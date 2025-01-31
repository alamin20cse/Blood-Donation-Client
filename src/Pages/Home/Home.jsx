import { NavLink } from "react-router-dom";
import Bannar from "../Bannar";
import ExtraSection from "../ExtraSection";
import Contact from "../Contact";


const Home = () => {
    return (
        <div>
            <Bannar></Bannar>
            <ExtraSection></ExtraSection>
            <Contact></Contact>
           
            
        </div>
    );
};

export default Home;