import mysqlIcon from "@/assets/integrations/MySQL 6 Logo.png";
import postgreSQLIcon from "@/assets/integrations/PostgreSQL Elephant.png";
import mongoIcon from "@/assets/integrations/MongoDB Icon.svg";
import { Button } from "@/components/ui/primitives/button";
import DbDialog from "@/pages/integrations/integration-part/dbDialog";
import { SQLDialogContent } from "./integration-part/SQLDialogContent";
import { NoSQLDialogContent } from "./integration-part/NoSQLDialogContent";
import { cn } from "@/lib/utils";
import { getTextColorClass } from "@/lib/colorUtils";

function Integration() {
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
          <div className="flex gap-4 ">
            <div className="integration-item basis-full md:basis-1/6">
              <DbDialog
                buttonClassName="rounded-xl flex items-center gap-4 border p-3 w-full"
                title="MYSQL"
                showSubmit
                showFooter={false}
                width="!max-w-[60vw]"
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
                dialogContent={<SQLDialogContent />}
              >
                <span className="integration-icon p-2">
                  <img
                    src={mysqlIcon}
                    alt="MySQL"
                    className="w-[32px] h-[32px]"
                  />
                </span>
                <span className="integration-name">MySQL</span>
              </DbDialog>
            </div>
            <div className="integration-item basis-full md:basis-1/6">
              <DbDialog
                buttonClassName="rounded-xl flex items-center gap-4 border p-3 w-full"
                title="PostgreSQL"
                showSubmit
                showFooter={false}
                width="!max-w-[60vw]"
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
                dialogContent={<SQLDialogContent />}
              >
                <span className="integration-icon p-2">
                  <img
                    src={postgreSQLIcon}
                    alt="PostgreSQL"
                    className="w-[32px] h-[32px]"
                  />
                </span>
                <span className="integration-name">PostgreSQL</span>
              </DbDialog>
            </div>
            <div className="integration-item basis-full md:basis-1/6">
              <DbDialog
                buttonClassName="rounded-xl flex items-center gap-4 border p-3 w-full"
                title="MongoDB"
                showSubmit
                showFooter={false}
                width="!max-w-[60vw]"
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
                dialogContent={<NoSQLDialogContent />}
              >
                <span className="integration-icon p-2">
                  <img
                    src={mongoIcon}
                    alt="MongoDB"
                    className="w-[32px] h-[32px]"
                  />
                </span>
                <span className="integration-name">MongoDB</span>
              </DbDialog>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Integration;
