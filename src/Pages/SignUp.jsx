import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthProvider/AuthProvider";
import ani1 from '../Component/SignUpAni.json'
import Lottie from "lottie-react";

const SignUp = () => {
    const { createNewUser, setUser, updateUserProfile } = useContext(AuthContext);
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z]).{6,}$/;
    const navigate = useNavigate();
    const [districts, setDistricts] = useState([]);
    const [upazilas, setUpazilas] = useState([]);
    const [passwordMismatch, setPasswordMismatch] = useState(false);

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

    const handleRegister = (e) => {
        e.preventDefault();

        const name = e.target.name.value;
        const email = e.target.email.value;
        const photo = e.target.photo.value;
        const password = e.target.password.value;
        const confirmpassword = e.target.confirmpassword.value;

        const bloodgroup = e.target.bloodgroup.value;
        const districtID = e.target.districtID.value;
        const upazilaID = e.target.upazilaID.value;

        // Check if all fields are filled
        if (!name || !email || !photo || !bloodgroup || !districtID || !upazilaID) {
            handleError("Incomplete Form", "Please fill in all the required fields.");
            return;
        }

        // Validate Password
        if (!passwordRegex.test(password)) {
            handleError("Invalid Password", "Password must have at least one uppercase letter, one lowercase letter, and be at least 6 characters long.");
            return;
        }

        // Check if passwords match
        if (password !== confirmpassword) {
            setPasswordMismatch(true);
            return;
        } else {
            setPasswordMismatch(false);
        }

        // Find the selected district and upazila
        const selectedDistrict = districts.find((d) => d.id === districtID);
        const selectedUpazila = upazilas.find((u) => u.id === upazilaID);

        const userData = {
            name,
            email,
            photo,
            password,
            confirmpassword,
            bloodgroup,
            districtName: selectedDistrict?.name || "Unknown",
            districtNameBan: selectedDistrict?.bn_name || "Unknown",
            upazilaName: selectedUpazila?.name || "Unknown",
            upazilaNameBan: selectedUpazila?.bn_name || "Unknown",
            districtID,
            upazilaID,
            status:'active',
            role:' donor'
        };

        console.log("User Data:", userData);

        // Create User
        createNewUser(email, password)
            .then((result) => {
                const user = result.user;
                setUser(user);
                updateUserProfile({ displayName: name, photoURL: photo })
                    .then(() => {
                       

 //   send data to the server 
 fetch('http://localhost:5000/users',{
    method:'POST',
    headers:{
        'content-type':'application/json'
    },
    body:JSON.stringify(userData),



})
.then(res=>res.json())
.then(data=>{
    console.log(data);


    Swal.fire({
                            icon: "success",
                            title: "Registration Successful",
                            text: "Welcome to the platform!",
                        });
})
e.target.reset();










                        navigate("/");
                    })
                    .catch((error) => {
                        handleError("Profile Update Failed", error.message);
                    });
            })
            .catch((error) => {
                handleError("Registration Failed", error.message);
            });
    };

    return (
        <div className="flex flex-col lg:flex-row-reverse">
            <div className="w-full lg:w-1/2 flex items-center justify-center bg-base-200">
              
<Lottie animationData={ani1}></Lottie>

            </div>
            <div className="w-full lg:w-1/2 flex items-center justify-center bg-base-100">
                <div className="max-w-sm w-full p-6 shadow-2xl rounded-lg">
                    <h1 className="text-5xl font-bold text-center mb-6">Register now!</h1>
                    <form onSubmit={handleRegister}>
                        <div className="form-control mb-4">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input type="text" name="name" placeholder="Name" className="input input-bordered" required />
                        </div>
                        <div className="form-control mb-4">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" name="email" placeholder="Email" className="input input-bordered" required />
                        </div>
                        <div className="form-control mb-4">
                            <label className="label">
                                <span className="label-text">Photo URL</span>
                            </label>
                            <input type="text" name="photo" placeholder="Photo URL" className="input input-bordered" required />
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
                                <span className="label-text">District</span>
                            </label>
                            <select name="districtID" className="select input-bordered" onChange={handleDistrictChange} required>
                                <option value="" >Select a district</option>
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
                        
                        <div className="form-control mb-4">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                className="input input-bordered"
                                required
                            />
                        </div>
                        <div className="form-control mb-4">
                            <label className="label">
                                <span className="label-text">Confirm Password</span>
                            </label>
                            <input
                                type="password"
                                name="confirmpassword"
                                placeholder="Password"
                                className="input input-bordered"
                                required
                            />
                        </div>
                        {passwordMismatch && (
                            <p className="text-red-500 text-sm">Passwords do not match in password and  confirmpassword !</p>
                        )}
                        <div className="form-control mt-6">
                            <button className="btn btn-primary w-full">Register</button>
                        </div>
                    </form>
                    <p className="text-center mt-4">
                        Already have an account?{" "}
                        <Link className="text-red-400" to="/login">
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
