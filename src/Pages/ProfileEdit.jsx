import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import Loading from "../Layout/Shared/Loading";

const ProfileEdit = () => {
    const { user, updateUserProfile } = useContext(AuthContext);
    const navigate = useNavigate();
    const { id } = useParams();
    const { register, handleSubmit, watch, setValue } = useForm();
    const [districts, setDistricts] = useState([]);
    const [upazilas, setUpazilas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        fetch("http://localhost:5000/districts")
            .then((res) => res.json())
            .then((data) => setDistricts(data[2]?.data || []))
            .catch(() => Swal.fire("Error", "Failed to load districts.", "error"))
            .finally(() => setLoading(false));
    }, []);

    // Handle district change
    const handleDistrictChange = (e) => {
        const selectedDistrictID = e.target.value;
        setValue("upazilaID", ""); // Reset upazila selection
        setUpazilas([]);

        fetch("http://localhost:5000/upazilas")
            .then((res) => res.json())
            .then((data) => {
                const filteredUpazilas = data[2]?.data.filter(
                    (upazila) => String(upazila.district_id) === selectedDistrictID
                );
                setUpazilas(filteredUpazilas);
            })
            .catch(() => Swal.fire("Error", "Failed to load upazilas.", "error"));
    };

    // Handle form submission
    const onSubmit = async (formData) => {
        setSubmitting(true);

        const selectedDistrict = districts.find((d) => d.id === formData.districtID);
        const selectedUpazila = upazilas.find((u) => u.id === formData.upazilaID);

        const photoFile = watch("photo")?.[0];
        let photoURL = user.photoURL;

        // Upload image if a new file is selected
        if (photoFile) {
            setLoading(true);
            const data = new FormData();
            data.append("file", photoFile);
            data.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);
            data.append("cloud_name", import.meta.env.VITE_CLOUDINARY_CLOUD_NAME);

            try {
                const res = await fetch(
                    `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
                    { method: "POST", body: data }
                );
                const uploadImageURL = await res.json();
                photoURL = uploadImageURL.url;
            } catch (error) {
                Swal.fire("Error", "Image upload failed.", "error");
                setSubmitting(false);
                setLoading(false);
                return;
            }
            setLoading(false);
        }
        // console.log(selectedDistrict)
        // console.log(selectedUpazila);

        const userData = {
            ...formData,
            photo: photoURL,
            districtName: selectedDistrict?.name || "Unknown",

            districtNameBan: selectedDistrict?.bn_name || "Unknown",


            upazilaName: selectedUpazila?.name || "Unknown",

            upazilaNameBan: selectedUpazila?.bn_name || "Unknown",
        };

        try {
            await updateUserProfile({ displayName: formData.name, photoURL });

            const res = await fetch(`http://localhost:5000/allusers/${id}/edit`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(userData),
            });

            const data = await res.json();
            if (data.success) {
                Swal.fire("Success", "Profile updated successfully!", "success");
                navigate("/dashboard/profile");
            } else {
                Swal.fire("Error", data.message || "Failed to update profile.", "error");
            }
        } catch (error) {
            Swal.fire("Error", "An error occurred while updating the profile.", "error");
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) return <Loading />;

    return (
        <div className="flex flex-col lg:flex-row-reverse">
            <div className="w-full lg:w-1/2 flex items-center justify-center bg-base-200">
                <h2 className="text-3xl font-bold">Your Animation Here</h2>
            </div>
            <div className="w-full lg:w-1/2 flex items-center justify-center bg-base-100">
                <div className="max-w-sm w-full p-6 shadow-2xl rounded-lg">
                    <h1 className="text-5xl font-bold text-center mb-6">Update Profile</h1>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-control mb-4">
                            <label className="label">Name</label>
                            <input
                                type="text"
                                {...register("name", { required: true })}
                                placeholder="Name"
                                className="input input-bordered"
                                defaultValue={user.displayName}
                            />
                        </div>

                        <div className="form-control mb-4">
                            <label className="label">Email</label>
                            <input
                                type="email"
                                {...register("email")}
                                placeholder="Email"
                                className="input input-bordered"
                                defaultValue={user.email}
                                readOnly
                            />
                        </div>

                        <div className="form-control mb-4">
                            <label className="label">Profile Photo</label>
                            <input type="file" {...register("photo")} accept="image/*" className="input input-bordered" />
                            {user.photoURL && (
                                <img src={user.photoURL} alt="Profile" className="mt-2 w-24 h-24 rounded-full" />
                            )}
                        </div>

                        <div className="form-control mb-4">
                            <label className="label">Blood Group</label>
                            <select {...register("bloodgroup", { required: true })} className="select input-bordered">
                                <option value="">Pick a group</option>
                                {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((group) => (
                                    <option key={group} value={group}>
                                        {group}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="form-control mb-4">
                            <label className="label">District</label>
                            <select
                                {...register("districtID", { required: true })}
                                className="select input-bordered"
                                onChange={handleDistrictChange}
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
                            <label className="label">Upazila</label>
                            <select {...register("upazilaID", { required: true })} className="select input-bordered">
                                <option value="">Select an upazila</option>
                                {upazilas.map((upazila) => (
                                    <option key={upazila.id} value={upazila.id}>
                                        {upazila.name} ({upazila.bn_name})
                                    </option>
                                ))}
                            </select>
                        </div>

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
