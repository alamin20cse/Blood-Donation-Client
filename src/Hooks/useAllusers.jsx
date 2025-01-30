import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useUsers from "./useUsers";

// all user will show

const useAllusers = () => {
    // Get user data and loading state from useUsers hook
    const [users, usersLoading] = useUsers();

    // Fetch all users without any condition
    const {
        data: allusers = [], // Default to an empty array
        isLoading: queryLoading,
    } = useQuery({
        queryKey: ['allusers'],
        queryFn: async () => {
            const res = await axios.get(`http://localhost:5000/allusers`);
            return res.data;
        },
    });

    // Combine all loading states
    const loading = usersLoading || queryLoading;

    return [allusers, loading];
};

export default useAllusers;
