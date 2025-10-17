import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest) {

    try {
        const data = await prisma.page.findMany({
            include: { blocks: true}
        })
    
        return NextResponse.json(data,{status: 200})
    } 
    catch (error) {
        return NextResponse.json({error: "Failed in fetching the Pages"}, {status: 500})
    }
}

export async function POST(req: NextRequest) {

    try {
        const body = await req.json();
        const { userId, title } = body;

        const newPage = await prisma.page.create({
            data: {
                userId,
                title
            }
        })

        return NextResponse.json(newPage, {status: 200})
    } 
    catch (error) {
        return NextResponse.json({error: "Failed to create a page"},{status: 500});
    }
}
