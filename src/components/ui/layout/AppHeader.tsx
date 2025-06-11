import { ChevronsRight, Menu } from "lucide-react";
import { Button } from "../primitives/button";
import { AppBreadcrumb } from "./AppBreadcrumb";
import type { AppBreadcrumbItem } from "./AppBreadcrumb";
import { useSidebarStatus } from "@/states";
import { useIsMobile } from "@/hooks/ui/useIsMobile";
import { cn } from "@/lib/utils";

interface AppHeaderProps {
    readonly breadcrumb?: Array<AppBreadcrumbItem>;
    readonly showSidebarTrigger?: boolean;
}

export function AppHeader({ breadcrumb, showSidebarTrigger }: AppHeaderProps) {
    const isMobile = useIsMobile();

    const sidebarStatus = useSidebarStatus();

    return (
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] border-b ease-linear justify-between">
            <div className={cn('flex items-center gap-2 px-4 w-full')}>
                {
                    isMobile
                        ? (
                            <Button size="icon" variant="outline" onClick={() => sidebarStatus.toggleMobile()}>
                                <Menu />
                            </Button>
                        )
                        : (showSidebarTrigger && !sidebarStatus.visible) && (
                            <Button
                                size="icon"
                                variant="ghost"
                                onClick={() => sidebarStatus.toggle()}
                            >
                                <ChevronsRight />
                            </Button>
                        )
                }
                {breadcrumb && (
                    <AppBreadcrumb items={breadcrumb} />
                )}
            </div>
        </header>
    );
}