import { useState } from "react";
import { Link } from "react-router-dom";
import useBlog from "../Hooks/useBlog";
import useUsers from "../Hooks/useUsers";
import Swal from "sweetalert2";

const ContentManagement = () => {
    const [blogs, isLoading, refetch] = useBlog();
    const [filterStatus, setFilterStatus] = useState(""); // Default: show all
    const [users, loading] = useUsers();
    const userRole = users[0]?.role;

    if (isLoading || loading) {
        return <p>Loading...</p>;
    }

    // Filter blogs based on selected status, or show all if filterStatus is empty
    const filteredBlogs = filterStatus
        ? blogs.filter((blog) => blog.status === filterStatus)
        : blogs;

    // Toggle Blog Status (Draft <-> Published) - Only Admin
    const handleStatusToggle = async (id, currentStatus) => {
        if (userRole !== "admin") {
            Swal.fire("Error", "Only admins can publish/unpublish blogs!", "error");
            return;
        }

        const newStatus = currentStatus === "draft" ? "published" : "draft";

        const response = await fetch(`https://blood-donation-server-pied.vercel.app/blog/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status: newStatus }),
        });

        if (response.ok) {
            Swal.fire("Success", `Blog ${newStatus}!`, "success");
            refetch();
        } else {
            Swal.fire("Error", "Failed to update status", "error");
        }
    };

    // Delete Blog (Only Admin)
    const handleDelete = async (id) => {
        if (userRole !== "admin") {
            Swal.fire("Error", "Only admins can delete blogs!", "error");
            return;
        }

        const confirm = await Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
        });

        if (confirm.isConfirmed) {
            const response = await fetch(`https://blood-donation-server-pied.vercel.app/blog/${id}`, {
                method: "DELETE",
            });

            if (response.ok) {
                Swal.fire("Deleted!", "Blog has been deleted.", "success");
                refetch();
            } else {
                Swal.fire("Error", "Failed to delete blog", "error");
            }
        }
    };

    return (
        <div className="relative p-4">
            <h2 className="text-2xl font-bold">Content Management</h2>

            {/* Add Blog Button */}
            <div className="absolute top-4 right-4">
                <Link to='/dashboard/add-blog'>
                    <button className="btn btn-error">Add Blog</button>
                </Link>
            </div>

            {/* Filter Dropdown */}
            <div className="my-4">
                <details className="dropdown">
                    <summary className="btn m-1">
                        Filter: {filterStatus || "All"}
                    </summary>
                    <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                        <li><a onClick={() => setFilterStatus("")}>All</a></li>
                        <li><a onClick={() => setFilterStatus("draft")}>Draft</a></li>
                        <li><a onClick={() => setFilterStatus("published")}>Published</a></li>
                    </ul>
                </details>
            </div>

            {/* Blog Grid */}
            <div className="grid grid-cols-2 gap-4 mt-6">
                {filteredBlogs.length > 0 ? (
                    filteredBlogs.map((blog) => (
                        <div key={blog._id} className="border p-4 rounded-lg shadow-md bg-white">

                            <figure className="h-[210px]">
                                <img src={blog.thumbnail} alt={blog.title} className="w-full h-full rounded-md" />
                            </figure>



                            <h1 className="text-lg font-semibold mt-2">{blog.title}</h1>
                            <div className="text-sm text-gray-600 mt-1" dangerouslySetInnerHTML={{ __html: blog.content }} />

                            {/* Status and Delete Buttons */}
                            <div className="mt-4 flex gap-2">
                                {userRole === "admin" && (
                                    <>
                                        <button
                                            className="btn btn-sm"
                                            onClick={() => handleStatusToggle(blog._id, blog.status)}
                                        >
                                            {blog.status === "draft" ? "Publish" : "Unpublish"}
                                        </button>

                                        <button
                                            className="btn btn-sm btn-error"
                                            onClick={() => handleDelete(blog._id)}
                                        >
                                            Delete
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500">No blogs found.</p>
                )}
            </div>
        </div>
    );
};

export default ContentManagement;
