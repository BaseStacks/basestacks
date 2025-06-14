import { DeleteModalProvider } from "../DeleteDialogProvider";
import { DialogProvider } from "../DialogProvider";
import { ThemeProvider } from "../ThemeProvider";
import { SidebarProvider } from "@/components/ui/navigation/sidebar";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <DialogProvider>
      <DeleteModalProvider>
        <ThemeProvider
          defaultTheme={
            (localStorage.getItem("theme") as
              | "light"
              | "dark"
              | "system"
              | null) || "system"
          }
          storageKey="theme"
        >
          <SidebarProvider defaultOpen={false}>{children}</SidebarProvider>
        </ThemeProvider>
      </DeleteModalProvider>
    </DialogProvider>
  );
}
