"use server"

import { signIn, signOut } from "@/lib/auth"
import { AuthError } from "next-auth"

interface LoginCredentials {
    email: string
    password: string
  }

export async function credentialLogIn({email, password}: LoginCredentials) {
    try {

        const response = await signIn("credentials", {
            email,
            password,
            redirect: false
        });
        return {
            response,
            ok: true
        }
    } catch (error) {
        if (error instanceof AuthError) {
            const errorMessage = error.message.split('.')[0]
            switch (errorMessage) {
                case "INVALID_PASSWORD":
                    return { 
                        error: "Incorrect password!", 
                        ok: false
                    }
                case "USER_NOT_FOUND":
                    return { 
                        error: "Invalid Credentials!",
                        ok: false
                    }
                case "EMAIL_NOT_VERIFIED":
                    return { 
                        error: "Email not verified! Please verify first.",
                        ok: false
                    }
                case "CREDENTIALS_REQUIRED":
                    return { 
                        error: "Please enter your credentials!",
                        ok: false
                    }
                default: 
                return { 
                    error: "Something went wrong", 
                    ok: false
                }
            }
        }
        if (!(error instanceof AuthError)) {
            console.error("Unexpected error: ", error)
        }
        return {
            error: "Something went wrong",
            ok: false
        }
    }
}