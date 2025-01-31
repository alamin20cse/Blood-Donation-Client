import pic1 from '../assets/pic1.jpg'
import pic2 from '../assets/pic2.jpg'
import pic3 from '../assets/pic3.jpg'



const ExtraSection = () => {
    return (
        <div className="max-w-5xl mx-auto p-6 bg-white rounded-lg shadow-lg">
            {/* Section 1: Why Donate Blood */}
            <div className="flex flex-col md:flex-row items-center gap-6 bg-pink-300 rounded-2xl">
                <img 
                    src={pic2}
                    alt="Blood Donation" 
                    className="w-full md:w-1/2 rounded-lg shadow-md"
                />
                <div>
                    <h2 className="text-3xl font-bold text-red-600">🩸 Why Donate Blood?</h2>
                    <ul className="list-disc list-inside text-gray-700 mt-4 space-y-2">
                        <li><span className="font-bold text-red-500">Saves Lives</span> – Essential for patients in critical conditions.</li>
                        <li><span className="font-bold text-red-500">Promotes Good Health</span> – Maintains healthy iron levels.</li>
                        <li><span className="font-bold text-red-500">Supports Medical Treatments</span> – Needed for anemia, leukemia, and surgeries.</li>
                        <li><span className="font-bold text-red-500">Encourages Community Support</span> – Directly impacts lives.</li>
                    </ul>
                </div>
            </div>

            {/* Section 2: Who Can Donate Blood */}
            <div className="flex flex-col md:flex-row-reverse items-center gap-6 mt-10 bg-yellow-200 rounded-2xl">
                <img 
                    src={pic1}
                    alt="Eligibility" 
                    className="w-full md:w-1/2 rounded-lg shadow-md"
                />
                <div>
                    <h3 className="text-xl font-semibold text-red-500">🏥 Who Can Donate Blood?</h3>
                    <ul className="list-disc list-inside text-gray-700 mt-2 space-y-2">
                        <li>✔ <span className="font-bold">18-65 years old</span> (varies by country).</li>
                        <li>✔ Weigh at least <span className="font-bold">50 kg (110 lbs)</span>.</li>
                        <li>✔ Be in <span className="font-bold">good health</span> and free from infections.</li>
                        <li>✔ Not donated blood in the last <span className="font-bold">3-4 months</span>.</li>
                    </ul>
                </div>
            </div>

            {/* Section 3: Blood Donation Process */}
            <div className="flex flex-col md:flex-row items-center gap-6 mt-10 bg-amber-300 rounded-3xl ">
                <img 
                    src={pic3}
                    alt="Blood Donation Process" 
                    className="w-full md:w-1/2 rounded-lg shadow-md"
                />
                <div>
                    <h3 className="text-xl font-semibold text-red-500">💉 Blood Donation Process</h3>
                    <ol className="list-decimal list-inside text-gray-700 mt-2 space-y-2">
                        <li><span className="font-bold text-red-500">Registration</span> – Fill out a form.</li>
                        <li><span className="font-bold text-red-500">Health Screening</span> – Hemoglobin test.</li>
                        <li><span className="font-bold text-red-500">Donation</span> – 450ml of blood collected.</li>
                        <li><span className="font-bold text-red-500">Recovery</span> – Rest and light snack.</li>
                    </ol>
                </div>
            </div>

            {/* Call to Action */}
            <div className="text-center mt-10">
                <p className="text-gray-700 font-medium">❤️ Be a Hero – Donate Blood Today!</p>
                <p className="text-gray-600">Your effort can save lives.</p>
              
            </div>
        </div>
    );
};

export default ExtraSection;
