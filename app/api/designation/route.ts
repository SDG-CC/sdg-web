import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    try {
        const desigs = await prisma.designation.findMany()

        return new NextResponse(JSON.stringify(desigs), { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: "Something went wrong", ok: false}, { status: 500})
    }
}

export async function POST(request:Request) {
    try {
        const info = await request.json()

        await prisma.designation.create({
            data: info
        })

        return NextResponse.json({message: "Designation added successfully", ok:true },
            { status: 201 })
    } catch (error) {
        return NextResponse.json({
            message: "Something went wrong",
        ok: false },
            {
            status: 500
        })
    }
}