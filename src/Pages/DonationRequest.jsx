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

    // ✅ Fetch districts
    useEffect(() => {
        fetch("https://blood-donation-server-pied.vercel.app/districts")
            .then((res) => res.json())
            .then((data) => {
                // 🔥 safer way (fix your issue)
                const districtData = data?.data || data[2]?.data || data || [];
                setDistricts(districtData);
            })
            .catch((error) => {
                setError("Failed to load districts.");
                console.error(error);
            });
    }, []);

    // ✅ Fetch upazilas
    const handleDistrictChange = (e) => {
        const selectedDistrictID = e.target.value;
        setUpazilas([]);

        fetch("https://blood-donation-server-pied.vercel.app/upazilas")
            .then((res) => res.json())
            .then((data) => {
                const upazilaData = data?.data || data[2]?.data || data || [];

                const filtered = upazilaData.filter(
                    (u) => String(u.district_id) === String(selectedDistrictID)
                );

                setUpazilas(filtered);
            })
            .catch((error) => {
                setError("Failed to load upazilas.");
                console.error(error);
            });
    };

    // ✅ Submit
    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);

        const selectedDistrict = districts.find(
            (d) => String(d.id) === String(formData.get("districtID"))
        );

        const selectedUpazila = upazilas.find(
            (u) => String(u.id) === String(formData.get("upazilaID"))
        );

        const recipientData = {
            name: user?.displayName || "",
            email: user?.email || "",
            phone: formData.get("phone"), 

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

            DonorEmail: "",
            DonorName: "",
            DonorId: "",
            DonorPhone:"",
            donationConfirmTime:"",

        };

        fetch("https://blood-donation-server-pied.vercel.app/donation-requests", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(recipientData),
        })
            .then((res) => res.json())
            .then((result) => {
                if (result?.insertedId) {
                    Swal.fire({
                        icon: "success",
                        title: "Success 🎉",
                        text: "Donation request submitted successfully!",
                    });
                    e.target.reset();
                    setUpazilas([]); // reset upazila
                } else {
                    throw new Error();
                }
            })
            .catch(() => {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Submission failed!",
                });
            });
    };

    if (loading) return <Loading />;
    if (error) return <div className="text-red-500 text-center mt-4">{error}</div>;

    return (
        <div className="hero min-h-screen bg-white">
            <Helmet>
                <title>Blood Donation Application | Donation Request</title>
            </Helmet>

            <div className="hero-content flex-col">
                <div className="card w-full max-w-sm shadow-2xl">
                    <div className="text-2xl font-semibold text-center text-black p-4">
                        Create Donation Request
                    </div>

                    <form onSubmit={handleSubmit} className="card-body">

                        {/* Name */}
                        <input
                            type="text"
                            readOnly
                            value={user?.displayName || ""}
                            className="input input-bordered text-gray-500 mb-3"
                        />

                        {/* Email */}
                        <input
                            type="email"
                            readOnly
                            value={user?.email || ""}
                            className="input input-bordered text-gray-500 mb-3"
                        />

                        {/* ✅ Phone */}
                        <input
                            type="tel"
                            name="phone"
                            placeholder="Phone Number (01XXXXXXXXX)"
                            className="input input-bordered text-gray-500 mb-3"
                            required
                        />

                        {/* Recipient */}
                        <input
                            type="text"
                            name="recipientname"
                            placeholder="Recipient Name"
                            className="input input-bordered text-gray-500 mb-3"
                            required
                        />

                        {/* District */}
                        <select
                            name="districtID"
                            className="select input-bordered mb-3"
                            onChange={handleDistrictChange}
                            required
                        >
                            <option value="">Select District</option>
                            {districts.map((d) => (
                                <option key={d.id} value={d.id}>
                                    {d.name} ({d.bn_name})
                                </option>
                            ))}
                        </select>

                        {/* Upazila */}
                        <select
                            name="upazilaID"
                            className="select input-bordered mb-3"
                            disabled={!upazilas.length}
                            required
                        >
                            <option value="">
                                {upazilas.length ? "Select Upazila" : "No Upazila"}
                            </option>
                            {upazilas.map((u) => (
                                <option key={u.id} value={u.id}>
                                    {u.name} ({u.bn_name})
                                </option>
                            ))}
                        </select>

                        {/* Hospital */}
                        <input
                            type="text"
                            name="hospitalname"
                            placeholder="Hospital Name"
                            className="input input-bordered mb-3"
                            required
                        />

                        {/* Address */}
                        <input
                            type="text"
                            name="fulladdress"
                            placeholder="Full Address"
                            className="input input-bordered mb-3"
                            required
                        />

                        {/* Blood */}
                        <select name="bloodgroup" className="select input-bordered mb-3" required>
                            <option value="">Blood Group</option>
                            <option>A+</option>
                            <option>A-</option>
                            <option>B+</option>
                            <option>B-</option>
                            <option>AB+</option>
                            <option>AB-</option>
                            <option>O+</option>
                            <option>O-</option>
                        </select>

                        {/* Date */}
                        <input type="date" name="donationdate" className="input input-bordered mb-3" required />

                        {/* Time */}
                        <input type="time" name="donationtime" className="input input-bordered mb-3" required />

                        {/* Message */}
                        <textarea
                            name="requestmessage"
                            placeholder="Write message"
                            className="textarea textarea-bordered mb-3"
                            required
                        />

                        {/* Submit */}
                        <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={users?.[0]?.status === "blocked"}
                        >
                            Submit Request
                        </button>

                    </form>
                </div>
            </div>
        </div>
    );
};

export default DonationRequest;