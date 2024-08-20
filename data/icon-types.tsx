import {
    ClipboardCheckIcon,
    ClipboardCopyIcon,
    ClipboardListIcon,
    ClipboardMinusIcon,
    ClipboardPasteIcon,
    ClipboardPenLineIcon,
    ClipboardPlusIcon,
    ClipboardXIcon
} from "lucide-react";

export const notificationIconsList = [
    {
        value: "TASK_CREATE",
        label: "Task Created",
        icon: ClipboardPlusIcon
    },
    {
        value: "TASK_ASSIGN",
        label: "Task Assigned",
        icon: ClipboardListIcon
    },
    {
        value: "TASK_MODIFY",
        label: "Modify Task",
        icon: ClipboardPenLineIcon
    },
    {
        value: "TASK_DELETE",
        label: "Delete Task",
        icon: ClipboardXIcon
    },
    {
        value: "TASK_UNASSIGN",
        label: "Unassign Task",
        icon: ClipboardMinusIcon
    },
    {
        value: "TASK_DONE",
        label: "Task Done",
        icon: ClipboardCheckIcon
    },
    {
        value: "TASK_CANCELED",
        label: "Cancel Task",
        icon: ClipboardCopyIcon
    },
    {
        value: "TASK_OVERDUE",
        label: "Task Overdue",
        icon: ClipboardPasteIcon
    }
];

// Example usage:
const getIconComponent = (taskStatus: string) => {
    const task = notificationIconsList.find(item => item.value === taskStatus);
    return task ? task.icon : null; // Return the corresponding icon component or null if not found
};

// Usage in a React component
export const NotificationIcon = ({ className,status }:{className:string,status:string}) => {
    const IconComponent = getIconComponent(status);
    return IconComponent ? <IconComponent className={className}/> : null;
};
export const getNotificationText = (taskStatus: string) => {
    const task = notificationIconsList.find(item => item.value === taskStatus);
    return task? task.label : null; // Return the corresponding label text or null if not found
};
// Example of rendering the TaskIcon component
// <TaskIcon status="TASK_CREATE" />
