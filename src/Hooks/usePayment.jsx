import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { useNavigate } from "react-router-dom";

const usePayment = () => {
  const { logOut } = useContext(AuthContext);
  const navigate = useNavigate();

  const {
    refetch,
    data: allPayment = [], // Default to an empty array
    isLoading: qLoading,
  } = useQuery({
    queryKey: ['payment'],
    queryFn: async () => {
      try {
        const res = await axios.get(`https://blood-donation-server-pied.vercel.app/payments`, { withCredentials: true });
        return res.data;
      } catch (error) {
        if (error.response?.status === 401 || error.response?.status === 403) {
          // Token is invalid or missing, log out the user and redirect to login
          await logOut();
          navigate('/login', { replace: true });
          throw new Error("Unauthorized: Logging out...");
        }
        throw error; // Re-throw other errors
      }
    },
  });

  return [allPayment, qLoading, refetch];
};

export default usePayment;
