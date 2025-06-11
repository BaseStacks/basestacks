import { createFileRoute, useSearch } from "@tanstack/react-router";
import { Settings, Users } from "lucide-react";
import { useMemo } from "react";
import { z } from "zod";
import { AppHeader } from "@/components/ui/layout/AppHeader";
import { AppPage } from "@/components/ui/layout/AppPage";
import { AppTabs } from "@/components/ui/layout/AppTabs";
import { Member } from "@/pages/settings/Member";
import { Setting } from "@/pages/settings/Setting";

const searchSchema = z.object({
  page: z.string().optional(),
});

export const Route = createFileRoute("/settings")({
  component: RouteComponent,
  validateSearch: (search) => searchSchema.parse(search),
});

function RouteComponent() {
  const breadcrumbItems = useMemo(
    () => [
      { label: "user@example.com", href: "" },
      { label: "Settings", href: "/settings" },
    ],
    []
  );

  const tabs = useMemo(
    () => [
      { icon: <Users />, name: "Members", value: "members" },
      { icon: <Settings />, name: "Settings", value: "settings" },
    ],
    []
  );

  const { page = "members" } = useSearch({
    from: "/settings",
  });

  return (
    <AppPage>
      <AppHeader breadcrumb={breadcrumbItems} />
      <AppTabs tabs={tabs} />
      <div className="p-4">
        {page === "members" ? (
          <Member />
        ) : page === "settings" ? (
          <Setting />
        ) : (
          <div>Select a tab to view content.</div>
        )}
      </div>
    </AppPage>
  );
}
