import {
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  CheckCircledIcon,
  CircleIcon,
  CrossCircledIcon,
  QuestionMarkCircledIcon,
  StopwatchIcon,
} from "@radix-ui/react-icons"

export const labels = [
  {
    value: "bug",
    label: "Bug",
  },
  {
    value: "feature",
    label: "Feature",
  },
  {
    value: "documentation",
    label: "Documentation",
  },
]

export const statuses = [
  {
    value: "BACKLOG",
    label: "Backlog",
    icon: QuestionMarkCircledIcon,
  },
  {
    value: "TODO",
    label: "Todo",
    icon: CircleIcon,
  },
  {
    value: "IN_PROGRESS",
    label: "In Progress",
    icon: StopwatchIcon,
  },
  {
    value: "DONE",
    label: "Done",
    icon: CheckCircledIcon,
  },
  {
    value: "CANCELED",
    label: "Canceled",
    icon: CrossCircledIcon,
  },
]

export const priorities = [
  {
    label: "Low",
    value: 1,
    icon: ArrowDownIcon,
  },
  {
    label: "Medium",
    value: 2,
    icon: ArrowRightIcon,
  },
  {
    label: "High",
    value: 3,
    icon: ArrowUpIcon,
  },
]
export const priorities_table = [
  {
    label: "Low",
    value: 1,
    icon: ArrowDownIcon,
  },
  {
    label: "Medium",
    value: 2,
    icon: ArrowRightIcon
  },
  {
    label: "High",
    value: 3,
    icon: ArrowUpIcon,
  },
]
