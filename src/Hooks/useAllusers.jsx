import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useUsers from "./useUsers";

const useAllusers = () => {
    // Get user data and loading state from useUsers hook
    const [users, usersLoading] = useUsers();

    // Ensure the first user is fetched and has the 'admin' role
    const isAdmin = users?.[0]?.role === 'admin';

    // Fetch all users if the current user is an admin
    const {
        data: allusers = [], // Default to an empty array
        isLoading: queryLoading,
    } = useQuery({
        queryKey: ['allusers'],
        queryFn: async () => {
            const res = await axios.get(`http://localhost:5000/allusers`);
            return res.data;
        },
        enabled: isAdmin, // Only fetch data if the user is an admin
    });

    // Combine all loading states
    const loading = usersLoading || queryLoading;

    return [allusers, loading];
};

export default useAllusers;
