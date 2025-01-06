import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import prisma from "./prisma"
import { compare } from "bcrypt"
import { AuthError } from "next-auth"

export const { handlers, signIn, signOut, auth} = NextAuth({
    session: {
        strategy: 'jwt',
        maxAge: 6*60*60,
        updateAge: 2*60*60,
    },
    pages: {
        signIn: "/auth/signin",
        error: "/auth/signin",
    },
    logger: {
        error: () => {},
        warn: () => {},
        debug: () => {}
    },
    providers: [
        CredentialsProvider({
            name: 'Sign in',
            credentials: {
                email: { label: 'Email', type: 'email', placeholder: 'hello@example.com'},
                password: { label: 'Password', type: 'password'},
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new AuthError("CREDENTIALS_REQUIRED")
                  }

                const email = credentials.email as string
                const password = credentials.password as string

                const user = await prisma.user.findUnique({
                    where: { email }
                })

                if (!user) {
                    throw new AuthError("USER_NOT_FOUND")
                  }

                  if (!user.isVerified) {
                    throw new AuthError("EMAIL_NOT_VERIFIED")
                  }

                const isPasswordValid = await compare( password, user.password)

                if (!isPasswordValid) {
                    throw new AuthError("INVALID_PASSWORD")
                  }

                return {
                    id: user.id,
                    email: user.email,
                    name: user.name ?? null,
                    imageId: user?.imageId ?? null,
                    role: user.role ?? null,
                }
            },
        }),
    ],
    callbacks: {
        async session({ session, token }) {
            return {
                ...session,
                user: {
                    ...session.user,
                    id: token.id as string | undefined,
                    imageId: token.imageId as string | null | undefined,
                    role: token.role as string | null | undefined
                }
            }
          },
        async jwt({ token, user }) {
            if (user) {
                return {
                    ...token,
                    id: user.id,
                    imageId: user.imageId,
                    role: user.role
                }
            }
            return token;
          },
    }
})