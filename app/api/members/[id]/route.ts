import  prisma  from "@/lib/prisma"
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
    
        return NextResponse.json({
            message: "Details updated successfully",
            ok: true
        },{ status: 200})
        
    } catch (error) {
        return NextResponse.json({
            message: "Failed to update member",
            ok: false
        }, {status: 500})
    }
}

export async function DELETE(request: Request, {params}: {params: Promise<{id: string}>}) {
    try {
        const id = (await params).id

        await prisma.teamMember.delete({
            where: {
                id: id
            }
        })

        return NextResponse.json({
            message: "Member details deleted",
            ok: true
        }, { status: 200})
    } catch (error) {
        return NextResponse.json({
            message: "Failed to delete member",
            ok: false
        },{ status: 500})
    }
}