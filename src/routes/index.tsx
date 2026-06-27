import { createRoute, Link } from '@tanstack/react-router'
import { Route as rootRoute } from './__root'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { ArrowRight, Users, Heart, Lightbulb } from 'lucide-react'

export const Route = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: IndexComponent,
})

function IndexComponent() {
  return (
    <div className="relative">
      {/* Subtle background glow similar to OWK2_Workshop */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_50%_at_50%_0%,var(--color-amber-200),transparent)] opacity-40" />
      
      <section className="mx-auto max-w-6xl px-6 pt-20 pb-10">
        <div className="text-center max-w-4xl mx-auto">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-4 py-1.5 text-sm font-medium text-muted-foreground shadow-soft mb-6">
            Ontdek & Speel
          </span>
          <h1 className="font-display text-5xl font-semibold leading-[1.05] tracking-tight text-foreground sm:text-7xl mb-6">
            Welkom bij de<br />
            <span className="text-primary mt-2 block">ISD Integratie Reis</span>
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
            Ontdek op een speelse manier wat er nodig is om International Student Teachers (ISD) echt thuis te laten voelen in het Nederlandse onderwijs.
          </p>
          <div className="mt-10 flex justify-center">
            <Link to="/spel">
              <Button size="lg" className="group inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-6 text-lg font-semibold text-primary-foreground shadow-card transition-all hover:shadow-lift">
                Start de Spelvorm <ArrowRight className="transition-transform group-hover:translate-x-1 ml-2 h-6 w-6" />
              </Button>
            </Link>
          </div>
        </div>

        <div className="mt-32 grid md:grid-cols-3 gap-8">
          <Card className="border border-border bg-card/70 shadow-soft transition hover:shadow-card">
            <CardHeader>
              <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-primary flex items-center gap-2">
                <Users size={16} /> Waarom dit project?
              </div>
              <CardTitle className="text-xl text-foreground">Internationaal talent in Brainport</CardTitle>
            </CardHeader>
            <CardContent className="text-sm leading-relaxed text-muted-foreground">
              De Brainport Eindhoven regio barst van het internationale talent. Tegelijkertijd hebben onze scholen ontzettend veel behoefte aan goede STEM-docenten (Science, Technology, Engineering, Mathematics). Het klinkt als een perfecte match, toch? Maar de praktijk wijst uit dat het integreren van een International Student Teacher super complex is. Het gaat veel verder dan alleen de taal leren.
            </CardContent>
          </Card>

          <Card className="border border-border bg-card/70 shadow-soft transition hover:shadow-card">
            <CardHeader>
              <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-primary flex items-center gap-2">
                <Heart size={16} /> Readiness & Belonging
              </div>
              <CardTitle className="text-xl text-foreground">Een tweerichtingsverkeer</CardTitle>
            </CardHeader>
            <CardContent className="text-sm leading-relaxed text-muted-foreground">
              Integratie komt van twee kanten. Het is niet alleen de internationale docent die zich moet aanpassen. We moeten kijken naar de 'school readiness': is de school eigenlijk wel klaar om internationaal talent te omarmen? Daarnaast is een 'sense of belonging' cruciaal. Je wilt je niet alleen welkom voelen, maar je wilt vooral professioneel gewaardeerd worden om wie je bent en wat je kan.
            </CardContent>
          </Card>

          <Card className="border border-border bg-card/70 shadow-soft transition hover:shadow-card">
            <CardHeader>
              <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-primary flex items-center gap-2">
                <Lightbulb size={16} /> Asset-based Denken
              </div>
              <CardTitle className="text-xl text-foreground">Van deficit naar meerwaarde</CardTitle>
            </CardHeader>
            <CardContent className="text-sm leading-relaxed text-muted-foreground">
              We moeten af van het idee dat internationals 'extra werk' zijn (het zogenaamde deficit thinking). Ze brengen juist een schat aan andere perspectieven, culturele achtergronden en didactische benaderingen mee! Laten we die achtergrond gaan zien als een enorme verrijking ('asset-based') voor de school, de collega's en natuurlijk de leerlingen.
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
