import { motion } from "framer-motion";
import { useMediaQuery } from "react-responsive"; // Import the hook for media query
import pic1 from '../assets/pic1.jpg';
import pic2 from '../assets/pic2.jpg';

const Bannar1 = () => {
  // Check the screen size
  const isLg = useMediaQuery({ query: '(min-width: 1024px)' });  // Large devices
  const isMd = useMediaQuery({ query: '(min-width: 768px) and (max-width: 1023px)' });  // Medium devices
  const isSm = useMediaQuery({ query: '(max-width: 767px)' });  // Small devices

  return (
    <div className="hero bg-slate-600 pb-60 ">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="flex-1">
          {/* Image 1 animation */}
          <motion.img
            animate={{ y: [50, 150, 50] }}
            transition={{ duration: 5, repeat: Infinity }}
            src={pic1}
            className="max-w-sm rounded-t-3xl w-64 rounded-br-3xl border-l-4 border-b-4 border-blue-500 shadow-2xl"
          />

          {/* Image 2 animation */}
          <motion.img
            animate={{
              // Conditionally set the animation based on the screen size
              x: isLg ? [100, 150, 100] : undefined,  // For large devices
              y: (isSm || isMd) ? [100, 150, 100] : undefined,  // For small or medium devices
            }}
            transition={{ duration: 5, repeat: Infinity }}
            src={pic2}
            className="max-w-sm rounded-t-3xl w-64 rounded-br-3xl border-l-4 border-b-4 border-blue-500 shadow-2xl"
          />
        </div>

        <div className="flex-1">
          <motion.h1 initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-5xl font-bold">
            Give Blood, Save Life ❤️🩸
          </motion.h1>
          <motion.p
            animate={{ x: 50, color: ['red', 'blue', 'yellow'] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="py-2"
          >
            Donate Blood, Be a Hero!
          </motion.p>
          <motion.p
            animate={{ x: 50, color: ['black', 'red', 'pink'] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="py-6 text-3xl font-bold"
          >
            A Drop for You, A Life for Someone!
          </motion.p>
        </div>
      </div>
    </div>
  );
};

export default Bannar1;
