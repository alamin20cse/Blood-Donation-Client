import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="bg-gray-600 text-white py-8 mt-10">
            <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">

                {/* Quick Links */}
                <div>
                    <h3 className="text-xl font-bold mb-3">Quick Links</h3>
                    <ul className="space-y-2">
                        <li><Link to="/" className="hover:underline">Home</Link></li>
                        <li><Link to="/blogpublic" className="hover:underline">Blog</Link></li>
                        <li><Link to="/dashboard" className="hover:underline">Dashboard</Link></li>
                        <li><Link to="/contact" className="hover:underline">Contact Us</Link></li>
                    </ul>
                </div>

                {/* Contact Details */}
                <div>
                    <h3 className="text-xl font-bold mb-3">Contact Us</h3>
                    <p>📍 123 Blood Drive Street, City, Country</p>
                    <p>📞 +123 456 7890</p>
                    <p>📧 support@blooddonation.com</p>
                </div>

                {/* Social Media */}
                <div>
                    <h3 className="text-xl font-bold mb-3">Follow Us</h3>
                    <div className="flex space-x-4 text-2xl">
                        <a href="#" className="hover:text-gray-300"><FaFacebook /></a>
                        <a href="#" className="hover:text-gray-300"><FaTwitter /></a>
                        <a href="#" className="hover:text-gray-300"><FaInstagram /></a>
                        <a href="#" className="hover:text-gray-300"><FaLinkedin /></a>
                    </div>
                </div>
            </div>

            {/* Copyright Section */}
            <div className="text-center text-sm mt-6 border-t border-white pt-4">
                &copy; {new Date().getFullYear()} Blood Donation | All Rights Reserved.
            </div>
        </footer>
    );
};

export default Footer;
