import { NavLink } from "react-router-dom";


const Home = () => {
    return (
        <div>
            <h2>This is home</h2>
            <ul className="space-y-2">
   
                    <li><NavLink to="/dashboard/donatonreq" className="hover:text-white">All Users</NavLink></li>
                </ul>
            
        </div>
    );
};

export default Home;