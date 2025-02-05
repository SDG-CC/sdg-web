'use client'

import { motion } from "framer-motion"
import { MdOutlineDeleteForever } from "react-icons/md"
import { LiaUserEditSolid } from "react-icons/lia";
import { MemberDialog } from "@/components/MemberDialog";
import { useMemo } from "react";
import { DeleteDialog } from "@/components/DeleteDialog";
interface Member {
    id?: string,
    name: string,
    designation: string,
    priority: number | undefined,
    session: string,
    imageId?: string,
    description: string | null,
    linkedin: string | null,
    email: string | null,
    instagram: string | null,
    twitter: string | null,
}

type Designations = {
    id: string,
    name: string,
    priority: number
}

type Session = string

export default function MembersList({ members, session, designations, sessions }:{ members: Member[], session: any, designations: Designations[], sessions: Session[] }) {

    const isAdmin = session?.user.role === "ADMIN"
    const sortedMembers = useMemo(() => {
        return members.every(member => member.priority != undefined)
          ? [...members].sort((a, b) => (a.priority ?? 0) - (b.priority ?? 0))
          : [...members];
      }, [members]);

    return (
        <ul className="flex items-center flex-wrap justify-center my-4 mx-auto max-w-[1200px] gap-8">
            {sortedMembers.map((member) => (
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
                className="flex flex-col justify-start items-center m-[10px] min-h-[450px] overflow-hidden w-[300px] shadow-[0_0_5px_rgba(0,0,0,0.5)] rounded-3xl bg-blue-700 text-white">
                    <div className="w-full flex justify-between items-end border-b-[0.5px] border-gray-400 h-20 mb-2">
                        <div
                        className="w-4/5 pl-3 pr-1 h-full flex flex-row justify-between items-center border-r-[0.5px] border-gray-400 text-2xl font-semibold"
                        >
                            <h1>{member.designation}</h1>
                            {isAdmin &&(<div
                            className="flex flex-col justify-end"
                            >
                                <MemberDialog
                                    designations={designations} 
                                    sessions={sessions} 
                                    TriggerIcon={<LiaUserEditSolid />}
                                    MemData={member}
                                />
                                <DeleteDialog
                                id={member.id as string}
                                TriggerIcon={<MdOutlineDeleteForever />}
                                />
                            </div>)}
                        </div>
                        <div>
                            <img
                            src="/SDGWhiteLogo.svg"
                            alt="SDG-logo"
                            className="h-16 pr-2"
                            />
                        </div>
                    </div>
                    <div className="flex items-center justify-center w-3/4 rounded-full overflow-hidden">
                        <img
                            src={member?.imageId ? `https://utfs.io/f/${member.imageId}` : "https://utfs.io/f/p8hfLIDgJ3zPBVeMnq6tybXnkKMlYFNjCZpsU8WAG6dcSm1Q"}
                            alt="member"
                            className="object-contain w-full h-full bg-slate-300"
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