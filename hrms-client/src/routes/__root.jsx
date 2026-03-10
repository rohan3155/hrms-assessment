import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import {
        QueryClient,
        QueryClientProvider,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import Dashboard from '../layout/Dashboard'

const queryClient = new QueryClient()
const RootLayout = () => (
        <>

                <QueryClientProvider client={queryClient}>
                        <Dashboard>
                                <Outlet />
                        </Dashboard>
                        <ReactQueryDevtools initialIsOpen={false} />
                </QueryClientProvider>
                <TanStackRouterDevtools />
        </>
)

export const Route = createRootRoute({ component: RootLayout })