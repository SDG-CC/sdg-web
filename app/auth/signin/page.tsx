import { auth } from "@/lib/auth"
import { LoginForm } from "./login-form"
import { redirect } from "next/navigation"

export default async function SignInPage() {
  const session = await auth()
  
  if (session) {
    redirect("/")
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <LoginForm />
    </div>
  )
}