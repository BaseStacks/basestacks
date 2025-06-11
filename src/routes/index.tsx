import { createFileRoute } from '@tanstack/react-router'
import { useMemo } from 'react';
import { Ellipsis } from 'lucide-react';
import z from 'zod';
import type { AppBreadcrumbItem } from '@/components/ui/layout/AppBreadcrumb';
import { BasesSidebar } from '@/components/ui/widgets/base/BasesSidebar'

import { AppPage } from '@/components/ui/layout/AppPage';
import { AppHeader } from '@/components/ui/layout/AppHeader';
import { BaseSwitcher } from '@/components/ui/widgets/base/BaseSwitcher';
import { TableSwitcher } from '@/components/ui/widgets/table/TableSwitcher';
import { ViewSwitcher } from '@/components/ui/widgets/view/ViewSwitcher';
import { RecordFields } from '@/components/ui/widgets/record/RecordFields';
import { RecordFilters } from '@/components/ui/widgets/record/RecordFilters';
import { RecordSorts } from '@/components/ui/widgets/record/RecordSorts';
import { RecordHeights } from '@/components/ui/widgets/record/RecordHeights';
import { ViewMenu } from '@/components/ui/widgets/view/ViewMenu';
import { Button } from '@/components/ui/primitives/button';
import { BsDataGrid } from '@/components/grid/BsDataGrid';

const searchSchema = z.object({
  page: z.string().optional(),
  viewId: z.string().optional(),
  tableId: z.string().optional(),
});

export const Route = createFileRoute('/')({
  component: App,
  validateSearch: (search) => searchSchema.parse(search),
})

function App() {
  const breadcrumbItems = useMemo((): Array<AppBreadcrumbItem> => [
    {
      type: 'menu',
      label: (<BaseSwitcher />),
    },
    {
      type: 'menu',
      label: <TableSwitcher />,
      href: '/'
    },
    {
      type: 'menu',
      label: <ViewSwitcher />,
      href: '/'
    },
  ], []);

  return (
    <AppPage
      sidebar={<BasesSidebar />}
    >
      <AppHeader
        breadcrumb={breadcrumbItems}
        showSidebarTrigger={true}
      />
      <div className='flex h-12 w-full flex-row items-center border-b px-4 gap-2'>
        <RecordFields />
        <RecordFilters />
        <RecordSorts />
        <RecordHeights />
        <ViewMenu>
          <Button variant="ghost" size="iconSm">
            <Ellipsis />
          </Button>
        </ViewMenu>
      </div>
      <div className='p-4'>
        <BsDataGrid />
      </div>
    </AppPage>
  )
}
