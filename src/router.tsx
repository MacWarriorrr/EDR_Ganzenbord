import { createRouter } from '@tanstack/react-router'

// Import routes directly
import { Route as rootRoute } from './routes/__root.tsx'
import { Route as indexRoute } from './routes/index.tsx'
import { Route as spelRoute } from './routes/spel.tsx'
import { Route as factorenRoute } from './routes/factoren.tsx'
import { Route as evaluatieRoute } from './routes/evaluatie.tsx'
import { Route as adminRoute } from './routes/admin.tsx'

// Build route tree
const routeTree = rootRoute.addChildren([indexRoute, spelRoute, factorenRoute, evaluatieRoute, adminRoute])

// Create and export the router
export const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
