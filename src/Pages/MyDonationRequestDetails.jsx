import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../Layout/Shared/Loading";

const MyDonationRequestDetails = () => {
    const { id } = useParams();
    const [reqDetails, setReqDetails] = useState(null);

    useEffect(() => {
        fetch(`https://blood-donation-server-pied.vercel.app/donation-requests-logged-user/${id}`)
            .then((res) => res.json())
            .then((data) => setReqDetails(data))
            .catch((error) => console.error("Error fetching request details:", error));
    }, [id]);

    if (!reqDetails) {
        return <Loading></Loading>;
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
                <h2 className="text-2xl font-bold text-center text-red-600">Donation Request</h2>
                
                <div className="mt-4">
                    <p className="text-gray-700"><span className="font-semibold">Recipient:</span> {reqDetails.recipientname}</p>
                    <p className="text-gray-700"><span className="font-semibold">Blood Group:</span> {reqDetails.bloodgroup}</p>
                    <p className="text-gray-700"><span className="font-semibold">Hospital:</span> {reqDetails.hospitalname}</p>
                    <p className="text-gray-700"><span className="font-semibold">Full Address:</span> {reqDetails.fulladdress}</p>
                    <p className="text-gray-700"><span className="font-semibold">District:</span> {reqDetails.districtName} ({reqDetails.districtNameBan})</p>
                    <p className="text-gray-700"><span className="font-semibold">Upazila:</span> {reqDetails.upazilaName} ({reqDetails.upazilaNameBan})</p>
                    <p className="text-gray-700"><span className="font-semibold">Donation Date:</span> {reqDetails.donationdate}</p>
                    <p className="text-gray-700"><span className="font-semibold">Time:</span> {reqDetails.donationtime}</p>
                    <p className="text-gray-700"><span className="font-semibold">Status:</span> 
                        <span className={`ml-2 px-3 py-1 text-white text-sm rounded-full ${
                            reqDetails.status === "pending" ? "bg-yellow-500" : "bg-green-500"
                        }`}>
                            {reqDetails.status}
                        </span>
                    </p>
               
                    <p className="text-gray-700 mt-3"><span className="font-semibold">Message:</span> {reqDetails.requestmessage}</p>
                    <p className="text-gray-700"><span className="font-semibold">Donor Email:</span> {reqDetails.donorEmail}</p>
              
                </div>

                

                <div className="mt-4 text-center">
                    <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition">
                        Cancel Request
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MyDonationRequestDetails;
