import { Link } from "react-router-dom";
import useAllRequest from "../Hooks/useAllRequest";
import Loading from "../Layout/Shared/Loading";
import { Helmet } from "react-helmet-async";

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
        <div className="pt-20">
           <Helmet>
      <title>Blood Donation Application | Blood Donation Request</title>
  </Helmet>
            <h1>All requests :({filterallRequest.length})</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-5">
                {
                    filterallRequest.map(request=><div  key={request._id}>


<div className="card card-compact bg-white  shadow-xl">
  <figure>
    
  </figure>
  <div className="card-body">
    <h2 className="card-title">Recipient name: 
    {request.recipientname }</h2>
  
   <p className="text-2xl">Location : </p>
   <p>District: {request.districtName } ({request.districtNameBan }) </p>
  
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