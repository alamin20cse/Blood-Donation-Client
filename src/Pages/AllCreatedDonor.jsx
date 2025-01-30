import useAllusers from "../Hooks/useAllusers";
import Loading from "../Layout/Shared/Loading";
import UserCard from "./UserCard";


const AllCreatedDonor = () => {
  const   [allusers, loading]=useAllusers();
  
  if (loading) {
    return <Loading></Loading>;
}

    return (
        <div>
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