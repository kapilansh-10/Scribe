import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest) {

    try {
        const pageId = req.nextUrl.searchParams.get("pageId");
        console.log(pageId)
        if(pageId !== null) {
            const data = await prisma.block.findMany({
                where: { pageId },
                select: {
                    id: true,
                    type: true,
                    content: true,
                    parentId: true,
                    position: true
                }
            })
            return NextResponse.json({data}, {status: 200})
        }
        else {
            return NextResponse.json("pageId cannot be null",{status: 500})
        }
    } 
    catch (error) {
        return NextResponse.json({error: "Error in fetching the block"}, {status: 500})
    }
    
}

export async function POST(req: NextRequest) {

    try {
        const body = await req.json()
        const {pageId, type, content, parentId, position} = body;

        const newBlock = await prisma.block.create({
            data: {
                pageId,
                type,
                content,
                parentId: parentId || null,
                position
            }
        })

        return NextResponse.json(newBlock, {status: 200})
    }
    catch (error) {
        return NextResponse.json({error: "Error in creating a new block"}, {status: 500})
    }
}

