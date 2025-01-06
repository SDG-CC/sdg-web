import { NextResponse  } from "next/server";
import jwt from "jsonwebtoken";
import prisma from "@/lib/prisma";

const EMAIL_SECRET = process.env.EMAIL_SECRET || "";
const BASE_URL = process.env.BASE_URL || "";

export async function GET(req: Request) {
    const {searchParams} = new URL(req.url);
    const token = searchParams.get("token");

    if (!token) {
        return NextResponse.json({ message: "No token provided" }, { status: 400 });
    }

    try {
        const {email} = jwt.verify(token, EMAIL_SECRET) as { email: string }
        const user = await prisma.user.update({
            where: { email },
            data: { isVerified: true },
        })

        return NextResponse.redirect(`${BASE_URL}/auth/signin`);
    } catch (error) {
        console.error("Verification error: ", error)
        return NextResponse.json({ message: "Invalid or expired token" }, { status: 400})
    }
}