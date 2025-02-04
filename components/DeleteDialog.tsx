import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useState } from "react"
import toast, { Toaster } from "react-hot-toast"
import { useRouter } from "next/navigation"

export function DeleteDialog({ TriggerIcon, id } : { TriggerIcon : React.ReactNode, id: string }) {
    const [isOpen, setIsOpen] = useState<boolean>(false)

    const router = useRouter()

    const handleErrorToast = (error: string) => {
        toast.error(error)
    }

    const handleSuccessToast = (success: string) => {
        toast.success(success)
    }

    const handleDelete = async (id:string) => {        
        try {
            const res = await fetch(`/api/members/${id}`,{
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json'
                  },
            })
            const data = await res.json()

            if (!data.ok) {
              handleErrorToast(data.message)
              return
            }

            handleSuccessToast(data.message)
        } catch (error) {
            if ( error instanceof Error) {
                handleErrorToast(error.message)
            } else {
                handleErrorToast("Some error occured")
            }
        }

    }
    
    return (
        <Dialog open={isOpen} onOpenChange={(open) => {
            setIsOpen(open)
        }}>
            <DialogTrigger asChild>
                <Button onClick={() => setIsOpen(true)} variant="newMemb">{TriggerIcon}</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Delete member</DialogTitle>
                </DialogHeader>
                <div>Once deleted, this member cannot be restored.</div>
                <DialogFooter>
                    <Button 
                    onClick={(e) => {
                        handleDelete(id)
                        setTimeout(() => {
                            setIsOpen(false)
                        }, 2000)
                        router.push("./SDGTeam")
                    }}
                    variant="destructive" 
                    className="hover:bg-destructive hover:scale-105 transition"
                    >
                        Delete Permanently
                    </Button>
                </DialogFooter>
                <Toaster/>
            </DialogContent>
        </Dialog>
    )
}