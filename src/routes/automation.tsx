import { createFileRoute } from '@tanstack/react-router'
import { AppPage } from '@/components/ui/layout/AppPage';
import { AppHeader } from '@/components/ui/layout/AppHeader';
import { useMemo } from 'react';
import { AutomationSidebar } from '@/components/ui/widgets/AutomationSidebar';

export const Route = createFileRoute('/automation')({
  component: RouteComponent,
})

function RouteComponent() {
  const breadcrumbItems = useMemo(() => [
    { label: 'Bases', href: '/bases' },
  ], []);

  return (
    <AppPage
      sidebar={<AutomationSidebar />}
    >
      <AppHeader
        breadcrumb={breadcrumbItems}
        showSidebarTrigger={true}
      />
      <div className='p-4'>
        Automation
      </div>
    </AppPage>
  )
}
