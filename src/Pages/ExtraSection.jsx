import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';


import pic1 from '../assets/pic1.avif';
import pic2 from '../assets/pic2.webp';
import pic3 from '../assets/pic3.jpg';

const ExtraSection = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
    });
  }, []);

  return (
    <div
      className="relative py-16"
      style={{ backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      {/* Dark Overlay for Readability */}
      <div className="absolute inset-0 bg-white bg-opacity-40"></div>

      <div className="relative max-w-6xl mx-auto p-8 bg-white bg-opacity-95 rounded-3xl shadow-2xl">
        {/* Section 1: Why Donate Blood */}
        <div data-aos="fade-right" className="flex flex-col md:flex-row items-center gap-8 bg-gradient-to-r from-blue-100 to-slate-300 p-8 rounded-3xl shadow-xl ">
          <img src={pic2} alt="Blood Donation" className="w-full md:w-1/2 rounded-xl shadow-lg transform hover:scale-105 transition-all" />
          <div className="text-gray-600">
            <h2 className="text-4xl font-bold">🩸 Why Donate Blood?</h2>
            <ul className="list-disc list-inside mt-4 space-y-2 text-lg">
              <li><span className="font-bold">Saves Lives</span> – Essential for critical patients.</li>
              <li><span className="font-bold">Boosts Health</span> – Helps maintain iron levels.</li>
              <li><span className="font-bold">Medical Treatments</span> – Needed for anemia & surgeries.</li>
              <li><span className="font-bold">Strengthens Community</span> – Directly impacts lives.</li>
            </ul>
          </div>
        </div>

        {/* Section 2: Who Can Donate Blood */}
        <div data-aos="flip-left" className="flex flex-col md:flex-row-reverse items-center gap-8 mt-12 bg-gradient-to-r from-blue-200 to-slate-200 p-8 rounded-3xl shadow-xl ">
          <img src={pic1} alt="Eligibility" className="w-full md:w-1/2 rounded-xl shadow-lg transform hover:scale-105 transition-all" />
          <div className="text-gray-600">
            <h3 className="text-3xl font-semibold">🏥 Who Can Donate Blood?</h3>
            <ul className="list-disc list-inside mt-4 space-y-2 text-lg">
              <li>✔ <span className="font-bold">18-65 years old</span> (varies by country).</li>
              <li>✔ Weigh at least <span className="font-bold">50 kg (110 lbs)</span>.</li>
              <li>✔ Be in <span className="font-bold">good health</span>, free from infections.</li>
              <li>✔ Not donated in the last <span className="font-bold">3-4 months</span>.</li>
            </ul>
          </div>
        </div>

        {/* Section 3: Blood Donation Process */}
        <div data-aos="fade-up" className="flex flex-col md:flex-row items-center gap-8 mt-12 bg-gradient-to-r from-blue-200 to-slate-200 p-8 rounded-3xl shadow-xl ">
          <img src={pic3} alt="Blood Donation Process" className="w-full md:w-1/2 rounded-xl shadow-lg transform hover:scale-105 transition-all" />
          <div className="text-gray-600">
            <h3 className="text-3xl font-semibold">💉 Blood Donation Process</h3>
            <ol className="list-decimal list-inside mt-4 space-y-2 text-lg">
              <li><span className="font-bold">Registration</span> – Fill out a form.</li>
              <li><span className="font-bold">Health Screening</span> – Hemoglobin test.</li>
              <li><span className="font-bold">Donation</span> – 450ml of blood collected.</li>
              <li><span className="font-bold">Recovery</span> – Rest and light snack.</li>
            </ol>
          </div>
        </div>

        {/* Call to Action with Typewriter Effect */}
        <div className="text-center mt-12">
          <div className="text-gray-800 text-2xl font-semibold">
          <div className="text-gray-800 text-2xl font-semibold">
  ❤️Be a Hero – Donate Blood Today!', 'Your effort can save lives!
</div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ExtraSection;
