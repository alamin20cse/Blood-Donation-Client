import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../Layout/Shared/Loading";
import useUsers from "../Hooks/useUsers";
import { Helmet } from "react-helmet-async";

const BloodDonationRequestPendingDetails = () => {
    const { id } = useParams();
    const [request, setRequest] = useState(null);
    const [loading, setLoading] = useState(true);
    const [users] = useUsers();
    const [showModal, setShowModal] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const donor = users[0] || {}; // Safe accesst
  

    useEffect(() => {
        fetch(`https://blood-donation-server-pied.vercel.app/donation-requests/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setRequest(data);
                setLoading(false);
            })
            .catch((error) => console.error("Error fetching data:", error));
    }, [id]);

    if (loading) {
        return <Loading />;
    }

    // console.log(request)
    const handleConfirmDonation = async () => {
        if (!donor._id || !donor.email) {
            alert("Donor information is missing.");
            return;
        }

        setIsSubmitting(true);

        try {
            const response = await fetch(`https://blood-donation-server-pied.vercel.app/donation-requests/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    DonorId: donor._id,
                    DonorName: donor.name,
                    DonorEmail: donor.email,
                    status: "inprogress",
                }),
            });

            if (response.ok) {
                setRequest({ ...request, status: "inprogress" });
                setShowModal(false);
            } else {
                console.error("Failed to update donation request.");
            }
        } catch (error) {
            console.error("Error updating donation:", error);
        } finally {
            setIsSubmitting(false);
        }
    };
    // console.log(request)

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 pt-16">
              <Helmet>
      <title>Blood Donation Application | Blood Donation Request Details</title>
  </Helmet>
            <div className="bg-white p-6 md:p-8 rounded-lg shadow-lg max-w-lg w-full">
                <h2 className="text-2xl font-bold text-red-600 text-center">🩸 Blood Donation Request</h2>
                <p className="text-center text-gray-600 mt-2">Details of the request</p>

                <div className="mt-6 space-y-4">
                    <p><span className="font-semibold">Recipient:</span> {request.recipientname}</p>
                    <p><span className="font-semibold">Blood Group:</span> {request.bloodgroup}</p>
                    <p><span className="font-semibold">District:</span> {request.districtName} ({request.districtNameBan})</p>
                    <p><span className="font-semibold">Upazila:</span> {request.upazilaName} ({request.upazilaNameBan})</p>
                    <p><span className="font-semibold">Hospital:</span> {request.hospitalname}</p>
                    <p><span className="font-semibold">Full Address:</span> {request.fulladdress}</p>
                    <p><span className="font-semibold">Donation Date:</span> {request.donationdate}</p>
                    <p><span className="font-semibold">Donation Time:</span> {request.donationtime}</p>
                    <p><span className="font-semibold">Email:</span> {request.email}</p>
                    <p><span className="font-semibold">Status:</span> {request.status}</p>
                    <p className=" rounded-2xl p-4"><span className="font-semibold">Request Message:</span> {request.requestmessage}</p>
                    <p className="text-gray-500 text-sm py-4">📅 Requested on: {new Date(request.requestTime).toLocaleDateString()}</p>
                </div>

                <div className=" rounded-2xl p-4">
                    <h1 className="font-bold text-lg">Your Info:</h1>
                    <div className="form-control mb-4">
                        <label className="label text-black"><span className="label-text">Requester Name</span></label>
                        <input type="text" readOnly value={donor.name || "Unknown"} className="input input-bordered text-gray-500" />
                    </div>

                    <div className="form-control mb-4">
                        <label className="label"><span className="label-text text-black">Requester Email</span></label>
                        <input type="email" readOnly value={donor.email || "Unknown"} className="input text-gray-500 input-bordered" />
                    </div>
                </div>

                <button 
                    className="mt-6 w-full bg-blue-600 text-white py-2 rounded-lg shadow-md hover:bg-red-600 transition"
                    onClick={() => setShowModal(true)}
                >
                    Donate
                </button>

                {showModal && (
                    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
                        <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
                            <h2 className="text-lg font-semibold mb-4">Confirm Donation</h2>
                            <p className="text-gray-700 mb-4">Please confirm your donation details:</p>

                            <div className="form-control mb-4">
                                <label className="label"><span className="label-text">Donor Name</span></label>
                                <input type="text" readOnly value={donor.name || "Unknown"} className="input input-bordered" />
                            </div>

                            <div className="form-control mb-4">
                                <label className="label"><span className="label-text">Donor Email</span></label>
                                <input type="email" readOnly value={donor.email || "Unknown"} className="input input-bordered" />
                            </div>

                            <div className="flex justify-between">
                                <button 
                                    className="bg-gray-400 text-white py-2 px-4 rounded-md hover:bg-gray-500 transition"
                                    onClick={() => setShowModal(false)}
                                >
                                    Cancel
                                </button>
                                <button 
                                    className={`bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
                                    onClick={handleConfirmDonation}
                                    disabled={isSubmitting}
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
