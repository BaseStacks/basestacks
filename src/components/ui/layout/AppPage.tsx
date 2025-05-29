import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/primitives/resizable'
import { useIsMobile } from '@/hooks/ui/useIsMobile';
import { useSidebarStatus } from '@/states';
import { SheetContent, Sheet } from '../primitives/sheet';

interface AppPageProps {
    readonly sidebar?: React.ReactNode;
    readonly header?: React.ReactNode;
    readonly children: React.ReactNode;
}

const appPageClassName = "flex w-full h-full";

export function AppPage({ children, sidebar }: AppPageProps) {
    const isMobile = useIsMobile();
    const sidebarStatus = useSidebarStatus();
    const sidebarVisible = sidebar && sidebarStatus.visible;

    if (isMobile) {
        return (
            <div className={appPageClassName}>
                <div className="flex flex-col h-full w-full">
                    {children}
                </div>
                <AppPageFloatingSidebar>
                    {sidebar}
                </AppPageFloatingSidebar>
            </div>
        );
    }

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

function AppPageFloatingSidebar({ children }: { children: React.ReactNode }) {
    const sidebarStatus = useSidebarStatus();

    return (
        <Sheet
            open={sidebarStatus.visible}
            onOpenChange={sidebarStatus.toggle}
        >
            <SheetContent side='left'>
                {children}
            </SheetContent>
        </Sheet>
    );
}