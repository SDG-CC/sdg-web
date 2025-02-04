"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
  
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useEffect, useState } from "react"
import { FaLink, FaInstagram } from "react-icons/fa";
import { CiLinkedin } from "react-icons/ci";
import { FaXTwitter } from "react-icons/fa6";
import { IoMailOpenOutline } from "react-icons/io5";
import { Textarea } from "./ui/textarea"
import { BiAddToQueue } from "react-icons/bi";
import toast, { Toaster } from "react-hot-toast"
import { useRouter } from "next/navigation"


type Designations = {
    id: string,
    name: string,
    priority: number
}

type Session = string

interface Data {
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

export function MemberDialog({designations, sessions, MemData, TriggerIcon}: {designations: Designations[], sessions:Session[], MemData?: Data, TriggerIcon: React.ReactNode}) {
    const [name, setName] = useState<string>("")
    const [designation, setDesignation] = useState<string>("")
    const [priority, setPriority] =  useState<number>()
    const [session, setSession] = useState<string>("")
    const [description, setDescription] = useState<string | null>(null)
    const [linkedin, setLinkedin] = useState<string | null>(null)
    const [email, setEmail] = useState<string | null>(null)
    const [instagram, setInstagram] = useState<string | null>(null)
    const [twitter, setTwitter] = useState<string | null>(null)
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [allSessions, setAllSessions] = useState<string[]>(sessions)
    const [newSession, setNewSession] = useState<string>("")
    const [showSessionPopup , setShowSessionPopup] = useState<boolean>(false)

   const router = useRouter();

    useEffect(() => {
      if (MemData) {
        setName(MemData.name)
        setDesignation(MemData.designation)
        setPriority(MemData.priority)
        setSession(MemData.session)
        setDescription(MemData.description)
        setLinkedin(MemData.linkedin)
        setEmail(MemData.email)
        setInstagram(MemData.instagram)
        setTwitter(MemData.twitter)
      }
    }, [isOpen])


    const sessionRegex = /^\d{4}-\d{2}$/

    const handleNewSession = () => {
      if (newSession.trim() != "" && !allSessions.includes(newSession)) {
        setAllSessions((prev) => [...prev, newSession])
        setSession(newSession)
        setNewSession("")
        setShowSessionPopup(false)
        handleSuccessToast("New session added")
      } else handleErrorToast("Session already available")
    }

    const sortedDesignations = [...designations].sort((a,b) => a.name.localeCompare(b.name))

    const sortedSessions = [...allSessions].sort()

    const handleErrorToast = (error: string) => {
      toast.error(error)
    }

    const handleSuccessToast = (success: string) => {
      toast.success(success)
    }

    const handleNewSubmit = async (e: React.FormEvent) => {
      e.preventDefault()
      setIsLoading(true)

      const info: Data = {
        name, 
        designation, 
        priority, 
        session,
        description,
        linkedin, 
        email,
        instagram,
        twitter,
      }

      const url = MemData 
      ? `/api/members/${MemData.id}`
      : '/api/members'

      const method = MemData ? 'PUT' : 'POST';

      try {
        const res = await fetch(url, {
          method: method,
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(info)
        })

        const data = await res.json()

        if (!data.ok) {
          handleErrorToast(data.message)
          return
        }

        if (data.ok) {
          handleSuccessToast(data.message)
          setTimeout(() => {
            setIsOpen(false)
          }, 1000)
          setName("")
          setDesignation("")
          setPriority(undefined)
          setSession("")
          setDescription(null)
          setLinkedin(null)
          setEmail(null)
          setInstagram(null)
          setTwitter(null)
          router.push("./SDGTeam")
          return
        }
      } catch (error) {
        if ( error instanceof Error) {
          handleErrorToast(error.message)
        } else {
          handleErrorToast("Some error occured")
        } 
      } finally {
        setIsLoading(false)
      }
    }


  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      if (!open && !isLoading) {
        setName("")
        setDesignation("")
        setSession("")
      }
      !isLoading && setIsOpen(open)
    }}>
      <DialogTrigger asChild>
        <Button onClick={() => setIsOpen(true)} variant="newMemb" className="p-2">{TriggerIcon}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] max-h-[100vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Member details</DialogTitle>
          <DialogDescription>
            Add details of member. Click submit when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-[38px] border-b p-1">
            <Label htmlFor="name" className="text-left text-base">
              Full Name
              <span className="text-red-500 font-bold">*</span>
            </Label>
            <Input 
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter full name"
            required
            className="w-[220px]" 
            />
          </div>
          <div className="flex items-center gap-[30px] border-b pb-1">
            <Label className="text-left text-base">
                Designation
                <span className="text-red-500 font-bold">*</span>
            </Label>
            <Select 
            value={designation ? JSON.stringify({ name: designation, priority }) : ""}
            onValueChange={(value: string) => {
                const allOptions = JSON.parse(value) as Designations;
                setDesignation(allOptions.name)
                setPriority(allOptions.priority)
            }}
            >
              <SelectTrigger className="w-[190px]">
                  <SelectValue                   
                  placeholder="Select designation">
                    {designation || null}
                  </SelectValue>
              </SelectTrigger>
              <SelectContent>
                  {sortedDesignations.map((designation) => (
                      <SelectItem 
                      key={designation.id}
                      value={JSON.stringify(designation)}
                      >{designation.name}</SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-row items-center gap-[58px] border-b pb-1">
            <Label className="text-left text-base">
                Session
                <span className="text-red-500 font-bold">*</span>
            </Label>
            <div
            className=" w-[250px] flex items-center gap-4"
            >
            <Select 
            value={session}
            onValueChange={(value: string) => setSession(value)}>
                <SelectTrigger className="w-[170px]">
                    <SelectValue placeholder="Select session" />
                </SelectTrigger>
                <SelectContent>
                  {sortedSessions.length > 0 ? (
                      sortedSessions.map((session) => (
                          <SelectItem 
                          key={session}
                          value={session}>{session}</SelectItem>
                      ))
                  ) : (
                    <SelectItem
                    key={"no-session"}
                    value="no-session"
                    disabled
                    className="justify-center"
                    >
                      No-Session
                    </SelectItem>
                  )}
                </SelectContent>
            </Select>
            <Popover open={showSessionPopup} onOpenChange={setShowSessionPopup}>
              <PopoverTrigger asChild>
                <Button 
                variant="outline" 
                className="w-[50px]"
                onClick={() => setShowSessionPopup(!showSessionPopup)}
                >
                  <BiAddToQueue className="scale-150"/>
                  </Button>
              </PopoverTrigger>
              <PopoverContent className="w-40 border border-gray-300">
                <div className="grid gap-2">
                <Label htmlFor="session" className="text-left font-semibold">
                  New session
                </Label>
                <Input
                id="session"
                value={newSession}
                placeholder="YYYY-YY"
                onChange={(e) => setNewSession(e.target.value) }
                required
                />
                <Button 
                className="w-1/2 ml-auto"
                onClick={() => {
                  if (!sessionRegex.test(newSession)) {
                    handleErrorToast("Enter a valid session in YYYY-YY format")
                    return
                  }
                  handleNewSession()
                }}
                >Add</Button>
                </div>
              </PopoverContent>
            </Popover>
            </div>
          </div>
          <div className="grid items-center gap-1 border-b pb-2">
            <Label 
            htmlFor="message" 
            className="text-left text-base">
                Description:
            </Label>
            <Textarea
            id="description"
            value={description ?? ""}
            onChange={(e) => {
              const value = e.target.value
              setDescription(value.trim() === "" ? null : value)
            }}
            placeholder="Some description..."
            className="resize-none"
            rows={3}
            maxLength={400}
            />
          </div>
        </div>
        <div className="grid gap-2">
            <div className="flex items-center underline">
            <FaLink/>
            <Label className="text-lg font-bold">
                Social media links
            </Label>
            </div>
            <div className="flex items-center gap-6">
                <IoMailOpenOutline size={34}/>
                <Input
                id="email"
                value={email ?? undefined}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email"
                />
            </div>
            <div className="flex items-center gap-6">
                <CiLinkedin size={34}/>
                <Input
                id="linkedin"
                value={linkedin ?? undefined}
                onChange={(e) => setLinkedin(e.target.value)}
                placeholder="linkedin"
                />
            </div>
            <div className="flex items-center gap-8">
                <FaXTwitter size={28}/>
                <Input
                id="twitter"
                value={twitter ?? undefined}
                onChange={(e) => setTwitter(e.target.value)}
                placeholder="twitter"
                />
            </div>
            <div className="flex items-center gap-8">
                <FaInstagram size={26}/>
                <Input
                id="instagram"
                value={instagram ?? undefined}
                onChange={(e) => setInstagram(e.target.value)}
                placeholder="instagram"
                />
            </div>
        </div>
        <DialogFooter>
            <Button 
            disabled = {isLoading}
            onClick={handleNewSubmit}
            >
              {isLoading? "Submitting" : "Submit"}
            </Button>
          </DialogFooter>
        <Toaster/>
      </DialogContent>
    </Dialog>
  )
}
