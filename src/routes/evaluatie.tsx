import { createRoute } from '@tanstack/react-router'
import { Route as rootRoute } from './__root'
import { useState } from 'react'
import { Button } from '@/components/ui/button'

export const Route = createRoute({
  getParentRoute: () => rootRoute,
  path: '/evaluatie',
  component: EvaluatieComponent,
})

function EvaluatieComponent() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    const formData = new FormData(e.currentTarget)
    const data = Object.fromEntries(formData.entries())

    try {
      const res = await fetch('/api/submit-evaluation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!res.ok) {
        throw new Error('Er is een fout opgetreden bij het versturen van het formulier.')
      }

      setIsSuccess(true)
    } catch (err: any) {
      setError(err.message || 'Onbekende fout')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSuccess) {
    return (
      <div className="min-h-[calc(100vh-4rem)] bg-stone-50 py-12 px-4 sm:px-8">
        <div className="mx-auto max-w-2xl bg-white p-8 rounded-xl shadow-sm text-center">
          <h2 className="text-3xl font-bold text-emerald-600 mb-4">Bedankt voor je feedback!</h2>
          <p className="text-stone-600">Je antwoorden zijn succesvol opgeslagen. Jouw input helpt ons om het spel verder te verbeteren.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-stone-50 py-12 px-4 sm:px-8">
      <div className="mx-auto max-w-3xl bg-white p-8 rounded-xl shadow-sm">
        <h1 className="text-3xl font-extrabold text-stone-800 tracking-tight mb-2">Evaluatieformulier</h1>
        <p className="text-stone-600 mb-8">
          Beste deelnemer, bedankt voor het spelen van ons bordspel. Dit spel is ontworpen om de succes- en probleemfactoren in het traject van een Internationale Student Docent (ISD) in de STEM-vakken inzichtelijk te maken. Uw feedback helpt ons om het ontwerp verder te verbeteren. Beantwoord de onderstaande vragen zo eerlijk en uitgebreid mogelijk.
        </p>

        <form onSubmit={handleSubmit} className="space-y-10">

          {/* Toestemming */}
          <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
            <h3 className="font-bold text-blue-900 mb-3">Toestemming (Consent)</h3>
            <label className="flex items-start gap-3 cursor-pointer">
              <input type="checkbox" name="consent" required className="mt-1 w-5 h-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500" />
              <span className="text-sm text-blue-800">
                Ik geef hierbij toestemming dat mijn ingevulde antwoorden gebruikt en geanalyseerd mogen worden ten behoeve van het Education Design Research (EMDR11) project om dit spel te verbeteren. Ik begrijp dat mijn data anoniem wordt verwerkt.
              </span>
            </label>
          </div>

          {/* Achtergrondinformatie */}
          <section>
            <h2 className="text-xl font-bold text-stone-800 mb-4 pb-2 border-b">Achtergrondinformatie</h2>

            <div className="space-y-4">
              <label className="block">
                <span className="text-stone-700 font-semibold mb-2 block">Wat is uw primaire rol/achtergrond? <span className="text-red-500">*</span></span>
                <select name="role" required className="w-full rounded-md border-stone-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border bg-white">
                  <option value="">Kies een optie...</option>
                  <option value="Onderwijsexpert">Onderwijsexpert / Docent (bijv. BOS-werkgroep)</option>
                  <option value="Student">Student</option>
                  <option value="WPB">Werkplekbegeleider (WPB)</option>
                  <option value="SO">Schoolopleider (SO)</option>
                  <option value="IO">Instituutsopleider (IO)</option>
                  <option value="Anders">Anders</option>
                </select>
              </label>

              <label className="block">
                <span className="text-stone-700 font-semibold mb-2 block">Indien 'Anders', specificeer:</span>
                <input type="text" name="role_other" className="w-full rounded-md border-stone-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border" />
              </label>
            </div>
          </section>

          {/* Deel 1 */}
          <section>
            <h2 className="text-xl font-bold text-stone-800 mb-4 pb-2 border-b">Deel 1: Realisme en Kennisvergroting (Deelvraag 1)</h2>

            <div className="space-y-6">
              <div>
                <p className="text-stone-700 font-semibold mb-2">1.1 In hoeverre kwamen de situaties en scenario's op de kaartjes in het spel realistisch op u over? <span className="text-red-500">*</span></p>
                <p className="text-sm text-stone-500 mb-3">(1 = Totaal niet realistisch, 5 = Zeer realistisch)</p>
                <div className="flex gap-4">
                  {[1, 2, 3, 4, 5].map(num => (
                    <label key={`realism_${num}`} className="flex flex-col items-center gap-1 cursor-pointer">
                      <input type="radio" name="q1_1_realism" value={num} required className="w-5 h-5 text-blue-600 focus:ring-blue-500" />
                      <span className="font-medium text-stone-600">{num}</span>
                    </label>
                  ))}
                </div>
              </div>

              <label className="block">
                <span className="text-stone-700 font-semibold mb-2 block">1.2 Kunt u een voorbeeld geven van een kaartje dat u erg herkenbaar of juist onrealistisch vond?</span>
                <textarea name="q1_2_example" rows={3} className="w-full rounded-md border-stone-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"></textarea>
              </label>

              <label className="block">
                <span className="text-stone-700 font-semibold mb-2 block">1.3 Welke nieuwe inzichten over 'School Readiness' heeft het spelen van dit spel u gegeven?</span>
                <textarea name="q1_3_insights" rows={3} className="w-full rounded-md border-stone-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"></textarea>
              </label>
            </div>
          </section>

          {/* Deel 2 */}
          <section>
            <h2 className="text-xl font-bold text-stone-800 mb-4 pb-2 border-b">Deel 2: Constructieve Benadering (Deelvraag 2)</h2>

            <div className="space-y-6">
              <div>
                <p className="text-stone-700 font-semibold mb-2">2.1 In hoeverre ervaarde u de toon van het spel als constructief en opbouwend? <span className="text-red-500">*</span></p>
                <p className="text-sm text-stone-500 mb-3">(1 = Zeer negatief/defensief, 5 = Zeer constructief/opbouwend)</p>
                <div className="flex gap-4">
                  {[1, 2, 3, 4, 5].map(num => (
                    <label key={`tone_${num}`} className="flex flex-col items-center gap-1 cursor-pointer">
                      <input type="radio" name="q2_1_tone" value={num} required className="w-5 h-5 text-blue-600 focus:ring-blue-500" />
                      <span className="font-medium text-stone-600">{num}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-stone-700 font-semibold mb-2">2.2 Het spel legde voor mijn gevoel voldoende nadruk op de unieke kwaliteiten en de meerwaarde van de internationale docent (in plaats van alleen te focussen op de problemen). <span className="text-red-500">*</span></p>
                <p className="text-sm text-stone-500 mb-3">(1 = Helemaal mee oneens, 5 = Helemaal mee eens)</p>
                <div className="flex gap-4">
                  {[1, 2, 3, 4, 5].map(num => (
                    <label key={`emphasis_${num}`} className="flex flex-col items-center gap-1 cursor-pointer">
                      <input type="radio" name="q2_2_emphasis" value={num} required className="w-5 h-5 text-blue-600 focus:ring-blue-500" />
                      <span className="font-medium text-stone-600">{num}</span>
                    </label>
                  ))}
                </div>
              </div>

              <label className="block">
                <span className="text-stone-700 font-semibold mb-2 block">2.3 Kunt u toelichten welk specifiek scenario of vakje in het spel dit gevoel bij u opwekte of juist afzwakte?</span>
                <textarea name="q2_3_scenario" rows={3} className="w-full rounded-md border-stone-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"></textarea>
              </label>
            </div>
          </section>

          {/* Deel 3 */}
          <section>
            <h2 className="text-xl font-bold text-stone-800 mb-4 pb-2 border-b">Deel 3: Spelmechanica en Ervaring (Deelvraag 3)</h2>

            <div className="space-y-6">
              <div>
                <p className="text-stone-700 font-semibold mb-2">3.1 In hoeverre hielp het gekozen spelmechanisme (het letterlijk vooruit of achteruit moeten stappen op het bord) om de impact van de situaties op de internationale docent goed over te brengen? <span className="text-red-500">*</span></p>
                <p className="text-sm text-stone-500 mb-3">(1 = Totaal niet, 5 = Zeer sterk)</p>
                <div className="flex gap-4">
                  {[1, 2, 3, 4, 5].map(num => (
                    <label key={`mechanic_${num}`} className="flex flex-col items-center gap-1 cursor-pointer">
                      <input type="radio" name="q3_1_mechanic" value={num} required className="w-5 h-5 text-blue-600 focus:ring-blue-500" />
                      <span className="font-medium text-stone-600">{num}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-stone-700 font-semibold mb-2">3.2 Hoe voelde de verhouding tussen de zwaarte van de obstakels (stappen terug) en de opstekers (stappen vooruit) tijdens het spelen? <span className="text-red-500">*</span></p>

                <label className="flex items-start gap-3 cursor-pointer">
                  <input type="radio" name="q3_2_balance" value="Te rooskleurig" required className="mt-1 w-5 h-5 text-blue-600 focus:ring-blue-500" />
                  <span className="text-stone-700"><strong>Te rooskleurig:</strong> De positieve spelregels en opstekers wogen veel zwaarder dan de obstakels.</span>
                </label>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input type="radio" name="q3_2_balance" value="In balans" required className="mt-1 w-5 h-5 text-blue-600 focus:ring-blue-500" />
                  <span className="text-stone-700"><strong>In balans:</strong> De spelregels gaven een goede weerspiegeling van de impact van beide kanten.</span>
                </label>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input type="radio" name="q3_2_balance" value="Te pessimistisch" required className="mt-1 w-5 h-5 text-blue-600 focus:ring-blue-500" />
                  <span className="text-stone-700"><strong>Te pessimistisch:</strong> De obstakels en stappen terug voelden veel zwaarder en frustrerender dan de opstekers.</span>
                </label>
              </div>

              <label className="block">
                <span className="text-stone-700 font-semibold mb-2 block">3.3 Kunt u uitleggen waarom u dit zo ervaarde en wat u eventueel in de spelregels (bijv. het aantal stappen) zou aanpassen?</span>
                <textarea name="q3_3_explanation" rows={3} className="w-full rounded-md border-stone-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"></textarea>
              </label>
            </div>
          </section>

          {/* Deel 4 */}
          <section>
            <h2 className="text-xl font-bold text-stone-800 mb-4 pb-2 border-b">Deel 4: Inzetbaarheid en Discussie (Deelvraag 4)</h2>

            <div className="space-y-6">
              <div>
                <p className="text-stone-700 font-semibold mb-2">4.1 In hoeverre hielp het spelen op één gezamenlijk scherm om de discussie met uw medespelers op gang te brengen? <span className="text-red-500">*</span></p>
                <p className="text-sm text-stone-500 mb-3">(1 = Totaal niet, 5 = Zeer sterk)</p>
                <div className="flex gap-4">
                  {[1, 2, 3, 4, 5].map(num => (
                    <label key={`discussion_${num}`} className="flex flex-col items-center gap-1 cursor-pointer">
                      <input type="radio" name="q4_1_discussion" value={num} required className="w-5 h-5 text-blue-600 focus:ring-blue-500" />
                      <span className="font-medium text-stone-600">{num}</span>
                    </label>
                  ))}
                </div>
              </div>

              <label className="block">
                <span className="text-stone-700 font-semibold mb-2 block">4.2 Hoe zou dit kunnen worden versterkt?</span>
                <textarea name="q4_2_improvement" rows={3} className="w-full rounded-md border-stone-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"></textarea>
              </label>

              <label className="block">
                <span className="text-stone-700 font-semibold mb-2 block">4.3 Ziet u dit spel werken als middel om op een middelbare school het gesprek over integratie te faciliteren? Waarom wel of niet?</span>
                <textarea name="q4_3_facilitation" rows={3} className="w-full rounded-md border-stone-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"></textarea>
              </label>
            </div>
          </section>

          {/* Overige opmerkingen */}
          <section>
            <h2 className="text-xl font-bold text-stone-800 mb-4 pb-2 border-b">Ruimte voor overige opmerkingen</h2>
            <label className="block">
              <span className="text-stone-700 font-semibold mb-2 block">Heeft u nog verdere tips of opmerkingen om het spel te verbeteren?</span>
              <textarea name="other_comments" rows={4} className="w-full rounded-md border-stone-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"></textarea>
            </label>
          </section>

          {error && (
            <div className="p-4 bg-red-50 text-red-700 border border-red-200 rounded-md">
              {error}
            </div>
          )}

          <div className="pt-4 border-t">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg h-auto"
            >
              {isSubmitting ? 'Versturen...' : 'Verstuur Evaluatie'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
