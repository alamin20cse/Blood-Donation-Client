import { useState, useRef } from "react";
import JoditEditor from "jodit-react";
import blogicon from "../assets/blog.jpeg.jpg"; // Ensure this path is correct
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const AddBlog = () => {
  const editor = useRef(null);
  const [title, setTitle] = useState("");
  const [thumbnail, setThumbnail] = useState(""); // Could be URL or image file
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  // Handle image file upload
  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setThumbnail(reader.result); // Set the base64 string
      };
      reader.readAsDataURL(file); // Convert file to base64
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const blogData = {
      title,
      thumbnail,
      content,
      date: new Date().toISOString(), // Date in ISO format (UTC)
      status: "draft", // Default status
    };

    // console.log(blogData);

    // Send data to the backend
    fetch("https://blood-donation-server-pied.vercel.app/blog", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(blogData),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result?.insertedId) {
          Swal.fire("Success", "Blog added successfully!", "success");
          e.target.reset(); // Reset the form after successful submission
          setTitle(""); // Reset state
          setThumbnail(""); // Reset state
          setContent(""); // Reset state
          navigate("/dashboard/content-management");
        } else {
          throw new Error("Failed to submit the request.");
        }
      })
      .catch((error) => {
        Swal.fire("Error", "An error occurred during submission.", "error");
        console.error("Submission error:", error);
      });
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Add Blog</h1>
          <img src={blogicon} alt="Blog Icon" className="mt-4 object-cover" />
        </div>
        <div className="card bg-base-100 w-full max-w-lg shadow-2xl">
          <form onSubmit={handleSubmit} className="card-body">
            {/* Title */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Title</span>
              </label>
              <input
                type="text"
                placeholder="Blog Title"
                className="input input-bordered"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            {/* Thumbnail Image */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Thumbnail Image</span>
              </label>
              <input
                type="file"
                className="input input-bordered"
                onChange={handleThumbnailChange} // Handle file input
                accept="image/*"
              />
              {thumbnail && (
                <img
                  src={thumbnail}
                  alt="Thumbnail"
                  className="mt-2 w-24 h-24 object-cover rounded-md"
                />
              )}
            </div>

            {/* Blog Content (Rich Text Editor) */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Blog Content</span>
              </label>
              <JoditEditor
                ref={editor}
                value={content}
                onChange={(newContent) => setContent(newContent)}
              />
            </div>

            {/* Submit Button */}
            <div className="form-control mt-6">
              <button className="btn btn-primary">Create Blog</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddBlog;
