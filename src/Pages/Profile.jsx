import { Link } from "react-router-dom";
import useUsers from "../Hooks/useUsers";
import Loading from "../Layout/Shared/Loading";
import { Helmet } from "react-helmet-async";

const Profile = () => {
    const [users, loading] = useUsers();

    if (loading) {
        return <Loading />;
    }

    const user = users[0] || {};

    const {
        name,
        email,
        photo,
        bloodgroup,
        districtName,
        districtNameBan,
        upazilaName,
        upazilaNameBan,
        status,
        role,
        createdAt,
        loginTime,
        _id
    } = user;

    // Function to format date
    const formatDateTime = (dateString) => {
        if (!dateString) return "N/A";

        const date = new Date(dateString);
        return date.toLocaleDateString("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric",
        }) + `, ` + date.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
        });
    };

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-black p-4">
            <Helmet>
                <title>Blood Donation Application | Profile</title>
            </Helmet>

            <div className="mb-4">
                <Link to={`/dashboard/profileEdit/${_id}`}>
                    <button className="btn btn-primary">Edit Profile</button>
                </Link>
            </div>

            <div className="card w-full max-w-2xl mx-auto bg-white text-black dark:bg-gray-900 dark:text-white shadow-xl">
                <figure className="p-4">
                    <img src={photo} alt={name} className="w-32 h-32 rounded-full object-cover border dark:border-gray-600" />
                </figure>
                <div className="card-body">
                    <h2 className="card-title text-xl font-semibold">{name}</h2>
                    <p className="text-sm"><strong>Email:</strong> {email}</p>
                    <p className="text-sm"><strong>District:</strong> {districtName} ({districtNameBan})</p>
                    <p className="text-sm"><strong>Upazila:</strong> {upazilaName} ({upazilaNameBan})</p>

                    <div className="card-actions mt-4 flex flex-wrap gap-3">
                        <div className="px-4 py-2 rounded-lg bg-lime-200 dark:bg-lime-700 text-black dark:text-white">
                            <strong>Blood Group:</strong> {bloodgroup}
                        </div>
                        <div className="px-4 py-2 rounded-lg bg-pink-200 dark:bg-pink-700 text-black dark:text-white">
                            <strong>Role:</strong> {role}
                        </div>
                        <div className="px-4 py-2 rounded-lg bg-blue-200 dark:bg-blue-700 text-black dark:text-white">
                            <strong>Status:</strong> {status}
                        </div>
                    </div>

                    <div className="mt-4 text-sm">
                        <p><strong>Registered Time:</strong> {formatDateTime(createdAt)}</p>
                        <p><strong>Last Login Time:</strong> {formatDateTime(loginTime)}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
