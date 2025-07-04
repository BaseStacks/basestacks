import { createFileRoute } from "@tanstack/react-router";
import { Blocks, GitCommitHorizontal } from "lucide-react";
import { useMemo } from "react";
import { z } from "zod";
import { AppHeader } from "@/components/ui/layout/AppHeader";
import { AppPage } from "@/components/ui/layout/AppPage";
import { AppTabs } from "@/components/ui/layout/AppTabs";
import { Connection } from "@/pages/integrations/Connection";
import { Integration } from "@/pages/integrations/Integration";
import { useSearchParams } from "@/hooks/useSearchParams";

const searchSchema = z.object({
  page: z.string().optional(),
});

export const Route = createFileRoute("/integrations")({
  component: RouteComponent,
  validateSearch: (search) => searchSchema.parse(search),
});

function RouteComponent() {
  const breadcrumbItems = useMemo(
    () => [
      { label: "user@example.com", href: "" },
      { label: "Integrations", href: "/integrations" },
    ],
    []
  );

  const tabs = useMemo(
    () => [
      { icon: <Blocks />, name: "Integrations", value: "integrations" },
      {
        icon: <GitCommitHorizontal />,
        name: "Connections",
        value: "connections",
      },
    ],
    []
  );

  const search = useSearchParams({
    from: "/integrations",
    page: "integrations",
  });

  return (
    <AppPage>
      <AppHeader breadcrumb={breadcrumbItems} />
      <AppTabs tabs={tabs} />
      <div className="p-4">
        {search.page === "integrations" ? (
          <Integration />
        ) : search.page === "connections" ? (
          <Connection />
        ) : (
          <div>Select a tab to view content.</div>
        )}
      </div>
    </AppPage>
  );
}
