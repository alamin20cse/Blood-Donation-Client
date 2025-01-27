import useUsers from "../Hooks/useUsers";

const Profile = () => {
    const [users, loading] = useUsers();

    if (loading) {
        return <h1>Loading...</h1>; // Return the loading state early
    }
    console.log(users)

    const {name,_id,email,photo,bloodgroup,districtName,districtNameBan,upazilaName,upazilaNameBan,districtID,upazilaID,status,role}=users[0];

    return (
        <div>


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
