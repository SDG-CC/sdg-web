"use client";

import { motion } from "framer-motion";
import { signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "./ui/button";
import { useSearchParams } from "next/navigation";
import {
    User,
    LogOut
} from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
  
interface ClientNavbarProps {
  session: any;
}

const ClientNavbar: React.FC<ClientNavbarProps> = ({ session }) => {
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [lastScrollY, setLastScrollY] = useState<number>(0);

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/"

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

  const firstLetter = session?.user.name.charAt(0).toUpperCase()

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
          {session ? (
            <li className="mx-5">
                <DropdownMenu>
                <DropdownMenuTrigger 
                className="bg-blue-600 rounded-full p-1 w-8 hover:scale-125 active:scale-75 transform-transform duration-75 focus:outline-dashed outline-dashed outline-blue-600">
                    {firstLetter}
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel>{session.user.name}</DropdownMenuLabel>
                    <DropdownMenuSeparator className="bg-gray-300"/>
                    <DropdownMenuItem>
                        <User/>
                        <span>Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-gray-100 m-0"/>
                    <DropdownMenuItem onClick={() => signOut()}>
                        <LogOut/>
                        <span>Logout</span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
                </DropdownMenu>
            </li>
          ) : (
            <li className="mx-5">
              <Button
              variant="login"
                onClick={() => signIn()}
              >
                Login
              </Button>
            </li>
          )}
        </ul>
      </div>
    </motion.nav>
  );
};

export default ClientNavbar;
