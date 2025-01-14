import { headers } from "next/headers"
import MembersList from "./MembersList"
import { auth } from "@/lib/auth"
import { MemberDialog } from "@/components/MemberDialog";

type Session = string

async function fetchMembers() {
  const headersList = await headers();
  const host = headersList.get('host');
  const protocol = headersList.get('x-forwarded-proto') || 'http';
  
  const res = await fetch(`${protocol}://${host}/api/members`,{
    cache: "no-store"
  });
  
  if(!res.ok){
    throw new Error("Fail to fetch member.")
  }

  const data = await res.json()
  return data
}

async function fetchDesignations() {
  const headedsList = await headers();
  const host = headedsList.get('host');
  const protocol = headedsList.get('x-forwarded-proto') || 'http';

  const res = await fetch(`${protocol}://${host}/api/designations`,{
    cache: "no-store"
  });

  if (!res.ok) {
    throw new Error("Failed to fetch designations.")
  }

  const data = await res.json()
  return data
}

async function fetchSessions() {
  const headersList = await headers();
  const host = headersList.get('host');
  const protocol = headersList.get('x-forwarded-proto') || 'http';
  
  const res = await fetch(`${protocol}://${host}/api/sessions`,{
    cache: "no-store"
  });
  
  if(!res.ok){
    throw new Error("Failed to fetch sessions.")
  }

  const data: Session[] = await res.json()
  return data
}

export default async function MembersPage() {
  const members = await fetchMembers()
  const designations = await fetchDesignations()
  const sessions = await fetchSessions()
  const session = await auth()
  const isAdmin = session?.user.role == "ADMIN"

  const profs = members.filter((member: {priority: number}) => member.priority <=30)

  const exeBody = members.filter((member: {priority: number}) => member.priority >= 50 && member.priority <= 105)

  const remMembers = members.filter((member: {priority: number}) => member.priority >=110 && member.priority)

  return (
    <div className="w-full pt-20 flex flex-col items-center gap-2 bg-gray-300 dark:bg-gray-800">
      <div
      className="w-full flex justify-end px-4"
      >
      {isAdmin && <MemberDialog designations={designations} sessions={sessions}/>}
      </div>
      <div className="w-full z-10 mb-16 flex flex-col items-center gap-6 border-y-2 border-zinc-600 dark:border-zinc-400 rounded-3xl">
        <h1 className="font-bold text-3xl text-[#f5f2f2] bg-[#133e66] rounded-xl p-2">Advisory Committee</h1>
        <MembersList members={profs} session={session}/>
      </div>
      <div className="w-full z-10 mb-16 flex flex-col items-center gap-6 border-y-2 border-zinc-600 dark:border-zinc-400 rounded-3xl">
        <h1 className="font-bold text-3xl text-[#f5f2f2] bg-[#133e66] rounded-xl p-2">Governing Body</h1>
        <MembersList members={exeBody} session={session}/>
      </div>
      <div className="w-full z-10 mb-16 flex flex-col items-center gap-6 border-y-2 border-zinc-600 dark:border-zinc-400 rounded-3xl">
        <h1 className="font-bold text-3xl text-[#f5f2f2] bg-[#133e66] rounded-xl p-2">Members</h1>
        <MembersList members={remMembers} session={session}/>
      </div>
    </div>
  )
}

