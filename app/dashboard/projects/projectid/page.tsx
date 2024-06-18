import prisma from "@/app/db";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DataTable } from "../../tasks/components/data-table";
import { columns } from "../../tasks/components/columns";
import { Separator } from "@/components/ui/separator";
import { ProjectStats1, ProjectStats2, ProjectStats3 } from "./project-stats";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import UserBadge from "./user-badge";
import { Timeline } from "./timeline";
import { TimelineItem, TimelineItemProps } from "./TimelineItem";
import {
  Calendar,
  PhoneCall,
  SlidersHorizontal,
  SlidersHorizontalIcon,
  SquareArrowDownRightIcon,
  SquareArrowOutUpRight,
  SquareArrowUpRight,
  SquareCheckBig,
  Star,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import dynamic from "next/dynamic";
const Editor = dynamic(() => import("../../editor/editor"), { ssr: false });
async function getTasks() {
  return await prisma.task.findMany({});
}
async function getTimeline() {
  const items: TimelineItemProps[] = [
    {
      title: "Event Number 1",
      bullet: <Star size={18} />,
      children: (
        <div>
          {" "}
          <p className="text-sm text-slate-600">23.03.2025 6PM</p>
        </div>
      ),
      isActive: true,
      isActiveBullet:false,
      bulletSize:25,
      lineSize:10
    },
    {
      title: "milestone number 1",
      bullet: <Calendar size={18} />,
      children: (
        <div>
          {" "}
          <p className="text-sm text-slate-600">23.03.2025 6PM</p>
        </div>
      ),
      isActive: false,
      isActiveBullet:false,
      bulletSize:25,
      lineSize:10
    },
    {
      title: "meeting number 1",
      bullet: <PhoneCall size={18} />,
      children: (
        <div>
          {" "}
          <p className="text-sm text-slate-600">23.03.2025 6PM</p>
        </div>
      ),
      isActive: true,
      isActiveBullet:false,
      bulletSize:25,
      lineSize:10
    },
    {
      title: "meeting number 1",
      bullet: <PhoneCall size={18} />,
      children: <div>Details of Step 3</div>,
      isActive: true,
      isActiveBullet: true,
      bulletSize:25,
      lineSize:10
    },
    {
      title: "meeting number 1",
      bullet: <PhoneCall size={18} />,
      children: <div>Details of Step 3</div>,
      isActive: true,
      isActiveBullet: true,
      bulletSize:25,
      lineSize:10
    },
  ];
  return items;
}
export default async function ProjectPage() {
  let tasks = await getTasks();
  let updates = await getTimeline();
  return (
    <div>
      <div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-7 mb-4">
        <Card className="lg:col-span-5 h-[815px] sm:col-span-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className=" font-2xl font-bold">
              {" "}
              Name of the God Dam Project
            </CardTitle>
            <SquareArrowOutUpRight
              size={16}
              strokeWidth={2}
              color="rgb(100, 116, 139)"
            />
          </CardHeader>
          <Separator />
          <CardContent className="space-y-5 py-4 flex-none overflow-hidden">
            <div className="text-2xl font-medium">project Overview</div>
            <Editor/>
          </CardContent>
        </Card>
        <div className="lg:col-span-2 sm:col-span-1">
          <Card className="h-[350px] mb-4">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                <div className="text-xl ">Project Overview</div>
              </CardTitle>
              <button>
                <SlidersHorizontalIcon
                  size={16}
                  strokeWidth={2}
                  color="rgb(100, 116, 139)"
                />
              </button>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="text-md flex-auto ">
                <div>
                  Start Date{" "}
                  <span className="text-xs text-muted-foreground">
                    21 Jan 23
                    {/* +20.1% from last month */}
                  </span>
                </div>
                <div>
                  End Date{" "}
                  <span className="text-xs text-muted-foreground">
                    {" "}
                    21 Jan 24
                    {/* +20.1% from last month */}
                  </span>
                </div>
              </div>
              <div className="text-lg ">
                Project Type
                <div className="text-xs text-muted-foreground">
                  <Badge variant={"outline"}>Internal</Badge>
                  <Badge variant={"outline"}>Sales</Badge>
                  <Badge variant={"outline"}>Litigation</Badge>
                  {/* +20.1% from last month */}
                </div>
              </div>
              <div className="text-lg ">
                Team Leads
                <div className="text-xs text-muted-foreground">
                  <div className="flex">
                    <UserBadge />
                    <UserBadge />
                    <UserBadge />
                  </div>

                  {/* +20.1% from last month */}
                </div>
              </div>
              <div className="text-lg ">
                Entire Team
                <p className="text-xs text-muted-foreground">
                  <div className="flex">
                    <UserBadge />
                    <UserBadge />
                    <UserBadge />
                  </div>
                  <div className="flex">
                    <UserBadge />
                    <UserBadge />
                  </div>

                  {/* +20.1% from last month */}
                </p>
              </div>
            </CardContent>
          </Card>
          <Card className="h-[450px]">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                <div className="text-xl ">Recent & upcoming dates</div>
              </CardTitle>
              <SquareArrowOutUpRight
                size={16}
                strokeWidth={2}
                color="rgb(100, 116, 139)"
              />
            </CardHeader>
            <CardContent>
              <Timeline
                items={updates}
                lineSize={2}
                bulletSize={30}
                activeItem={2}
              />
              {/* <div className="text-2xl font-bold">+152</div>
              <p className="text-xs text-muted-foreground">
                +20.1% from last month
              </p> */}
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-6 sm:grid-cols-2">
        <div className="col-span-1 space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Documents</CardTitle>
              <SquareArrowOutUpRight
                size={16}
                strokeWidth={2}
                color="rgb(100, 116, 139)"
              />
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold">152</div>
              <p className="text-xs text-muted-foreground">
                +20 from last month
              </p>
            </CardContent>
          </Card>
          <Card >
            <CardHeader className="pb-0">
              <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Milestones</CardTitle>
              <SquareArrowOutUpRight
                size={16}
                strokeWidth={2}
                color="rgb(100, 116, 139)"
              />
              </div>
              {/* <CardDescription>This Month</CardDescription> */}
              <CardTitle className="text-xl font-bold">23.5%</CardTitle>
            </CardHeader>
            <CardContent className="pb-3 pt-0">
              <div className="text-xs text-muted-foreground">
                +10% from last month
              </div>
            </CardContent>
            <CardFooter className="pt-0 pb-3">
              <Progress value={23.5} aria-label="12% increase" />
            </CardFooter>
          </Card>
          
          <Card >
            <CardHeader className="pb-0">
              <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tasks</CardTitle>
              <SquareArrowOutUpRight
                size={16}
                strokeWidth={2}
                color="rgb(100, 116, 139)"
              />
              </div>
              {/* <CardDescription>This Month</CardDescription> */}
              <CardTitle className="text-xl font-bold">75.5%</CardTitle>
            </CardHeader>
            <CardContent className="pb-3 pt-0">
              <div className="text-xs text-muted-foreground">
                +10% from last month
              </div>
            </CardContent>
            <CardFooter className="pt-0 pb-3">
              <Progress value={75.5} aria-label="12% increase" />
            </CardFooter>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Events</CardTitle>
              <SquareArrowOutUpRight
                size={16}
                strokeWidth={2}
                color="rgb(100, 116, 139)"
              />
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold">+152</div>
              <p className="text-xs text-muted-foreground">
                +20.1% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Reviews</CardTitle>
              <SquareArrowOutUpRight
                size={16}
                strokeWidth={2}
                color="rgb(100, 116, 139)"
              />
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold">+152</div>
              <p className="text-xs text-muted-foreground">
                +20.1% from last month
              </p>
            </CardContent>
          </Card><Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-sm font-medium">Client Portal</CardTitle>
              <SquareArrowOutUpRight
                size={16}
                strokeWidth={2}
                color="rgb(100, 116, 139)"
              />
            </CardHeader>
            
          </Card>
          {/* two basic hyperlinks at the bottom to something */}
          <div className="space-y-2">
            <Card className="py-1">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 py-0">
                <CardTitle className="text-sm font-medium p-0">
                  Activity Logs
                </CardTitle>
                <SquareArrowOutUpRight
                  size={16}
                  strokeWidth={2}
                  color="rgb(100, 116, 139)"
                />
              </CardHeader>
            </Card>
            <Card className="py-1">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 py-0">
                <CardTitle className="text-sm font-medium p-0">
                  Settings
                </CardTitle>
                <SquareArrowOutUpRight
                  size={16}
                  strokeWidth={2}
                  color="rgb(100, 116, 139)"
                />
              </CardHeader>
            </Card>
          </div>
        </div>
        <Card className="lg:col-span-5 sm:col-span-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-2xl font-medium">Tasks</CardTitle>
            <SquareArrowOutUpRight
              size={16}
              strokeWidth={2}
              color="rgb(100, 116, 139)"
            />
          </CardHeader>
          <CardContent>
            <DataTable data={tasks} columns={columns} editable={true} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
