'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { BiSolidHide, BiSolidShow } from "react-icons/bi";
import toast, { Toaster } from "react-hot-toast";

interface RegisterFormData {
  name: string
  email: string
  password: string
}

export function RegisterForm() {
  const router = useRouter()
  const [name, setName] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [confirmPassword, setConfirmPasword] = useState<string>("")
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)

  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

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

    if (password.length < 8) {
      handleErrorToast("Password must be at least 8 characters long")
      setLoading(false)
      return
    }

    if (password != confirmPassword) {
        handleErrorToast("Passwords do not match")
        setLoading(false)
        return
    }

    const formData: RegisterFormData = { name, email, password }

    try {
      const res = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      const data = await res.json()

      if (!data.ok) {
        handleErrorToast(data.message)
        return
      }

      handleSuccessToast("Registration successful! Please check you email for verification.")
      
      setTimeout(() => {
        router.push('/auth/signin')
      }, 4000)

    } catch (err) {
      if (err instanceof Error) {
        handleErrorToast(err.message)
      } else {
        handleErrorToast('An unexpected error occurred')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-[300px] h-[450px] bg-blue-700 rounded-xl max-w-sm">
      <div className="flex flex-row justify-between items-center text-white font-bold text-xl pl-4 border-b-[0.5px] border-gray-300">
        <h1>SDG Campus Club</h1>
        <img
          src="/SDGWhiteLogo.svg"
          alt="SDG-logo"
          className="h-16 border-l-[0.5px] border-gray-300"
        />
      </div>

      <div className="px-4 pt-4">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Full Name"
          required
          className="w-full p-2 border rounded"
        />
      </div>

      <div className="px-4">
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
          type={showPassword ? "text" :"password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
          className="w-11/12 p-2 border rounded"
        />
        <button
        type="button"
        onClick={() => setShowPassword((prev) => !prev)}
        className="p-1 scale-110"
        >
            {showPassword ? <BiSolidShow /> : <BiSolidHide />}
        </button>
      </div>

      <div className="mx-4 flex justify-between border rounded bg-white">
        <input
          type={showConfirmPassword ? "text" :"password"}
          value={confirmPassword}
          onChange={(e) => setConfirmPasword(e.target.value)}
          placeholder="Confirm Password"
          required
          className="w-11/12 p-2 border rounded"
        />
        <button
        type="button"
        onClick={() => setShowConfirmPassword((prev) => !prev)}
        className="p-1 scale-110"
        >
            {showConfirmPassword ? <BiSolidShow /> : <BiSolidHide />}
        </button>
      </div>

      <div className="px-4 w-full flex justify-center border-b-[0.5px] border-gray-300 pb-4">
        <button
          type="submit"
          disabled={loading}
          className="w-1/2 bg-white text-blue-700 font-bold text-lg p-2 rounded-full hover:scale-105 duration-100 disabled:opacity-50"
        >
          {loading ? 'Registering...' : 'Register'}
        </button>
      </div>

      <p className="mt-4 text-center text-sm text-white">
        Already have an account?{' '}
        <Link href="/auth/signin" className="text-white hover:text-black font-bold text-base underline underline-offset-1">
          Sign in
        </Link>
      </p>
      <Toaster/>
    </form>
  )
}
