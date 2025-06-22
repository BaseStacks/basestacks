import { BookOpen, Copy } from "lucide-react";
import { Button } from "@/components/ui/primitives/button";
import { Separator } from "@/components/ui/primitives/separator";
import { getBgColorClass, getTextColorClass } from "@/lib/colorUtils";
import { cn } from "@/lib/utils";

export function ConnectionLayoutDialog({
  children,
}: {
  readonly children?: React.ReactNode;
}) {
  return (
    <div className="database-detail w-full flex rounded-b-md min-h-full">
      <div className="basis-full md:basis-5/6 ">
        <div className="w-full p-10">
          <div className="mx-auto space-y-8">{children}</div>
        </div>
      </div>
      <div
        className={cn(
          "basis-full md:basis-1/6 border-l-1",
          getBgColorClass("gray", "100"),
          `dark:${getBgColorClass("gray", "800")}`
        )}
      >
        <div className="flex flex-col p-5 gap-3">
          <div className="text-sm font-semibold">Whitelist IPs</div>
          <div
            className={cn("text-xs leading-[18px]", getTextColorClass("gray"))}
          >
            Ensure your database has allow-listed the following IPs:
          </div>
          <div className="flex items-center gap-4 cursor-pointer text-sm font-bold">
            52.15.226.51
            <Button
              className="ant-btn ant-btn-text size-xs theme-default bordered nc-btn-shadow nc-button !px-1"
              type="button"
              variant="ghost"
            >
              <div className="justify-center flex flex-row gap-x-2.5 nc-btn-inner w-full">
                <div className="flex flex-row items-center">
                  <Copy />
                </div>
              </div>
            </Button>
          </div>
          <Separator className="my-2" />
          <div className="text-sm font-semibold">Relevant documentation</div>
          <div>
            <div className="flex items-center gap-1">
              <div className="h-7 w-7 flex items-center justify-center">
                <BookOpen size={16} />
              </div>
              <a href="#" className="text-xs !no-underline !hover:underline">
                Integrations
              </a>
            </div>
            <div className="flex items-center gap-1">
              <div className="h-7 w-7 flex items-center justify-center">
                <BookOpen size={16} />
              </div>
              <a href="#" className="text-xs !no-underline !hover:underline">
                Create new connection
              </a>
            </div>
            <div className="flex items-center gap-1">
              <div className="h-7 w-7 flex items-center justify-center">
                <BookOpen size={16} />
              </div>
              <a href="#" className="text-xs !no-underline !hover:underline">
                Add new Data source
              </a>
            </div>
          </div>
          <Separator className="my-2" />
        </div>
      </div>
    </div>
  );
}
