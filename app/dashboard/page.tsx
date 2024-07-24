import { Button } from "@/components/custom/button";
import { CalendarDateRangePicker } from "@/components/custom/date-range-picker";
import { MultiProgress } from "@/components/custom/multi-stage-progess";
import NotificationReadButton from "@/components/custom/notifications/mark-as-read";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getNotificationText, NotificationIcon } from "@/data/icon-types";
import { Notification } from "@/lib/entities/Notifications";
import { NotificationUseCases, TaskUseCases } from "@/lib/usecases";
import { mapEntityToPrismaNotification } from "@/prisma/maps/NotificationMapper";
import { IconNotification } from "@tabler/icons-react";
import { SquareArrowOutUpRight } from "lucide-react";
import prisma from "../../lib/db";
import { columns } from "./tasks/components/columns";
import { DataTable } from "./tasks/components/data-table";
import { KPIOverview } from "./components/kpi-overview";
import { RecentSales } from "./components/recent-sales";
import { Overview } from "./components/overview";
async function getTask() {
  return await prisma.task.findMany({ include: { assignees: true } });
}
function filterNotificationsHour(notifications: Notification[]) {
  let currentTime = new Date();
  let lasthour = new Date();
  lasthour.setHours(lasthour.getHours() - 1);
  return notifications.filter(
    (notification) => notification.createdAt >= lasthour
  );
}
function filterNotificationsToday(notifications: Notification[]) {
  let currentTime = new Date();
  let startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);
  return notifications.filter(
    (notification) => notification.createdAt >= startOfToday
  );
}
function filterNotificationsYesterday(notifications: Notification[]) {
  let startOfYesterday = new Date();
  startOfYesterday.setDate(startOfYesterday.getDate() - 1);
  startOfYesterday.setHours(0, 0, 0, 0);
  return notifications.filter(
    (notification) => notification.createdAt >= startOfYesterday
  );
}
function filterNotificationsWeek(notifications: Notification[]) {
  let startOfWeek = new Date();
  startOfWeek.setDate(startOfWeek.getDate() - 7);
  startOfWeek.setHours(0, 0, 0, 0);
  return notifications.filter(
    (notification) => notification.createdAt >= startOfWeek
  );
}

function filterNotificationsMonth(notifications: Notification[]) {
  let startofMonth = new Date();
  startofMonth.setDate(0);
  startofMonth.setHours(0, 0, 0, 0);
  return notifications.filter(
    (notification) => notification.createdAt >= startofMonth
  );
}
function notificatonDifference(...list: Notification[][]): Notification[][] {
  let results: Notification[][] = [list[0]];

  for (let i = 1; i < list.length - 1; i++) {
    results.push(
      list[i].filter((notification) => !list[i - 1].includes(notification))
    );
  }
  return results;
}

