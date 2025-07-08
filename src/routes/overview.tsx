import { useMemo } from "react";
import { Database, PanelsTopLeft, Settings, Users } from "lucide-react";
import { createFileRoute } from "@tanstack/react-router";
import { AppHeader } from "@/components/ui/layout/AppHeader";
import { AppPage } from "@/components/ui/layout/AppPage";
import { AppTabs } from "@/components/ui/layout/AppTabs";
import { BasesSidebar } from "@/components/ui/widgets/base/BasesSidebar";
import { useSearchParams } from "@/hooks/useSearchParams";
import { AllTables } from "@/pages/overview/AllTables";
import { DataSources } from "@/pages/overview/DataSources";
import { Members } from "@/pages/overview/Members";
import { OverviewSettings } from "@/pages/overview/OverviewSettings";

export const Route = createFileRoute("/overview")({
  component: RouteComponent,
});

function RouteComponent() {
  const tabs = useMemo(
    () => [
      {
        icon: <PanelsTopLeft />,
        name: "All Tables",
        value: "all-tables",
        count: 5,
      },
      { icon: <Users />, name: "Members", value: "member", count: 3 },
      {
        icon: <Database />,
        name: "Data Sources",
        value: "data-sources",
        count: 2,
      },
      { icon: <Settings />, name: "Settings", value: "settings" },
    ],
    []
  );

  const search = useSearchParams({
    from: "/overview",
    page: "all-tables",
  });
  return (
    <AppPage sidebar={<BasesSidebar isOverviewPage />}>
      <AppHeader titleHeader showSidebarTrigger={true} />
      <AppTabs tabs={tabs} />
      <div className="p-4">
        {search.page === "all-tables" ?
          <AllTables />
        : search.page === "member" ?
          <Members />
        : search.page === "data-sources" ?
          <DataSources />
        : search.page === "settings" ?
          <OverviewSettings />
        : <div>Select a tab to view content.</div>}
      </div>
    </AppPage>
  );
}
