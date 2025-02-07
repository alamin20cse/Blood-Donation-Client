import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { useNavigate } from "react-router-dom";

const useAllRequest = () => {
  const { logOut } = useContext(AuthContext);
  const navigate = useNavigate();

  const {
    refetch,
    data: allRequest = [], // Default to an empty array
    isLoading: queryLoading,
  } = useQuery({
    queryKey: ["allRequest"],
    queryFn: async () => {
      try {
        const res = await axios.get(`https://blood-donation-server-pied.vercel.app/donation-requests`, {
          withCredentials: true, // Send credentials (cookies/token)
        });
        return res.data; // Return data if the request succeeds
      } catch (error) {
        if (error.response?.status === 401 || error.response?.status === 403) {
          // Handle unauthorized access
          await logOut(); // Log out the user
          navigate("/login", { replace: true }); // Redirect to login
          throw new Error("Unauthorized: Logging out..."); // Stop query execution
        }
        throw error; // Re-throw other errors
      }
    },
  });

  return [allRequest, queryLoading, refetch];
};

export default useAllRequest;
