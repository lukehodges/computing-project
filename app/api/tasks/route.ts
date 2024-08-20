import prisma from "@/lib/db";
import { EntityType, Notification, NotificationType } from "@/lib/entities/Notifications";
import { NotificationUseCases, TaskUseCases } from "@/lib/usecases";
import { mapPrismaTaskToEntity } from "@/prisma/maps/TaskMapper";
import { NextRequest, NextResponse } from "next/server";

export async function POST(res:NextRequest) {
    const body = await res.json();
    // WRAP THE BELOW IN A TRY CATCH STATEMENT
    try {
      let task = await TaskUseCases.createTask(mapPrismaTaskToEntity(body))
      let not = await NotificationUseCases.createNotification({
        id:-1,
        message: "",
        read: false,
        userId: 1,
        type: NotificationType.TASK_CREATE,
        entityId: task.id,
        entityType: EntityType.Task,
        createdAt: new Date()
      })
    
    return NextResponse.json({success: true, body: not});
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