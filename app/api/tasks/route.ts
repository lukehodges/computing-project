import prisma from "@/lib/db";
import { EntityType, NotificationType } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(res:NextRequest) {
    const body = await res.json();
    // WRAP THE BELOW IN A TRY CATCH STATEMENT
    try {
      
    let p = await prisma.task.create({data: body})
    await prisma.notification.create({
        data: {
          message: "Task Was Created",
          read: false,
          type: NotificationType.TASK_CREATE,
          entityId: p.id,
          entityType: EntityType.Task,
          user:{connect:{id:2}}
  
        },
      });
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