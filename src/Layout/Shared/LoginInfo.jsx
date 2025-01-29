import { useContext } from "react";

import { AuthContext } from "../../AuthProvider/AuthProvider";


const LoginInfo = () => {


    // const [users, loading]=useUsers();
    const {user,loading}=useContext(AuthContext)
    


    if(loading)
    {
        return <h2>Loding...</h2>
    }
    // console.log(user)

    return (
        <div>
            <div className="flex justify-between bg-[#22d39e] items-center px-6 py-2">
                <div className="flex flex-col bg-gray-200 rounded-2xl shadow-2xl px-3 ">
                {user?.displayName}

                </div>
                <div>
                    <img className="w-16 h-16 rounded-full" src={user.photoURL} alt="" />

                </div>
               

            </div>
            
         

            
        </div>
    );
};

export default LoginInfo;