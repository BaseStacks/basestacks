import { SQLDialogContent } from "./integration-part/SQLDialogContent";
import { NoSQLDialogContent } from "./integration-part/NoSQLDialogContent";
import mysqlIcon from "@/assets/integrations/MySQL 6 Logo.png";
import postgreSQLIcon from "@/assets/integrations/PostgreSQL Elephant.png";
import mongoIcon from "@/assets/integrations/MongoDB Icon.svg";
import { Button } from "@/components/ui/primitives/button";
import { DbDialog } from "@/pages/integrations/integration-part/DbDialog";
import { cn } from "@/lib/utils";
import { getTextColorClass } from "@/lib/colorUtils";

export function Integration() {
  const integrations = [
    {
      name: "MySQL",
      icon: mysqlIcon,
      dialogContent: <SQLDialogContent />,
    },
    {
      name: "PostgreSQL",
      icon: postgreSQLIcon,
      dialogContent: <SQLDialogContent />,
    },
    {
      name: "MongoDB",
      icon: mongoIcon,
      dialogContent: <NoSQLDialogContent />,
    },
  ];
  return (
    <div className="container mx-auto px-4 py-10">
      <div className="flex flex-col justify-center gap-10">
        <span className="text-sm font-normal text-gray-600 mb-2">
          Connect integrations with NocoDB.
          <a
            href="#"
            className={cn(
              "ml-1",
              getTextColorClass("blue"),
              getTextColorClass("blue", "hover")
            )}
          >
            Learn more
          </a>
        </span>
        <div className="flex flex-col gap-4">
          <div className="database-title">Database</div>
          <div className="grid gap-4 ">
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
              {integrations.map((db) => (
                <DbDialog
                  key={db.name}
                  title={db.name}
                  buttonClassName="rounded-xl flex items-center gap-4 border p-3 w-full"
                  width="!max-w-[60vw]"
                  showSubmit
                  showFooter={false}
                  rightContent={
                    <>
                      <Button variant="secondary" size="sm">
                        Test Connection
                      </Button>
                      <Button variant="secondary" size="sm" disabled>
                        Create Connection
                      </Button>
                    </>
                  }
                  dialogContent={db.dialogContent}
                >
                  <span className="integration-icon p-2">
                    <img
                      src={db.icon}
                      alt={db.name}
                      className="w-[32px] h-[32px]"
                    />
                  </span>
                  <span className="integration-name">{db.name}</span>
                </DbDialog>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
