"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Cross2Icon } from "@radix-ui/react-icons"
import { Row, Table } from "@tanstack/react-table"
import { useRouter } from "next/navigation"
import { priorities_table, statuses } from "../data/data"
import { DataTableFacetedFilter } from "./data-table-faceted-filter"
import { DataTableViewOptions } from "./data-table-view-options"
import TaskPopup from "./new-task-popup"
import { mapPrismaTaskToEntity } from "@/prisma/maps/TaskMapper"
import { Task } from "@/lib/entities/Tasks"

interface DataTableToolbarProps<TData extends Task> {
  table: Table<TData>;
  editable: boolean;
  onDelete: (rows: Row<TData>[]) => void;
}

// Update the deleteTasks function to use the Task type
async function deleteTasks<TData extends Task>(
  data: Table<TData>,
  router: ReturnType<typeof useRouter>
) {
  const ids = data.getSelectedRowModel().flatRows.map((row) => mapPrismaTaskToEntity(row.original).id);

  const deletePromises = ids.map(async (id) =>
    await fetch(`/api/tasks/${id}`, {
      method: 'DELETE',
    })
  );

  await Promise.all(deletePromises);

  // Handle successful deletion, maybe refresh data or call a callback
  data.toggleAllPageRowsSelected(false);
  router.refresh();
}

// Update the DataTableToolbar function to use the Task type
export function DataTableToolbar<TData extends Task>({
  table,
  editable,
  onDelete,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;
  const selected = table.getSelectedRowModel().flatRows;
  const isSelected = selected.length > 0;
  const router = useRouter(); // Move useRouter here

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <TaskPopup>
          <Button className="h-8 hover:bg-slate-600">Add New</Button>
        </TaskPopup>

        {editable && isSelected && (
          <Button
            variant="ghost"
            onClick={() => deleteTasks(table, router)} // Pass router to deleteTasks
            className="h-8 px-2 lg:px-3"
          >
            Delete {selected.length > 1 && selected.length}
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
        <Input
          placeholder="Filter tasks..."
          value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("title")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {table.getColumn("status") && (
          <DataTableFacetedFilter
            column={table.getColumn("status")}
            title="Status"
            options={statuses}
          />
        )}
        {table.getColumn("priority") && (
          <DataTableFacetedFilter
            column={table.getColumn("priority")}
            title="Priority"
            options={priorities_table}
          />
        )}

        {table.getColumn("assignees") && (
          <DataTableFacetedFilter
            column={table.getColumn("assignees")}
            title="Assignees"
            options={priorities_table}
          />
        )}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  );
}