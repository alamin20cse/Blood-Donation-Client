import useUserRequest from "../Hooks/useUserRequest";
import Swal from "sweetalert2";
import { FaRegEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import { MdDeleteForever } from "react-icons/md";
import Loading from "../Layout/Shared/Loading";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";

const MyDonationRequest = () => {
    const [usersReq, loading, refetch] = useUserRequest();
    const [filterStatus, setFilterStatus] = useState("all");
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 3;



    if (loading) {
        return <Loading />;
    }

    if (!usersReq.length) {
        return <h1 className="text-center text-xl text-red-500">No donation requests found.</h1>;
    }
   

    const filteredRequests = filterStatus === "all"
        ? usersReq
        : usersReq.filter(request => request.status === filterStatus);

    // Get the current page data
    const indexOfLastRequest = currentPage * rowsPerPage;
    const indexOfFirstRequest = indexOfLastRequest - rowsPerPage;
    const currentRequests = filteredRequests.slice(indexOfFirstRequest, indexOfLastRequest);

    // Handle page change
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const totalPages = Math.ceil(filteredRequests.length / rowsPerPage);

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
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                        }
                    })
                    .catch(error => {
                        console.error("Failed to delete request:", error);
                        Swal.fire({
                            title: "Error!",
                            text: "Failed to delete the request.",
                            icon: "error"
                        });
                    });
            }
        });
    };

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
            Swal.fire({
                title: "Error!",
                text: "Failed to update the status.",
                icon: "error"
            });
        }
    };

    return (
        <div className="p-5">
                  <Helmet>
        <title>Blood Donation Application | My Donation Request</title>
    </Helmet>
            <h2 className="text-3xl font-bold text-center mb-5">My Donation Requests</h2>

            <div className="dropdown">
                <div tabIndex={0} role="button" className="btn m-1">Filter by Status</div>
                <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                    <li><a onClick={() => setFilterStatus("all")}>All</a></li>
                    <li><a onClick={() => setFilterStatus("pending")}>Pending</a></li>
                    <li><a onClick={() => setFilterStatus("done")}>Done</a></li>
                    <li><a onClick={() => setFilterStatus("canceled")}>Canceled</a></li>
                    <li><a onClick={() => setFilterStatus("inprogress")}>In Progress</a></li>
                </ul>
            </div>

            <div className="overflow-x-auto">
                <table className="table-auto border-collapse border border-gray-400 w-full">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border border-gray-400 px-4 py-2">Donor Email and Name</th>
                            <th className="border border-gray-400 px-4 py-2">Action</th>
                            <th className="border border-gray-400 px-4 py-2">Blood Group</th>
                            <th className="border border-gray-400 px-4 py-2">District</th>
                            <th className="border border-gray-400 px-4 py-2">Upazila</th>
                            <th className="border border-gray-400 px-4 py-2">Recipient Name</th>
                            <th className="border border-gray-400 px-4 py-2">Donation Date</th>
                            <th className="border border-gray-400 px-4 py-2">Donation Time</th>
                            <th className="border border-gray-400 px-4 py-2">Status</th>
                            <th className="border border-gray-400 px-4 py-2">Edit</th>
                            <th className="border border-gray-400 px-4 py-2">Delete</th>
                            <th className="border border-gray-400 px-4 py-2">Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentRequests.map((request) => (
                            <tr key={request._id} className="text-center">
                                <td className="border border-gray-400 px-4 py-2">
                                    {["inprogress", "done", "canceled"].includes(request.status) ? (
                                        <div className="flex flex-col gap-2">
                                            <p className="bg-green-500 text-white px-2 py-1 rounded">
                                                {request.DonorEmail || "No Email"}
                                            </p>
                                            <p className="bg-green-500 text-white px-2 py-1 rounded">
                                                {request.DonorName || "No Name"}
                                            </p>
                                        </div>
                                    ) : (
                                        <p className="bg-red-500 text-white px-2 py-1 rounded">
                                            Not Donated to Anyone
                                        </p>
                                    )}
                                </td>
                                <td className="border border-gray-400 px-4 py-2">
                                    {request.status === "inprogress" && (
                                        <>
                                            <button
                                                onClick={() => handleStatusUpdate(request._id, "done")}
                                                className="bg-green-500 text-white px-3 py-1 rounded mr-2"
                                            >
                                                Done
                                            </button>
                                            <button
                                                onClick={() => handleStatusUpdate(request._id, "canceled")}
                                                className="bg-red-500 text-white px-3 py-1 rounded"
                                            >
                                                Cancel
                                            </button>
                                        </>
                                    )}
                                </td>
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
                                    {request.status !== "done" && request.status !== "canceled" && (
                                        <Link to={`/dashboard/updatedonationrequest/${request._id}`}>
                                            <button className="btn btn-primary mr-2">
                                                <FaRegEdit />
                                            </button>
                                        </Link>
                                    )}
                                </td>
                                <td className="border border-gray-400 px-4 py-2">
                                    <button onClick={() => handleDelete(request._id)} className="btn btn-secondary">
                                        <MdDeleteForever className="text-3xl" />
                                    </button>
                                </td>
                                <td className="border border-gray-400 px-4 py-2">
                                    <Link to={`/dashboard/mydonationrequestdetails/${request._id}`}>
                                        <button className="btn btn-primary mr-2">See Details</button>
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="pagination mt-5 flex justify-center">
                <button
                    className="btn btn-primary mx-2"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                <span className="px-4">{`Page ${currentPage} of ${totalPages}`}</span>
                <button
                    className="btn btn-primary mx-2"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default MyDonationRequest;
