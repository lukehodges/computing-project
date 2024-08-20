import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { NotificationUseCases } from "@/lib/usecases";
import { EntityType, Notification, NotificationType } from "@/lib/entities/Notifications";
import { faker } from "@faker-js/faker";

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
    let x = await prisma.notification.count()
    let p = await prisma.user.findFirst({})
    if (!p) {
      return NextResponse.json(
        { message: "Task deleted successfully" },
        { status: 200 }
      );
    }
    let notification = new Notification(
      x+3,
      "Task Deleted",
      false,
      p.id,
      NotificationType.TASK_DELETE,
      Number(id),
      EntityType.Task,
      new Date()

    )
    await NotificationUseCases.createNotification(notification)
    return NextResponse.json(
      { message: "Task deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { error: "Failed to delete task" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest, context: any) {
  const { params } = context;
}
