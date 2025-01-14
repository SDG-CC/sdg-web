import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    try {
        const desigs = await prisma.designation.findMany()

        return new NextResponse(JSON.stringify(desigs), { status: 200 })
    } catch (error) {
        return NextResponse.json({ error: "Something went wrong"}, { status: 500})
    }
}

export async function POST(request:Request) {
    try {
        const info = await request.json()

        await prisma.designation.create({
            data: info
        })

        return new NextResponse("Designation added successfully",
            { status: 201 })
    } catch (error) {
        return NextResponse.json({
            error: "Something went wrong" },
            {
            status: 500
        })
    }
}