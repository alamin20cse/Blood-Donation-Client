import { useQuery } from "@tanstack/react-query";
import axios from "axios";


const usePayment = () => {
    const {refetch,
        data: allPayment = [], // Default to an empty array
        isLoading: qLoading,
    } = useQuery({
        queryKey: ['payment'],
        queryFn: async () => {
            const res = await axios.get(`http://localhost:5000/payments`);
            return res.data;
        },
    });

    return [allPayment, qLoading,refetch]; // Return queryLoading instead of isloading
};


export default usePayment;