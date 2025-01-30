import { useQuery } from "@tanstack/react-query";
import axios from "axios"; // Import axios

const useAllRequest = () => {
    const {
        data: allRequest = [], // Default to an empty array
        isLoading: queryLoading,
    } = useQuery({
        queryKey: ['allRequest'],
        queryFn: async () => {
            const res = await axios.get(`http://localhost:5000/donation-requests`);
            return res.data;
        },
    });

    return [allRequest, queryLoading]; // Return queryLoading instead of isloading
};

export default useAllRequest;