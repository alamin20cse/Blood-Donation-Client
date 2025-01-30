import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import Loading from "../Layout/Shared/Loading";


const UpdateDonationRequest = () => {
    const { user } = useContext(AuthContext);
    const { id } = useParams(); // Get ID from URL params


  

    // State Variables
    const [reqUser, setReqUser] = useState(null);
    const [userDonor, setUserDonor] = useState(null);
    const [districts, setDistricts] = useState([]);
    const [upazilas, setUpazilas] = useState([]);
    const [loadingReqUser, setLoadingReqUser] = useState(true);
    const [loadingAllUser, setLoadingAllUser] = useState(true);
    const [error, setError] = useState(null);

    // Fetch donor details
    useEffect(() => {
        setLoadingReqUser(true);
        fetch(`http://localhost:5000/donation-requests-logged-user/${id}`)
            .then((res) => {
                if (!res.ok) throw new Error("Failed to fetch user details");
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

    // Fetch user donor details
    useEffect(() => {
        if (!reqUser || !reqUser.donorID) return; 

        setLoadingAllUser(true);
        fetch(`http://localhost:5000/allusers/${reqUser.donorID}`)
            .then((res) => {
                if (!res.ok) throw new Error("Failed to fetch donor details");
                return res.json();
            })
            .then((data) => {
                setUserDonor(data);
                setLoadingAllUser(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoadingAllUser(false);
            });
    }, [reqUser]);

    // destic
    useEffect(() => {
        fetch("http://localhost:5000/districts")
            .then((res) => res.json())
            .then((data) => setDistricts(data[2]?.data || []))
            .catch((error) => {
                handleError("Error", "Failed to load districts.");
                console.error("Error fetching districts:", error);
            });
    }, []);

    // Handle district change
    const handleDistrictChange = (e) => {
        const selectedDistrictID = e.target.value;
        setUpazilas([]);

        fetch("http://localhost:5000/upazilas")
            .then((res) => res.json())
            .then((data) => {
                const filteredUpazilas = data[2]?.data.filter(
                    (upazila) => upazila.district_id === selectedDistrictID
                );
                setUpazilas(filteredUpazilas);
            })
            .catch((error) => {
                handleError("Error", "Failed to load upazilas.");
                console.error("Error fetching upazilas:", error);
            });
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        if (!userDonor) {
            Swal.fire("Error", "Donor details are missing!", "error");
            return;
        }

        const {
            name,
            email,
            bloodgroup,
            districtID,
            upazilaID,
            recipientname,
            hospitalname,
            fulladdress,
            donationdate,
            donationtime,
            requestmessage,
        } = e.target;

        const selectedDistrict = districts.find((d) => d.id === districtID.value);
        const selectedUpazila = upazilas.find((u) => u.id === upazilaID.value);

        const recipientData = {
            name: name.value,
            email: email.value,
            bloodgroup: bloodgroup.value,
            districtName: selectedDistrict?.name || "Unknown",
            districtNameBan: selectedDistrict?.bn_name || "Unknown",
            upazilaName: selectedUpazila?.name || "Unknown",
            upazilaNameBan: selectedUpazila?.bn_name || "Unknown",
            recipientname: recipientname.value,
            hospitalname: hospitalname.value,
            fulladdress: fulladdress.value,
            donationdate: donationdate.value,
            donationtime: donationtime.value,
            requestmessage: requestmessage.value,
            districtID: districtID.value,
            upazilaID: upazilaID.value,
            status: "pending",
            requestTime: new Date().toISOString(),
            donorID: userDonor?._id, // ✅ Safe access
            donorEmail: userDonor?.email,
        };

        fetch(`http://localhost:5000/donation-requests/${id}`, {
            method: 'PUT',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(recipientData),
        })
            .then((res) => res.json())
            .then((result) => {
                if (result.modifiedCount > 0 || result.upsertedCount > 0) {
                    Swal.fire("Success", "Donation request updated successfully!", "success");
                } else {
                    handleError("Error", "Failed to update the request.");
                }
            })
            .catch((error) => {
                handleError("Error", "An error occurred during submission.");
                console.error("Submission error:", error);
            });

        e.target.reset();
    };

    // Handle errors
    const handleError = (title, message) => {
        Swal.fire({ icon: "error", title, text: message });
    };

    // Show error message
    if (error) {
        Swal.fire("Error", error, "error");
    }

    // Show loading messages
    if (loadingReqUser || loadingAllUser) {
        return <Loading></Loading>;
    }

    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="p-4 card card-compact bg-base-100 w-96 mx-auto shadow-xl">
                    <h1 className="text-2xl font-bold text-center">Donor Details</h1>
                    <img src={userDonor.photo} alt={`${userDonor.name}'s avatar`} className="w-32 h-32 rounded-full mx-auto mb-4" />
                    <p><strong>Name:</strong> {userDonor.name}</p>
                    <p><strong>Email:</strong> {userDonor.email}</p>
                    <p><strong>Blood Group:</strong> {userDonor.bloodgroup}</p>
                    <p><strong>District:</strong> {userDonor.districtName} ({userDonor.districtNameBan})</p>
                    <p><strong>Upazila:</strong> {userDonor.upazilaName} ({userDonor.upazilaNameBan})</p>
                    <p><strong>Status:</strong> {userDonor.status}</p>
                    <p><strong>Role:</strong> {userDonor.role}</p>
                </div>
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <div className="text-2xl font-semibold text-center">Patient details</div>

                    
                    <form onSubmit={handleSubmit} className="card-body">
                        <div className="form-control mb-4">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input
                                type="text"
                                readOnly
                                name="name"
                                value={user?.displayName || ""}
                                className="input input-bordered"
                                required
                            />
                        </div>
                        <div className="form-control mb-4">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                type="email"
                                readOnly
                                name="email"
                                value={user?.email || ""}
                                className="input input-bordered"
                                required
                            />
                        </div>
                        <div className="form-control mb-4">
                            <label className="label">
                                <span className="label-text">District</span>
                            </label>
                            <select
                                name="districtID"
                                className="select input-bordered"
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
                        <div className="form-control mb-4">
                            <label className="label">
                                <span className="label-text">Upazila</span>
                            </label>
                            <select
                                name="upazilaID"
                                className="select input-bordered"
                                disabled={!upazilas.length}
                                required
                            >
                                <option value="">
                                    {upazilas.length
                                        ? "Select an upazila"
                                        : "No upazilas available"}
                                </option>
                                {upazilas.map((upazila) => (
                                    <option key={upazila.id} value={upazila.id}>
                                        {upazila.name} ({upazila.bn_name})
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="form-control mb-4">
                            <label className="label">
                                <span className="label-text">Recipient name</span>
                            </label>
                            <input type="text" name="recipientname" placeholder="recipient name" className="input input-bordered" required />
                        </div>
                        <div className="form-control mb-4">
                            <label className="label">
                                <span className="label-text">Hospital name</span>
                            </label>
                            <input type="text" name="hospitalname" placeholder="like: Dhaka Medical College Hospital" className="input input-bordered" required />
                        </div>
                        <div className="form-control mb-4">
                            <label className="label">
                                <span className="label-text">Full address line</span>
                            </label>
                            <input type="text" name="fulladdress" placeholder="(like: Zahir Raihan Rd, Dhaka" className="input input-bordered" required />
                        </div>
                        <div className="form-control mb-4">
                            <label className="label">
                                <span className="label-text">Blood group</span>
                            </label>
                            <select name="bloodgroup" className="select input-bordered" required>
                                <option value="">Pick a group</option>
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
                        <div className="form-control mb-4">
                            <label className="label">
                                <span className="label-text">Donation date</span>
                            </label>
                            <input type="date" name="donationdate" placeholder="Date" className="input input-bordered" required />
                        </div>
                        <div className="form-control mb-4">
                            <label className="label">
                                <span className="label-text">Donation Time</span>
                            </label>
                            <input
                                type="time"
                                name="donationtime"
                                placeholder="Select time"
                                className="input input-bordered"
                                required
                            />
                        </div>
                        <div className="form-control mb-4">
                            <label className="label">
                                <span className="label-text">Request message</span>
                            </label>
                            <textarea type="text" name="requestmessage" placeholder="requester will write, why he need blood in this input field in details" className="textarea textarea-bordered" required />
                        </div>
                        <div className="form-control mt-6">
                            {user?.status === 'blocked' ? (
                                <button disabled className="btn btn-primary">Submit Request</button>
                            ) : (
                                <button className="btn btn-primary">Submit Request</button>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UpdateDonationRequest;