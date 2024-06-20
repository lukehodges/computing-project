import { Button } from "@/components/custom/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Overview } from "./components/overview";
import { RecentSales } from "./components/recent-sales";
import { CalendarDateRangePicker } from "@/components/custom/date-range-picker";
import { KPIOverview } from "./components/kpi-overview";
import prisma from "../db";
import { DataTable } from "./tasks/components/data-table";
import { columns } from "./tasks/components/columns";
import { FileIcon, InboxIcon, SquareArrowOutUpRight } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { IconNotification } from "@tabler/icons-react";
import { BellIcon, CalendarIcon } from "@radix-ui/react-icons";
async function getTask() {
  return await prisma.task.findMany({ include: { assignees: true } });
}
export default async function Dashboard() {
  // const { userId } = auth();
  // const p = await currentUser();
  let tasks = await getTask();

  let lastweek = tasks.filter(
    (task) =>
      task.createdAt >= new Date(new Date().setDate(new Date().getDate() - 7))
  ).length;
  let outstandign = tasks.filter((task) => task.status == "DONE").length;
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
            {/* <DataTable data={tasks} columns={columns} /> */}
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
                  +{lastweek} from last week
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
                <p className="text-xs text-muted-foreground">10 overdue</p>
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
                  <CardTitle className="text-md font-medium">
                    Notifications
                  </CardTitle>
                  <Button variant="ghost" size="md">
                    Mark all as read
                  </Button>
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
                        <div className="text-sm font-medium text-muted-foreground">
                          Today
                        </div>
                        <div className="grid gap-4">
                          <div className="flex items-start gap-3">
                            <div className="flex-shrink-0">
                              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                                <BellIcon className="h-5 w-5" />
                              </div>
                            </div>
                            <div className="flex-1 space-y-1">
                              <div className="flex items-center justify-between">
                                <h4 className="text-sm font-medium">
                                  New message
                                </h4>
                                <p className="text-xs text-muted-foreground">
                                  10 minutes ago
                                </p>
                              </div>
                              <p className="text-sm text-muted-foreground">
                                You have a new message from John Doe.
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <div className="flex-shrink-0">
                              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary text-secondary-foreground">
                                <CalendarIcon className="h-5 w-5" />
                              </div>
                            </div>
                            <div className="flex-1 space-y-1">
                              <div className="flex items-center justify-between">
                                <h4 className="text-sm font-medium">
                                  Upcoming event
                                </h4>
                                <p className="text-xs text-muted-foreground">
                                  30 minutes ago
                                </p>
                              </div>
                              <p className="text-sm text-muted-foreground">
                                Your team meeting is scheduled for 2pm today.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="text-sm font-medium text-muted-foreground">
                          Yesterday
                        </div>
                        <div className="grid gap-4">
                          <div className="flex items-start gap-3">
                            <div className="flex-shrink-0">
                              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-accent-foreground">
                                <InboxIcon className="h-5 w-5" />
                              </div>
                            </div>
                            <div className="flex-1 space-y-1">
                              <div className="flex items-center justify-between">
                                <h4 className="text-sm font-medium">
                                  New email
                                </h4>
                                <p className="text-xs text-muted-foreground">
                                  Yesterday, 5:30 PM
                                </p>
                              </div>
                              <p className="text-sm text-muted-foreground">
                                You have a new email from Jane Smith.
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <div className="flex-shrink-0">
                              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-muted-foreground">
                                <FileIcon className="h-5 w-5" />
                              </div>
                            </div>
                            <div className="flex-1 space-y-1">
                              <div className="flex items-center justify-between">
                                <h4 className="text-sm font-medium">
                                  New file
                                </h4>
                                <p className="text-xs text-muted-foreground">
                                  Yesterday, 3:00 PM
                                </p>
                              </div>
                              <p className="text-sm text-muted-foreground">
                                A new file has been added to your project.
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <div className="flex-shrink-0">
                              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-muted-foreground">
                                <FileIcon className="h-5 w-5" />
                              </div>
                            </div>
                            <div className="flex-1 space-y-1">
                              <div className="flex items-center justify-between">
                                <h4 className="text-sm font-medium">
                                  New file
                                </h4>
                                <p className="text-xs text-muted-foreground">
                                  Yesterday, 3:00 PM
                                </p>
                              </div>
                              <p className="text-sm text-muted-foreground">
                                A new file has been added to your project.
                              </p>
                            </div>
                          </div>
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
                  <Progress value={23.5} aria-label="12% increase" />
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
                <DataTable data={tasks} columns={columns} editable={false} />
              </CardContent>
            </Card>
          </div>
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
