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
    <div className="flex flex-col min-h-[calc(100vh-4rem)]">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-slate-900 text-white py-24 sm:py-32 flex-1 flex flex-col justify-center">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-20 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/90 to-emerald-900/90"></div>
        
        <div className="container relative z-10 mx-auto px-4 text-center">
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
            Welkom bij de <span className="text-emerald-400">ISD Integratie Reis</span>
          </h1>
          <p className="mt-4 text-lg sm:text-2xl text-slate-300 max-w-3xl mx-auto mb-10 leading-relaxed">
            Ontdek op een speelse manier wat er nodig is om International Student Teachers (ISD) echt thuis te laten voelen in het Nederlandse onderwijs.
          </p>
          <div className="flex justify-center">
            <Link to="/spel">
              <Button size="lg" className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold px-8 py-6 text-lg rounded-full shadow-lg hover:shadow-emerald-500/25 transition-all">
                Start de Spelvorm <ArrowRight className="ml-2 h-6 w-6" />
              </Button>
            </Link>
          </div>
        </div>
        
        {/* Decorative blobs */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
        <div className="absolute top-24 -right-24 w-96 h-96 bg-emerald-500 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
      </section>

      {/* Content Sections */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid md:grid-cols-3 gap-8">
            
            <Card className="border-none shadow-xl shadow-slate-200/50 hover:-translate-y-1 transition-transform duration-300">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center mb-4 text-blue-600">
                  <Users size={24} />
                </div>
                <CardTitle className="text-2xl text-slate-800">Waarom dit project?</CardTitle>
                <CardDescription className="text-base">Internationaal talent in Brainport</CardDescription>
              </CardHeader>
              <CardContent className="text-slate-600 leading-relaxed">
                De Brainport Eindhoven regio barst van het internationale talent. Tegelijkertijd hebben onze scholen ontzettend veel behoefte aan goede STEM-docenten (Science, Technology, Engineering, Mathematics). Het klinkt als een perfecte match, toch? Maar de praktijk wijst uit dat het integreren van een International Student Teacher super complex is. Het gaat veel verder dan alleen de taal leren.
              </CardContent>
            </Card>

            <Card className="border-none shadow-xl shadow-slate-200/50 hover:-translate-y-1 transition-transform duration-300">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-emerald-100 flex items-center justify-center mb-4 text-emerald-600">
                  <Heart size={24} />
                </div>
                <CardTitle className="text-2xl text-slate-800">Readiness & Belonging</CardTitle>
                <CardDescription className="text-base">Een tweerichtingsverkeer</CardDescription>
              </CardHeader>
              <CardContent className="text-slate-600 leading-relaxed">
                Integratie komt van twee kanten. Het is niet alleen de internationale docent die zich moet aanpassen. We moeten kijken naar de 'school readiness': is de school eigenlijk wel klaar om internationaal talent te omarmen? Daarnaast is een 'sense of belonging' cruciaal. Je wilt je niet alleen welkom voelen, maar je wilt vooral professioneel gewaardeerd worden om wie je bent en wat je kan.
              </CardContent>
            </Card>

            <Card className="border-none shadow-xl shadow-slate-200/50 hover:-translate-y-1 transition-transform duration-300">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center mb-4 text-purple-600">
                  <Lightbulb size={24} />
                </div>
                <CardTitle className="text-2xl text-slate-800">Asset-based Denken</CardTitle>
                <CardDescription className="text-base">Van deficit naar meerwaarde</CardDescription>
              </CardHeader>
              <CardContent className="text-slate-600 leading-relaxed">
                We moeten echt af van het idee dat internationals 'extra werk' zijn (het zogenaamde deficit thinking). Ze brengen juist een schat aan andere perspectieven, culturele achtergronden en didactische benaderingen mee! Laten we die achtergrond gaan zien als een enorme verrijking ('asset-based') voor de school, de collega's en natuurlijk de leerlingen.
              </CardContent>
            </Card>

          </div>
        </div>
      </section>
    </div>
  )
}
