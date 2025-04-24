import { useParams } from "react-router-dom";
import useBlog from "../Hooks/useBlog";
import Loading from "../Layout/Shared/Loading";
import { Helmet } from "react-helmet-async";


const BlogDetails = () => {
    const { id } = useParams(); // Get blog ID from URL
    const [blogs, isLoading] = useBlog();
  

    if (isLoading) {
        return <Loading />;
    }

    // Find the specific blog post
    const blog = blogs.find((b) => b._id === id);

    if (!blog) {
        return <p className="text-center text-red-500 font-bold mt-10">Blog not found!</p>;
    }

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg pt-20">
              <Helmet>
      <title>Blood Donation Application | Blog Details</title>
  </Helmet>
            <figure className="h-[300px] w-[300px] ">
                <img  src={blog.thumbnail} alt={blog.title} className="w-full h-full  rounded-md" />
            </figure>
            <h1 className="text-3xl font-semibold mt-4">{blog.title}</h1>
            <p className="text-gray-500 mt-2">By {blog.author} | {new Date(blog.date).toDateString()}</p>
            <div className="text-lg text-gray-700 mt-4" dangerouslySetInnerHTML={{ __html: blog.content }} />
        </div>
    );
};

export default BlogDetails;
