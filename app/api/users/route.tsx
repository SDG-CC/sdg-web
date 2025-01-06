import { NextResponse  } from "next/server";
import prisma from "@/lib/prisma";
import { hash } from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const EMAIL_SECRET: string = process.env.EMAIL_SECRET || "";
const BASE_URL = process.env.BASE_URL;

if (!EMAIL_SECRET) {
    throw new Error("EMAIL_SECRET is not defined in environment variables");
}

export async function POST(request:Request) {
    try {
        const { name, email, password } = await request.json();

        if ( !name || !email || !password ) {
            return NextResponse.json(
                { message: "All fields are required" },
                { status: 400 }
            )
        }

        const existingUser = await prisma.user.findUnique({
            where: {email}
        })

        if (existingUser) {
            return NextResponse.json(
                { message: "Email already registered",
                    ok: false
                 },
                { status: 400 }
            )
        }

        const hashedPassword = await hash(password, 10)

        await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                isVerified: false,
            },
        })

        const token = jwt.sign({ email }, EMAIL_SECRET, {expiresIn: "1h" });
        const verificationLink = `${BASE_URL}/api/verify-email?token=${token}`;

        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_PASS,
            },
            tls: {
                ciphers: "SSLv3",
                rejectUnauthorized: false
            }
        })

        // try {
        //     await transporter.verify();
        //     console.log('SMTP connection verified');
        // } catch (error) {
        //     console.error('SMTP verification failed:', error);
        //     throw error;
        // }

        const info = await transporter.sendMail({
            from: `"SDG Campus Club" <${process.env.GMAIL_USER}>`,
            to: email,
            subject: "Verify Your Email",
            text: `Please verify your email by clicking this link: ${verificationLink}`,
            html: `<div style="padding: 20px; background-color: #f5f5f5;">
                        <h2>Email Verification</h2>
                        <p>Thank you for registering! Please verify your email by clicking the button below:</p>
                        <a href="${verificationLink}" 
                        style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: white; text-decoration: none; border-radius: 5px;">
                        Verify Email
                        </a>
                        <p>If the button doesn't work, you can copy and paste this link into your browser:</p>
                        <p>${verificationLink}</p>
                    </div>`,
        })

        return NextResponse.json({ message: "Verification email sent" , ok: true})
    } catch (error) {
        // console.error("Registration error:", error);

        return NextResponse.json(
            { messgae: "Failed to send verification email",
                ok: false,
                error
            },
            { status: 500}
        )
    }
}