import { auth } from "@/lib/auth"
import { RegisterForm } from "./register-form"
import { redirect } from "next/navigation"

export default async function RegisterPage() {
  const session = await auth()
  
  if (session) {
    redirect("/")
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <RegisterForm />
    </div>
  )
}