"use client";

import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'

const Navbar: React.FC = () => {
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [lastScrollY, setLastScrollY] = useState<number>(0);
  const [scrollingUp, setScrollingUp] = useState<boolean>(true);

  const handleScroll = () => {
    if (typeof window !== "undefined") {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY) {
        setScrollingUp(false);
        
        if (currentScrollY > 100) {
          setIsVisible(false);
        }
      } else {
        setScrollingUp(true);
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  const navbarVariants = {
    hidden: { y: -100, opacity: 0.3, transition: { duration: 0.8 } },
    visible: { y: 0, opacity: 1, transition: { duration: 0.8 } },
  };

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-50 w-full"
      variants={navbarVariants}
      initial="visible"
      animate={isVisible ? "visible" : "hidden"}
    >
      <nav className="w-full h-16 shadow-lg rounded-b-2xl px-2 flex items-center bg-gradient-to-r from-blue-500 via-sky-600 to-emerald-500 dark:bg-gradient-to-r dark:from-blue-900 dark:via-sky-900 dark:to-green-700 dark:bg-zinc-800">
        <div className="w-full flex flex-row justify-between items-center">
          <Link href="/">
            <Image
              src="/SDG-0.svg"
              alt="Logo"
              width={34}
              height={36}
              className="h-8 rounded-lg bg-slate-100"
            />
          </Link>
          <div>
            <ul className="flex flex-row justify-end">
              <li className="mx-5">
                <Link 
                className='hover:text-gray-100 text-lg dark:hover:text-slate-900'
                href="/about">About</Link>
              </li>
              <li className="mx-5">
                <Link 
                className='hover:text-gray-100 text-lg dark:hover:text-slate-900'
                href="/contact">Contact</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </motion.div>
  );
};

export default Navbar;