import { NavLink } from "react-router-dom";
import LoggedUserGetRequest from "../Pages/LoggedUserGetRequest";
import useUsers from "../Hooks/useUsers";
import AdminDashboardStatistic from "../Pages/Adminpage/AdminDashboardStatistic";


const DashboardHome = () => {
    const [users, loading]=useUsers();




    if(loading)
    {
        return <h1>Loading....</h1>
    }
    // console.log(users);
    


    return (
        <div>
               <h2 className="text-3xl font-bold text-center mb-5">Welcome {users[0].name}</h2>
          



            {
                users[0]?.role === 'donor' ? (
                    <div>
                        <LoggedUserGetRequest />
                        <NavLink to='/dashboard/my-donation-requests'>
                            <button className="btn btn-primary">View My All Requests</button>
                        </NavLink>
                    </div>
                ):(
                    <>
                        <h2>Admin Dashboard</h2>
                        <AdminDashboardStatistic></AdminDashboardStatistic>
                    </>
                ) 
            }
        </div>
    );
    
};

export default DashboardHome;
