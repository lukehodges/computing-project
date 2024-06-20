import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
// import { faker } from "@faker-js/faker";
import {
  SquareArrowOutUpRight,
  SlidersHorizontalIcon,
  Calendar,
  PhoneCall,
  Star,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Timeline } from "../../projects/projectid/timeline";
import UserBadge from "../../projects/projectid/user-badge";
import { Separator } from "@/components/ui/separator";
import { TimelineItemProps } from "../../projects/projectid/TimelineItem";
import { useRouter } from "next/router";
import { Task } from "@prisma/client";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { report } from "process";
import prisma from "@/app/db";

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
      isActiveBullet: false,
      bulletSize: 0,
      lineSize: 0,
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
      isActiveBullet: false,
      bulletSize: 0,
      lineSize: 0,
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
      isActiveBullet: true,
      bulletSize: 0,
      lineSize: 0,
    },
    {
      title: "meeting number 1",
      bullet: <PhoneCall size={18} />,
      children: <div>Details of Step 3</div>,
      isActive: true,
      isActiveBullet: true,
      bulletSize: 0,
      lineSize: 0,
    },
    {
      title: "meeting number 1",
      bullet: <PhoneCall size={18} />,
      children: <div>Details of Step 3</div>,
      isActive: true,
      isActiveBullet: true,
      bulletSize: 0,
      lineSize: 0,
    },
  ];
  return items;
}
async function getTaskData(id: number) {
  let user = await prisma.task.findUnique({
    where: {
      id: id,
    },
    include: {
      tags: true,
      assignees: true,
      project: true,
    },
  });
  return user;
}
export default async function Page({ params }: { params: { taskid: string } }) {
  let updates = await getTimeline();
  let task = await getTaskData(Number(params.taskid))
  return (
    <div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-7 mb-4">
      <Card className="lg:col-span-5 h-[815px] sm:col-span-1">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className=" font-2xl font-bold"> {task?.title}</CardTitle>
          <SquareArrowOutUpRight
            size={16}
            strokeWidth={2}
            color="rgb(100, 116, 139)"
          />
        </CardHeader>
        <Separator />
        <CardContent className="space-y-5 py-4">
          <div className="text-2xl font-medium">Task Overview</div>
          <p>{task?.content}</p>
          <p>
            {task?.description} {task?.startDate?.toDateString()}
          </p>

          {/* <div className="text-2xl font-bold">£45,231.89</div>
          <p className="text-xs text-muted-foreground">
            +20.1% from last month
          </p> */}
          {/* <p>{faker.lorem.paragraphs(4)}</p>
          <p>{faker.lorem.paragraphs(4)}</p>
          <Separator />
          <p>{faker.lorem.paragraphs(4)}</p> */}
          {/* <div className="flex">
          <ProjectStats1/><ProjectStats2/><ProjectStats3/><ProjectStats3/></div> */}
        </CardContent>
      </Card>
      <div className="lg:col-span-2 sm:col-span-1">
        <Card className="h-[350px] mb-4">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              <div className="text-xl ">Tasks Overview</div>
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
                  {task?.startDate?.toDateString()}
                  {/* +20.1% from last month */}
                </span>
              </div>
              <div>
                End Date{" "}
                <span className="text-xs text-muted-foreground">
                  {"  "}
                  {task?.dueDate?.toDateString()}
                  {/* +20.1% from last month */}
                </span>
              </div>
            </div>
            <div className="text-lg ">
              Task Type
              <div className="text-xs text-muted-foreground">
                {task?.tags.map((tag) => (
                  <Badge variant={"outline"} key={tag.id}>{tag.name}</Badge>
                ))}
                {/* +20.1% from last month */}
              </div>
            </div>
            <div className="text-lg ">
              Assigned To
              <div className="text-xs text-muted-foreground">
                <div className="flex">
                  {task?.assignees.map((user) => (
                    <UserBadge
                    key={user.id}
                    name={user.firstName+" " + user.lastName}
                    url={user.image}
                    fallback={user.firstName[0]}
                    />
                  ))}
                  {/* {task?.assignees.map((user) => (
                    <UserBadge
                      key={user.id}
                      name={user}
                      url={user.image}
                      fallback={user.firstName[0] + user.lastName[0]}
                    />
                  ))} */}
                </div>

                {/* +20.1% from last month */}
              </div>
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
  );
}
