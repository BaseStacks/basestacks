import { ThemeProvider } from "../ThemeProvider";
import { AppMenu } from "./AppMenu";
import { SidebarProvider } from "@/components/ui/primitives/sidebar";
import { SidebarInset } from "@/components/ui/primitives/sidebar";

type ProviderProps = {
	children: React.ReactNode;
};

export function AppLayout({ children }: ProviderProps) {
	return (
		<ThemeProvider
			defaultTheme="light"
			storageKey="theme"
		>
			<SidebarProvider defaultOpen={false}>
				<AppMenu />
				<SidebarInset className="overflow-x-hidden">
					{children}
				</SidebarInset>
			</SidebarProvider>
		</ThemeProvider>
	);
}