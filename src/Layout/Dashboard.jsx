import { NavLink, Outlet } from "react-router-dom";
import LoginInfo from "./Shared/LoginInfo";

const Dashboard = () => {
    return (
        <div className="flex   flex-col lg:flex-row min-h-screen">
            {/* Navbar for Mobile */}
            <div className="navbar bg-base-100  lg:hidden">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </label>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                            <li><NavLink to="/">Home</NavLink></li>
                            <li><NavLink to="/dashboard/ex">Check</NavLink></li>
                            <li><NavLink to="/dashboard/profile">Profile</NavLink></li>
                            <li><NavLink to='/allcreateddonor'>Request created</NavLink></li>
                            <li><NavLink to="/dashboard/allusers">All Users</NavLink></li>
                        </ul>
                    </div>
                    <a className="btn btn-ghost text-xl">Dashboard</a>
                </div>
            </div>

            {/* Sidebar for Larger Screens */}
            <div className="hidden  py-4 lg:block w-64 bg-orange-400 p-4">
                <ul className="space-y-2">
                    <li><NavLink to="/" className="hover:text-white">Home</NavLink></li>
                    <li><NavLink to="/dashboard/ex" className="hover:text-white">Check</NavLink></li>
                    <li><NavLink to="/dashboard/profile" className="hover:text-white">Profile</NavLink></li>
                    <li><NavLink to='/allcreateddonor'>Request created</NavLink></li>
                    <li><NavLink to="/dashboard/allusers" className="hover:text-white">All Users</NavLink></li>
                </ul>
            </div>

            {/* Main Content */}
           <div className="flex flex-col w-full">


           <div className="flex-1 p-4 bg-gray-50">
                <LoginInfo></LoginInfo>
                <Outlet />
            </div>

            {/* dashboard */}
            <div>
                
            </div>

           </div>
        </div>
    );
};

export default Dashboard;
