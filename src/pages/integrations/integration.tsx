import mysqlIcon from "@/assets/integrations/MySQL 6 Logo.png";
import postgreSQLIcon from "@/assets/integrations/PostgreSQL Elephant.png";
import mongoIcon from "@/assets/integrations/MongoDB Icon.svg";
import { Button } from "@/components/ui/primitives/button";
import DialogCustom from "@/components/ui/primitives/dialog-custom";
import DbDialogContent from "./dbDialogContent";

function Integration() {
  return (
    <div className="container mx-auto px-4 py-10">
      <div className="flex flex-col justify-center gap-10">
        <span className="text-sm font-normal text-gray-600 mb-2">
          Connect integrations with NocoDB.
          <a href="#" className="text-blue-500 hover:text-blue-700 ml-1">
            Learn more
          </a>
        </span>
        <div className="flex flex-col gap-4">
          <div className="database-title">Database</div>
          <div className="flex gap-4 ">
            <div className="integration-item basis-full md:basis-1/6">
              <DialogCustom
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
                dialogContent={<DbDialogContent />}
              >
                <span className="integration-icon p-2">
                  <img
                    src={mysqlIcon}
                    alt="MySQL"
                    className="w-[32px] h-[32px]"
                  />
                </span>
                <span className="integration-name">MySQL</span>
              </DialogCustom>
            </div>
            <div className="integration-item basis-full md:basis-1/6">
              <DialogCustom
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
                dialogContent={<DbDialogContent />}
              >
                <span className="integration-icon p-2">
                  <img
                    src={postgreSQLIcon}
                    alt="PostgreSQL"
                    className="w-[32px] h-[32px]"
                  />
                </span>
                <span className="integration-name">PostgreSQL</span>
              </DialogCustom>
            </div>
            <div className="integration-item basis-full md:basis-1/6">
              <DialogCustom
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
                dialogContent={<DbDialogContent />}
              >
                <span className="integration-icon p-2">
                  <img
                    src={mongoIcon}
                    alt="MongoDB"
                    className="w-[32px] h-[32px]"
                  />
                </span>
                <span className="integration-name">MongoDB</span>
              </DialogCustom>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Integration;
