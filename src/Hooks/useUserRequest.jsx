import { useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const useUserRequest = () => {
  const { user, loading: authLoading, logOut } = useContext(AuthContext); // Correct destructuring
  const navigate = useNavigate();

  const {
    refetch,
    data: usersReq = [], // Default to an empty array
    isLoading: queryLoading,
  } = useQuery({
    queryKey: ["usersReq", user?.email], // Ensure key uniqueness
    queryFn: async () => {
      if (!user?.email) return []; // Avoid querying if email is not available

      try {
        // Send authenticated request to the API
        const res = await axios.get(
          `http://localhost:5000/donation-requests-logged-user?email=${user.email}`,
          { withCredentials: true }
        );
        return res.data; // Return response data if the request is successful
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
    enabled: !authLoading && !!user?.email, // Ensure query only runs when user and email are available
  });

  // Combine loading states
  const loading = authLoading || queryLoading;

  // Return the data, combined loading state, and refetch function
  return [usersReq, loading, refetch];
};

export default useUserRequest;
