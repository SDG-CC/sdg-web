import {prisma} from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
    try {
        const members = await prisma.teamMember.findMany()

        return NextResponse.json(members)
    } catch (error) {
        console.error("Error fetching members", error);

        return NextResponse.json({error: "Failed to fetch members"}, {status: 500});
    }
}

export async function POST(request: Request) {
    try {
        const info = await request.json()

        const newMember = await prisma.teamMember.create({
            data: info
        })

        return new NextResponse(JSON.stringify(newMember), {status: 201})
    } catch (error) {
        console.error("Error creating member:", error);

        return NextResponse.json({error: "Failed to create member"}, {status: 500});
    }
}