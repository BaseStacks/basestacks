import { Sidebar, SidebarClose } from "lucide-react";
import { Button } from "../primitives/button";
import { useSidebarStatus } from "@/states";
import { AppBreadcrumb, type AppBreadcrumbItem } from "./AppBreadcrumb";
import { Separator } from "../primitives/separator";

interface AppHeaderProps {
    readonly breadcrumb?: AppBreadcrumbItem[];
    readonly showSidebarTrigger?: boolean;
}

export function AppHeader({ breadcrumb, showSidebarTrigger }: AppHeaderProps) {
    const sidebarStatus = useSidebarStatus();

    return (
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] border-b ease-linear justify-between">
            <div className="flex items-center gap-2 px-4">
                {
                    showSidebarTrigger && (
                        <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => sidebarStatus.toggle()}
                        >
                            {sidebarStatus.visible ? <SidebarClose /> : <Sidebar />}
                        </Button>
                    )
                }
                {breadcrumb && (
                    <>
                        <Separator className="!h-4" orientation="vertical" />
                        <AppBreadcrumb items={breadcrumb} />
                    </>
                )}
            </div>
        </header>
    );
}