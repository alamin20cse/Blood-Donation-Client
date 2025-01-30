import useAllRequest from "../../Hooks/useAllRequest";
import useAllusers from "../../Hooks/useAllusers";
import { FaUsersLine } from "react-icons/fa6";
import usericon from '../../assets/usersicon.png'
import reqicon from '../../assets/requesticon.gif'



const AdminDashboardStatistic = () => {
    const [allRequest, queryLoading]=useAllRequest();
    const [allusers, loading]=useAllusers();
    const isLoading = queryLoading || loading;

    if (isLoading) {
        return <h2>Loading...</h2>;
    }


    console.log(allRequest);
    console.log(allusers);
    


    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:grid-cols-2">

{/* for all user */}
            <div className="flex bg-amber-200 p-4 gap-4 rounded-3xl items-center">
                {/* icon */}
                <div className="w-16 h-16 bg bg-yellow-100 rounded-2xl">
              <img src={usericon}></img>

                </div>
                {/* data and title */}
                <div>
                    <h1 className="text-3xl ">Total users</h1>
                    <h1 className="text-3xl font-bold ">{allusers.length}</h1>


                </div>

            </div>




{/* for all request */}
<div className="flex bg-amber-200 p-4 gap-4 rounded-3xl items-center">
                {/* icon */}
                <div className="w-16 h-16 bg bg-yellow-100 rounded-2xl">
                <img src={reqicon}></img>

                </div>
                {/* data and title */}
                <div>
                    <h1 className="text-3xl ">Total blood donation request</h1>
                    <h1 className="text-3xl font-bold ">{allRequest.length}</h1>


                </div>

            </div>


            


            
        </div>
    );
};

export default AdminDashboardStatistic;