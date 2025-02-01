import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import Loading from "../Layout/Shared/Loading";

const ProfileEdit = () => {
    const { user, updateUserProfile } = useContext(AuthContext);
    const navigate = useNavigate();
    const [districts, setDistricts] = useState([]);
    const [upazilas, setUpazilas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false); // Added state for form submission
    const { id } = useParams();

    // console.log(user);

    // Fetch districts on component mount
    useEffect(() => {
        fetch("http://localhost:5000/districts")
            .then((res) => res.json())
            .then((data) => setDistricts(data[2]?.data || []))
            .catch((error) => {
                handleError("Error", "Failed to load districts.");
                console.error("Error fetching districts:", error);
            })
            .finally(() => setLoading(false));
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

    // Handle errors
    const handleError = (title, message) => {
        Swal.fire({
            icon: "error",
            title,
            text: message,
        });
    };

    // Handle form submission
    const handleUpdateProfile = (e) => {
        e.preventDefault();

        setSubmitting(true); // Disable submit button
        const name = e.target.name.value;
        const email = e.target.email.value;
        const photo = e.target.photo.value;
        const bloodgroup = e.target.bloodgroup.value;
        const districtID = e.target.districtID.value;
        const upazilaID = e.target.upazilaID.value;

        // Check if all fields are filled
        if (!name || !email || !photo || !bloodgroup || !districtID || !upazilaID) {
            handleError("Incomplete Form", "Please fill in all the required fields.");
            setSubmitting(false);
            return;
        }

        // Find the selected district and upazila
        const selectedDistrict = districts.find((d) => d.id === districtID);
        const selectedUpazila = upazilas.find((u) => u.id === upazilaID);

        const userData = {
            name,
            email,
            photo,
            bloodgroup,
            districtName: selectedDistrict?.name || "Unknown",
            districtNameBan: selectedDistrict?.bn_name || "Unknown",
            upazilaName: selectedUpazila?.name || "Unknown",
            upazilaNameBan: selectedUpazila?.bn_name || "Unknown",
            districtID,
            upazilaID,
        };

        // Update user profile
        updateUserProfile({ displayName: name, photoURL: photo })
            .then(() => {
                // Send updated data to the server
                fetch(`http://localhost:5000/allusers/${id}/edit`, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(userData),
                })
                    .then((res) => res.json())
                    .then((data) => {
                        // console.log("Backend Response:", data);
                        if (data.success) {
                            Swal.fire({
                                icon: "success",
                                title: "Profile Updated",
                                text: "Your profile has been updated successfully!",
                            });
                            navigate("/dashboard/profile");
                        } else {
                            handleError("Update Failed", data.message || "Failed to update profile.");
                        }
                    })
                    .catch((error) => {
                        handleError("Error", "An error occurred while updating the profile.");
                        console.error("Error updating profile:", error);
                    })
                    .finally(() => setSubmitting(false)); // Re-enable the submit button
            })
            .catch((error) => {
                handleError("Profile Update Failed", error.message);
                setSubmitting(false);
            });
    };

    if (loading) {
        return <div><Loading></Loading></div>;
    }

    return (
        <div className="flex flex-col lg:flex-row-reverse">
            <div className="w-full lg:w-1/2 flex items-center justify-center bg-base-200">
                <h2 className="text-3xl font-bold">Your Animation Here</h2>
            </div>
            <div className="w-full lg:w-1/2 flex items-center justify-center bg-base-100">
                <div className="max-w-sm w-full p-6 shadow-2xl rounded-lg">
                    <h1 className="text-5xl font-bold text-center mb-6">Update Profile</h1>
                    <form onSubmit={handleUpdateProfile}>
                        {/* Name */}
                        <div className="form-control mb-4">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input
                                type="text"
                                name="name"
                                placeholder="Name"
                                className="input input-bordered"
                                defaultValue={user.displayName} // Default value
                                required
                            />
                        </div>

                        {/* Email */}
                        <div className="form-control mb-4">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                defaultValue={user.email}
                                readOnly
                                required
                            />
                        </div>

                        {/* Photo URL */}
                        <div className="form-control mb-4">
                            <label className="label">
                                <span className="label-text">Photo URL</span>
                            </label>
                            <input
                                type="text"
                                name="photo"
                                placeholder="Photo URL"
                                className="input input-bordered"
                                defaultValue={user.photoURL} // Default value
                                required
                            />
                        </div>

                        {/* Blood Group */}
                        <div className="form-control mb-4">
                            <label className="label">
                                <span className="label-text">Blood Group</span>
                            </label>
                            <select name="bloodgroup" className="select input-bordered" defaultValue={user.bloodgroup} required>
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

                        {/* District */}
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

                        {/* Upazila */}
                        <div className="form-control mb-4">
                            <label className="label">
                                <span className="label-text">Upazila</span>
                            </label>
                            <select name="upazilaID" className="select input-bordered" required>
                                <option value="">Select an upazila</option>
                                {upazilas.map((upazila) => (
                                    <option key={upazila.id} value={upazila.id}>
                                        {upazila.name} ({upazila.bn_name})
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Update Button */}
                        <div className="form-control mt-6">
                            <button type="submit" className="btn btn-primary" disabled={submitting}>
                                {submitting ? "Updating..." : "Update"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ProfileEdit;