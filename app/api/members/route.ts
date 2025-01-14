import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {

    
    try {
        const members = await prisma.teamMember.findMany()

        return NextResponse.json(members)
    } catch (error) {

        return NextResponse.json({error}, {status: 500});
    }
}

export async function POST(request: Request) {
    try {
        const info = await request.json()

        const newMember = await prisma.teamMember.create({
            data: info
        })

        return NextResponse.json({
            message: "Member added successfully",
            ok: true
        }, {status: 201})
    } catch (error) {
        console.error("Error creating member:", error);

        return NextResponse.json({
            message: "Failed to create member",
            ok: false
        }, {status: 500});
    }
}