import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../AuthProvider/AuthProvider";

const Navbar = () => {
    const {user,logOut}=useContext(AuthContext)
    // console.log(user);
    
const handleLogOut = () => {
    logOut()
        .then(() => { })
        .catch(error => console.log(error));
  }
  


    const link=<>
    
     <li><NavLink to='/'>Home</NavLink></li>
     <li><NavLink to='/signup'>Sign up</NavLink></li>
     <li><NavLink to='/login'>Loagin</NavLink></li>
     <li><NavLink to='/dashboard'>Dashboard</NavLink></li>

     
    
 


       
    
    </>


// console.log(user)


    return (
        <div className="navbar max-w-screen-xl mx-auto  bg-opacity-30 z-30 bg-black text-white">
  <div className="navbar-start">
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
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-slate-300  rounded-box z-[1] mt-3 w-52 p-2 shadow">
       
{link}


      </ul>
    </div>
    <a className="btn btn-ghost text-xl">Bistro Boss</a>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
      {link}
    </ul>
  </div>
  <div className="navbar-end">
   
    

     {    user ? <>
                <span>{user?.displayName}</span>
                <button onClick={handleLogOut} className="btn btn-ghost">LogOut</button>
            </> : <>
                <button><Link to="/login">Login</Link></button>
            </>
        }
    

  </div>
</div>
    );
};

export default Navbar;