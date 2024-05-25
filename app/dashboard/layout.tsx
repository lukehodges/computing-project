"use client";
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

import useIsCollapsed from "@/hooks/use-is-collapsed";
import Sidebar from "@/components/sidebar";
import Sidebar2 from "@/components/sidebar";
import { Layout, LayoutBody, LayoutHeader } from "@/components/custom/layout";
import { Search } from "@/components/search";
import ThemeSwitch from "@/components/theme-switch";
import { UserNav } from "@/components/user-nav";
import TeamSwitcher from "./components/team-switcher";
import "@bitnoi.se/react-scheduler/dist/style.css";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isCollapsed, setIsCollapsed] = useIsCollapsed();
  
  return <div className="relative h-full overflow-hidden bg-background">
      <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />

      <main
        id="content"
        className={`overflow-x-hidden pt-16 transition-[margin] md:overflow-y-hidden md:pt-0 ${
          isCollapsed ? "md:ml-14" : "md:ml-64"
        } h-full`}
      >
        <Layout>
          {/* ===== Top Heading ===== */}
          <LayoutHeader>
            <Search />
            
            <div className="ml-auto flex items-center space-x-4">

              <ThemeSwitch />
              <UserNav />
            </div>
          </LayoutHeader>

          
        </Layout>
        <LayoutBody className="mt-1 pt-1   space-y-4">  
        {children}
        </LayoutBody>
      </main>
    </div>
  
}
