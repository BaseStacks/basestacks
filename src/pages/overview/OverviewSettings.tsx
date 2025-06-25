import { Camera, Eye } from "lucide-react";
import { Snapshots } from "./overview-setting-part/Snapshots";
import { Visibility } from "./overview-setting-part/Visibility";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/navigation/tabs";

export function OverviewSettings() {
  return (
    <Tabs defaultValue="snapshots">
      <div className="flex w-full min-h-full p-4 gap-4">
        <div className="basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/6">
          <TabsList className="grid grid-cols-1 gap-1 p-0 bg-background w-full">
            <TabsTrigger
              value="snapshots"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground justify-start px-3 py-1.5  min-w-fit"
            >
              <Camera />
              <span className="grow text-left">Snapshots</span>
            </TabsTrigger>
            <TabsTrigger
              value="visibility"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground justify-start px-3 py-1.5  min-w-fit"
            >
              <Eye />
              <span className="grow text-left">Visibility & Data Handling</span>
            </TabsTrigger>
          </TabsList>
        </div>
        <div className="basis-full sm:basis-1/2 md:basis-2/3 lg:basis-5/6">
          <TabsContent value="snapshots">
            <Snapshots />
          </TabsContent>
          <TabsContent value="visibility">
            <Visibility />
          </TabsContent>
        </div>
      </div>
    </Tabs>
  );
}
