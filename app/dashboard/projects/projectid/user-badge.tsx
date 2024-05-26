"use client";

import { Badge } from "@/components/ui/badge";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
export default function UserBadge() {
  return <div>
    <Badge variant={"outline"}>
        
    <Avatar className="h-4 w-4 mr-1">
                      <AvatarImage src="https://github.com/shadcn.png" width={"10px"} height={"10px"}/>
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar> John Doe
        </Badge>

  </div>;
}
