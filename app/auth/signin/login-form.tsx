'use client'

import { useState } from "react"
import Link from "next/link"
import { credentialLogIn } from "@/app/authActions/actions"
import { useRouter } from "next/navigation"
import { useSearchParams } from "next/navigation"
import { BiSolidHide, BiSolidShow } from "react-icons/bi"
import toast, { Toaster } from "react-hot-toast"

export function LoginForm() {
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)
  const [showPassword, setShowpassword] = useState<boolean>(false)

  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get("callbackUrl") || "/"
  const router = useRouter();

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/


  const handleErrorToast = (message: string) => { toast.error(message) }

  const handleSuccessToast = (message: string) => { toast.success(message) }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    if (!emailRegex.test(email)) {
        handleErrorToast("Enter a valid email address!")
        setLoading(false)
        return
      }

    try {   
        const result = await credentialLogIn({email, password})

        if (!result?.ok) {
            handleErrorToast(result?.error as string);
            setLoading(false);
            return
        }

        handleSuccessToast("Login successful")
        router.push(callbackUrl)

    } catch (error) {
      handleErrorToast("An unexpected error occured")
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-[300px] h-[325px] bg-blue-700 rounded-xl max-w-sm">
        <div
        className="flex flex-row justify-between items-center text-white font-bold text-xl pl-4 border-b-[0.5px] border-gray-300"
        >
            <h1>SDG Campus Club</h1>
            <img
            src="/SDGWhiteLogo.svg"
            alt="SDG-logo"
            className="h-16 border-l-[0.5px] border-gray-300"
            />
        </div>
      <div
      className="px-4 pt-4"
      >
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
          className="w-full p-2 border rounded"
        />
      </div>
        <div className="mx-4 flex justify-between border rounded bg-white">
            <input
            type={showPassword ? "text":"password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            className="w-11/12 p-2 border rounded"
            />
            <button
            type="button"
            onClick={() => setShowpassword((prev) => !prev)}
            className="p-1 scale-110"
            >
                {showPassword ? <BiSolidShow/> : <BiSolidHide/>}
            </button>
        </div>
      <div
      className="px-4 w-full flex justify-center border-b-[0.5px] border-gray-300 pb-4"
      >
      <button
        type="submit"
        disabled={loading}
        className="w-1/2 bg-white text-blue-700 font-bold text-lg p-2 rounded-full hover:scale-105 duration-100"
      >
        {loading ? "Logging in..." : "Login"}
      </button>
      </div>
      <p className="mt-4 text-center text-sm text-white">
        Don't have an account?{' '}
        <Link href="/register" className="text-white hover:text-black font-bold text-base underline underline-offset-1">
            Sign up
        </Link>
      </p>
      <Toaster/>
    </form>
  )
}