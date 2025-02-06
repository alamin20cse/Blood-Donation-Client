import { Link } from "react-router-dom";
import useUsers from "../Hooks/useUsers";
import Loading from "../Layout/Shared/Loading";

const Profile = () => {
    const [users, loading] = useUsers();
    console.log(users)

    if (loading) {
        return <Loading></Loading>; // Return the loading state early
    }
    // console.log(users)

    const {name,email,photo,bloodgroup,districtName,districtNameBan,upazilaName,upazilaNameBan,status,role,_id
        // districtID,upazilaID,_id
    }=users[0]||'';

    return (
        <div>
          <div>
            <Link to={`/dashboard/profileEdit/${_id}`}><button className="btn btn-primary">Edit </button></Link>
          </div>


<div className="card bg-gray-300 w-full shadow-xl">
  <figure >
    <img
      src={photo}
      alt={name} />
  </figure>
  <div className="card-body">
    <h2 className="card-title">
      {name}
     
    </h2>
    <p>Email{email}</p>
    <p>District: {districtName}</p>
    <p>District: {districtNameBan}</p>
    <p>Upazila: {upazilaName}</p>
    <p>Upazila: {upazilaNameBan}</p>

    <div className="card-actions ">
     <div className="flex flex-col lg:flex-row gap-3 items-center">
     <div className="text-[16px] font-bold p-4 rounded-3xl bg-lime-100">Blood group:{bloodgroup}</div>
     <div className="badge badge-outline bg-pink-200">Role:{role}</div>
     <div className="badge badge-outline bg-pink-200">Status: {status}</div>
     
     </div>
    </div>
  </div>
</div>
          


        </div>
    );
};

export default Profile;
