
import { columns, TaskWithAssignees } from "./components/columns";
import { DataTable } from "./components/data-table";
import { CalendarDateRangePicker } from "@/components/custom/date-range-picker";
import { Button } from "@/components/ui/button";
import  TaskPopup from "./components/new-task-popup";
import { TaskUseCases } from "@/lib/usecases";

// Simulate a database read for tasks.
export const dynamic = 'force-dynamic'
export default async function TaskPage() {
  let l = await TaskUseCases.findTasksByInformation({});
  l = l || [];
  let tasks: TaskWithAssignees[] = [];
  for (let i = 0; i < l.length; i++) {
    tasks[i] = {
      ...l[i],
      assignees: await TaskUseCases.getAssignees(l[i].id),
    };
  }
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
          <DataTable data={tasks.map((task:TaskWithAssignees) => JSON.parse(JSON.stringify(task)))} columns={columns} editable={true}/>
    </div>
  );
}
