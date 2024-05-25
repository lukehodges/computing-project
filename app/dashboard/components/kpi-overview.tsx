"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export function KPIOverview() {
  return (
    <div className="space-y-4">
      <Card x-chunk="dashboard-05-chunk-2">
        <CardHeader className="pb-0">
          <CardDescription>This Month</CardDescription>
          <CardTitle className="text-2xl font-bold">$5,329</CardTitle>
        </CardHeader>
        <CardContent className="pb-3 pt-0">
          <div className="text-xs text-muted-foreground">
            +10% from last month
          </div>
        </CardContent>
        <CardFooter className="pt-0 pb-3">
          <Progress value={12} aria-label="12% increase" />
        </CardFooter>
      </Card>
      <Card x-chunk="dashboard-05-chunk-2">
        <CardHeader className="pb-0">
          <CardDescription>This Month</CardDescription>
          <CardTitle className="text-2xl font-bold">$5,329</CardTitle>
        </CardHeader>
        <CardContent className="pb-3 pt-0">
          <div className="text-xs text-muted-foreground">
            +10% from last month
          </div>
        </CardContent>
        <CardFooter className="pt-0 pb-3">
          <Progress value={12} aria-label="12% increase" />
        </CardFooter>
      </Card>
      <Card x-chunk="dashboard-05-chunk-2">
        <CardHeader className="pb-0">
          <CardDescription>This Month</CardDescription>
          <CardTitle className="text-2xl font-bold">$5,329</CardTitle>
        </CardHeader>
        <CardContent className="pb-3 pt-0">
          <div className="text-xs text-muted-foreground">
            +10% from last month
          </div>
        </CardContent>
        <CardFooter className="pt-0 pb-3">
          <Progress value={12} aria-label="12% increase" />
        </CardFooter>
      </Card>
    </div>
  );
}
