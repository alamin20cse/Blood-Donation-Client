import { useEffect, useState } from "react";
import contactpic from '../assets/contactpic.webp';
import { Helmet } from "react-helmet-async";

const Contact = () => {
    const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  
   

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log("Form Data:", formData);
        alert("Your message has been sent!");
        setFormData({ name: "", email: "", message: "" });
    };

    return (
        <div className="relative px-14 mx-auto p-6 bg-white rounded-lg shadow-lg pt-16">
               <Helmet>
        <title>Blood Donation Application | Contact</title>
    </Helmet>
            {/* Background Image with Opacity Overlay */}
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                    backgroundImage: `url(${contactpic})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    filter: "brightness(60%)", // Darkens image instead of opacity
                }}
            ></div>

            {/* Contact Content (kept above background) */}
            <div className="relative z-10">
                <h2 className="text-3xl font-bold text-center text-white">📞 Contact Us</h2>
                <p className="text-gray-200 text-center mt-2">
                    Have questions? Reach out to us!
                </p>

                {/* Contact Info Section */}
                <div className="mt-6 flex flex-col md:flex-row items-center justify-between">
                    <div className="w-full md:w-1/2 space-y-4 text-white">
                        <p className="text-lg font-semibold">📍 Address:</p>
                        <p>123 Blood Drive Street, City, Country</p>
                        
                        <p className="text-lg font-semibold">📞 Phone:</p>
                        <p>+123 456 7890</p>

                        <p className="text-lg font-semibold">📧 Email:</p>
                        <p>support@blooddonation.com</p>
                    </div>

                    {/* Contact Form */}
                    <div className="w-full md:w-1/2 mt-6 md:mt-0 bg-white">
                        <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-lg">
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Your Name"
                                className="text-gray-400 placeholder-gray-400 w-full p-3 border rounded-lg focus:outline-none focus:border-red-500"
                                required
                            />
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Your Email"
                                className="text-gray-400 placeholder-gray-400 w-full p-3 border rounded-lg focus:outline-none focus:border-red-500"
                                required
                            />
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                placeholder="Your Message"
                                rows="4"
                                className="text-gray-400 placeholder-gray-400 w-full p-3 border rounded-lg focus:outline-none focus:border-red-500"
                                required
                            />
                            <button
                                type="submit"
                                className="w-full bg-red-500 text-white py-2 rounded-lg shadow-md hover:bg-red-600 transition"
                            >
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
