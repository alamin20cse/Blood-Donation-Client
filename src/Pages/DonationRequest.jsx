import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../AuthProvider/AuthProvider";


const DonationRequest = () => {
    const { user } = useContext(AuthContext);



    const [districts, setDistricts] = useState([]);
    const [upazilas, setUpazilas] = useState([]);

    // Fetch districts on component mount
    useEffect(() => {
        fetch("http://localhost:5000/districts")
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
        fetch("http://localhost:5000/upazilas")
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


    const handleError = (title, message) => {
        Swal.fire({
            icon: "error",
            title,
            text: message,
        });
    };

    
    const handleSubmit = (e) => {
        e.preventDefault();

        const name = e.target.name.value;
        const email = e.target.email.value;
        const bloodgroup = e.target.bloodgroup.value;
        const districtID = e.target.districtID.value;
        const upazilaID = e.target.upazilaID.value;
        const recipientname = e.target.recipientname.value;
        const hospitalname = e.target.hospitalname.value;
        const fulladdress = e.target.fulladdress.value;
        const donationdate = e.target.donationdate.value;
        const donationtime = e.target.donationtime.value;
        const requestmessage = e.target.requestmessage.value;

        // Find the selected district and upazila
        const selectedDistrict = districts.find((d) => d.id === districtID);
        const selectedUpazila = upazilas.find((u) => u.id === upazilaID);

        const recipientData = {
            name,
            email,
            bloodgroup,
            districtName: selectedDistrict?.name || "Unknown",
            districtNameBan: selectedDistrict?.bn_name || "Unknown",
            upazilaName: selectedUpazila?.name || "Unknown",
            upazilaNameBan: selectedUpazila?.bn_name || "Unknown",
            recipientname,
            hospitalname,
            fulladdress,
            donationdate,
            donationtime,
            requestmessage,
            districtID,
            upazilaID,
            status:'pending'

        };
        console.log(recipientData)

        // Submit the request to database
        fetch("http://localhost:5000/donation-requests", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(recipientData),
        })
            .then((res) => res.json())
            .then((result) => {
                if (result.insertedId) {
                    Swal.fire("Success", "Donation request submitted successfully!", "success");
                } else {
                    handleError("Error", "Failed to submit the request.");
                }
            })
            .catch((error) => {
                handleError("Error", "An error occurred during submission.");
                console.error("Submission error:", error);
            });


        e.target.reset();
    };





    return (
      


        <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
            <div className="text-center lg:text-left">
                <h1 className="text-5xl font-bold">Request Donation</h1>
                <p className="py-6">
                    Please fill in the details to request a donation. Make sure to select the
                    correct district and upazila for accurate information.
                </p>
            </div>
            <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">




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
                            <option value="" >
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
                        <button  className="btn btn-primary">Submit Request</button>
                    </div>
                </form>
            </div>
        </div>
    </div>

    );
};

export default DonationRequest;