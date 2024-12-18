'use client'

import { motion } from "framer-motion"

interface Member {
    id: string
    name: string
    designation: string
    imageId: string
}

export default function MembersList({ members }:{ members: Member[] }) {
    return (
        <ul className="flex items-center flex-wrap justify-center my-4 mx-auto max-w-[1200px]">
            {members.map((member) => (
                <motion.li 
                whileHover={{
                    scale: 1.05,
                    boxShadow: "0 0 10px rgba(0,0,0,0.5)",
                    transition: {
                        duration: 0.1,
                        ease: "easeInOut"
                    }
                }}
                key={member.id} 
                className="flex flex-col justify-start items-center m-[10px] min-h-[450px] overflow-hidden w-[300px] shadow-[0_0_5px_rgba(0,0,0,0.5)] rounded-3xl bg-gradient-to-tr from-cyan-800 via-blue-700 to-teal-700">
                    <div className="w-full flex justify-between items-end border-b-[0.5px] border-gray-400 h-20 mb-2">
                        <h1 className="w-4/5 px-4 h-full flex items-center border-r-[0.5px] border-gray-400 text-2xl font-semibold">{member.designation}</h1>
                        <img
                        src="/SDGBlackLogo.svg"
                        alt="SDG-logo"
                        className="h-16 pr-2"
                        />
                    </div>
                    <div className="flex items-center justify-center w-3/4 rounded-full overflow-hidden">
                        <img
                            src={member?.imageId ? `https://utfs.io/f/${member.imageId}` : "/Avatar.svg"}
                            alt="member"
                            className="object-contain w-full h-full bg-slate-400 dark:bg-slate-500"
                        />
                    </div>
                    <div className="flex justify-between items-center flex-col h-full w-full border-t-[0.5px] border-gray-400 my-2 mt-auto pt-2 mb-9">
                        <h3 className="font-semibold text-xl pb-2">{member.name}</h3>
                        <div className="flex items-center justify-center w-full border-t-[0.5px] border-gray-400">
                            links
                        </div>
                    </div>
                </motion.li>
            ))}
        </ul>
    )
}