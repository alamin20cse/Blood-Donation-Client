import { NavLink, Outlet } from "react-router-dom";
import LoginInfo from "./Shared/LoginInfo";
import { FaHome, FaUser, FaUsers } from "react-icons/fa";
import { MdContentPasteSearch, MdOutlineBloodtype, MdOutlineRequestPage } from "react-icons/md";
import { CiSquareQuestion } from "react-icons/ci";
import useUsers from "../Hooks/useUsers";
import Loading from "./Shared/Loading";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { BsGraphUpArrow } from "react-icons/bs";

const Dashboard = () => {
    const [users, loading] = useUsers();
   
   
    if (loading) {
        return <Loading />;
    }
   

    // Link structure
    const link = (
        <>
            <li>
                <NavLink 
                    to="/" 
                    className={({ isActive }) => isActive ? "text-white bg-blue-500" : "hover:text-white"}
                >
                    <FaHome /> Home
                </NavLink>
            </li>
         
            <li>
                <NavLink 
                    to="/dashboard/profile" 
                    className={({ isActive }) => isActive ? "text-white bg-blue-500" : "hover:text-white"}
                >
                    <FaUser /> Profile
                </NavLink>
            </li>
            
            <li>
                <NavLink 
                    to="/dashboard/donationrequest" 
                    className={({ isActive }) => isActive ? "text-white bg-blue-500" : "hover:text-white"}
                >
                    <MdOutlineBloodtype /> Request Create
                </NavLink>
            </li>
            
            <li>
                <NavLink 
                    to="/dashboard/my-donation-requests" 
                    className={({ isActive }) => isActive ? "text-white bg-blue-500" : "hover:text-white"}
                >
                    <CiSquareQuestion /> My Donation Request
                </NavLink>
            </li>
            
            <li>
                <NavLink 
                    to="/dashboard/content-management" 
                    className={({ isActive }) => isActive ? "text-white bg-blue-500" : "hover:text-white"}
                >
                    <MdContentPasteSearch /> Content Management
                </NavLink>
            </li>
            <li>
                <NavLink 
                    to="/dashboard/statistics" 
                    className={({ isActive }) => isActive ? "text-white bg-blue-500" : "hover:text-white"}
                >
                   <BsGraphUpArrow /> Statistic
                </NavLink>
            </li>




              {/* Admin or Volunteer Role */}
              {(users[0]?.role === 'admin' || users[0]?.role === 'volunteer') && (
               <div>
                <div>
                <div className="divider"></div>
                </div>
                 <li>
                    <NavLink 
                        to="/dashboard/all-blood-donation-request" 
                        className={({ isActive }) => isActive ? "text-white bg-blue-500" : "hover:text-white"}
                    >
                        <MdOutlineRequestPage /> All Donation Requests
                    </NavLink>
                </li>
               </div>
            )}

            {/* Admin Role */}
            {users[0]?.role === 'admin' && (
                
                <li>
                    <NavLink 
                        to="/dashboard/allusers" 
                        className={({ isActive }) => isActive ? "text-white bg-blue-500" : "hover:text-white"}
                    >
                        <FaUsers /> All Users
                    </NavLink>
                </li>
            )}

          
        </>
    );

    return (
        <div className="flex flex-col lg:flex-row min-h-screen">
               <Helmet>
        <title>Blood Donation Application | Dashboard</title>
    </Helmet>
            {/* Navbar for Mobile */}
            <div className="navbar bg-base-100 lg:hidden">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </label>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                            {link}
                        </ul>
                    </div>
                    <a className="btn btn-ghost text-xl">Dashboard</a>
                </div>
            </div>

            {/* Sidebar for Larger Screens */}
            <div className="hidden py-4 lg:block w-64 bg-slate-200  p-4">
                <ul className="space-y-2 menu p-4">
                    {link}
                </ul>
            </div>

            {/* Main Content */}
            <div className="flex flex-col w-full">
            <LoginInfo />
                <div className="flex-1 px-4 bg-gray-50">
                   
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
