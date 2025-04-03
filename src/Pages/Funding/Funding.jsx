import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import usePayment from "../../Hooks/usePayment";
import { Helmet } from "react-helmet-async";

const Funding = () => {
const [allPayment, qLoading, refetch] = usePayment();
    const [currentPage, setCurrentPage] = useState(1); // Current page state
    const rowsPerPage = 3; // Number of payments to display per page
   

    if (qLoading) {
        return <p>Loading...</p>;
    }
   

    // Calculate the payments to be shown on the current page
    const indexOfLastPayment = currentPage * rowsPerPage;
    const indexOfFirstPayment = indexOfLastPayment - rowsPerPage;
    const currentPayments = allPayment.slice(indexOfFirstPayment, indexOfLastPayment);

    // Total pages for pagination
    const totalPages = Math.ceil(allPayment.length / rowsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className="p-4 bg-white">
               <Helmet>
        <title>Blood Donation Application | Finding</title>
    </Helmet>
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
                            {currentPayments.map((payment, index) => (
                                <tr key={payment._id} className="hover:bg-gray-100">
                                    <td className="border border-gray-300 px-4 py-2 text-center">{index + 1}</td>
                                    <td className="border border-gray-300 px-4 py-2 text-center">
                                        <img
                                            src={payment.photo}
                                            alt="user"
                                            className="w-8 h-8 rounded-full inline-block mr-2"
                                        />
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2 text-center">{payment.name}</td>
                                    <td className="border border-gray-300 px-4 py-2 text-center">{payment.email}</td>
                                    <td className="border border-gray-300 px-4 py-2 text-center">${payment.price}</td>
                                    <td className="border border-gray-300 px-4 py-2 text-center">{payment.transctionId}</td>
                                    <td className="border border-gray-300 px-4 py-2 text-center">
                                        {new Date(payment.date).toLocaleString()}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-center mt-4">
                <button
                    onClick={() => setCurrentPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="btn btn-sm btn-secondary mr-2"
                >
                    Previous
                </button>
                {[...Array(totalPages)].map((_, index) => (
                    <button
                        key={index}
                        onClick={() => handlePageChange(index + 1)}
                        className={`btn btn-sm ${currentPage === index + 1 ? 'btn-primary' : 'btn-secondary'} mx-1`}
                    >
                        {index + 1}
                    </button>
                ))}
                <button
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="btn btn-sm btn-secondary ml-2"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default Funding;
