import { createFileRoute } from "@tanstack/react-router";
import { ChevronsLeftRight, User } from "lucide-react";
import { useMemo } from "react";
import { AppHeader } from "@/components/ui/layout/AppHeader";
import { AppPage } from "@/components/ui/layout/AppPage";
import { AccountSidebar } from "@/components/ui/widgets/AccountSidebar";
import { useSearchParams } from "@/hooks/useSearchParams";
import { Profile } from "@/pages/account/Profile";
import { Tokens } from "@/pages/account/Tokens";

export const Route = createFileRoute("/account")({
  component: RouteComponent,
});

function RouteComponent() {
  const search = useSearchParams({
    from: "/account",
    page: "profile",
  });

  const breadcrumbItems = useMemo(
    () => [
      { label: "user@example.com", href: "" },
      { label: "Account", href: "/account" },
    ],
    []
  );

  return (
    <AppPage sidebar={<AccountSidebar />}>
      <AppHeader breadcrumb={breadcrumbItems} showSidebarTrigger={true} />
      <div className="flex items-center w-full border-b px-2 h-12 font-bold">
        {search.page === "profile" ? (
          <div className="flex items-center gap-2">
            <User />
            <span className="grow text-left">Profile</span>
          </div>
        ) : search.page === "api-token" ? (
          <div className="flex items-center gap-2">
            <ChevronsLeftRight />
            <span className="grow text-left">Tokens</span>
          </div>
        ) : (
          ""
        )}
      </div>
      <div className="p-4">
        {search.page === "profile" ? (
          <Profile />
        ) : search.page === "api-token" ? (
          <Tokens />
        ) : (
          <div></div>
        )}
      </div>
    </AppPage>
  );
}
