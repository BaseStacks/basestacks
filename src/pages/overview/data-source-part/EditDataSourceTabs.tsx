import { MetaSync } from "./MetaSync";
import { EditDataSource } from "./EditDataSource";
import { ViewVisibility } from "./ViewVisibility";
import type { DataSourceType } from "@/components/api/data-type/overview/overview";
import { ConnectionLayoutDialog } from "@/pages/shared/ConnectionLayoutDialog";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/navigation/tabs";

export function EditDataSourceTabs({
  initialData,
}: {
  readonly initialData: DataSourceType;
}) {
  const tabs = [
    {
      name: "Source Connection Details",
      value: "connection-details",
      content: (
        <ConnectionLayoutDialog
          children={<EditDataSource initialData={initialData} />}
        />
      ),
    },
    {
      name: "ERD View",
      value: "erd-view",
      content: "",
    },
    {
      name: "View visibility",
      value: "view-visibility",
      content: <ViewVisibility />,
    },
    {
      name: "Meta Sync",
      value: "meta-sync",
      content: <MetaSync />,
    },
  ];
  return (
    <Tabs defaultValue={tabs[0].value} className="w-full h-full gap-0">
      <div className="border-b-1">
        <TabsList className="w-fit p-0 bg-background justify-start rounded-none">
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className="rounded-none bg-background h-full data-[state=active]:shadow-none border-0 border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-primary"
            >
              <span className="px-2">{tab.name}</span>
            </TabsTrigger>
          ))}
        </TabsList>
      </div>
      {tabs.map((tab) => (
        <TabsContent key={tab.value} value={tab.value}>
          {tab.content}
        </TabsContent>
      ))}
    </Tabs>
  );
}
