import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const useBlog = () => {
    const queryClient = useQueryClient();

    // Fetch all blogs
    const { refetch, data: blogs = [], isLoading } = useQuery({
        queryKey: ["blogs"],
        queryFn: async () => {
            const res = await axios.get("http://localhost:5000/blog");
            return res.data;
        },
        staleTime: 0, // Data is always stale after being fetched
        cacheTime: 1000 * 60 * 5, // Cache data for 5 minutes
    });

    // Function to manually invalidate the cache and refetch
    const invalidateAndRefetch = async () => {
        await queryClient.invalidateQueries(["blogs"]);
        refetch();
    };

    return [blogs, isLoading, refetch, invalidateAndRefetch];
};

export default useBlog;
