import { Outlet, createRootRoute } from "@tanstack/react-router";

import { AppLayout } from "@/components/ui/layout/AppLayout";
import { Toaster } from "@/components/ui/overlay/sonner";

export const Route = createRootRoute({
  component: () => (
    <AppLayout>
      <Outlet />
      <Toaster />
    </AppLayout>
  ),
});
