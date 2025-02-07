import { NavLink } from "react-router-dom";
import LoggedUserGetRequest from "../Pages/LoggedUserGetRequest";
import useUsers from "../Hooks/useUsers";
import AdminDashboardStatistic from "../Pages/Adminpage/AdminDashboardStatistic";
import Loading from "../Layout/Shared/Loading";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";


const DashboardHome = () => {
    const [users, loading]=useUsers();
   



    if(loading)
    {
        return <Loading></Loading>;
    }
    // console.log(users);
   
    


    return (
        <div>
             
  <Helmet>
    <title>Blood Donation Application | Dashboard</title>
</Helmet>
               <h2 className="text-3xl font-bold text-center mb-5">Welcome {users[0]?.name}</h2>
          



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


