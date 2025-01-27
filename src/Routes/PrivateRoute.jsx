import { useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";


const PrivateRoute = ({children}) => {
    const {user,loading}=useContext(AuthContext)
    const loaction=useLocation();
    if(loading)
    {
        <h2>Loading...</h2>
    }
    console.log(user);

    if(user)
    {
        return children;
    }
    else
    {
        return <Navigate state={loaction.pathname} to='/login' > </Navigate>

    }


    
};

export default PrivateRoute;