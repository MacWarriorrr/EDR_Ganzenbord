import { createRoute, Link } from '@tanstack/react-router'
import { Route as rootRoute } from './__root'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { ArrowRight, Users, Heart, Lightbulb, Info, Mail } from 'lucide-react'

function Linkedin({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}
import bosLogo from '@/assets/BOSLogo.png'
import esoeLogo from '@/assets/esoelerarenopleiding_logo.png'

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
          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/spel">
              <Button size="lg" className="group w-full sm:w-auto inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-6 text-lg font-semibold text-primary-foreground shadow-card transition-all hover:shadow-lift">
                Start de Spelvorm <ArrowRight className="transition-transform group-hover:translate-x-1 ml-2 h-6 w-6" />
              </Button>
            </Link>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="lg" className="w-full sm:w-auto inline-flex items-center gap-2 rounded-xl px-8 py-6 text-lg font-semibold border-2 bg-background/50 backdrop-blur-sm transition-all hover:bg-muted">
                  <Info className="h-5 w-5" /> Hoe werkt het?
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle className="text-2xl">Spelregels & Uitleg</DialogTitle>
                  <DialogDescription className="text-base pt-4 space-y-4" asChild>
                    <div>
                      <p>
                        <strong>Doel van het spel:</strong> Bereik als eerste de finish door vragen te beantwoorden en situaties te bespreken rondom de inclusie van Internationale Student Docenten (ISD).
                      </p>
                      <div>
                        <strong>Hoe het werkt:</strong>
                        <ul className="list-disc pl-5 mt-2 space-y-1">
                          <li>Gooi de virtuele dobbelsteen om vooruit te komen op het bord.</li>
                          <li>Kom je op een speciaal vakje? Dan krijg je een stelling, vraag of casus over cultuur, beleid of werkvloer.</li>
                          <li>Bespreek dit met je medespelers. Er is niet altijd één goed antwoord; het draait om de bewustwording en dialoog!</li>
                        </ul>
                      </div>
                      <p>
                        <strong>Voor wie?</strong> Dit spel is het meest waardevol als je het samen speelt met (toekomstige) collega's, schoolleiders of begeleiders.
                      </p>
                    </div>
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
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

        <div className="mt-20 flex flex-col md:flex-row items-center justify-between border-t border-border/50 pt-10 gap-8">
          <div className="text-sm text-muted-foreground">
            <p className="font-semibold text-foreground mb-3">Ontwikkeld ESoE/TU/e i.k.v. Educational Design Research – Juni 2026</p>
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <span className="w-36">Juul Peters</span>
                <a href="#" onClick={(e) => { e.preventDefault(); window.location.href = `mailto:juul.peters${String.fromCharCode(64)}hotmail.com`; }} className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-1.5" title="Email Juul" aria-label="Email Juul Peters">
                  <Mail className="h-4 w-4" />
                </a>
                <a href="https://www.linkedin.com/in/juul-peters/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-[#0A66C2] transition-colors flex items-center gap-1.5" title="LinkedIn Juul" aria-label="LinkedIn Juul Peters">
                  <Linkedin className="h-4 w-4" />
                </a>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-36">Ruurd Taconis (begl.)</span>
                <a href="#" onClick={(e) => { e.preventDefault(); window.location.href = `mailto:R.Taconis${String.fromCharCode(64)}tue.nl`; }} className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-1.5" title="Email Ruurd" aria-label="Email Ruurd Taconis">
                  <Mail className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap items-end justify-center gap-8 bg-card/40 px-6 py-4 rounded-xl border border-border/30">
            <div className="flex flex-col items-center gap-1.5">
              <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">In opdracht van</span>
              <img src={bosLogo} alt="De Brabantse OpleidingsSchool" className="h-14 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity" />
            </div>
            <img src={esoeLogo} alt="Eindhoven School of Education" className="h-14 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity" />
          </div>
        </div>
      </section>
    </div>
  )
}
