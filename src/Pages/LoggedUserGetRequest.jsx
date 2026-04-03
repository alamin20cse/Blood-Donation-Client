import useUserRequest from "../Hooks/useUserRequest";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import Loading from "../Layout/Shared/Loading";

const LoggedUserGetRequest = () => {
    const [usersReq, loading, refetch] = useUserRequest();

    // Slice the first 3 requests
    const firstThreeRequests = usersReq.slice(0, 3);

    if (loading) return <Loading />;
    if (!usersReq.length) {
        return <h1 className="text-center text-xl text-red-500">
            I have No donation requested Yet.
        </h1>;
    }

    const handleStatusUpdate = async (userId, newStatus) => {
        try {
            const response = await fetch(`https://blood-donation-server-pied.vercel.app/donation-requestsdoneCencel/${userId}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status: newStatus }),
            });

            if (response.ok) {
                refetch();
                Swal.fire({
                    title: "Success!",
                    text: `Request marked as ${newStatus}`,
                    icon: "success",
                });
            }
        } catch (error) {
            console.error("Failed to update status:", error);
        }
    };

    const handleDelete = (id) => {
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
                fetch(`https://blood-donation-server-pied.vercel.app/donation-requests-logged-user/${id}`, {
                    method: 'DELETE',
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.deletedCount) {
                            refetch();
                            Swal.fire("Deleted!", "Your request has been deleted.", "success");
                        }
                    });
            }
        });
    };

    return (
        <div className="p-5 w-full overflow-x-auto">
            <h2 className="text-3xl font-bold text-center mb-5">Donation Requests</h2>

            <table className="table-auto border-collapse border border-gray-400 w-full text-sm">
                <thead>
                    <tr className="bg-gray-200 text-center">
                        <th className="border border-gray-400 px-2 py-2">Donor Email & Name</th>
                        <th className="border border-gray-400 px-2 py-2">Actions</th>
                        <th className="border border-gray-400 px-2 py-2">Blood Group</th>
                        <th className="border border-gray-400 px-2 py-2 hidden md:table-cell">District</th>
                        <th className="border border-gray-400 px-2 py-2 hidden md:table-cell">Upazila</th>
                        <th className="border border-gray-400 px-2 py-2">Recipient Name</th>
                        <th className="border border-gray-400 px-2 py-2">Donation Date</th>
                        <th className="border border-gray-400 px-2 py-2">Donation Time</th>
                        <th className="border border-gray-400 px-2 py-2">Status</th>
                        <th className="border border-gray-400 px-2 py-2">Edit</th>
                        <th className="border border-gray-400 px-2 py-2">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {firstThreeRequests.map((request) => (
                        <tr key={request._id} className="text-center">
                            {/* Donor Email & Name */}
                            <td className="border border-gray-400 px-2 py-2 break-words max-w-[120px]">
                                {(request.status === "inprogress" || request.status === "done" || request.status === "canceled") ? (
                                    <div className="flex flex-col gap-1">
                                        <p className="bg-green-500 text-white px-1 py-1 rounded">{request.DonorEmail || "No Email"}</p>
                                        <p className="bg-green-500 text-white px-1 py-1 rounded">{request.DonorName || "No Name"}</p>
                                    </div>
                                ) : (
                                    <p className="bg-red-500 text-white px-2 py-1 rounded">Not Donated to Anyone</p>
                                )}
                            </td>

                            {/* Done/Cancel Buttons */}
                            <td className="border border-gray-400 px-2 py-2">
                                {(request.status === "inprogress") ? (
                                    <>
                                        <button
                                            onClick={() => handleStatusUpdate(request._id, "done")}
                                            className="bg-green-500 text-white px-2 py-1 rounded mr-1 disabled:opacity-50"
                                            disabled={request.status === "done" || request.status === "canceled"}
                                        >
                                            Done
                                        </button>
                                        <button
                                            onClick={() => handleStatusUpdate(request._id, "canceled")}
                                            className="bg-red-500 text-white px-2 py-1 rounded disabled:opacity-50"
                                            disabled={request.status === "done" || request.status === "canceled"}
                                        >
                                            Cancel
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <button disabled className="btn px-2 py-1">Done</button>
                                        <button disabled className="btn px-2 py-1">Cancel</button>
                                    </>
                                )}
                            </td>

                            {/* Other Info */}
                            <td className="border border-gray-400 px-2 py-2">{request.bloodgroup}</td>
                            <td className="border border-gray-400 px-2 py-2 break-words max-w-[100px] hidden md:table-cell">{request.districtName}</td>
                            <td className="border border-gray-400 px-2 py-2 break-words max-w-[100px] hidden md:table-cell">{request.upazilaName}</td>
                            <td className="border border-gray-400 px-2 py-2 break-words max-w-[120px]">{request.recipientname}</td>
                            <td className="border border-gray-400 px-2 py-2">{request.donationdate}</td>
                            <td className="border border-gray-400 px-2 py-2">{request.donationtime}</td>

                            {/* Status */}
                            <td className="border border-gray-400 px-2 py-2">
                                <span className={`px-2 py-1 rounded text-white ${request.status === 'pending' ? 'bg-red-500' : 'bg-green-500'}`}>
                                    {request.status}
                                </span>
                            </td>

                            {/* Edit */}
                            <td className="border border-gray-400 px-2 py-2">
                                {(request.status === "done" || request.status === "canceled") ? (
                                    <button disabled className="btn btn-primary mr-1"><FaRegEdit /></button>
                                ) : (
                                    <Link to={`/dashboard/updatedonationrequest/${request._id}`}>
                                        <button className="btn btn-primary mr-1"><FaRegEdit /></button>
                                    </Link>
                                )}
                            </td>

                            {/* Delete */}
                            <td className="border border-gray-400 px-2 py-2">
                                <button onClick={() => handleDelete(request._id)} className="btn btn-secondary">
                                    <MdDeleteForever className="text-2xl" />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default LoggedUserGetRequest;