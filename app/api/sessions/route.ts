import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    try {
        const sessions = await prisma.teamMember.findMany({
            distinct: ['session'],
            select: { session: true },
        });

        return NextResponse.json(sessions.map((s) => s.session), {status: 200})
    } catch (error) {
        return NextResponse.json({ error: "Something went wrong"}, { status: 500 });
    }
}