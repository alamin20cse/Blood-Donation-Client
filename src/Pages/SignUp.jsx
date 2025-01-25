import { useContext } from "react";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthProvider/AuthProvider";

const SignUp = () => {
  const { createNewUser, setUser, updateUserProfile } = useContext(AuthContext);
  const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z]).{6,}$/;

  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const photo = e.target.photo.value;
    const password = e.target.password.value;

    if (!passwordRegex.test(password)) {
      Swal.fire(
        "Password must have at least one uppercase letter, one lowercase letter, and be at least 6 characters long."
      );
      return;
    }

    createNewUser(email, password)
      .then((result) => {
        const user = result.user;
        setUser(user);
        updateUserProfile({ displayName: name, photoURL: photo })
          .then(() => {
            navigate("/");
            Swal.fire("Successfully registered!");
          })
          .catch((error) => {
            Swal.fire(error.message);
          });
      })
      .catch((error) => {
        Swal.fire(error.message);
      });
  };

  return (
    <div className="flex flex-col lg:flex-row-reverse h-screen">
      {/* Animation Section */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-base-200">
        {/* Replace this placeholder with your animation */}
        <h2 className="text-3xl font-bold">Your Animation Here</h2>
      </div>

      {/* Form Section */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-base-100">
        <div className="max-w-sm w-full p-6 shadow-2xl rounded-lg">
          <h1 className="text-5xl font-bold text-center mb-6">Register now!</h1>
          <form onSubmit={handleRegister}>
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                name="name"
                placeholder="Name"
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
                name="email"
                placeholder="Email"
                className="input input-bordered"
                required
              />
            </div>

            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Photo URL</span>
              </label>
              <input
                type="text"
                name="photo"
                placeholder="Photo URL"
                className="input input-bordered"
                required
              />
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
