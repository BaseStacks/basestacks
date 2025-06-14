import { AppProviders } from "./AppProviders";
import { AppMenu } from "./AppMenu";
import { SidebarInset } from "@/components/ui/navigation/sidebar";

type ProviderProps = {
  children: React.ReactNode;
};

export function AppLayout({ children }: ProviderProps) {
  return (
    <AppProviders>
      <AppMenu />
      <SidebarInset className="overflow-x-hidden">{children}</SidebarInset>
    </AppProviders>
  );
}
