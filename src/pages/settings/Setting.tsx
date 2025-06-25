import { Check, TriangleAlert } from "lucide-react";
import { useState } from "react";
import type { Theme } from "@/components/ui/ThemeProvider";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/data-display/avatar";
import { getBgColorClass, getBorderColorClass } from "@/lib/colorUtils";
import { Alert, AlertTitle } from "@/components/ui/feedback/alert";
import { CardCustom } from "@/components/ui/data-display/card-custom";
import { Input } from "@/components/ui/primitives/input";
import { cn } from "@/lib/utils";
import { useUserState } from "@/states";

export function Setting() {
  const { user } = useUserState();
  const [themeMode, setThemeMode] = useState<Theme>(
    (localStorage.getItem("theme") || "system") as Theme
  );

  const themeColorChangeHandler = (mode: Theme) => {
    localStorage.setItem("theme", mode);
    setThemeMode(mode);
    location.reload();
  };

  return (
    <div className="container mx-auto py-10 max-w-2xl">
      <div className="flex flex-col justify-center gap-10">
        <CardCustom
          title="Workspace Appearance"
          submitButton
          textSubmit="Save"
          onSubmit={() => alert("Workspace appearance saved!")}
        >
          <div className="flex items-start gap-4">
            <Avatar className="rounded-lg w-[66px] h-[66px]">
              <AvatarImage src={user.avatar} title={user.name} />
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
                <label htmlFor="workspace-theme-input">Theme color</label>
                <div className="flex w-full gap-3">
                  <div
                    className={cn(
                      "theme-option cursor-pointer rounded-lg border-2 transition-all relative",
                      themeMode === "light" && "border-primary"
                    )}
                    data-theme="light"
                    onClick={() => themeColorChangeHandler("light")}
                  >
                    {themeMode === "light" && (
                      <Check className="absolute bg-primary rounded-br-md" />
                    )}
                    <div className="bg-white p-6 rounded"></div>
                  </div>

                  <div
                    className={cn(
                      "theme-option cursor-pointer rounded-lg border-2 transition-all relative",
                      themeMode === "dark" && "border-primary"
                    )}
                    data-theme="dark"
                    onClick={() => themeColorChangeHandler("dark")}
                  >
                    {themeMode === "dark" && (
                      <Check className="absolute bg-primary rounded-br-md" />
                    )}
                    <div className="bg-gray-900 p-6 rounded"></div>
                  </div>
                  <div
                    className={cn(
                      "theme-option cursor-pointer rounded-lg border-2 transition-all relative",
                      themeMode === "system" && "border-primary"
                    )}
                    data-theme="system"
                    onClick={() => themeColorChangeHandler("system")}
                  >
                    {themeMode === "system" && (
                      <Check className="absolute bg-primary rounded-br-md" />
                    )}
                    <div className="bg-gradient-to-r to-gray-900 text-white p-6 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardCustom>

        <CardCustom
          title="Danger Zone"
          description="Delete this workspace and all it’s contents."
          className={getBorderColorClass("red", "500")}
          footer={
            <div
              className={cn(
                "flex flex-1 items-center gap-x-2 rounded-md transition-colors duration-100",
                "text-destructive px-2.5 py-1.5 rounded-md border cursor-pointer",
                getBgColorClass("red", "100", "hover")
              )}
              onClick={() => alert("Workspace removed!")}
            >
              <span>Remove workspace</span>
            </div>
          }
        >
          <Alert>
            <TriangleAlert size={40} color="#ff5429" />
            <AlertTitle>This action is irreversible</AlertTitle>
          </Alert>
        </CardCustom>
      </div>
    </div>
  );
}
