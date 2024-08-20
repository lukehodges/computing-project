"use client";

import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { priorities, statuses } from "../data/data";
import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";
import { Checkbox } from "@/components/ui/checkbox";
import UserBadge from "../../../../components/custom/user-badge";
import React from "react";
import { SquarePlusIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { User } from "@/lib/entities/User";
import { mapPrismaUserToEntity } from "@/prisma/maps/UserMapper";
import { Task } from "@/lib/entities/Tasks";
export interface TaskWithAssignees extends Task {
  assignees: User[];
}
const columnHelper = createColumnHelper<TaskWithAssignees>();

export const columns: ColumnDef<TaskWithAssignees, any>[]= [
  columnHelper.display({
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        onClick={(e) => e.stopPropagation()}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  }),
  columnHelper.accessor("id", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Task" />
    ),
    cell: ({ row }) => <div className="w-[80px]">{row.getValue("id")}</div>,
    enableSorting: false,
    enableHiding: true,
  }),
  columnHelper.accessor("title", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Title" />
    ),
    cell: ({ row }) => (
      <div className="flex space-x-2">
        <span className="max-w-[450px] truncate font-medium">
          {row.getValue("title")}
        </span>
      </div>
    ),
  }),
  columnHelper.accessor("assignees", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Assigned To" />
    ),
    cell: ({ row }) => {
      let users: User[] = [];
      const assignees = row.getValue("assignees");
      if (Array.isArray(assignees)) {
        users = assignees.map((assignee) => mapPrismaUserToEntity(assignee));
      }
      const [isHovered, setIsHovered] = React.useState(false);

      return (
        <div
          className="flex flex-wrap relative"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {users &&
            users.map((user) => (
              <UserBadge
                key={user.id}
                className="flex-basis-[150px]" // adjust this value to set the minimum width of each badge
                name={user.firstName + " " + user.lastName}
                url={user.image}
                fallback={user.firstName[0] + user.lastName[0]}
              />
            ))}
          <DropdownMenu>
            <DropdownMenuTrigger className="p-0 m-0 b-0" asChild>
              {isHovered && (
                <Button
                  variant="ghost"
                  className="flex h-8 w-8 p-0 b-0 m-0 data-[state=open]:bg-muted"
                >
                  <SquarePlusIcon
                    className="flex-basis-[150px] text-zinc-950"
                    strokeWidth={"1px"}
                  />
                  <span className="sr-only">Open menu</span>
                </Button>
              )}
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-[160px]"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <DropdownMenuItem>Edit </DropdownMenuItem>
              <DropdownMenuItem
                onClick={(e) => {
                  e.stopPropagation();
                  console.log("click");
                }}
              >
                Duplicate
              </DropdownMenuItem>
              <DropdownMenuItem>Favorite</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>Labels</DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                  {/* <DropdownMenuRadioGroup value={task.label}>
                        {labels.map((label) => (
                          <DropdownMenuRadioItem key={label.value} value={label.value}>
                            {label.label}
                          </DropdownMenuRadioItem>
                        ))}
                      </DropdownMenuRadioGroup>  */}
                </DropdownMenuSubContent>
              </DropdownMenuSub>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                Delete
                <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  }),
  columnHelper.accessor("description", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Description" />
    ),
    cell: ({ row }) => (
      <div className="flex space-x-2">
        <span className="max-w-[500px] truncate font-medium">
          {row.getValue("description")}
        </span>
      </div>
    ),
  }),
  columnHelper.accessor("status", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = statuses.find(
        (status) => status.value === row.getValue("status")
      );

      if (!status) {
        return null;
      }

      return (
        <div className="flex w-[100px] items-center">
          {status.icon && (
            <status.icon className="mr-2 h-4 w-4 text-muted-foreground" />
          )}
          <span>{status.label}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  }),
  columnHelper.accessor("priority", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Priority" />
    ),
    cell: ({ row }) => {
      const priority = priorities.find(
        (priority) => priority.value === row.getValue("priority")
      );

      if (!priority) {
        return null;
      }

      return (
        <div className="flex items-center">
          {priority.icon && (
            <priority.icon className="mr-2 h-4 w-4 text-muted-foreground" />
          )}
          <span>{priority.label}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  }),
  columnHelper.display({
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  }),
];
