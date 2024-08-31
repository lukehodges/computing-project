"use client";

import { Badge } from "@/components/ui/badge";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DeleteIcon, UserX, UserX2, UserXIcon } from "lucide-react";
import { Button } from "./button";
import React from "react";
interface UserBadgeInterface {
  url: string | null;
  fallback: string;
  name: string;
  className?: string;
  removefunction?: () => void; 
}
export default function UserBadge({
  url,
  fallback,
  name,
  className,
  removefunction
}: UserBadgeInterface) {
  const [isHovered, setIsHovered] = React.useState(false);
  url = url || "defaut.png";
  return (
    <div>
      <Badge
        variant={"outline"}
        className={className}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={(event) =>{
          // disable any existing on click functions and any parent functions from cascading
          event.stopPropagation();
        }
        }
      >
        <Avatar className="h-4 w-4 mr-1 overflow-auto">
          <AvatarImage src={url} width={"10px"} height={"10px"} />
          <AvatarFallback>{fallback}</AvatarFallback>
        </Avatar>{" "}
        {name}
        {isHovered && <Button
          variant="ghost"
          className="flex h-4 w-4 ml-2 mr-1 p-[1px] b-0 data-[state=open]:bg-muted"
          onClick={removefunction}
        >
          <UserXIcon
            className="flex-basis-[150px] text-zinc-950"
            strokeWidth={"2px"}
          />
          <span className="sr-only">Open menu</span>
        </Button>
}
      </Badge>
    </div>
  );
}
