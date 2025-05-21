import { Outlet, createRootRoute } from '@tanstack/react-router'

import { AppLayout } from '@/components/ui/layout/AppLayout'

export const Route = createRootRoute({
  component: () => (
    <AppLayout>
      <Outlet />
    </AppLayout>
  ),
})
