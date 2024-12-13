'use client';

import { motion } from 'framer-motion';

const containerVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const items = [
  '/SDG-0.svg',
  '/SDG-1.svg',
  '/SDG-2.svg',
  '/SDG-3.svg',
  '/SDG-4.svg',
  '/SDG-5.svg',
  '/SDG-6.svg',
  '/SDG-7.svg',
  '/SDG-8.svg',
  '/SDG-9.svg',
  '/SDG-10.svg',
  '/SDG-11.svg',
  '/SDG-12.svg',
  '/SDG-13.svg',
  '/SDG-14.svg',
  '/SDG-15.svg',
  '/SDG-16.svg',
  '/SDG-17.svg',
];

const itemVariants = {
  hidden: {
    opacity: 0,
    scale: 0.5,
    y: 20,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: 'spring',
      damping: 8, 
      stiffness: 150, 
      mass: 1, 
      duration: 1.2, 
    },
  },
};

const SdgsHomeLoading = () => {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex-1 p-4"
    >
      <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {items.map((src, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className="flex justify-center items-center"
          >
            <img
              src={src}
              alt={`SDG-${index}`}
              className="w-16 h-16 sm:w-20 sm:h-20 md:w-22 md:h-22 rounded-md"
            />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default SdgsHomeLoading;
