import { createRoute, Link } from '@tanstack/react-router'
import { Route as rootRoute } from './__root'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
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
            <span className="text-primary mt-2 block">ISD Inclusie Reis</span>
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
            Ontdek op een speelse manier wat er nodig is om Internationale Student Docenten (ISD) echt thuis te laten voelen in het Nederlandse onderwijs.
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
              <CardTitle className="text-xl text-foreground">Internationaal talent in het onderwijs</CardTitle>
            </CardHeader>
            <CardContent className="text-sm leading-relaxed text-muted-foreground">
              Brabant barst van het internationaal STEM talent, en zeker de Brainport regio. Tegelijkertijd hebben onze scholen ontzettend veel behoefte aan goede STEM-docenten (Science, Technology, Engineering, Mathematics). Het klinkt als een perfecte match, toch? Maar de praktijk wijst uit dat het opnemen van Internationale Student Docenten op school behoorlijk complex is. Het gaat veel verder dan alleen de taal leren.
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
              Inclusie en samenwerking komen van twee kanten. Het is niet alleen de internationale docent die zich moet aanpassen. We moeten kijken naar de 'school readiness': in hoeverre is de school klaar om internationaal talent te omarmen? Dat kan gaan over contracten en beloningen. Maar hier focussen we op de werkvloer en de begeleiding. Daar zijn ‘veiligheid’ en het gevoel er bij te horen ('sense of belonging’) cruciaal. En als nieuwkomer wil je professioneel gewaardeerd voelen, om wat je (al) kan en wie je bent.

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
              Misschien kost het begeleiden van een internationale ISD in het begin wat 'extra’ werk. Maar het is ook leerzaam. Én er staat een unieke meerwaarde tegenover. Internationals brengen juist een schat aan vakkennis, andere perspectieven, culturele achtergronden en didactische benaderingen de school in! En voor veel leerlingen: herkenbaarheid. Per saldo is er een enorme verrijking ('asset-based’) en kwaliteitsimpuls voor de school, de collega's en natuurlijk de leerlingen.
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
