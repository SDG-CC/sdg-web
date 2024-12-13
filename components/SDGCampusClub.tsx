'use client'
import { motion } from 'framer-motion';
import React from 'react'

const logoVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      y: 50,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 10,
      },
    },
  };

const itemVariants = {
    hidden: {
      opacity: 0,
      scale: 0.5,
      y: 50,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 8,
      },
    },
  };

  const containerVariants = {
    hidden: {
      opacity: 0,
      y: 50,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        duration: 1,
        ease: "easeOut",
        staggerChildren: 0.2,
        delayChildren: 0.3,
     },
    },
  };

const SDGCampusClub = () => {
  return (
    <div className='flex flex-1 flex-col md:flex-row lg:flex-row gap-4 pr-2'>
    <motion.div 
    variants={containerVariants}
    initial="hidden"
    animate="visible"
    className='flex flex-1 flex-col font-serif justify-center items-center'>
        <motion.h2 
        variants={itemVariants}
        className='text-9xl font-bold text-emerald-600'
        >
            SDG</motion.h2>
        <motion.h1 
        variants={itemVariants}
        className='text-4xl font-semibold text-sky-500'
        >
            Campus Club</motion.h1>
        <motion.p 
        variants={itemVariants}
        className='text-3xl font-semibold text-amber-600'
        >
            SAC, NIT Rourkela</motion.p>
    </motion.div>
    <div className='flex flex-1 flex-row md:flex-col lg:flex-col justify-around items-center'>
        <motion.div 
        variants={logoVariants}
        initial="hidden"
        animate="visible"
        className='flex-1 w-32 h-32'>
            <img src='/NITRklLogo.svg' alt='logo'/>
        </motion.div>
        <motion.div 
        variants={logoVariants}
        initial="hidden"
        animate="visible"
        className='flex-1 w-28 h-28'>
            <img src='/SDGWheel.svg' alt='logo'/>
        </motion.div>
    </div>
    </div>
  )
}

export default SDGCampusClub