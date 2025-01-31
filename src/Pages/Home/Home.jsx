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
            <h2>This is home</h2>
            <ul className="space-y-2">
   
                    <li><NavLink to="/dashboard/donatonreq" className="hover:text-white">All Users</NavLink></li>
                </ul>
            
        </div>
    );
};

export default Home;