import { Link } from "react-router-dom";


const UserCard = ({user}) => {

    const {name,photo,bloodgroup,districtName}=user;
  
    return (
        <div className="card bg-base-100 shadow-xl">
        <figure className="h-[180px]">
          <img className="w-full h-full"
            src={photo}
            alt="Shoes" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">
           {name}
            
          </h2>
          <p>Blood group : {bloodgroup}</p>
          <p>districtName: {districtName}</p>

          <Link to={`/dashboard/usersDetails/${user._id}`}>
    <button className="btn btn-primary mr-2">See details</button>
</Link>

         
        </div>
      </div>
    );
};

export default UserCard;