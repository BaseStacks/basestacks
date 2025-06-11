import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { Link } from '@tanstack/react-router';
import { Home } from 'lucide-react';
import { Sheet, SheetContent, SheetTitle } from '../primitives/sheet';
import { WorkspaceSwitcher } from '../widgets/workspace/WorkspaceSwitcher';
import { UserButton } from '../widgets/UserButton';
import { Button } from '../primitives/button';
import { AppMenu } from './AppMenu';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/primitives/resizable'
import { useIsMobile } from '@/hooks/ui/useIsMobile';
import { useSidebarStatus } from '@/states';

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


const menuItemClassName = 'text-sidebar-accent-foreground/60 data-[status=active]:!bg-sidebar-accent data-[status=active]:!text-sidebar-accent-foreground '

function AppPageFloatingSidebar({ children }: { children: React.ReactNode }) {
    const sidebarStatus = useSidebarStatus();

    return (
        <Sheet
            open={sidebarStatus.mobileVisible}
            onOpenChange={sidebarStatus.toggleMobile}
        >
            <SheetContent side='left' className='w-9/10 sm:w-8/10'>
                <VisuallyHidden>
                    <SheetTitle>Side menu</SheetTitle>
                </VisuallyHidden>
                <AppMenu>

                </AppMenu>
                <div className='flex flex-row h-full w-full'>
                    <div className='px-2 bg-sidebar border-r flex flex-col justify-center'>
                        <div className='h-16 flex items-center justify-center'>
                            <WorkspaceSwitcher />
                        </div>
                        <div className='grow flex flex-col items-center justify-start'>
                            <Button
                                variant='ghost'
                                size='icon'
                                className={menuItemClassName}
                                asChild
                            >
                                <Link to="/" >
                                    <Home />
                                </Link>
                            </Button>
                        </div>
                        <div>
                            <UserButton />
                        </div>
                    </div>
                    <div className='grow h-full overflow-y-auto'>
                        {children}
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    );
}