export default async function Dashboard() {
  // const { userId } = auth();
  // const p = await currentUser();
  // let tasks = await TaskUseCases.listTasks();
  // let notifications = await prisma.notification.findMany({
  //   orderBy: [{ createdAt: "desc" }],
  //   where: {
  //     read: false,
  //   },
  // });
  let tasks = await getTask()
  let notifications = (await NotificationUseCases.listNotifications()).filter(notification => notification.read === false);
  let p = notificatonDifference(
    filterNotificationsHour(notifications),
    filterNotificationsToday(notifications),
    filterNotificationsYesterday(notifications),
    filterNotificationsWeek(notifications),
    filterNotificationsMonth(notifications),
    filterNotificationsMonth(notifications)
  );
  let [hour, today, yesterday, week, month] = p;
  console.log(hour);
  let outstandign = tasks.filter((task) => !(task.status == "DONE")).length;
  let overdue = tasks.filter(
    (task) => task.status == "BACKLOG" || task.dueDate < new Date()
  ).length;
  return (
    <div>
      <div className="flex items-center justify-between space-y-1 pb-2 pt-0 ">
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
          Dashboard
        </h1>
        <div className="flex items-center space-x-2">
          <CalendarDateRangePicker />
          <Button>Download</Button>
        </div>
      </div>
      <Tabs defaultValue="overview" className="">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="personal">Personal</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Monthly Recurring Revenue
                </CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-muted-foreground"
                >
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">£45,231.89</div>
                <p className="text-xs text-muted-foreground">
                  +20.1% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Added Monthly Revenue
                </CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-muted-foreground"
                >
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">£45,231.89</div>
                <p className="text-xs text-muted-foreground">
                  +20.1% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Sales</CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-muted-foreground"
                >
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">£45,231.89</div>
                <p className="text-xs text-muted-foreground">
                  +20.1% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Clients</CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-muted-foreground"
                >
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+152</div>
                <p className="text-xs text-muted-foreground">
                  +20.1% from last month
                </p>
              </CardContent>
            </Card>
          </div>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-7">
            <div className="col-span-3 lg:col-span-1">
              <KPIOverview />
            </div>

            <Card className="col-span-1 lg:col-span-3">
              <CardHeader>
                <CardTitle>Overview</CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                <Overview />
              </CardContent>
            </Card>
            <div className="col-span-3 lg:col-span-1">
              <KPIOverview />
            </div>
            <Card className="col-span-3 lg:col-span-2">
              <CardHeader>
                <CardTitle>Recent Sales</CardTitle>
                <CardDescription>
                  You made 265 sales this month.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <RecentSales />
              </CardContent>
            </Card>
          </div>
          <div className="mb-2 flex items-center justify-between space-y-2"></div>
          <div className="-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0">
            {/* <DataTable data={tasks} columns={columns} />  */}
          </div>
        </TabsContent>

        <TabsContent value="personal">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Tasks
                </CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-muted-foreground"
                >
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
              </CardHeader>
              <CardContent className="pb-1">
                <div className="text-2xl font-bold">{tasks.length}</div>
                <p className="text-xs text-muted-foreground">
                  +{"   "} from last week
                </p>
              </CardContent>
              <CardFooter className="pt-0 pb-3"></CardFooter>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Outstanding Tasks
                </CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-muted-foreground"
                >
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{outstandign}</div>
                <p className="text-xs text-muted-foreground">
                  {overdue} overdue
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Time Tracked
                </CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-muted-foreground"
                >
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">150h</div>
                <p className="text-xs text-muted-foreground">
                  +10 from last week
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Revenue Collected
                </CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-muted-foreground"
                >
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">£3,256</div>
                <p className="text-xs text-muted-foreground">
                  - £1,021 from last month
                </p>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-5 lg:grid-cols-9 sm:grid-cols-2">
            <div className="col-span-2 space-y-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Notifications
                  </CardTitle>
                  <NotificationReadButton
                    data={notifications.map(mapEntityToPrismaNotification)}
                  />
                  <IconNotification
                    size={16}
                    strokeWidth={2}
                    color="rgb(100, 116, 139)"
                  />
                </CardHeader>
                <CardContent>
                  <div className="w-full max-w-md mx-auto py-4 space-y-4">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        {" "}
                        <div className="text-sm font-medium text-muted-foreground">
                          Today
                        </div>
                        <div className="grid gap-4">
                          {hour?.map((notification) => (
                            <div
                              className="flex items-start gap-3"
                              key={notification.id}
                            >
                              <div className="flex-shrink-0">
                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-accent-foreground  ">
                                  <NotificationIcon
                                    className="h-5 w-5"
                                    status={notification.type.toString()}
                                  />
                                </div>
                              </div>
                              <div className="flex-1 space-y-1">
                                <div className="flex items-center justify-between">
                                  <h4 className="text-sm font-medium">
                                    {getNotificationText(
                                      notification.type.toString()
                                    )}
                                  </h4>
                                  <p className="text-xs text-muted-foreground">
                                    {`${new Date(
                                      new Date() - notification.createdAt
                                    ).getMinutes()} minutes ago`}
                                  </p>
                                </div>
                                <p className="text-sm text-muted-foreground">
                                  {notification.message}
                                </p>
                              </div>
                            </div>
                          ))}

                          {today?.map((notification) => {
                            return (
                              <div
                                className="flex items-start gap-3"
                                key={notification.id}
                              >
                                <div className="flex-shrink-0">
                                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-accent-foreground  ">
                                    <NotificationIcon
                                      className="h-5 w-5"
                                      status={notification.type.toString()}
                                    />
                                  </div>
                                </div>
                                <div className="flex-1 space-y-1">
                                  <div className="flex items-center justify-between">
                                    <h4 className="text-sm font-medium">
                                      {getNotificationText(
                                        notification.type.toString()
                                      )}
                                    </h4>
                                    <p className="text-xs text-muted-foreground">
                                      {`${new Date(
                                        new Date() - notification.createdAt
                                      ).getHours()} hours ago`}
                                    </p>
                                  </div>
                                  <p className="text-sm text-muted-foreground">
                                    {notification.message}
                                  </p>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="text-sm font-medium text-muted-foreground">
                          Yesterday
                        </div>
                        <div className="grid gap-4">
                          {yesterday.map((notification) => {
                            let hours = new Date(
                              new Date() - notification.createdAt
                            )
                            hours = hours.getHours() + (hours.getDate()-1)*24
                            return (
                              <div
                                className="flex items-start gap-3"
                                key={notification.id}
                              >
                                <div className="flex-shrink-0">
                                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-accent-foreground  ">
                                    <NotificationIcon
                                      className="h-5 w-5"
                                      status={notification.type.toString()}
                                    />
                                  </div>
                                </div>
                                <div className="flex-1 space-y-1">
                                  <div className="flex items-center justify-between">
                                    <h4 className="text-sm font-medium">
                                      {getNotificationText(
                                        notification.type.toString()
                                      )}
                                    </h4>
                                    <p className="text-xs text-muted-foreground">
                                      {`${hours} hours ago`}
                                    </p>
                                  </div>
                                  <p className="text-sm text-muted-foreground">
                                    {notification.message}
                                  </p>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-0">
                  <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Milestones
                    </CardTitle>
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
                  <MultiProgress
                    values={[20, 50, 90]}
                    aria-label="12% increase"
                  />
                </CardFooter>
              </Card>

              <Card>
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
                <CardHeader className="flex flex-row items-center justify-between space-y-0">
                  <CardTitle className="text-sm font-medium">
                    Client Portal
                  </CardTitle>
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
            <Card className="lg:col-span-7 sm:col-span-1">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-2xl font-medium">Tasks</CardTitle>
                <SquareArrowOutUpRight
                  size={16}
                  strokeWidth={2}
                  color="rgb(100, 116, 139)"
                />
              </CardHeader>
              <CardContent>
                <DataTable
                  data={tasks}
                  columns={columns}
                  editable={true}
                />
              </CardContent>
            </Card>
          </div>
          ;
          {/* <ol className="relative border-s border-gray-200 dark:border-gray-700">
            <li className="mb-10 ms-4">
              <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
              <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                February 2022
              </time>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Application UI code in Tailwind CSS
              </h3>
              <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
                Get access to over 20+ pages including a dashboard layout,
                charts, kanban board, calendar, and pre-order E-commerce &
                Marketing pages.
              </p>
              <a
                href="#"
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-gray-100 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-700"
              >
                Learn more{" "}
                <svg
                  className="w-3 h-3 ms-2 rtl:rotate-180"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 10"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M1 5h12m0 0L9 1m4 4L9 9"
                  />
                </svg>
              </a>
            </li>
            <li className="mb-10 ms-4">
              <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
              <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                March 2022
              </time>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Marketing UI design in Figma
              </h3>
              <p className="text-base font-normal text-gray-500 dark:text-gray-400">
                All of the pages and components are first designed in Figma and
                we keep a parity between the two versions even as we update the
                project.
              </p>
            </li>
            <li className="ms-4">
              <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
              <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                April 2022
              </time>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                E-Commerce UI code in Tailwind CSS
              </h3>
              <p className="text-base font-normal text-gray-500 dark:text-gray-400">
                Get started with dozens of web components and interactive
                elements built on top of Tailwind CSS.
              </p>
            </li>
          </ol> */}
        </TabsContent>
      </Tabs>
    </div>
  );
}
