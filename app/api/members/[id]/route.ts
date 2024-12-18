import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET(request: Request, {params}:{params: Promise<{id: string}>}) {
    try {
        const id = (await params).id
        const member = await prisma.teamMember.findUnique({
            where:{
                id: id
            }
        })

        return NextResponse.json(member)
    } catch (error) {
        console.error("Error fetching member:", error)

        return NextResponse.json({error:"Failed to fetch member"}, {status: 500})
    }
}

export async function PUT(request: Request, {params}:{params: Promise<{id: string}>}) {
    try {
        const info = await request.json();
    
        const id = (await params).id
        const updated = await prisma.teamMember.update({
            where:{
                id: id
            },
            data: info
        })
    
        return NextResponse.json(updated)
        
    } catch (error) {
        console.error("Error updating member:", error)

        return NextResponse.json({error: "Failed to update member"}, {status: 500})
    }
}