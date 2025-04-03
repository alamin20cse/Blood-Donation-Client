import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../AuthProvider/AuthProvider";
import useUsers from "../Hooks/useUsers";
import Loading from "../Layout/Shared/Loading";
import { Helmet } from "react-helmet-async";

const DonationRequest = () => {
    const { user } = useContext(AuthContext);
    const [districts, setDistricts] = useState([]);
    const [upazilas, setUpazilas] = useState([]);
    const [users, loading] = useUsers();
    const [error, setError] = useState(null);

    // Fetch districts on mount
    useEffect(() => {
        fetch("https://blood-donation-server-pied.vercel.app/districts")
            .then((res) => res.json())
            .then((data) => setDistricts(data[2]?.data || []))
            .catch((error) => {
                setError("Failed to load districts.");
                console.error("Error fetching districts:", error);
            });
    }, []);

    // Fetch upazilas based on selected district
    const handleDistrictChange = (e) => {
        const selectedDistrictID = e.target.value;
        setUpazilas([]);

        fetch("https://blood-donation-server-pied.vercel.app/upazilas")
            .then((res) => res.json())
            .then((data) => {
                const filteredUpazilas = data[2]?.data.filter(
                    (upazila) => upazila.district_id === selectedDistrictID
                );
                setUpazilas(filteredUpazilas);
            })
            .catch((error) => {
                setError("Failed to load upazilas.");
                console.error("Error fetching upazilas:", error);
            });
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
    
        // Extract form values
        const formData = new FormData(e.target);
        const selectedDistrict = districts.find((d) => d.id === formData.get("districtID"));
        const selectedUpazila = upazilas.find((u) => u.id === formData.get("upazilaID"));
    
        // Construct recipientData object
        const recipientData = {
            name: user?.displayName || "", // Logged-in user's name
            email: user?.email || "", // Logged-in user's email
            bloodgroup: formData.get("bloodgroup"),
            districtName: selectedDistrict?.name || "Unknown",
            districtNameBan: selectedDistrict?.bn_name || "Unknown",
            upazilaName: selectedUpazila?.name || "Unknown",
            upazilaNameBan: selectedUpazila?.bn_name || "Unknown",
            recipientname: formData.get("recipientname"),
            hospitalname: formData.get("hospitalname"),
            fulladdress: formData.get("fulladdress"),
            donationdate: formData.get("donationdate"),
            donationtime: formData.get("donationtime"),
            requestmessage: formData.get("requestmessage"),
            districtID: formData.get("districtID"),
            upazilaID: formData.get("upazilaID"),
            status: "pending", // Default status
            requestTime: new Date().toISOString(), // Current timestamp
            DonorEmail:'',
            DonorName:'',
            DonorId:'',
        };
    
        // Send data to the backend
        fetch("https://blood-donation-server-pied.vercel.app/donation-requests", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(recipientData),
        })
            .then((res) => res.json())
            .then((result) => {
                if (result?.insertedId) {
                    Swal.fire("Success", "Donation request submitted successfully!", "success");
                    e.target.reset(); // Reset the form after successful submission
                } else {
                    throw new Error("Failed to submit the request.");
                }
            })
            .catch((error) => {
                Swal.fire("Error", "An error occurred during submission.", "error");
                console.error("Submission error:", error);
            });
    };

    if (loading) return <Loading />;
    if (error) return <div className="text-red-500 text-center mt-4">{error}</div>;

    return (
        <div className="hero  min-h-screen bg-white">
              <Helmet>
    <title>Blood Donation Application | Donation Request</title>
</Helmet>
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="card  w-full max-w-sm shadow-2xl">
                    <div className="text-2xl font-semibold text-center  text-black p-4">Create Donation Request</div>
                    <form onSubmit={handleSubmit} className="card-body">
                        {/* Requester Name */}
                        <div className="form-control mb-4">
                            <label className="label">
                                <span className="label-text text-black">Requester Name</span>
                            </label>
                            <input
                                type="text"
                                readOnly
                                value={user?.displayName || ""}
                                className="input text-gray-500 input-bordered"
                            />
                        </div>

                        {/* Requester Email */}
                        <div className="form-control mb-4">
                            <label className="label">
                                <span className="label-text text-black">Requester Email</span>
                            </label>
                            <input
                                type="email"
                                readOnly
                                value={user?.email || ""}
                                className="input text-gray-500 input-bordered"
                            />
                        </div>

                        {/* Recipient Name */}
                        <div className="form-control mb-4">
                            <label className="label">
                                <span className="label-text text-black">Recipient Name</span>
                            </label>
                            <input
                                type="text"
                                name="recipientname"
                                placeholder="Recipient name"
                                className="input input-bordered text-gray-500"
                                required
                            />
                        </div>

                        {/* District Selector */}
                        <div className="form-control mb-4">
                            <label className="label">
                                <span className="label-text text-black">District</span>
                            </label>
                            <select
                                name="districtID"
                                className="select input-bordered  text-gray-500 "
                                onChange={handleDistrictChange}
                                required
                            >
                                <option value="">Select a district</option>
                                {districts.map((district) => (
                                    <option key={district.id} value={district.id}>
                                        {district.name} ({district.bn_name})
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Upazila Selector */}
                        <div className="form-control mb-4">
                            <label className="label">
                                <span className="label-text text-black">Upazila</span>
                            </label>
                            <select
                                name="upazilaID"
                                className="select input-bordered text-gray-500"
                                disabled={!upazilas.length}
                                required
                            >
                                <option value="">
                                    {upazilas.length ? "Select an upazila" : "No upazilas available"}
                                </option>
                                {upazilas.map((upazila) => (
                                    <option key={upazila.id} value={upazila.id}>
                                        {upazila.name} ({upazila.bn_name})
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Hospital Name */}
                        <div className="form-control mb-4">
                            <label className="label">
                                <span className="label-text text-black">Hospital Name</span>
                            </label>
                            <input
                                type="text"
                                name="hospitalname"
                                placeholder="e.g., Dhaka Medical College Hospital"
                                className="input input-bordered text-gray-500"
                                required
                            />
                        </div>

                        {/* Full Address */}
                        <div className="form-control mb-4">
                            <label className="label">
                                <span className="label-text text-black">Full Address</span>
                            </label>
                            <input
                                type="text"
                                name="fulladdress"
                                placeholder="e.g., Zahir Raihan Rd, Dhaka"
                                className="input input-bordered text-gray-500"
                                required
                            />
                        </div>

                        {/* Blood Group Selector */}
                        <div className="form-control mb-4">
                            <label className="label">
                                <span className="label-text text-black">Blood Group</span>
                            </label>
                            <select name="bloodgroup" className="select input-bordered text-gray-500" required>
                                <option value="">Select a blood group</option>
                                <option>A+</option>
                                <option>A-</option>
                                <option>B+</option>
                                <option>B-</option>
                                <option>AB+</option>
                                <option>AB-</option>
                                <option>O+</option>
                                <option>O-</option>
                            </select>
                        </div>

                        {/* Donation Date */}
                        <div className="form-control mb-4">
                            <label className="label">
                                <span className="label-text text-black">Donation Date</span>
                            </label>
                            <input
                                type="date"
                                name="donationdate"
                                className="input input-bordered text-gray-500"
                                required
                            />
                        </div>

                        {/* Donation Time */}
                        <div className="form-control mb-4">
                            <label className="label">
                                <span className="label-text text-black">Donation Time</span>
                            </label>
                            <input
                                type="time"
                                name="donationtime"
                                className="input input-bordered text-gray-500"
                                required
                            />
                        </div>

                        {/* Request Message */}
                        <div className="form-control mb-4">
                            <label className="label">
                                <span className="label-text text-black">Request Message</span>
                            </label>
                            <textarea
                                name="requestmessage"
                                placeholder="Explain why you need blood in detail"
                                className="textarea textarea-bordered text-gray-500"
                                required
                            />
                        </div>

                        {/* Submit Button */}
                        <div className="form-control mt-6">
                            {users?.[0]?.status === "blocked" ? (
                                <button disabled className="btn btn-primary">
                                    Submit Request
                                </button>
                            ) : (
                                <button type="submit" className="btn btn-primary">
                                    Submit Request
                                </button>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default DonationRequest;