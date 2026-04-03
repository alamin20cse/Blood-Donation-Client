import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import useUsers from "./useUsers";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";

// Hook to fetch and manage all user data
const useAllusers = () => {
  // Get user data and loading state from useUsers hook
  const [users, usersLoading] = useUsers();
  const { logOut } = useContext(AuthContext);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Fetch all users
  const { 
    refetch, 
    data: allusers = [], // Default to an empty array 
    isLoading: queryLoading 
  } = useQuery({
    queryKey: ["allusers"],
    queryFn: async () => {
      try {
        const res = await axios.get(`https://blood-donation-server-pied.vercel.app/allusers`, {
          withCredentials: true,
        });
        return res.data; // Return the data if request is successful
      } catch (error) {
        if (error.response?.status === 401 || error.response?.status === 403) {
          // Handle unauthorized access
          await logOut();
          navigate("/login", { replace: true });
          throw new Error("Unauthorized: Logging out...");
        }
        throw error; // Re-throw other errors
      }
    },
    staleTime: 0, // Always fetch fresh data
    cacheTime: 1000 * 60 * 5, // Cache for 5 minutes
  });

  // Manually invalidate cache and refetch
  const invalidateAndRefetch = async () => {
    queryClient.invalidateQueries(["allusers"]);
    await refetch();
  };

  // Combine all loading states
  const loading = usersLoading || queryLoading;

  return [allusers, loading, refetch, invalidateAndRefetch];
};

export default useAllusers;
