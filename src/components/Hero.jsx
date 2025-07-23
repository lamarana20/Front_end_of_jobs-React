import React, { useEffect } from 'react';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';

const Hero = ({
  title = "Become a dev",
  subtitle = "on the way"
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      toast.info('Welcome to our platform! 👋', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="bg-indigo-700 py-24 mb-6 rounded-b-3xl shadow-lg">
      <div className="max-w-6xl mx-auto px-6 flex flex-col items-center justify-center text-center">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-white text-5xl md:text-6xl font-extrabold leading-tight tracking-tight"
        >
          {title} <span role="img" aria-label="smile">😊</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-6 text-xl md:text-2xl text-white"
        >
          {subtitle} <span role="img" aria-label="happy">😄</span>
        </motion.p>
      </div>
    </section>
  );
};

export default Hero;
