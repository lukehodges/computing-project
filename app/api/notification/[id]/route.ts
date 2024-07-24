import prisma from "../../../../lib/db";
import { EntityType, NotificationType } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, context: any) {
  const body = await req.json()
  const { params } = context;
  const id = Number(params.id);

  if (!id) {
    return NextResponse.json({ error: "Notification ID is required" }, { status: 400 });
  }


  try {
    await prisma.notification.update({where:{id:id}, data:body})
    
    return NextResponse.json(
      { message: "Task deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to delete task" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest, context: any) {
  const { params } = context;
}
