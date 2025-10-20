import { prisma } from "@/lib/prisma";
import { useParams } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest, {params}: {params: {blockId: string}}) {

    try {
        const body = await req.json();

        interface UpdateBlockBody {
            content?: string;
            type?: string
        }

        const { content, type } = body as UpdateBlockBody;
        const updatedBlock = { content, type };

        const updateBlock = await prisma.block.update({
            where: {
                id: params.blockId
            },
            data: {
                content: content,
                type: type
            }
        })
        return NextResponse.json({ message: "Updated successfully", item: updateBlock },{ status: 200 })
    } 
    catch (error) {
        console.error("Error handling PUT request", error)
        return NextResponse.json({message: "Error updating item"}, {status: 500})
    }
}

export async function DELETE(req: NextRequest, {params}: {params: {blockId: string}}) {

    try {
        const deleteBlock = await prisma.block.delete({
            where: {
                id: params.blockId
            }
        })
        return NextResponse.json({ message: "Deleted Successfully", deleted: deleteBlock}, {status: 200})
    } 
    catch (error) {
        console.log("Error handling Delete request", error)
        return NextResponse.json({ message: "Error deleting block"}, {status: 500})
    }
}