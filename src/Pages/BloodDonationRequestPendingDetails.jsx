import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../Layout/Shared/Loading";
import useUsers from "../Hooks/useUsers";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";

const BloodDonationRequestPendingDetails = () => {
  const { id } = useParams();
  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [users] = useUsers();
  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [donorPhone, setDonorPhone] = useState("");

  const donor = users?.[0] || {};

  // Set donor phone if available
  useEffect(() => {
    if (donor?.phone) setDonorPhone(donor.phone);
  }, [donor]);

  // Fetch donation request data
  useEffect(() => {
    fetch(`https://blood-donation-server-pied.vercel.app/donation-requests/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setRequest(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to load request data!",
        });
      });
  }, [id]);

  if (loading) return <Loading />;

  const handleConfirmDonation = async () => {
    // Validate donor information
    if (!donor._id || !donor.email) {
      Swal.fire({ 
        icon: "error", 
        title: "Error", 
        text: "Donor information is missing!" 
      });
      return;
    }

    // Validate phone number
    if (!donorPhone || donorPhone.trim() === "") {
      Swal.fire({ 
        icon: "warning", 
        title: "Phone Required", 
        text: "Please enter your phone number!" 
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const timenow = new Date().toISOString();
      
      // Log the data being sent for debugging
      const updateData = {
        DonorId: donor._id,
        DonorName: donor.name || donor.displayName || "Unknown",
        DonorEmail: donor.email,
        DonorPhone: donorPhone, // Make sure this is using the state value
        donationConfirmTime: timenow,
        status: "inprogress",
      };
      
      console.log("Sending update data:", updateData);

      const response = await fetch(
        `https://blood-donation-server-pied.vercel.app/donation-requests/${id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updateData),
        }
      );

      if (response.ok) {
        const updatedRequest = await response.json();
        
        // Update the local request state with all new data
        setRequest({
          ...request,
          DonorId: donor._id,
          DonorName: donor.name || donor.displayName || "Unknown",
          DonorEmail: donor.email,
          DonorPhone: donorPhone, // Use the current donorPhone state
          donationConfirmTime: timenow,
          status: "inprogress",
        });
        
        setShowModal(false);
        
        // Reset phone input if needed
        // setDonorPhone("");

        Swal.fire({
          icon: "success",
          title: "Donation Successful 🎉",
          text: "You have successfully accepted this donation request!",
          confirmButtonColor: "#16a34a",
        });
        
        // Optional: Refresh the page or redirect after 2 seconds
        setTimeout(() => {
          // window.location.reload(); // Uncomment if you want to refresh
        }, 2000);
        
      } else {
        const errorData = await response.text();
        console.error("Server response:", errorData);
        Swal.fire({ 
          icon: "error", 
          title: "Failed", 
          text: "Failed to update donation request!" 
        });
      }
    } catch (error) {
      console.error("Error updating donation:", error);
      Swal.fire({ 
        icon: "error", 
        title: "Error", 
        text: "Something went wrong! Please try again." 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 pt-20 px-2">
      <Helmet>
        <title>Blood Donation Application | Blood Donation Request Details</title>
      </Helmet>

      <div className="bg-white p-6 md:p-8 rounded-lg shadow-lg max-w-lg w-full">
        <h2 className="text-2xl font-bold text-red-600 text-center">🩸 Blood Donation Request</h2>
        <p className="text-center text-gray-600 mt-2">Details of the request</p>

        {/* Request Info */}
        <div className="mt-6 space-y-3 text-sm break-words">
          <p><b>Recipient:</b> {request?.recipientname}</p>
          <p><b>Blood Group:</b> {request?.bloodgroup}</p>
          <p><b>District:</b> {request?.districtName} ({request?.districtNameBan})</p>
          <p><b>Upazila:</b> {request?.upazilaName} ({request?.upazilaNameBan})</p>
          <p><b>Hospital:</b> {request?.hospitalname}</p>
          <p><b>Address:</b> {request?.fulladdress}</p>
          <p><b>Date:</b> {request?.donationdate}</p>
          <p><b>Time:</b> {request?.donationtime}</p>
          <p><b>Email:</b> {request?.email}</p>
          <p><b>Phone Number:</b> {request?.phone}</p>
          <p>
            <b>Status:</b>{" "}
            <span className={`px-2 py-1 rounded text-white text-xs ${
              request?.status === "pending" ? "bg-red-500" : 
              request?.status === "inprogress" ? "bg-yellow-500" : "bg-green-500"
            }`}>
              {request?.status || "pending"}
            </span>
          </p>
          <p className="bg-gray-100 p-3 rounded"><b>Message:</b> {request?.requestmessage}</p>
          <p className="text-gray-500 text-xs">📅 Requested on: {new Date(request?.requestTime).toLocaleDateString()}</p>
          
          {/* Display donor info if already assigned */}
          {request?.DonorName && (
            <>
              <p className="mt-2 text-blue-600"><b>Assigned Donor:</b> {request.DonorName}</p>
              <p><b>Donor Email:</b> {request.DonorEmail}</p>
              <p><b>Donor Phone:</b> {request.DonorPhone}</p>
              <p><b>Confirmed on:</b> {new Date(request?.donationConfirmTime).toLocaleString()}</p>
            </>
          )}
        </div>

        {/* Donor Info */}
        <div className="mt-4 bg-gray-50 p-4 rounded">
          <h1 className="font-bold text-lg mb-2">Your Info:</h1>
          <input 
            type="text" 
            readOnly 
            value={donor?.name || donor?.displayName || "Unknown"} 
            className="input input-bordered w-full mb-2 text-gray-500" 
          />
          <input 
            type="email" 
            readOnly 
            value={donor?.email || "Unknown"} 
            className="input input-bordered w-full text-gray-500" 
          />
          <input 
            type="tel" 
            placeholder="Donor phone number (required)" 
            value={donorPhone} 
            onChange={(e) => setDonorPhone(e.target.value)} 
            className="input input-bordered w-full mt-4 text-gray-500" 
            required
          />
        </div>

        {/* Donate Button */}
        <button 
          className={`mt-6 w-full py-2 rounded-lg transition ${
            request?.status === "done" || request?.status === "inprogress" 
              ? "bg-gray-400 text-white cursor-not-allowed" 
              : "bg-blue-600 text-white hover:bg-red-600"
          }`} 
          onClick={() => setShowModal(true)} 
          disabled={request?.status === "done" || request?.status === "inprogress"}
        >
          {request?.status === "done" && "Already Donated"}
          {request?.status === "inprogress" && "Donation In Progress"}
          {request?.status === "pending" && "Donate"}
        </button>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
              <h2 className="text-lg font-semibold mb-3">Confirm Donation</h2>
              <p className="text-sm text-gray-600 mb-3">You are about to accept this donation request.</p>
              
              <input 
                type="text" 
                readOnly 
                value={donor?.name || donor?.displayName || "Unknown"} 
                className="input input-bordered w-full mb-2 bg-gray-50" 
              />
              <input 
                type="email" 
                readOnly 
                value={donor?.email || "Unknown"} 
                className="input input-bordered w-full mb-4 bg-gray-50" 
              />
              <input 
                type="tel" 
                placeholder="Donor phone number (required)" 
                value={donorPhone} 
                onChange={(e) => setDonorPhone(e.target.value)} 
                className="input input-bordered w-full mb-4" 
                required
              />

              <div className="flex justify-between gap-3">
                <button 
                  className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 transition" 
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button 
                  className={`bg-green-500 text-white px-4 py-2 rounded transition ${
                    isSubmitting ? "opacity-50 cursor-not-allowed" : "hover:bg-green-600"
                  }`} 
                  onClick={handleConfirmDonation} 
                  disabled={isSubmitting || !donorPhone.trim()}
                >
                  {isSubmitting ? "Processing..." : "Confirm"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BloodDonationRequestPendingDetails;