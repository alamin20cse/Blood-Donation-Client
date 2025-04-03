import { useState, useRef, useEffect } from "react";
import JoditEditor from "jodit-react";
import blogicon from "../assets/bloodbg.webp"; // Ensure this path is correct
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const AddBlog = () => {
  const editor = useRef(null);
  const [title, setTitle] = useState("");
  const [thumbnail, setThumbnail] = useState(null); // Change to null instead of empty string
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false); // Loading state for image upload
  const navigate = useNavigate();
  

  const handleThumbnailChange = (e) => {
    setThumbnail(e.target.files[0]); // Save file in state
  };
 

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!thumbnail) {
      Swal.fire("Error", "Please upload a thumbnail image.", "error");
      return;
    }

    setLoading(true);

    try {
      // Prepare the image upload to Cloudinary
      const data = new FormData();
      data.append("file", thumbnail);
      data.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET); // .env variables
      data.append("cloud_name", import.meta.env.VITE_CLOUDINARY_CLOUD_NAME);

      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
        { method: "POST", body: data }
      );

      const uploadImageURL = await res.json();
      const photoURL = uploadImageURL.url; // This is the URL of the uploaded image

      // Now send blog data along with the thumbnail URL to the backend
      const blogData = {
        title,
        thumbnail: photoURL, // Use the image URL from Cloudinary
        content,
        date: new Date(), // UTC date
        status: "draft",
      };

      const response = await fetch("https://blood-donation-server-pied.vercel.app/blog", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(blogData),
      });

      const result = await response.json();

      if (result?.insertedId) {
        Swal.fire("Success", "Blog added successfully!", "success");
        e.target.reset(); // Reset the form after successful submission
        setThumbnail(null); // Clear thumbnail after successful submission
        setLoading(false);
        navigate("/dashboard/content-management");
      } else {
        throw new Error("Failed to submit the request.");
      }
    } catch (error) {
      Swal.fire("Error", "An error occurred during submission.", "error");
      console.error("Submission error:", error);
      setLoading(false);
    }
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
        <Helmet>
      <title>Blood Donation Application | Add Blog</title>
  </Helmet>
      <div className="hero-content flex-col lg:flex-row-reverse bg-white">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Add Blog</h1>
          <img src={blogicon} alt="Blog Icon" className="mt-4 object-cover" />
        </div>
        <div className="card bg-base-100 w-full max-w-lg shadow-2xl">
          <form onSubmit={handleSubmit} className="card-body bg-white">
            {/* Title */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-black">Title</span>
              </label>
              <input
                type="text"
                placeholder="Blog Title"
                className="input input-bordered text-gray-500"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            {/* Thumbnail */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-black">Thumbnail Image</span>
              </label>
              <input
                type="file"
                className="input input-bordered text-gray-500"
                required
                onChange={handleThumbnailChange} // Handle file change
              />
            </div>

            {/* Rich Text Editor */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-black">Blog Content</span>
              </label>
              <JoditEditor className="text-gray-500"
                ref={editor}
                value={content}
                onChange={(newContent) => setContent(newContent)}
              />
            </div>

            {/* Submit Button */}
            <div className="form-control mt-6">
              <button className="btn btn-primary" disabled={loading}>
                {loading ? "Uploading..." : "Create"} {/* Show loading text if uploading */}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddBlog;
