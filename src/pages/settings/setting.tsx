import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/primitives/alert";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/primitives/avatar";
import { Button } from "@/components/ui/primitives/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/primitives/card";
import { Input } from "@/components/ui/primitives/input";
import { cn } from "@/lib/utils";
import { AlertCircleIcon, TriangleAlert } from "lucide-react";

interface SettingProps {}

function Setting(props: SettingProps) {
  return (
    <div className="container mx-auto px-4 py-10 max-w-2xl">
      <div className="flex flex-col justify-center gap-10">
        <Card>
          <CardHeader>
            <CardTitle>Workspace Appearance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <Avatar className="rounded-lg w-[66px] h-[66px]">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="flex flex-col w-full gap-2">
                <label htmlFor="">Name</label>
                <Input className="" />
              </div>
            </div>
          </CardContent>
          <CardFooter className="justify-end">
            <CardAction>
              <Button className="py-2 transition-colors">Save</Button>
            </CardAction>
          </CardFooter>
        </Card>
        <Card className="border-red-500">
          <CardHeader>
            <CardTitle>Danger Zone</CardTitle>
            <CardDescription>
              Delete this workspace and all it’s contents.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <Alert>
                <TriangleAlert size={40} color="#ff5429" />
                <AlertTitle>This action is irreversible</AlertTitle>
              </Alert>
            </div>
          </CardContent>
          <CardFooter className="justify-end">
            <CardAction>
              <div
                className={cn(
                  "flex flex-1 items-center gap-x-2 rounded-md transition-colors duration-100",
                  "hover:bg-red-100 text-red-500 px-2.5 py-1.5 rounded-md border"
                )}
              >
                <span className="font-normal">Remove workspace</span>
              </div>
            </CardAction>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

export default Setting;
