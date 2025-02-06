import { useState } from "react";


const TestImageUpload = () => {
    const [loading,setLoading]=useState(false)
    const [photo,setPhoto]=useState('');
  
   

    const handleFileUpload=async(event)=>{
        event.preventDefault()
        const file=event.target.files[0]
        if(!file) return;
        setLoading(true)
        const data = new FormData()
        data.append("file",file)
        data.append("upload_preset",`${import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET}`)
        data.append("cloud_name",`${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}`)
        const res=await fetch(`https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,{
            method:"POST",
            body: data
        })
        const uploadImageURL=await res.json()
        console.log(uploadImageURL.url)
       setPhoto(uploadImageURL.url)
        setLoading(false)


    }
    if(loading) return <h1>Loading...</h1>
    console.log(import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);
    



    return (
        <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">
ddd
            </h1>
            <img src={photo} alt=""  />
           
          </div>
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <form className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Photo url</span>
                </label>
                <input type="file" onChange={handleFileUpload} name="photo" placeholder="input" className="input input-bordered" required />
              </div>
           
              <div className="form-control mt-6">
              \
              </div>
            </form>
          </div>
        </div>
      </div>
    );
};

export default TestImageUpload;