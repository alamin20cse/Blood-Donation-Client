import useAllusers from "../../Hooks/useAllusers";


const AllUsers = () => {
    const [allusers, loading]=useAllusers();

    if(loading)
    {
        <h1>Loading...</h1>
    }
    return (
        <div>

<h1>all users{allusers.length}</h1>
            
        </div>
    );
};

export default AllUsers;
