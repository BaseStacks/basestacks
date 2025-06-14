import { ChevronsLeftIcon, ChevronsLeftRight, User, XIcon } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Separator } from "../primitives/separator";
import { Button } from "../primitives/button";
import { useSidebarStatus } from "@/states";
import { useIsMobile } from "@/hooks/ui/useIsMobile";

export function AccountSidebar() {
  const isMobile = useIsMobile();
  const sidebarStatus = useSidebarStatus();

  return (
    <div>
      <div className="h-16 px-4 flex items-center justify-between">
        <div className="grow">Account</div>
        {isMobile ? (
          <Button
            size="icon"
            variant="ghost"
            onClick={() => sidebarStatus.toggleMobile()}
          >
            <XIcon />
          </Button>
        ) : (
          <Button
            size="icon"
            variant="ghost"
            onClick={() => sidebarStatus.toggle()}
          >
            <ChevronsLeftIcon />
          </Button>
        )}
      </div>
      <div className="flex flex-col gap-2 px-4">
        <div className="w-full flex flex-col gap-1 mb-4">
          <Button variant="ghost" asChild>
            <Link to="." search={{ page: "profile" }} className="!px-4 w-full">
              <User />
              <span className="grow text-left">Profile</span>
            </Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link
              to="."
              search={{ page: "api-token" }}
              className="!px-4 w-full"
            >
              <ChevronsLeftRight />
              <span className="grow text-left">API Tokens</span>
            </Link>
          </Button>
          <Separator className="my-2" />
        </div>
      </div>
    </div>
  );
}
