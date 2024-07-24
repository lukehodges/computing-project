"use client";

import { Badge } from "@/components/ui/badge";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
export default function UserBadge({url, fallback, name}) {
  return <div>
    <Badge variant={"outline"}>
        
    <Avatar className="h-4 w-4 mr-1 overflow-hidden">
                      <AvatarImage src={url} width={"10px"} height={"10px"}/>
                      <AvatarFallback>{fallback}</AvatarFallback>
                    </Avatar> {name}
        </Badge>

  </div>;
}
