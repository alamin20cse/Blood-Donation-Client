import { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import { FaSun, FaMoon } from "react-icons/fa"; // ✅ Import Icons
import bloodlogo from "../../assets/bloodlogo.webp";

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);
    const [darkMode, setDarkMode] = useState(() => {
        return localStorage.getItem("theme") === "dark";
    });

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    }, [darkMode]);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    const handleLogOut = () => {
        logOut().catch(error => {
            // Handle error if needed
        });
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
        <div className="navbar max-w-screen-xl mx-auto bg-opacity-30 z-30 bg-black fixed text-white">
            <div className="navbar-start">
                {/* Mobile Dropdown */}
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
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
                <ul className="menu menu-horizontal px-1">{links}</ul>
            </div>

            {/* User Section & Dark Mode Toggle */}
            <div className="navbar-end flex items-center space-x-4">
                {/* ✅ Dark Mode Toggle Button */}
                <button onClick={toggleDarkMode} className="btn btn-circle bg-gray-200 dark:bg-gray-800 p-2">
                    {darkMode ? <FaSun className="h-6 w-6 text-yellow-400" /> : <FaMoon className="h-6 w-6 text-gray-800 dark:text-gray-200" />}
                </button>

                {/* ✅ User Dropdown */}
                {user ? (
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="flex items-center px-6 cursor-pointer">
                            <img className="w-10 h-10 rounded-full border-2 border-gray-300" src={user?.photoURL} alt="User Avatar" />
                        </div>
                        <ul className="menu dropdown-content z-[1] bg-slate-200 rounded-lg shadow-lg w-40 p-2">
                            <li>
                                <span className="font-semibold">{user.displayName}</span>
                            </li>
                            <li>
                                <button onClick={handleLogOut} className="btn btn-sm w-full">Logout</button>
                            </li>
                            <li><NavLink className="btn btn-sm w-full" to="/dashboard">Dashboard</NavLink></li>
                        </ul>
                    </div>
                ) : (
                    <details className="dropdown dropdown-end">
                        <summary className="btn btn-outline">Login</summary>
                        <ul className="menu dropdown-content z-[1] bg-base-100 rounded-lg shadow-lg w-40 p-2">
                            <li><Link to="/login" className="btn btn-sm w-full">Login</Link></li>
                            <li><Link to="/signup" className="btn btn-sm w-full">Register</Link></li>
                        </ul>
                    </details>
                )}
            </div>
        </div>
    );
};

export default Navbar;
