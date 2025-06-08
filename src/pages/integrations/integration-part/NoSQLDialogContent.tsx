import { Button } from "@/components/ui/primitives/button";
import { getBgColorClass } from "@/lib/colorUtils";
import { cn } from "@/lib/utils";
import { Separator } from "@radix-ui/react-separator";
import { BookOpen, Copy } from "lucide-react";

export function NoSQLDialogContent() {

  return (
    <div className="database-detail w-full flex overflow-hidden rounded-b-md">
      <div className="basis-full md:basis-3/4 min-h-0">
        <div className="max-h-[90vh] w-full overflow-auto p-5">
          <div className="max-w-[768px] mx-auto space-y-8">
            Coming soon...
          </div>
        </div>
      </div>
      <div
        className={cn(
          "basis-full md:basis-1/4 border-l-1",
          getBgColorClass("gray", "200"),
          `dark:${getBgColorClass("gray", "800")}`
        )}
      >
        <div className="flex flex-col p-5 gap-3">
          <div className="text-sm font-semibold">
            Whitelist IPs
          </div>
          <div className="text-small leading-[18px]">
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
          <div className="text-sm font-semibold">
            Relevant documentation
          </div>
          <div>
            <div className="flex items-center gap-1">
              <div className="h-7 w-7 flex items-center justify-center">
                <BookOpen size={16} />
              </div>
              <a
                href="#"
                className="text-sm !no-underline !hover:underline"
              >
                Integrations
              </a>
            </div>
            <div className="flex items-center gap-1">
              <div className="h-7 w-7 flex items-center justify-center">
                <BookOpen size={16} />
              </div>
              <a
                href="#"
                className="text-sm !no-underline !hover:underline"
              >
                Create new connection
              </a>
            </div>
            <div className="flex items-center gap-1">
              <div className="h-7 w-7 flex items-center justify-center">
                <BookOpen size={16} />
              </div>
              <a
                href="#"
                className="text-sm !no-underline !hover:underline"
              >
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
