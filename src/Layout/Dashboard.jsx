import { NavLink, Outlet } from "react-router-dom";
import LoginInfo from "./Shared/LoginInfo";
import { FaHome, FaUser, FaUsers } from "react-icons/fa";
import { MdContentPasteSearch, MdOutlineBloodtype, MdOutlineRequestPage } from "react-icons/md";
import { CiSquareQuestion } from "react-icons/ci";


const Dashboard = () => {

    const link= <>
     <li ><NavLink to="/" className="hover:text-white"><FaHome></FaHome>Home</NavLink></li>
                    <li><NavLink to="/dashboard/ex" className="hover:text-white"> <FaHome></FaHome> Check</NavLink></li>
                    <li><NavLink to="/dashboard/profile" className="hover:text-white"><FaUser></FaUser> Profile</NavLink></li>
                    <li><NavLink to='/dashboard/donationrequest'className="hover:text-white"><MdOutlineBloodtype/> Request created</NavLink></li>
                    <li><NavLink to="/dashboard/allusers" className="hover:text-white"><FaUsers></FaUsers> All Users</NavLink></li>
                    <li><NavLink to="/dashboard/my-donation-requests" className="hover:text-white"><CiSquareQuestion />My Donation Request</NavLink></li>
                    <li><NavLink to="/dashboard/all-blood-donation-request" className="hover:text-white"><MdOutlineRequestPage />All Donation Request</NavLink></li>
                    <li><NavLink to="/dashboard/content-management" className="hover:text-white"><MdContentPasteSearch />Content Management</NavLink></li>
    </>
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
                           {link}
                        </ul>
                    </div>
                    <a className="btn btn-ghost text-xl">Dashboard</a>
                </div>
            </div>

            {/* Sidebar for Larger Screens */}
            <div className="hidden  py-4 lg:block w-64 bg-orange-400 p-4">
                <ul className="space-y-2 menu p-4">
                   

{link}


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
