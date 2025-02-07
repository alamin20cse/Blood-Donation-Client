import { Link } from "react-router-dom";
import useAllRequest from "../Hooks/useAllRequest";
import Loading from "../Layout/Shared/Loading";

const BloodDonationRequestPending = () => {
    const [allRequest, queryLoading,]=useAllRequest();
    if(queryLoading)
    {
        return <Loading></Loading>
    }
    // console.log(allRequest);
    const filterallRequest = allRequest.filter(request => request.status === "pending");
    // console.log(filterallRequest)




    return (
        <div>
            <h1>All requests :({filterallRequest.length})</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-5">
                {
                    filterallRequest.map(request=><div  key={request._id}>


<div className="card card-compact bg-yellow-400  shadow-xl">
  <figure>
    
  </figure>
  <div className="card-body">
    <h2 className="card-title">Recipient name: 
    {request.recipientname }</h2>
   <div className="bg-amber-200 p-5 rounded-2xl">
   <p>location : </p>
   <p>District: {request.districtName } ({request.districtNameBan }) </p>
   </div>
   <h1 className="text-2xl font-bold">Bloodgroup : {request.bloodgroup}</h1>
   <p>Donation date : {request.donationdate}</p>
   <p>Donation time : {request.donationtime}</p>


    <div className="card-actions justify-end">
     
      <Link to={`/BloodDonationRequestPending/${request._id}`} > <button className="btn btn-primary">View Details</button> </Link>
    </div>
  </div>
</div>




                    </div> )
                }
            </div>
        </div>
    );
};

export default BloodDonationRequestPending;