import {
  Blocks,
  Cog,
  Home,
  Search,
  Settings2,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/primitives/sidebar";
import { Link } from "@tanstack/react-router";
import { WorkspaceSwitcher } from "../widgets/workspace/WorkspaceSwitcher";
import { UserButton } from "../widgets/UserButton";

const itemClassName = 'data-[status=active]:!bg-sidebar-accent data-[status=active]:!text-sidebar-accent-foreground '

export function AppMenu() {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="h-16 flex items-center justify-center">
        <SidebarMenu>
          <SidebarMenuItem>
            <WorkspaceSwitcher />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="py-2">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu >
              {/* Bases */}
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="bases" className={itemClassName}>
                  <Link to="/" >
                    <Home />
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Automation" className={itemClassName}>
                  <Link to="/automation">
                    <Cog />
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              {/* Search */}
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="search" className={itemClassName}>
                  <Search />
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarSeparator />
              {/* Settings */}
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Settings" className={itemClassName}>
                  <Link to="/settings">
                    <Settings2 />
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              {/* Integrations */}
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Integrations" className={itemClassName}>
                  <Link to="/integrations">
                    <Blocks />
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <UserButton />
      </SidebarFooter>
    </Sidebar>
  );
}