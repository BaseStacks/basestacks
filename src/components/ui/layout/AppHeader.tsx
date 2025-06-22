import { ChevronsRight, Layers2, Menu } from "lucide-react";
import { Button } from "../primitives/button";
import { AppBreadcrumb } from "./AppBreadcrumb";
import type { AppBreadcrumbItem } from "./AppBreadcrumb";
import { useBases, useSidebarStatus } from "@/states";
import { useIsMobile } from "@/hooks/ui/useIsMobile";
import { cn } from "@/lib/utils";

interface AppHeaderProps {
  readonly breadcrumb?: Array<AppBreadcrumbItem>;
  readonly showSidebarTrigger?: boolean;
  readonly titleHeader?: boolean;
}

export function AppHeader({
  breadcrumb,
  showSidebarTrigger,
  titleHeader,
}: AppHeaderProps) {
  const isMobile = useIsMobile();
  const base = useBases();
  const sidebarStatus = useSidebarStatus();

  return (
    <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] border-b ease-linear justify-between">
      {titleHeader ?
        <div className="flex items-center gap-2 px-4 w-full">
          <Layers2 />
          <h1 className="flex font-bold text-sm capitalize truncate max-w-150 flex font-bold text-sm capitalize truncate max-w-150">
            {base.getActiveBase.name}
          </h1>
        </div>
      : <div className={cn("flex items-center gap-2 px-4 w-full")}>
          {isMobile ?
            <Button
              size="icon"
              variant="outline"
              onClick={() => {
                sidebarStatus.toggleMobile();
              }}
            >
              <Menu />
            </Button>
          : showSidebarTrigger &&
            !sidebarStatus.visible && (
              <Button
                size="icon"
                variant="ghost"
                onClick={() => sidebarStatus.toggle()}
              >
                <ChevronsRight />
              </Button>
            )
          }
          {breadcrumb && <AppBreadcrumb items={breadcrumb} />}
        </div>
      }
    </header>
  );
}
