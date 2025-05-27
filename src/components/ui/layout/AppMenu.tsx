"use client";

import {
  Blocks,
  Cog,
  Command,
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
import { Avatar, AvatarFallback, AvatarImage } from "../primitives/avatar";
import { Link } from "@tanstack/react-router";

const user = {
  name: "John Doe",
  email: "",
  avatar: "",
};

const itemClassName = 'text-sidebar-accent-foreground/60 data-[status=active]:!bg-sidebar-accent data-[status=active]:!text-sidebar-accent-foreground '

export function AppMenu() {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild className="md:h-8 md:p-0">
              <a href="#">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <Command className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">Acme Inc</span>
                  <span className="truncate text-xs">Enterprise</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
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
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground md:h-8 md:p-0"
        >
          <Avatar className="h-8 w-8 rounded-full">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">{user.name}</span>
            <span className="truncate text-xs">{user.email}</span>
          </div>
        </SidebarMenuButton>
      </SidebarFooter>
    </Sidebar>
  );
}