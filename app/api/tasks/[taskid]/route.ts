import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/app/db'

export async function DELETE(req: NextRequest, context:any) {
  const {params} = context;
  const id = params.taskid;
  console.log(id)

  if (!id) {
    return NextResponse.json({ error: 'Task ID is required' }, { status: 400 })
  }

  const taskId = parseInt(id, 10)
  if (isNaN(taskId)) {
    return NextResponse.json({ error: 'Invalid task ID' }, { status: 400 })
  }

  try {
    await prisma.task.delete({
      where: { id: taskId },
    })
    return NextResponse.json({ message: 'Task deleted successfully' }, { status: 200 })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: 'Failed to delete task' }, { status: 500 })
  }
}

export async function GET(req:NextRequest, context:any) {
  const {params} = context;
}