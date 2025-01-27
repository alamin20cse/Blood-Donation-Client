import { NavLink, Outlet } from "react-router-dom";


const Dashboard = () => {
    return (
        <div className="flex">
            <div className="w-64 min-h-screen bg-orange-400">
                <ul>
                    <li>a</li>
                   
                    <li><NavLink to='/'>Home</NavLink></li>
                    <li><NavLink to='/dashboard/ex'>cheak</NavLink></li>
                    <li><NavLink to='/dashboard/profile'>Profile</NavLink></li>
                </ul>

            </div>
            <div className="flex-1">
                <Outlet></Outlet>
            </div>


            
        </div>
    );
};

export default Dashboard;