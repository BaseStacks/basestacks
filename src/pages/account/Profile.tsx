import { TriangleAlert } from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/data-display/avatar";
import { getBorderColorClass } from "@/lib/colorUtils";
import { Alert, AlertTitle } from "@/components/ui/feedback/alert";
import { CardCustom } from "@/components/ui/data-display/card-custom";
import { Input } from "@/components/ui/primitives/input";
import { Button } from "@/components/ui/primitives/button";

export function Profile() {
  return (
    <div className="container mx-auto py-10 max-w-xl">
      <div className="flex flex-col justify-center gap-10">
        <CardCustom
          title="Account Details"
          description="Control your Appearance."
          submitButton
          textSubmit="Save"
          onSubmit={() => alert("Account details saved!")}
          disabledSubmit={true}
        >
          <div className="flex items-start gap-4">
            <Avatar className=" w-[100px] h-[100px]">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="flex flex-col w-full gap-3">
              <div className="flex flex-col w-full gap-1">
                <label htmlFor="workspace-name-input">Name</label>
                <Input
                  id="workspace-name-input"
                  placeholder="Enter workspace name..."
                />
              </div>
              <div className="flex flex-col w-full gap-1">
                <label htmlFor="email-id-input">Account Email ID</label>
                <Input
                  id="email-id-input"
                  placeholder="Enter email..."
                  disabled
                />
              </div>
            </div>
          </div>
        </CardCustom>

        <CardCustom
          title="Danger Zone"
          description="Delete your account permanently"
          className={getBorderColorClass("red", "500")}
          footer={
            <Button
              variant="destructive"
              onClick={() => alert("Workspace removed!")}
            >
              <span>Remove Account</span>
            </Button>
          }
        >
          <div className="flex flex-col gap-3">
            <Alert>
              <TriangleAlert size={40} color="#ff5429" />
              <AlertTitle>This action is irreversible</AlertTitle>
            </Alert>
            <p className="text-sm">
              Deleting your account will permanently remove any Workspaces and
              Bases where you are the sole owner. For all other cases, your
              access permissions will be revoked.
            </p>
          </div>
        </CardCustom>
      </div>
    </div>
  );
}
