import { useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";


const useAllusers = () => {
    const { user, loading: authLoading } = useContext(AuthContext);

    const {
        data: allusers = [], // Default to an empty array while loading
        isLoading: queryLoading,
    } = useQuery({
        queryKey: ['allusers', user?.email], 
        queryFn: async () => {
            if (!user?.role==='admin') return []; 
            const res = await axios.get(`http://localhost:5000/allusers`);
            return res.data;
        },
       
    });

    // Combine loading states
    const loading = authLoading || queryLoading;

    return [allusers, loading];
};

export default useAllusers;