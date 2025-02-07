import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useAllusers from "../Hooks/useAllusers";
import Loading from "../Layout/Shared/Loading";

const SearchDonor = () => {
    const [districts, setDistricts] = useState([]);
    const [upazilas, setUpazilas] = useState([]);
    const [allusers, loading, refetch, invalidateAndRefetch] = useAllusers();
    const [filteredUsers, setFilteredUsers] = useState([]); // Added state to store filtered users

    // Fetch districts on component mount
    useEffect(() => {
        fetch("https://blood-donation-server-pied.vercel.app/districts")
            .then((res) => res.json())
            .then((data) => setDistricts(data[2]?.data || []))
            .catch((error) => {
                handleError("Error", "Failed to load districts.");
                console.error("Error fetching districts:", error);
            });
    }, []);

    const handleDistrictChange = (e) => {
        const selectedDistrictID = e.target.value;
        
        // Reset upazilas on district change
        setUpazilas([]);

        // Fetch upazilas and filter by district
        fetch("https://blood-donation-server-pied.vercel.app/upazilas")
            .then((res) => res.json())
            .then((data) => {
                const filteredUpazilas = data[2]?.data.filter((upazila) => upazila.district_id === selectedDistrictID);
                setUpazilas(filteredUpazilas);
            })
            .catch((error) => {
                handleError("Error", "Failed to load upazilas.");
                console.error("Error fetching upazilas:", error);
            });
    };
    if(loading)
    {
        return <Loading></Loading>
    }

    const handleError = (title, message) => {
        Swal.fire({
            icon: "error",
            title,
            text: message,
        });
    };

    const handleSearch = (e) => {
        e.preventDefault();

        const bloodgroup = e.target.bloodgroup.value;
        const districtID = e.target.districtID.value;
        const upazilaID = e.target.upazilaID.value;

        // Find the selected district and upazila
        const selectedDistrict = districts.find((d) => d.id === districtID);
        const selectedUpazila = upazilas.find((u) => u.id === upazilaID);

        if (!selectedDistrict || !selectedUpazila) {
            handleError("Error", "Invalid district or upazila selected.");
            return;
        }

        // Filter users based on the selected criteria
        const filtered = allusers.filter((user) => {
            return (
                user.districtName === selectedDistrict.name &&
                user.upazilaName === selectedUpazila.name &&
                user.bloodgroup === bloodgroup
            );
        });

        setFilteredUsers(filtered); // Update the filtered users state
    };
    // console.log(filteredUsers)

    return (
        <div>
            <form onSubmit={handleSearch}>
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
                        <span className="label-text">District</span>
                    </label>
                    <select name="districtID" className="select input-bordered" onChange={handleDistrictChange} required>
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
                    <select name="upazilaID" className="select input-bordered" required>
                        <option value="" disabled>Select an upazila</option>
                        {upazilas.map((upazila) => (
                            <option key={upazila.id} value={upazila.id}>
                                {upazila.name} ({upazila.bn_name})
                            </option>
                        ))}
                    </select>
                </div>

                <button type="submit" className="btn btn-primary">Search</button>
            </form>

            {/* Displaying the filtered users */}
            <div className="grid lg:grid-cols-3  md:grid-cols-2 grid-cols-1 gap-4 rounded-2xl mt-4">
                {filteredUsers.length > 0 ? (
                    filteredUsers.map((user) => (
                        <div key={user.email} className="p-4 border">
                            <div>
                                <img src={user.photo
} alt="" />
                            </div>
                            <p>Email: {user.email}</p>
                            <p>Name: {user.name}</p>
                            <p>District: {user.districtName} ({user.districtNameBan})</p>
                            <p>Upazila: {user.upazilaName} ({user.upazilaNameBan})</p>
                            <p>Blood Group: {user.status
                            }</p>
                            <p>Blood Group: {user.bloodgroup}</p>
                          
                        </div>
                    ))
                ) : (
                    <p>No users found.</p>
                )}
            </div>
        </div>
    );
};

export default SearchDonor;
