"use client";
import React from "react";

import { Button } from "@/components/custom/button";
import { useRouter } from "next/navigation";
import { Notification } from "@/lib/entities/Notifications";
async function markNotificationAsRead(data: Notification[]) {
  const deletePromises = data.map(
    async (notification: Notification) =>{
      notification.read = true
      await fetch(`/api/notification/${notification.id}`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body:JSON.stringify(notification)
      })}
  );

  await Promise.all(deletePromises);  

  // Handle successful deletion, maybe refresh data or call a callback
  console.log("Deleted successfully");
}
export default function NotificationReadButton({data}:{data:Notification[]}): React.JSX.Element {
  const router = useRouter();
  return (
    <Button variant="ghost" size="sm" onClick={async ()=>{
      let p =  await markNotificationAsRead(data);
      router.refresh();
    }}>
      Mark all as read
    </Button>
  );
}
