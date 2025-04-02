import { useEffect } from "react";
import useAllusers from "../Hooks/useAllusers";
import Loading from "../Layout/Shared/Loading";
import UserCard from "./UserCard";
import { Helmet } from "react-helmet-async";


const AllCreatedDonor = () => {
  const   [allusers, loading]=useAllusers();
 
  
  if (loading) {
    return <Loading></Loading>;
}

    return (
        <div className="pt-16">
            <Helmet>
     <title>Blood Donation Application | Donation Request Create</title>
 </Helmet>
            <h1>All users:{allusers.length}</h1>
          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-3">
          {
             allusers.map((user, index)=><UserCard user={user} key={index} ></UserCard>)
           }
          </div>
            
        </div>
    );
};

export default AllCreatedDonor;