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
        <div>
            <Helmet>
                <title>Blood Donation Application | Profile</title>
            </Helmet>

            <div>
                <Link to={`/dashboard/profileEdit/${_id}`}>
                    <button className="btn btn-primary">Edit</button>
                </Link>
            </div>

            <div className="card bg-gray-300 w-full shadow-xl">
                <figure>
                    <img src={photo} alt={name} />
                </figure>
                <div className="card-body">
                    <h2 className="card-title">{name}</h2>
                    <p>Email: {email}</p>
                    <p>District: {districtName} ({districtNameBan})</p>
                    <p>Upazila: {upazilaName} ({upazilaNameBan})</p>

                    <div className="card-actions">
                        <div className="flex flex-col lg:flex-row gap-3 items-center">
                            <div className="text-[16px] font-bold p-4 rounded-3xl bg-lime-100">
                                Blood group: {bloodgroup}
                            </div>
                            <div className="badge badge-outline bg-pink-200">
                                Role: {role}
                            </div>
                            <div className="badge badge-outline bg-pink-200">
                                Status: {status}
                            </div>
                        </div>
                    </div>

                    <div>
                        <h1>Registered Time: {formatDateTime(createdAt)}</h1>
                        <h1>Last Login Time: {formatDateTime(loginTime)}</h1>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
