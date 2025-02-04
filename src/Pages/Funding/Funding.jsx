import { Link } from "react-router-dom";
import usePayment from "../../Hooks/usePayment";

const Funding = () => {
    const [allPayment, qLoading, refetch] = usePayment();

    if (qLoading) {
        return <p>Loading...</p>;
    }

    return (
        <div className="p-4">
            {/* Button Section */}
            <div className="mb-6">
                <Link to="/payment">
                    <button className="btn bg-green-600 rounded-2xl p-4 text-white">
                        Give Funding
                    </button>
                </Link>
            </div>

            {/* All Funding Section */}
            <div>
                <h1 className="text-2xl font-semibold mb-4">
                    Total Donations: {allPayment.length}
                </h1>
                <div className="overflow-x-auto">
                    <table className="table-auto border-collapse border border-gray-300 w-full">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="border border-gray-300 px-4 py-2">#</th>
                                <th className="border border-gray-300 px-4 py-2">Photo</th>
                                <th className="border border-gray-300 px-4 py-2">Name</th>
                                <th className="border border-gray-300 px-4 py-2">Email</th>
                                <th className="border border-gray-300 px-4 py-2">Amount (USD)</th>
                                <th className="border border-gray-300 px-4 py-2">Transaction ID</th>
                                <th className="border border-gray-300 px-4 py-2">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {allPayment.map((payment, index) => (
                                <tr key={payment._id} className="hover:bg-gray-100">
                                    <td className="border border-gray-300 px-4 py-2 text-center">{index + 1}</td>
                                    <td className="border border-gray-300 px-4 py-2 text-center">
                                       
                                    <img
                                            src={payment.photo}
                                            alt="user"
                                            className="w-8 h-8 rounded-full inline-block mr-2"
                                        />
                                    </td>
                                  
                                    <td className="border border-gray-300 px-4 py-2 text-center">
                                       
                                        {payment.name}
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2 text-center">
                                        {payment.email}
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2 text-center">
                                        ${payment.price}
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2 text-center">
                                        {payment.transctionId}
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2 text-center">
                                        {new Date(payment.date).toLocaleString()}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Funding;
