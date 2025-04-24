import useAllRequest from "../../Hooks/useAllRequest";
import useAllusers from "../../Hooks/useAllusers";



import Loading from "../../Layout/Shared/Loading";
import usePayment from "../../Hooks/usePayment";
import { FcDonate } from "react-icons/fc";
import { MdOutlineRequestQuote } from "react-icons/md";
import { FaUser, FaUsers } from "react-icons/fa";



const AdminDashboardStatistic = () => {
    const [allRequest, queryLoading]=useAllRequest();
    const [allusers, loading]=useAllusers();
    const  [allPayment,qLoading,refetch]=usePayment();
    const isLoading = queryLoading || loading||qLoading;
    const totalPrice=allPayment.reduce((total,item)=>total+parseInt(item.price),0)

    if (isLoading) {
        return <Loading></Loading>;
    }


    // console.log(allRequest);
    // console.log(allusers);
    // console.log(allPayment);
    


    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:grid-cols-2">

{/* for all user */}
            <div className="flex bg-gray-200 p-4 gap-4 rounded-3xl items-center">
                {/* icon */}
                <div className="w-16 h-16 bg bg-yellow-100 rounded-2xl">
                <FaUsers  className="w-full h-full"/>

                </div>
                {/* data and title */}
                <div>
                    <h1 className="text-3xl ">Total users</h1>
                    <h1 className="text-3xl text-red-600  font-bold ">{allusers.length}</h1>


                </div>

            </div>




{/* for all request */}
<div className="flex bg-gray-200 p-4 gap-4 rounded-3xl items-center">
                {/* icon */}
                <div className="w-16 h-16 bg bg-yellow-100 rounded-2xl">
                <MdOutlineRequestQuote className="w-full h-full" />

                </div>
                {/* data and title */}
                <div>
                    <h1 className="text-3xl ">Total blood donation request</h1>
                    <h1 className="text-3xl text-red-600 font-bold ">{allRequest.length}</h1>


                </div>

            </div>

{/* for  FUNDING */}
<div className="flex bg-gray-200 p-4 gap-4 rounded-3xl items-center">
                {/* icon */}
                <div className="w-16 h-16 bg bg-gray-200 rounded-2xl">
              <FcDonate className="w-full h-full"></FcDonate>

                </div>
                {/* data and title */}
                <div>
                    <h1 className="text-3xl ">Total Funding</h1>
                    <h1 className="text-3xl text-red-600 font-bold ">${totalPrice}</h1>


                </div>

            </div>


            


            
        </div>
    );
};

export default AdminDashboardStatistic;