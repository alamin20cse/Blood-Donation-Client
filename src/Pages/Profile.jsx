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


<div className="card bg-base-100 w-full shadow-xl">
  <figure >
    <img
      src={photo}
      alt={name} />
  </figure>
  <div className="card-body">
    <h2 className="card-title">
      Shoes!
      <div className="badge badge-secondary">NEW</div>
    </h2>
    <p>If a dog chews shoes whose shoes does he choose?</p>
    <div className="card-actions justify-end">
      <div className="badge badge-outline">Fashion</div>
      <div className="badge badge-outline">Products</div>
    </div>
  </div>
</div>
          


        </div>
    );
};

export default Profile;
