
import useUserRequest from "../Hooks/useUserRequest";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";

import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const LoggedUserGetRequest = () => {
    const [usersReq, loading, refetch] = useUserRequest();
    // const { user } = useContext(AuthContext);

    // Slice the first 3 requests
    const firstThreeRequests = usersReq.slice(0, 3);

    if (loading) {
        return <h1 className="text-center text-2xl font-bold">Loading...</h1>;
    }

    if (!usersReq.length) {
        return <h1 className="text-center text-xl text-red-500">No donation requests found.</h1>;
    }

    const handleDelete = id => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                // Delete from the database
                fetch(`http://localhost:5000/donation-requests-logged-user/${id}`, {
                    method: 'DELETE',
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log('delete is done ', data);

                        if (data.deletedCount) {
                            refetch();

                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                        }
                    });
            }
        });
    };

    return (
        <div className="p-5">
            {/* <h2 className="text-3xl font-bold text-center mb-5">Welcome {user.displayName}</h2> */}
            <h2 className="text-3xl font-bold text-center mb-5">Donation Requests</h2>

            <div className="overflow-x-auto">
                <table className="table-auto border-collapse border border-gray-400 w-full">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border border-gray-400 px-4 py-2">Email of donor</th>
                            <th className="border border-gray-400 px-4 py-2">Blood Group</th>
                            <th className="border border-gray-400 px-4 py-2">District</th>
                            <th className="border border-gray-400 px-4 py-2">Upazila</th>
                            <th className="border border-gray-400 px-4 py-2">Name Recipient</th>
                            <th className="border border-gray-400 px-4 py-2">Donation Date</th>
                            <th className="border border-gray-400 px-4 py-2">Donation Time</th>
                            <th className="border border-gray-400 px-4 py-2">Status</th>
                            <th className="border border-gray-400 px-4 py-2">Edit</th>
                            <th className="border border-gray-400 px-4 py-2">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {firstThreeRequests.map((request) => (
                            <tr key={request._id} className="text-center">
                                <td className="border border-gray-400 px-4 py-2">{request.donorEmail}</td>
                                <td className="border border-gray-400 px-4 py-2">{request.bloodgroup}</td>
                                <td className="border border-gray-400 px-4 py-2">{request.districtName}</td>
                                <td className="border border-gray-400 px-4 py-2">{request.upazilaName}</td>
                                <td className="border border-gray-400 px-4 py-2">{request.recipientname}</td>
                                <td className="border border-gray-400 px-4 py-2">{request.donationdate}</td>
                                <td className="border border-gray-400 px-4 py-2">{request.donationtime}</td>
                                <td className="border border-gray-400 px-4 py-2">
                                    <span className={`px-2 py-1 rounded text-white ${request.status === 'pending' ? 'bg-red-500' : 'bg-green-500'}`}>
                                        {request.status}
                                    </span>
                                </td>
                                <td className="border border-gray-400 px-4 py-2">
                                    <Link to={`/dashboard/updatedonationrequest/${request._id}`}>
                                        <button className="btn btn-primary mr-2"><FaRegEdit /></button>
                                    </Link>
                                </td>
                                <td className="border border-gray-400 px-4 py-2">
                                    <button onClick={() => handleDelete(request._id)} className="btn btn-secondary">
                                        <MdDeleteForever className="text-3xl" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default LoggedUserGetRequest;