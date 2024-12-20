"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";
import Image from "next/image";


const ClientNavbar= () => {
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [lastScrollY, setLastScrollY] = useState<number>(0);

  const handleScroll = () => {
    if (typeof window !== "undefined") {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY) {
        if (currentScrollY > 100) {
          setIsVisible(false);
        }
      } else {
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
    <motion.nav
      className="w-full h-16 shadow-lg rounded-b-2xl px-2 flex items-center bg-gradient-to-r from-blue-500 via-sky-600 to-emerald-500"
      variants={navbarVariants}
      initial="visible"
      animate={isVisible ? "visible" : "hidden"}
    >
      <div className="w-full flex justify-between items-center">
        <Link href="/">
          <Image
            src="/SDG-0.svg"
            alt="Logo"
            width={34}
            height={36}
            className="h-8 rounded-lg bg-slate-100"
          />
        </Link>
        <ul className="flex items-center">
          <li className="mx-5">
            <Link href="/about">About</Link>
          </li>
          <li className="mx-5">
            <Link href="/contact">Contact</Link>
          </li>
        </ul>
      </div>
    </motion.nav>
  );
};

export default ClientNavbar;
