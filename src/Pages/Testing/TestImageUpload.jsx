import { useState } from "react";
import { useForm } from "react-hook-form";


const TestImageUpload = () => {
  const [loading, setLoading] = useState(false)
  const [photo, setPhoto] = useState('');


  const {

    register,
    handleSubmit,
    reset

  } = useForm();



  const onsubmit = async (inputData) => {


    const file = inputData.image[0]; //console.log(file);
    if (!file) return;
    setLoading(true)
    const data = new FormData()
    data.append("file", file)
    data.append("upload_preset", `${import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET}`)
    data.append("cloud_name", `${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}`)
    const res = await fetch(`https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`, {
      method: "POST",
      body: data
    })
    const uploadImageURL = await res.json();
     console.log(uploadImageURL.url);
    setPhoto(uploadImageURL.url)
    setLoading(false)
  }
  if (loading) return <h1>Loading...</h1>
  // console.log(import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);




  return (
    <div className="hero bg-base-200 min-h-screen pt-16">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">
            ddd
          </h1>
          <img src={photo} alt="" />

        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <form onSubmit={handleSubmit(onsubmit)} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Photo url</span>
              </label>
              <input type="file"
                
                {...register("image", { required: true })}
                placeholder="input" className="input input-bordered" required />
            </div>


            <button className="btn">sub</button>

          </form>
        </div>
      </div>
    </div>
  );
};

export default TestImageUpload;