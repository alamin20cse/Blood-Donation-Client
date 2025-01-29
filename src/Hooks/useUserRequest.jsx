import { useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useUserRequest = () => {
    const { user, loading: authLoading } = useContext(AuthContext); // Correct destructuring

    const {refetch,
        data: usersReq = [], // Default to an empty array
        isLoading: queryLoading,
    } = useQuery({
        queryKey: ['usersReq', user?.email], // Ensure key uniqueness
        queryFn: async () => {
            if (!user?.email) return []; // Avoid querying if email is not available
            // console.log("Fetching data for email:", user.email); // Debug log
            const res = await axios.get(`http://localhost:5000/donation-requests-logged-user?email=${user.email}`);
            // console.log("Response from API:", res.data); // Debug log
            return res.data;
        },
        enabled: !authLoading && !!user?.email, // Ensure query only runs when the user is loaded
    });

    const loading = authLoading || queryLoading; // Combine loading states
    return [usersReq, loading,refetch];
};

export default useUserRequest;
