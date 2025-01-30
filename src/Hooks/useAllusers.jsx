import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import useUsers from "./useUsers";

// all user will show
const useAllusers = () => {
    // Get user data and loading state from useUsers hook
    const [users, usersLoading] = useUsers();
    const queryClient = useQueryClient();

    // Fetch all users without any condition
    const { refetch, data: allusers = [], isLoading: queryLoading } = useQuery({
        queryKey: ['allusers'],
        queryFn: async () => {
            const res = await axios.get(`http://localhost:5000/allusers`);
            return res.data;
        },
        // Add staleTime and cacheTime to ensure data is refetched when necessary
        staleTime: 0, // Data is always stale after being fetched
        cacheTime: 1000 * 60 * 5, // Cache data for 5 minutes
    });

    // Function to manually invalidate the cache and refetch
    const invalidateAndRefetch = async () => {
        await queryClient.invalidateQueries(['allusers']);
        refetch();  // Manually triggering refetch
    };

    // Combine all loading states
    const loading = usersLoading || queryLoading;

    return [allusers, loading, refetch, invalidateAndRefetch];
};

export default useAllusers;
