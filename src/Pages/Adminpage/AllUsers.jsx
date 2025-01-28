import useAllusers from "../../Hooks/useAllusers";


const AllUsers = () => {
    const [allusers, loading]=useAllusers();

    if(loading)
    {
        return <h1>Loading...</h1>
    }

    console.log(allusers);
    




    return (
        <div>

<h1>all users{allusers.length}</h1>
            
        </div>
    );
};

export default AllUsers;
