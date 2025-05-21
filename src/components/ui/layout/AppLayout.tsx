import { ThemeProvider } from "../ThemeProvider";
import { AppSidebar } from "./AppSidebar";
import { AppSidebarInset } from "./AppSidebarInset";
import { SidebarProvider } from "@/components/ui/primitives/sidebar";

type ProviderProps = {
	children: React.ReactNode;
};

export async function AppLayout({ children }: ProviderProps) {
	return (
		<ThemeProvider
			defaultTheme="dark"
			storageKey="theme"
		>
			<SidebarProvider defaultOpen={false}>
				<AppSidebar />
				<AppSidebarInset>{children}</AppSidebarInset>
			</SidebarProvider>
		</ThemeProvider>
	);
}