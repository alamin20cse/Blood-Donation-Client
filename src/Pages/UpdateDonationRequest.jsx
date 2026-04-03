import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import Loading from "../Layout/Shared/Loading";
import { Helmet } from "react-helmet-async";

const UpdateDonationRequest = () => {
    const { user } = useContext(AuthContext);
    const { id } = useParams(); // Get ID from URL params

    // State Variables
    const [reqUser, setReqUser] = useState(null);
    const [districts, setDistricts] = useState([]);
    const [upazilas, setUpazilas] = useState([]);
    const [loadingReqUser, setLoadingReqUser] = useState(true);
    const [loadingDistricts, setLoadingDistricts] = useState(true);
    const [error, setError] = useState(null);


    // Fetch donation request details
    useEffect(() => {
        setLoadingReqUser(true);
        fetch(`https://blood-donation-server-pied.vercel.app/donation-requests-logged-user/${id}`)
            .then((res) => {
                if (!res.ok) throw new Error("Failed to fetch donation request details");
                return res.json();
            })
            .then((data) => {
                setReqUser(data);
                setLoadingReqUser(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoadingReqUser(false);
            });
    }, [id]);

    // Fetch districts
    useEffect(() => {
        fetch("https://blood-donation-server-pied.vercel.app/districts")
            .then((res) => res.json())
            .then((data) => {
                setDistricts(data[2]?.data || []);
                setLoadingDistricts(false);
            })
            .catch((error) => {
                setError("Failed to load districts.");
                console.error("Error fetching districts:", error);
                setLoadingDistricts(false);
            });
    }, []);

    // Handle district change
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

        const formData = new FormData(e.target);
        const selectedDistrict = districts.find((d) => d.id === formData.get("districtID"));
        const selectedUpazila = upazilas.find((u) => u.id === formData.get("upazilaID"));

        const recipientData = {
            name: user?.displayName || "",
            email: user?.email || "",
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
            status: "pending",
            requestTime: new Date().toISOString(),
        };

        fetch(`https://blood-donation-server-pied.vercel.app/donation-requests/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(recipientData),
        })
            .then((res) => res.json())
            .then((result) => {
                if (result.modifiedCount > 0 || result.upsertedCount > 0) {
                    Swal.fire("Success", "Donation request updated successfully!", "success");
                 
                } else {
                    throw new Error("Failed to update the request.");
                }
                // console.log(result.modifiedCount,result.upsertedCount);
            })
            .catch((error) => {
                Swal.fire("Error", "An error occurred during submission.", "error");
                console.error("Submission error:", error);
            });
    };

    // Handle errors
    // const handleError = (title, message) => {
    //     Swal.fire({ icon: "error", title, text: message });
    // };

    // Show loading or error messages
    if (loadingReqUser || loadingDistricts) {
        return <Loading />;
    }
    if (error) {
        Swal.fire("Error", error, "error");
    }

    return (
        <div className="hero bg-base-200 min-h-screen">
                
      <Helmet>
        <title>Blood Donation Application | Update Donation request</title>
    </Helmet>
            <div className="hero-content flex-col lg:flex-row-reverse ">
                <div className="card bg-base-100 w-full max-w-sm shadow-2xl">
                    <div className="text-2xl font-semibold text-center text-gray-500 p-4">Update Donation Request</div>
                    <form onSubmit={handleSubmit} className="card-body bg-white">
                        {/* Requester Name */}
                        <div className="form-control mb-4">
                            <label className="label">
                                <span className="label-text text-black">Requester Name</span>
                            </label>
                            <input
                                type="text"
                                readOnly
                                value={user?.displayName || ""}
                                className="input input-bordered text-gray-500"
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
                                className="input input-bordered text-gray-500"
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
                                defaultValue={reqUser?.recipientname || ""}
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
                                className="select input-bordered text-gray-500"
                                onChange={handleDistrictChange}
                                defaultValue={reqUser?.districtID || ""}
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
                                defaultValue={reqUser?.upazilaID || ""}
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
                                defaultValue={reqUser?.hospitalname || ""}
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
                                defaultValue={reqUser?.fulladdress || ""}
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
                            <select
                                name="bloodgroup"
                                className="select input-bordered text-gray-500"
                                defaultValue={reqUser?.bloodgroup || ""}
                                required
                            >
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
                                defaultValue={reqUser?.donationdate || ""}
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
                                defaultValue={reqUser?.donationtime || ""}
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
                                defaultValue={reqUser?.requestmessage || ""}
                                placeholder="Explain why you need blood in detail"
                                className="textarea textarea-bordered text-gray-500"
                                required
                            />
                        </div>

                        {/* Submit Button */}
                        <div className="form-control mt-6">
                            {user?.status === "blocked" ? (
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

export default UpdateDonationRequest;