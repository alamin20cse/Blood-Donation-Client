import { NavLink } from "react-router-dom";
import LoggedUserGetRequest from "../Pages/LoggedUserGetRequest";
import useUsers from "../Hooks/useUsers";


const DashboardHome = () => {
    const [users, loading]=useUsers();




    if(loading)
    {
        return <h1>Loading....</h1>
    }
    console.log(users);


    return (
        <div>
            {
                users[0]?.role === 'admin' ? (
                    <>
                        <h2>Admin</h2>
                    </>
                ) : (
                    <div>
                        <LoggedUserGetRequest />
                        <NavLink to='/dashboard/my-donation-requests'>
                            <button className="btn btn-primary">View My All Requests</button>
                        </NavLink>
                    </div>
                )
            }
        </div>
    );
    
};

export default DashboardHome;
