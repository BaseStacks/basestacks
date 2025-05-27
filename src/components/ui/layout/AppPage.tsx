import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/primitives/resizable'
import { useSidebarStatus } from '@/states';

interface AppPageProps {
    readonly sidebar?: React.ReactNode;
    readonly header?: React.ReactNode;
    readonly children: React.ReactNode;
}

const appPageClassName = "flex w-full h-full";

export function AppPage({ children, sidebar }: AppPageProps) {
    const sidebarStatus = useSidebarStatus();
    const sidebarVisible = sidebar && sidebarStatus.visible;

    return (
        <div className={appPageClassName}>
            <ResizablePanelGroup direction="horizontal">
                {
                    sidebarVisible && (
                        <ResizablePanel defaultSize={20} minSize={15} maxSize={30}>
                            {sidebar}
                        </ResizablePanel>
                    )
                }
                <ResizableHandle disabled={!sidebarVisible} />
                <ResizablePanel>
                    <div className="flex flex-col h-full w-full">
                        {children}
                    </div>
                </ResizablePanel>
            </ResizablePanelGroup>
        </div>
    )
};
