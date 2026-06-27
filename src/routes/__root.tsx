import { Outlet, createRootRoute } from '@tanstack/react-router'
import { NavigationIcon, HomeIcon, Dices, BookOpen } from 'lucide-react'
import { Link } from '@tanstack/react-router'

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-200">
      <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <NavigationIcon className="h-6 w-6 text-blue-600" />
            <span className="font-bold text-lg hidden sm:inline-block">
              ISD Integratie Reis
            </span>
          </div>
          <nav className="flex items-center gap-6">
            <Link
              to="/"
              className="flex items-center gap-2 text-sm font-medium text-slate-600 transition-colors hover:text-blue-600 [&.active]:text-blue-700"
            >
              <HomeIcon className="h-4 w-4" />
              Start
            </Link>
            <Link
              to="/spel"
              className="flex items-center gap-2 text-sm font-medium text-slate-600 transition-colors hover:text-blue-600 [&.active]:text-blue-700"
            >
              <Dices className="h-4 w-4" />
              Bordspel
            </Link>
            <Link
              to="/factoren"
              className="flex items-center gap-2 text-sm font-medium text-slate-600 transition-colors hover:text-blue-600 [&.active]:text-blue-700"
            >
              <BookOpen className="h-4 w-4" />
              Factoren
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  )
}
