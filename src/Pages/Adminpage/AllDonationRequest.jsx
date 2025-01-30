import Swal from "sweetalert2";
import useAllRequest from "../../Hooks/useAllRequest";
import Loading from "../../Layout/Shared/Loading";
import { MdDeleteForever } from "react-icons/md";
import { Link } from "react-router-dom";
import { FaRegEdit } from "react-icons/fa";


const AllDonationRequest = () => {
    const [allRequest, queryLoading,refetch]=useAllRequest();

    if(queryLoading)
    {
        return <Loading></Loading>
    }
    if (!allRequest.length) {
        return <h1 className="text-center text-xl text-red-500">No donation requests found.</h1>;
    }
    console.log(allRequest)
   
    const handleDelete = id => {
        console.log(id)
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

                // delet form the database

                fetch(`http://localhost:5000/donation-requests/${id}`, {
                    method: 'DELETE',
                }) 
                    .then(res => res.json())
                    .then(data => {
                        console.log('delete is done ', data)

                        if (data.deletedCount) {
                            refetch();

                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });



                        }
                    })
            }
        });




    }


    return (
        <div className="p-5">

            {/* <h2 className="text-3xl font-bold text-center mb-5">Welcome {user.displayName }</h2> */}
            <h2 className="text-3xl font-bold text-center mb-5">My Donation Requests ({allRequest.length}) </h2>

            <div className="overflow-x-auto">
                <table className="table-auto border-collapse border border-gray-400 w-full">
                    <thead>
                        <tr className="bg-gray-200">


                            <th className="border border-gray-400 px-4 py-2">Email of donor</th>
                            <th className="border border-gray-400 px-4 py-2">Email of requested</th>
                            <th className="border border-gray-400 px-4 py-2">Blood Group</th>
                            <th className="border border-gray-400 px-4 py-2">District</th>
                            <th className="border border-gray-400 px-4 py-2">Upazila</th>
                            <th className="border border-gray-400 px-4 py-2">Name Recipient</th>

                            <th className="border border-gray-400 px-4 py-2">Donation Date</th>
                            <th className="border border-gray-400 px-4 py-2">Donation Time</th>

                            <th className="border border-gray-400 px-4 py-2">Status</th>
                            <th className="border border-gray-400 px-4 py-2">Edit</th>
                            <th className="border border-gray-400 px-4 py-2">Delete</th>
                            <th className="border border-gray-400 px-4 py-2">Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allRequest.map((request) => (
                            <tr key={request._id} className="text-center">


                                <td className="border border-gray-400 px-4 py-2">{request.donorEmail}</td>
                                <td className="border border-gray-400 px-4 py-2">{request.email}</td>
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

                                <td className="border border-gray-400 px-4 py-2" > <Link to={`/dashboard/updatedonationrequest/${request._id}`}>
                                    <button className="btn btn-primary mr-2"><FaRegEdit></FaRegEdit> </button>



                                </Link></td>

                                <td className="border border-gray-400 px-4 py-2">
                                    <button onClick={() => handleDelete(request._id)} className="btn btn-secondary">
                                        <MdDeleteForever className="text-3xl" />
                                    </button>
                                </td>



                                <td className="border border-gray-400 px-4 py-2" > <Link to={`/dashboard/mydonationrequestdetails/${request._id}`}>
                                    <button className="btn btn-primary mr-2">See Details </button>


                                </Link></td>




                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllDonationRequest;