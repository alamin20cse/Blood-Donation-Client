

import Loading from '../Layout/Shared/Loading';
import useUsers from '../Hooks/useUsers';
import { Navigate, useLocation } from 'react-router-dom';

const AdminRoute = ({children}) => {
    const  [users, loading]=useUsers();
    const loaction=useLocation();
    if(loading)
    {
        return <Loading></Loading>
    }
    // console.log(users)
    // console.log(users[0].role);
    

    if(users[0].role==='admin'||users[0].role==='volunteer')
    {
        return children;
    }
    else
    {
        return <Navigate state={loaction.pathname} to='/login' > </Navigate>

    }


    
};


export default AdminRoute;