import { motion } from "framer-motion";
import { useMediaQuery } from "react-responsive";
import pic1 from '../assets/pic1.avif';
import pic2 from '../assets/pic2.webp';

const Bannar1 = () => {
  const isLg = useMediaQuery({ query: '(min-width: 1024px)' });
  const isMd = useMediaQuery({ query: '(min-width: 768px) and (max-width: 1023px)' });
  const isSm = useMediaQuery({ query: '(max-width: 767px)' });

  return (
    <div className="hero bg-slate-600 pb-20">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="flex-1">
          {/* Image 1 animation */}
          <motion.img
            animate={{ y: [50, 150, 50] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            src={pic1}
            className="max-w-sm rounded-t-3xl w-64 rounded-br-3xl border-l-4 border-b-4 border-blue-500 shadow-2xl"
            alt="Blood donation image 1"
          />

          {/* Image 2 animation */}
          <motion.img
            animate={{
              x: isLg ? [100, 150, 100] : [0, 0, 0],  
              y: (isSm || isMd) ? [100, 150, 100] : [0, 0, 0],  
            }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            src={pic2}
            className="max-w-sm rounded-t-3xl w-64 rounded-br-3xl border-l-4 border-b-4 border-blue-500 shadow-2xl"
            alt="Blood donation image 2"
          />
        </div>


        <div className="flex-1 text-white text-center pt-64 md:pt-64 lg:pt-20 lg:text-left ">
          <motion.h1
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-5xl font-bold"
            aria-label="Give Blood, Save Life"
          >
            Give Blood, Save Life ❤️🩸
          </motion.h1>
          <div style={{ overflowX: 'auto', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
  <motion.p 
    animate={{ x: [0, 50, 0], color: ["#FF0000", "#0000FF", "#FFFF00"] }}
    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
    className="py-2"
  >
    Donate Blood, Be a Hero!
  </motion.p>

  <motion.p 
    animate={{ x: [0, 50, 0], color: ["#000000", "#FF0000", "#FFC0CB"] }}
    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
    className="py-6 text-3xl font-bold"
  >
    A Drop for You, A Life for Someone!
  </motion.p>
</div>
        </div>
      </div>
    </div>
  );
};

export default Bannar1;
