import prisma from "@/app/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(res:NextRequest) {
    const body = await res.json();
    // WRAP THE BELOW IN A TRY CATCH STATEMENT
    try {
    let p = await prisma.task.create({data: body})
    
    return NextResponse.json({success: true, body: p});
    }
    catch (err) {
        console.log(err);
    }
}

// export async function DELETE(res:NextRequest) {
//     const body = await res.json();
//     try {
//         await prisma.task.delete({where:{
//             id:{
//                 in: body.ids
//             }
//         }
//         })
//     }