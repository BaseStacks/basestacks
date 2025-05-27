import { BasesSidebar } from '@/components/ui/widgets/BasesSidebar'
import { createFileRoute } from '@tanstack/react-router'

import { AppPage } from '@/components/ui/layout/AppPage';
import { AppHeader } from '@/components/ui/layout/AppHeader';
import { useMemo } from 'react';
import type { AppBreadcrumbItem } from '@/components/ui/layout/AppBreadcrumb';
import { BaseSwitcher } from '@/components/ui/widgets/BaseSwitcher';

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  const breadcrumbItems = useMemo((): AppBreadcrumbItem[] => [
    {
      type: 'menu',
      label: (<BaseSwitcher />),
    },
    { label: 'Bases', href: '/' },
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
        hello world
      </div>
    </AppPage>
  )
}
