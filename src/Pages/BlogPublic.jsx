import { Link } from "react-router-dom";
import useBlog from "../Hooks/useBlog";
import Loading from "../Layout/Shared/Loading";

const BlogPublic = () => {
    const [blogs, isLoading,] = useBlog();
   if(isLoading)
   {
    return <Loading></Loading>
   }

    // Corrected filtering logic
    const publishedBlogs = blogs.filter(blog => blog.status === 'published');

    return (
        <div>
            <h1 className="text-xl font-bold">Published Blogs ({publishedBlogs.length})</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {publishedBlogs.map((blog) => (
                    <div key={blog._id} className="border p-4 rounded shadow">

                        <figure className="h-[210px]">
                            <img src={blog.thumbnail} alt={blog.title} className="w-full h-full rounded-md" />
                        </figure>


                     
                        <h1 className="text-lg font-semibold mt-2">{blog.title}</h1>
                          <Link to={`/blogdetails/${blog._id}`}><button className="btn bg-lime-600 rounded-3xl">Details</button></Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BlogPublic;
