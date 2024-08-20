"use client";

import { Button } from "@/components/custom/button";
import { LayoutBody } from "@/components/custom/layout";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { SelectValue } from "@radix-ui/react-select";
import React, { useState } from "react";
import {
  IconAdjustmentsHorizontal,
  IconRibbonHealth,
  IconSortAscendingLetters,
  IconSortDescendingLetters,
} from "@tabler/icons-react";
import { Input } from "@/components/ui/input";
import CreateProjectPopup from "./create-project-popup";
import { Project } from "@/lib/entities/Project";
import { ProjectIcons } from "@/lib/iconmaps";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";

// Define TypeScript types for props
interface ProjectType extends Project{
  type: string;
  tags: { id: string; name: string }[];
}

interface TableGenerationProps {
  projects: ProjectType[];
}

const projectText = new Map<string, string>([
  ["all", "All Projects"],
  ["internal", "Internal"],
  ["client", "Clients"],
]);

export function TableGeneration({ projects }: TableGenerationProps): React.JSX.Element {
  const router = useRouter();
  const [sort, setSort] = useState("ascending");
  const [appType, setAppType] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProjects = projects
    .sort((a, b) =>
      sort === "ascending" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
    )
    .filter((project) =>
      appType === "internal"
        ? project.type === "internal"
        : appType === "client"
        ? project.type === "client"
        : true
    )
    .filter((project) => project.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <LayoutBody className="flex flex-col" fixedHeight>
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Your Projects</h1>
        <p className="text-muted-foreground">Here's a list of your projects</p>
      </div>
      <div className="my-4 flex items-end justify-between sm:my-0 sm:items-center">
        <div className="flex flex-col gap-4 sm:my-4 sm:flex-row">
          <CreateProjectPopup>
            <Button className="h-8 hover:bg-slate-600">Add New</Button>
          </CreateProjectPopup>
          <Input
            placeholder="Filter projects..."
            className="h-9 w-40 lg:w-[250px]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Select value={appType} onValueChange={setAppType}>
            <SelectTrigger className="w-36">
              <SelectValue>{projectText.get(appType)}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Projects</SelectItem>
              <SelectItem value="internal">Internal</SelectItem>
              <SelectItem value="client">Client</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Select value={sort} onValueChange={setSort}>
          <SelectTrigger className="w-16">
            <SelectValue>
              <IconAdjustmentsHorizontal size={18} />
            </SelectValue>
          </SelectTrigger>
          <SelectContent align="end">
            <SelectItem value="ascending">
              <div className="flex items-center gap-4">
                <IconSortAscendingLetters size={16} />
                <span>Ascending</span>
              </div>
            </SelectItem>
            <SelectItem value="descending">
              <div className="flex items-center gap-4">
                <IconSortDescendingLetters size={16} />
                <span>Descending</span>
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Separator className="shadow" />
      <ul className="no-scrollbar grid gap-4 overflow-y-scroll pb-16 pt-4 md:grid-cols-2 lg:grid-cols-4">
        {filteredProjects.map((project) => (
          <li
            key={project.id}
            className="rounded-lg border p-4 hover:shadow-md"
            onClick={() => router.push(`/dashboard/projects/${project.id}`)}
          >
            <div className="mb-8 flex items-center justify-between">
              <div className={`flex size-10 items-center justify-center rounded-lg bg-muted p-2`}>
                {ProjectIcons[project.iconId ? project.iconId : 0]}
              </div>
              <Button
                variant="outline"
                size="sm"
                className={`${
                  project.type === "client"
                    ? "border border-blue-300 bg-blue-50 hover:bg-blue-100 dark:border-blue-700 dark:bg-blue-950 dark:hover:bg-blue-900"
                    : ""
                }`}
              >
                {project.type === "client" ? "Client" : "Internal"}
              </Button>
            </div>
            <div>
              <h2 className="mb-1 font-semibold">{project.name}</h2>
              <p className="line-clamp-2 text-gray-500">{project.description}</p>
              <div className="text-xs text-muted-foreground">
                {project.tags.map((tag) => (
                  <Badge variant="outline" key={tag.id}>
                    {tag.name}
                  </Badge>
                ))}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </LayoutBody>
  );
}
