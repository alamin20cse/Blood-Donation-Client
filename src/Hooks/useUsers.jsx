import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";

const useUsers = () => {
    const { user, loading: authLoading } = useContext(AuthContext);

    const {
        data: users = [], // Default to an empty array while loading
        isLoading: queryLoading,
    } = useQuery({
        queryKey: ['users', user?.email],
        queryFn: async () => {
            if (!user?.email) return []; // Avoid querying if email is not available
            // console.log("Fetching data for email:", user.email); // Debug log
            const res = await axios.get(`http://localhost:5000/users?email=${user.email}`);
            // console.log("Response from API:", res.data); // Debug log
            return res.data;
        },
        enabled: !authLoading && !!user?.email, // Wait for AuthContext to finish loading
    });

    const loading = authLoading || queryLoading;
    return [users, loading];
};

export default useUsers;
