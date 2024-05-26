
import { useState } from "react";
import {
  IconAdjustmentsHorizontal,
  IconSortAscendingLetters,
  IconSortDescendingLetters,
} from "@tabler/icons-react";
import { Layout, LayoutBody, LayoutHeader } from "@/components/custom/layout";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Search } from "@/components/search";
import ThemeSwitch from "@/components/theme-switch";
import { UserNav } from "@/components/user-nav";
import { Button } from "@/components/custom/button";
import { apps } from "./data";
import { TableGeneration } from "./table-generator";



export default function Apps() {
  
  return (
    <div>
      <TableGeneration />
      </div>
  );
}
