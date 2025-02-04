import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import bloodlogo from '../../assets/bloodlogo.jpg';

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);

    const handleLogOut = () => {
        logOut().catch(error => console.log(error));
    };

    const links = (
        <>
            <li><NavLink to="/">Home</NavLink></li>  
            <li><NavLink to="/BloodDonationRequestPending">Donation Requests</NavLink></li>
            <li><NavLink to="/blogpublic">Blog</NavLink></li>
            <li><NavLink to="/funding">Funding</NavLink></li>
        </>
    );

    return (
        <div className="navbar max-w-screen-xl mx-auto bg-opacity-30 z-30 bg-black text-white">
            <div className="navbar-start">
                {/* Mobile Dropdown */}
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
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
                    </div>
                    <ul className="menu menu-sm dropdown-content bg-slate-300 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                        {links}
                    </ul>
                </div>
                <Link to="/" className="btn btn-ghost text-xl">
                    <img className="w-16 h-16 rounded-full" src={bloodlogo} alt="Blood Logo" />
                </Link>
            </div>

            {/* Center Nav Links (Desktop) */}
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {links}
                </ul>
            </div>

            {/* User Section (Login/Logout Dropdown) */}
            <div className="navbar-end">
                {user ? (
                    <div className="dropdown  dropdown-end"> {/* ✅ Right-Aligned Dropdown */}
                        <div tabIndex={0} role="button" className="flex items-center px-6 cursor-pointer">
                            <img className="w-10 h-10  rounded-full border-2 border-gray-300" src={user?.photoURL} alt="User Avatar" />
                        </div>
                        <ul className="menu dropdown-content z-[1] bg-amber-200 rounded-lg shadow-lg w-40 p-2">
                            <li>
                                <span className="font-semibold">{user.displayName}</span>
                            </li>
                            <li>
                                <button onClick={handleLogOut} className="btn btn-sm btn-error w-full">
                                    Logout
                                </button>
                            </li>
                           
                            <li><NavLink className='btn btn-sm btn-error w-full' to="/dashboard">Dashboard</NavLink></li>

                           
                        </ul>
                    </div>
                ) : (
                    <details className="dropdown dropdown-end"> {/* ✅ Right-Aligned Login Dropdown */}
                        <summary className="btn btn-outline">Login</summary>
                        <ul className="menu dropdown-content z-[1] bg-base-100 rounded-lg shadow-lg w-40 p-2">
                            <li>
                                <Link to="/login" className="btn btn-sm w-full">Login</Link>
                            </li>
                            <li>
                                <Link to="/signup" className="btn btn-sm btn-primary w-full">Register</Link>
                            </li>
                        </ul>
                    </details>
                )}
            </div>
        </div>
    );
};

export default Navbar;
