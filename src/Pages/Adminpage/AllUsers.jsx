import { useState } from "react";
import useAllusers from "../../Hooks/useAllusers";
import Loading from "../../Layout/Shared/Loading";

const AllUsers = () => {
    const [allusers, loading, refetch] = useAllusers();
    const [filterStatus, setFilterStatus] = useState(""); // Default: show all
    const [currentPage, setCurrentPage] = useState(1); // Tracks current page
    const rowsPerPage = 3; // Number of rows per page

    if (loading) {
        return <Loading />;
    }

    // Function to update user status
    const updateUserStatus = async (userId, newStatus) => {
        try {
            const response = await fetch(`http://localhost:5000/allusers/${userId}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status: newStatus }),
            });

            if (response.ok) {
                refetch(); // Refresh data after update
            }
        } catch (error) {
            console.error("Failed to update status:", error);
        }
    };

    // Function to update user role
    const updateUserRole = async (userId, newRole) => {
        try {
            const response = await fetch(`http://localhost:5000/allusers/${userId}/role`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ role: newRole }),
            });

            if (response.ok) {
                refetch();
            }
        } catch (error) {
            console.error("Failed to update role:", error);
        }
    };

    // Filter users based on selected status
    const filteredUsers = filterStatus
        ? allusers.filter((user) => user.status === filterStatus)
        : allusers;

    // Calculate the users to be shown on the current page
    const indexOfLastUser = currentPage * rowsPerPage;
    const indexOfFirstUser = indexOfLastUser - rowsPerPage;
    const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

    // Pagination Logic
    const totalPages = Math.ceil(filteredUsers.length / rowsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">All Users ({filteredUsers.length})</h1>

            {/* Filter Dropdown */}
            <div className="mb-4">
                <details className="dropdown">
                    <summary className="btn m-1">Filter: {filterStatus || "All"}</summary>
                    <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                        <li><a onClick={() => setFilterStatus("")}>All</a></li>
                        <li><a onClick={() => setFilterStatus("active")}>Active</a></li>
                        <li><a onClick={() => setFilterStatus("blocked")}>Blocked</a></li>
                    </ul>
                </details>
            </div>

            <div className="overflow-x-auto">
                <table className="table-auto w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border border-gray-300 p-2">#</th>
                            <th className="border border-gray-300 p-2">Name</th>
                            <th className="border border-gray-300 p-2">Email</th>
                            <th className="border border-gray-300 p-2">Role</th>
                            <th className="border border-gray-300 p-2">Status</th>
                            <th className="border border-gray-300 p-2">Action</th>
                            <th className="border border-gray-300 p-2">Make Volunteer</th>
                            <th className="border border-gray-300 p-2">Make Admin</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentUsers.map((user, index) => (
                            <tr key={user._id} className="hover:bg-gray-100">
                                <td className="border border-gray-300 p-2 text-center">{index + 1}</td>
                                <td className="border border-gray-300 p-2 flex items-center space-x-2">
                                    <img src={user.photo} alt={user.name} className="w-8 h-8 rounded-full" />
                                    <span>{user.name}</span>
                                </td>
                                <td className="border border-gray-300 p-2">{user.email}</td>
                                <td className="border border-gray-300 p-2 text-center">{user.role}</td>
                                <td className={`border border-gray-300 p-2 text-center ${user.status === "active" ? "text-green-600" : "text-red-600"}`}>
                                    {user.status}
                                </td>
                                <td className="border border-gray-300 p-2 text-center">
                                    {user.role !== "admin" && (
                                        user.status === "active" ? (
                                            <button onClick={() => updateUserStatus(user._id, "blocked")} className="btn btn-sm btn-error">
                                                Block
                                            </button>
                                        ) : (
                                            <button onClick={() => updateUserStatus(user._id, "active")} className="btn btn-sm btn-success">
                                                Unblock
                                            </button>
                                        )
                                    )}
                                </td>

                                {/* Make Volunteer Button */}
                                <td className="border border-gray-300 p-2 text-center">
                                    {user.role === "volunteer" ? (
                                        <button disabled className="btn btn-sm btn-secondary">Already Volunteer</button>
                                    ) : (
                                        <button onClick={() => updateUserRole(user._id, "volunteer")} className="btn btn-sm btn-primary">
                                            Make Volunteer
                                        </button>
                                    )}
                                </td>

                                {/* Make Admin Button */}
                                <td className="border border-gray-300 p-2 text-center">
                                    {user.role === "admin" ? (
                                        <button disabled className="btn btn-sm btn-secondary">Already Admin</button>
                                    ) : (
                                        <button onClick={() => updateUserRole(user._id, "admin")} className="btn btn-sm btn-primary">
                                            Make Admin
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
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

export default AllUsers;
