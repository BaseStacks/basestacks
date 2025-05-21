import { SidebarInset } from "@/components/ui/primitives/sidebar";

import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/primitives/breadcrumb";

export function AppSidebarInset({ children }: { children: React.ReactNode }) {
	return (
		<SidebarInset className="overflow-x-hidden">
			<header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 justify-between">
				<div className="flex items-center gap-2 px-4">
					<Breadcrumb>
						<BreadcrumbList>
							<BreadcrumbItem className="hidden md:block">
								<BreadcrumbLink href="#">
									A shadcn/ui Resizeable Sidebar
								</BreadcrumbLink>
							</BreadcrumbItem>
							<BreadcrumbSeparator className="hidden md:block" />
							<BreadcrumbItem>
								<BreadcrumbPage className="block md:hidden">
									Sidebar is only resizable on desktop
								</BreadcrumbPage>
								<BreadcrumbPage className="hidden md:block">
									Try to drag the sidebar
								</BreadcrumbPage>
							</BreadcrumbItem>
						</BreadcrumbList>
					</Breadcrumb>
				</div>
			</header>
			{children}
		</SidebarInset>
	);
}