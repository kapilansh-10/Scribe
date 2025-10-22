import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";


export async function PUT(req: NextRequest, {params} : {params: {pageId: string}}) {

    try {
        const body = await req.json();
        
        interface updatePagae {
            title: string
        }

        const { title } = body as updatePagae;

        const updatePage = await prisma.page.update({
            where: {
                id: params.pageId
            },
            data: {
                title: title
            }
        })
        return NextResponse.json({ message: "Updated Successfully", item: updatePage}, {status: 200 })
    } 
    catch (error) {
        console.error("Error handling PUT request", error)
        return NextResponse.json({ message: "Error updating item" }, {status: 500})
    }
}

export async function DELETE(req: NextRequest, { params } : {params: {pageId: string}}) {

    try {
        const deletePage = await prisma.page.delete({
            where: {
                id: params.pageId
            }
        })
        return NextResponse.json({ message: "Deleted Successfully", deleted: deletePage }, {status: 200} )
    } 
    catch (error) {
        console.error("Error handlign DELETE request", error)
        return NextResponse.json({ messaege: "Error deleting Page"}, {status: 500})    
    }
}