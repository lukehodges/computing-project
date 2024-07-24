import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { EntityType, NotificationType } from "@prisma/client";

export async function DELETE(req: NextRequest, context: any) {
  const { params } = context;
  const id = params.taskid;

  if (!id) {
    return NextResponse.json({ error: "Task ID is required" }, { status: 400 });
  }

  const taskId = parseInt(id, 10);
  if (isNaN(taskId)) {
    return NextResponse.json({ error: "Invalid task ID" }, { status: 400 });
  }

  try {
    await prisma.task.delete({
      where: { id: taskId },
    });
    await prisma.notification.create({
      data: {
        message: "This Task Was Deleted",
        read: false,
        type: NotificationType.TASK_DELETE,
        entityId: taskId,
        entityType: EntityType.Task,
        user:{connect:{id:2}}

      },
    });
    return NextResponse.json(
      { message: "Task deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete task" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest, context: any) {
  const { params } = context;
}
