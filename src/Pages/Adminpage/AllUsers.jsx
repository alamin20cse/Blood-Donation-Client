import useAllusers from "../../Hooks/useAllusers";

const AllUsers = () => {
    const [allusers, loading] = useAllusers();

    if (loading) {
        return <h1>Loading...</h1>;
    }

    // console.log(allusers);

    const handleBlocked = (userId) => {
        console.log(`Blocked button clicked for user ID: ${userId}`);
        // Add logic for blocking the user
    };

    const handleUnblocked = (userId) => {
        console.log(`Unblocked button clicked for user ID: ${userId}`);
        // Add logic for unblocking the user
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">All Users ({allusers.length})</h1>
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
                        {allusers.map((user, index) => (
                            <tr key={user._id} className="hover:bg-gray-100">
                                <td className="border border-gray-300 p-2 text-center">{index + 1}</td>
                                <td className="border border-gray-300 p-2 flex items-center space-x-2">
                                    <img
                                        src={user.photo}
                                        alt={user.name}
                                        className="w-8 h-8 rounded-full"
                                    />
                                    <span>{user.name}</span>
                                </td>
                                <td className="border border-gray-300 p-2">{user.email}</td>
                                <td className="border border-gray-300 p-2 text-center">{user.role}</td>
                                <td
                                    className={`border border-gray-300 p-2 text-center ${
                                        user.status === "active"
                                            ? "text-green-600"
                                            : "text-red-600"
                                    }`}
                                >
                                    {user.status}
                                </td>
                                <td className="border border-gray-300 p-2 text-center">
                                    {user.role !== "admin" && (
                                        user.status === "active" ? (
                                            <button
                                                onClick={() => handleBlocked(user._id)}
                                                className="btn btn-sm btn-error"
                                            >
                                                Block
                                            </button>
                                        ) : (
                                            <button
                                                onClick={() => handleUnblocked(user._id)}
                                                className="btn btn-sm btn-success"
                                            >
                                                Unblock
                                            </button>
                                        )
                                    )}
                                </td>

                                {/* Volunteer Logic */}
                                <td className="border border-gray-300 p-2 text-center">
                                    {user.role === "volunteer" ? (
                                        <button disabled className="btn btn-sm btn-secondary">
                                            Already Volunteer
                                        </button>
                                    ) : (
                                        <button className="btn btn-sm btn-primary">
                                            Make Volunteer
                                        </button>
                                    )}
                                </td>

                                {/* Admin Logic */}
                                <td className="border border-gray-300 p-2 text-center">
                                    {user.role === "admin" ? (
                                        <button disabled className="btn btn-sm btn-secondary">
                                            Already Admin
                                        </button>
                                    ) : (
                                        <button className="btn btn-sm btn-primary">
                                            Make Admin
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllUsers;
