import { ThemeProvider } from "../ThemeProvider";
import { AppMenu } from "./AppMenu";
import { SidebarInset, SidebarProvider  } from "@/components/ui/primitives/sidebar";

type ProviderProps = {
  children: React.ReactNode;
};

export function AppLayout({ children }: ProviderProps) {
  return (
    <ThemeProvider
      defaultTheme={
        (localStorage.getItem("theme") as "light" | "dark" | "system" | null) ||
        "system"
      }
      storageKey="theme"
    >
      <SidebarProvider defaultOpen={false}>
        <AppMenu />
        <SidebarInset className="overflow-x-hidden">{children}</SidebarInset>
      </SidebarProvider>
    </ThemeProvider>
  );
}
