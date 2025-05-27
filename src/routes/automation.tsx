import { createFileRoute } from '@tanstack/react-router'
import { BasesSidebar } from '@/components/ui/widgets/BasesSidebar'
import { AppPage } from '@/components/ui/layout/AppPage';
import { AppHeader } from '@/components/ui/layout/AppHeader';
import { useMemo } from 'react';

export const Route = createFileRoute('/automation')({
  component: RouteComponent,
})

function RouteComponent() {
  const breadcrumbItems = useMemo(() => [
    { label: 'Bases', href: '/bases' },
  ], []);

  return (
    <AppPage
      sidebar={<BasesSidebar />}
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
