import useUserRequest from "../Hooks/useUserRequest";

const LoggedUserGetRequest = () => {
    const [usersReq, loading] = useUserRequest();

    if (loading) {
        return <h1 className="text-center text-2xl font-bold">Loading...</h1>;
    }

    if (!usersReq.length) {
        return <h1 className="text-center text-xl text-red-500">No donation requests found.</h1>;
    }

    return (
        <div className="p-5">
            <h2 className="text-3xl font-bold text-center mb-5">Donation Requests</h2>
            
            <div className="overflow-x-auto">
                <table className="table-auto border-collapse border border-gray-400 w-full">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border border-gray-400 px-4 py-2">Name</th>
                            <th className="border border-gray-400 px-4 py-2">Donor Email</th>
                            <th className="border border-gray-400 px-4 py-2">Blood Group</th>
                            <th className="border border-gray-400 px-4 py-2">District</th>
                            <th className="border border-gray-400 px-4 py-2">Upazila</th>
                            <th className="border border-gray-400 px-4 py-2">Recipient</th>
                            <th className="border border-gray-400 px-4 py-2">Hospital</th>
                            <th className="border border-gray-400 px-4 py-2">Full Address</th>
                            <th className="border border-gray-400 px-4 py-2">Donation Date</th>
                            <th className="border border-gray-400 px-4 py-2">Donation Time</th>
                            <th className="border border-gray-400 px-4 py-2">Request  Time</th>
                            <th className="border border-gray-400 px-4 py-2">Request Message</th>
                            <th className="border border-gray-400 px-4 py-2">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usersReq.map((request) => (
                            <tr key={request._id} className="text-center">
                                <td className="border border-gray-400 px-4 py-2">{request.name}</td>
                                <td className="border border-gray-400 px-4 py-2">{request.donorEmail}</td>
                                <td className="border border-gray-400 px-4 py-2">{request.bloodgroup}</td>
                                <td className="border border-gray-400 px-4 py-2">{request.districtName}</td>
                                <td className="border border-gray-400 px-4 py-2">{request.upazilaName}</td>
                                <td className="border border-gray-400 px-4 py-2">{request.recipientname}</td>
                                <td className="border border-gray-400 px-4 py-2">{request.hospitalname}</td>
                                <td className="border border-gray-400 px-4 py-2">{request.fulladdress}</td>
                                <td className="border border-gray-400 px-4 py-2">{request.donationdate}</td>
                                <td className="border border-gray-400 px-4 py-2">{request.donationtime}</td>
                                <td className="border border-gray-400 px-4 py-2">{request.donationtime}</td>
                                <td className="border border-gray-400 px-4 py-2">{request.requestTime}</td>
                                <td className="border border-gray-400 px-4 py-2">
                                    <span className={`px-2 py-1 rounded text-white ${request.status === 'pending' ? 'bg-red-500' : 'bg-green-500'}`}>
                                        {request.status}
                                    </span>
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
