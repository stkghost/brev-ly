import { createRootRoute, Outlet } from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastRootProvider } from "../contexts/ToastContext";

const queryClient = new QueryClient();

const RootLayout = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ToastRootProvider>
        <div className="h-screen bg-gray-200">
          <Outlet />
        </div>
      </ToastRootProvider>
    </QueryClientProvider>
  );
};

export const Route = createRootRoute({ component: RootLayout });
