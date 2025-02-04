import { useQuery } from "@tanstack/react-query";
import axios from "axios";


const usePayment = () => {
    const {refetch,
        data: allPayment = [], // Default to an empty array
        isLoading: queryLoading,
    } = useQuery({
        queryKey: ['allRequest'],
        queryFn: async () => {
            const res = await axios.get(`http://localhost:5000/payments`);
            return res.data;
        },
    });

    return [allPayment, queryLoading,refetch]; // Return queryLoading instead of isloading
};


export default usePayment;