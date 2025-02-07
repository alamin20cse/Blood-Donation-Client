import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Loading from "../Layout/Shared/Loading";
import { Helmet } from "react-helmet-async";

const UserDetails = () => {
    const { id } = useParams(); // Get the `id` parameter from the route
    const [userDonor, setUserDonor] = useState(null); // State to store user data
    const [error, setError] = useState(null); // State to handle errors

  

    useEffect(() => {
        fetch(`https://blood-donation-server-pied.vercel.app/allusers/${id}`) // Use the dynamic `id`
            .then(res => {
                if (!res.ok) {
                    throw new Error("Failed to fetch user details");
                }
                return res.json();
            })
            .then(data => setUserDonor(data))
            .catch(err => setError(err.message));
    }, [id]); // Dependency array includes `id`

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!userDonor) {
        return <Loading></Loading> ;// Show a loading state while fetching data
    }

  
    const {name,email,photo,bloodgroup,districtName,districtNameBan,upazilaName,upazilaNameBan,status,role,_id}=userDonor;

    return (
        <div className="p-4 card card-compact bg-base-100 w-96 mx-auto shadow-xl">
                <Helmet>
        <title>Blood Donation Application | User Details</title>
    </Helmet>
            <h1 className="text-2xl font-bold">User Details</h1>
            <img src={photo} alt={`${name}'s avatar`} className="w-32 h-32 rounded-full mx-auto mb-4" />
            <p><strong>Name:</strong> {name}</p>
            <p><strong>Email:</strong> {email}</p>
            <p><strong>Blood Group:</strong> {bloodgroup}</p>
            <p><strong>District:</strong> {districtName} ({districtNameBan})</p>
            <p><strong>Upazila:</strong> {upazilaName} ({upazilaNameBan})</p>
            <p><strong>Status:</strong> {status}</p>
            <p><strong>Role:</strong> {role}</p>
           
          <Link to={`/dashboard/donationrequest/${_id}`}>
    <button className="btn btn-primary mr-2">Request for donation</button>
</Link>


        </div>
    );
};

export default UserDetails;
