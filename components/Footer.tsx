"use client";

import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTelegram, faFacebook, faInstagram, faLinkedin, faWhatsapp } from "@fortawesome/free-brands-svg-icons";

export default function Footer() {
  const controls = useAnimation();
  const { ref, inView } = useInView({
    threshold: 0.2,
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [inView, controls]);

  const fadeInFromBottom = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  return (
    <footer ref={ref} className="bg-gray-800 text-white py-10">
      <motion.div
        initial="hidden"
        animate={controls}
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.2,
            },
          },
        }}
        className="container mx-auto px-6"
      >
        <motion.div
          className="flex flex-wrap lg:flex-nowrap justify-between items-start gap-6"
        >
          <motion.div
            variants={fadeInFromBottom}
            className="w-full sm:w-1/2 lg:w-1/4"
          >
            <h2 className="text-xl font-bold">SDG CAMPUS CLUB</h2>
            <p className="text-gray-400 mt-2">Sustainable Development Goals</p>
            <p className="text-gray-400 mt-4">
              <span className="font-medium">Email:</span> sdgcampusclub.nitrkl@gmail.com
            </p>
            <img
            src="/SDGWhiteLogo.svg"
            alt="logo"
            className="max-h-32"
            />
          </motion.div>

          <motion.div
            variants={fadeInFromBottom}
            className="w-full sm:w-1/2 lg:w-1/4"
          >
            <h3 className="text-lg font-bold">Useful Links</h3>
            <ul className="mt-4 space-y-2">
              {["Home", "Agenda 2030/services", "All SDG Goals", "Contact Us"].map((link, index) => (
                <li key={index}>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white flex items-center"
                  >
                    <span className="mr-2 text-orange-500">&gt;</span> {link}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            variants={fadeInFromBottom}
            className="w-full sm:w-1/2 lg:w-1/4"
          >
            <h3 className="text-lg font-bold">Our Community</h3>
            <ul className="mt-4 space-y-2">
              {["Core Team", "Technical Team", "Management Team", "Design Team", "Content Team"].map((team, index) => (
                <li key={index}>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white flex items-center"
                  >
                    <span className="mr-2 text-orange-500">&gt;</span> {team}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            variants={fadeInFromBottom}
            className="w-full sm:w-1/2 lg:w-1/4"
          >
            <h3 className="text-lg font-bold">Our Social Networks</h3>
            <p className="text-gray-400 mt-4">
              Follow us to stay connected with SDG CAMPUS CLUB NITRKL
            </p>
            <div className="flex items-center space-x-4 mt-4">
              <motion.a
                href="https://t.me/sdgccnitrkl"
                whileHover={{ scale: 1.7 }}
                whileTap={{ scale: 0.9 }}
                variants={{
                    hidden: { opacity: 0, y: 50 },
                    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 80, damping: 8, } }
                  }}
                className="w-8 h-8 bg-[#24A1DE] rounded-full flex items-center justify-center text-white"
              >
                <FontAwesomeIcon icon={faTelegram} />
              </motion.a>
              <motion.a
                href="https://www.facebook.com/sdgcampusclubnitrkl"
                whileHover={{ scale: 1.7 }}
                whileTap={{ scale: 0.9 }}
                variants={{
                    hidden: { opacity: 0, y: 40 },
                    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 80, damping: 8, } }
                  }}
                className="w-8 h-8 bg-[#1877F2] rounded-full flex items-center justify-center text-white"
              >
                <FontAwesomeIcon icon={faFacebook} />
              </motion.a>
              <motion.a
                href="https://www.instagram.com/sdgcampusclub_nitrkl?igsh=ank4ZzMyZDRwOXhq"
                whileHover={{ scale: 1.7 }}
                whileTap={{ scale: 0.9 }}
                variants={{
                    hidden: { opacity: 0, y: 30 },
                    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 80, damping: 8, } }
                  }}
                className="w-8 h-8 bg-[#E1306C] rounded-full flex items-center justify-center text-white"
              >
                <FontAwesomeIcon icon={faInstagram} />
              </motion.a>
              <motion.a
                href="https://www.linkedin.com/company/sdg-campus-club-nitrkl/posts/?feedView=all"
                whileHover={{ scale: 1.7 }}
                whileTap={{ scale: 0.9 }}
                variants={{
                    hidden: { opacity: 0, y: 40 },
                    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 80, damping: 8, } }
                  }}
                className="w-8 h-8 bg-[#0077B5] rounded-full flex items-center justify-center text-white"
              >
                <FontAwesomeIcon icon={faLinkedin} />
              </motion.a>
              <motion.a
                href="https://chat.whatsapp.com/Fo6G0Occ1zGGKtfgfXVTUw"
                whileHover={{ scale: 1.7 }}
                whileTap={{ scale: 0.9 }}
                variants={{
                    hidden: { opacity: 0, y: 50 },
                    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 80, damping: 8, } }
                  }}
                className="w-8 h-8 bg-[#32b932] rounded-full flex items-center justify-center text-white"
              >
                <FontAwesomeIcon icon={faWhatsapp} />
              </motion.a>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </footer>
  );
}
