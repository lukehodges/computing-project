"use client";

import { Badge } from "@/components/ui/badge";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
interface UserBadgeInterface {
  url:string | null;
  fallback: string;
  name:string;
  className?:string;
}
export default function UserBadge({url, fallback, name,className}:UserBadgeInterface) {
  url = url || "defaut.png"
  return <div>
    <Badge variant={"outline"} className={className}>
        
    <Avatar className="h-4 w-4 mr-1 overflow-hidden">
                      <AvatarImage src={url} width={"10px"} height={"10px"}/>
                      <AvatarFallback>{fallback}</AvatarFallback>
                    </Avatar> {name}
        </Badge>

  </div>;
}
