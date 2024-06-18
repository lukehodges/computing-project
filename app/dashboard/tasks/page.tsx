
import { columns } from "./components/columns";
import { DataTable } from "./components/data-table";
import prisma from "@/app/db";
import { CalendarDateRangePicker } from "@/components/custom/date-range-picker";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import  TaskPopup from "./components/new-task-popup";
import { POST } from "@/app/api/tasks/route";

// Simulate a database read for tasks.
async function getTasks() {
  
  let p = performance.now()
  let P = await prisma.task.findMany({include: {
    assignee:true
  }
  });
  let z = performance.now()
  console.log(z-p)
  
  return P;
}

export default async function TaskPage() {
  const tasks = await getTasks();
  let users = await prisma.user.findMany();
  return (
    <div>
      <div className="flex items-center justify-between space-y-1 pb-2 pt-0 ">
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Tasks</h1>
        <div className="flex items-center space-x-2">
          <CalendarDateRangePicker />
          <TaskPopup>
          <Button>Add Task</Button></TaskPopup>
        </div>
      </div>
          <DataTable data={tasks} columns={columns} editable={true}/>
    </div>
  );
}
