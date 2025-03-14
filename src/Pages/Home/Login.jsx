
import { Link, useLocation, useNavigate } from 'react-router-dom';


import Swal from 'sweetalert2';


import { useContext, useEffect } from 'react';
import { AuthContext } from '../../AuthProvider/AuthProvider';
import ani1 from '../../Component/LoginAnimation.json'
import Lottie from 'lottie-react';
import { Helmet } from 'react-helmet-async';
import { time } from 'motion';

const Login = () => {
  const navigate=useNavigate();
  const location=useLocation();
 


  const {userLogin,setUser,
   
}=useContext(AuthContext);


const handleLogin = (e) => {
  e.preventDefault();
  const email = e.target.email.value;
  const password = e.target.password.value;

  userLogin(email, password)
      .then((result) => {
          const user = result.user;
          setUser(user);

          // Send PATCH request to update the login time
          fetch('http://localhost:5000/users/login-time', {
              method: 'PATCH',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({ email: user.email }), // Send the email to update login time
          })
          .then((response) => response.json())
          .then((data) => {
              console.log(data.message); // Log success message
              Swal.fire('Login successful');
              navigate(location?.state ? location.state : '/');
          })
          .catch((error) => {
              console.error('Error updating login time:', error);
          });
      })
      .catch((error) => {
          Swal.fire(error.message);
      });
};



  



    return (
    <div className='hero min-h-screen flex flex-col lg:flex-row-reverse'>
        <Helmet>
     <title>Blood Donation Application | Home</title>
 </Helmet>
  

        {/* dfsdf */}
        <div className='w-full lg:w-1/2 flex items-center justify-center bg-base-200'>

<Lottie animationData={ani1}></Lottie>


      </div>




{/* another */}

      <div className='w-full lg:w-1/2 flex items-center justify-center bg-base-200'>
      <div className=" bg-base-200 min-h-screen">
         
        
   <div className="hero-content flex-col">
     <div className="text-center lg:text-left">
       <h1 className="text-5xl font-bold">Login now!</h1>
      
     </div>
     <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
       <form onSubmit={handleLogin} className="card-body">
         <div className="form-control">
           <label className="label">
             <span className="label-text">Email</span>
           </label>
           <input type="email"name='email' placeholder="email" className="input input-bordered" required />
         </div>
         <div className="form-control">
           <label className="label">
             <span className="label-text">Password</span>
           </label>
           <input type="password" name='password' placeholder="password" className="input input-bordered" required />
           <label className="label">
             <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
           </label>
         </div>
         <div className="form-control mt-6">
           <button className="btn btn-primary">Login</button>
         </div>
       </form>
    
       <p>Are you New? <Link className='text-red-400' to='/signup'>Sign up</Link> </p>
 
     </div>
   </div>
 </div>


      </div>
    



    </div>
    );
};

export default Login;