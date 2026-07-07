import type { Player } from '@/components/game/types'

export type FactorType = 'positive' | 'negative'

export interface Factor {
  id: string
  type: FactorType
  title: string
  description: string
  actionText: string
  conversationPrompt: string
  action: (player: Player) => Partial<Player>
}

export const POSITIVE_FACTORS: Factor[] = [
  {
    id: 'p1',
    type: 'positive',
    title: 'Informele teambuilding',
    description: 'Een collega nodigt je thuis uit voor een etentje. Tijdens gezellige gesprekken zien je collega\'s je ware capaciteiten, helemaal los van de taalbarrière.',
    actionText: 'Ga 2 stappen vooruit en gooi nog een keer.',
    conversationPrompt: 'Hoe kunnen we informele momenten zo inrichten dat iedereen, ongeacht culturele of religieuze achtergrond, zich comfortabel en uitgenodigd voelt?',
    action: (p) => ({ position: Math.min(64, p.position + 2), extraTurn: true })
  },
  {
    id: 'p2',
    type: 'positive',
    title: 'Asset-based inzet',
    description: 'Je geeft een gastles over je thuisland of je eerdere werkervaring. De leerlingen hangen aan je lippen; dit geeft je een enorme boost aan zelfvertrouwen!',
    actionText: 'Ga 3 stappen vooruit en gooi nog een keer.',
    conversationPrompt: 'Op welke manieren kunnen we de unieke culturele en professionele achtergrond van internationale docenten vaker structureel inzetten als meerwaarde?',
    action: (p) => ({ position: Math.min(64, p.position + 3), extraTurn: true })
  },
  {
    id: 'p3',
    type: 'positive',
    title: 'Positieve feedback',
    description: 'Na afloop van je les pakt je werkplekbegeleider je even apart. Je krijgt een mooi compliment: "Je had de klas vandaag super goed onder controle!" Dit geeft je veel positieve energie.',
    actionText: 'Ga 2 stappen vooruit.',
    conversationPrompt: 'Hoe zorgen we ervoor dat onze complimenten en feedback niet alleen aanmoedigend zijn, maar de ander ook echt in zijn of haar professionele kracht zetten?',
    action: (p) => ({ position: Math.min(64, p.position + 2) })
  },
  {
    id: 'p4',
    type: 'positive',
    title: 'Didactische cultuur leren',
    description: 'Je begeleider geeft je de tip om leerlingen bij hun voornaam te noemen om de sfeer open te houden. Je probeert dit direct uit in je volgende les en het werkt fantastisch!',
    actionText: 'Ga 2 stappen vooruit.',
    conversationPrompt: 'Hoe vinden we de juiste balans tussen het overbrengen van onze Nederlandse didactiek en het openstaan voor vernieuwende, afwijkende didactische aanpakken van buitenaf?',
    action: (p) => ({ position: Math.min(64, p.position + 2) })
  },
  {
    id: 'p5',
    type: 'positive',
    title: 'Ruimte voor observatie',
    description: 'Je krijgt de vrijheid om lessen bij te wonen van allerlei verschillende collega\'s. Je kijkt je ogen uit en pikt van elke docent een nieuwe handige lesstijl mee.',
    actionText: 'Ga 1 stap vooruit.',
    conversationPrompt: 'Hoe stimuleren we internationale docenten om tijdens het observeren de Nederlandse context te leren kennen, zonder dat ze hun eigen unieke onderwijsstijl verliezen?',
    action: (p) => ({ position: Math.min(64, p.position + 1) })
  },
  {
    id: 'p6',
    type: 'positive',
    title: 'Actieve introductie en rondleiding',
    description: 'Je werkplekbegeleider neemt je op je eerste dag uitgebreid mee door de school. Je wordt persoonlijk voorgesteld in de lerarenkamer en aan alle vakdocenten, waardoor je je direct welkom voelt.',
    actionText: 'Ga 2 stappen vooruit.',
    conversationPrompt: 'Welke concrete stappen kunnen we als school nemen om het warme, welkome gevoel van de introductieweek het gehele schooljaar vast te houden?',
    action: (p) => ({ position: Math.min(64, p.position + 2) })
  },
  {
    id: 'p7',
    type: 'positive',
    title: 'Algemeen voorstellen',
    description: 'Er hangt een leuke introductieposter van jou in de lerarenkamer met je foto en je hobby\'s. Tijdens de pauze stappen collega\'s hierdoor direct op je af om een praatje te maken!',
    actionText: 'Ga 2 stappen vooruit.',
    conversationPrompt: 'Op welke creatieve en persoonlijke manieren kunnen we een kennismaking vormgeven, zodat er sneller oprechte en diepgaande connecties ontstaan?',
    action: (p) => ({ position: Math.min(64, p.position + 2) })
  },
  {
    id: 'p8',
    type: 'positive',
    title: 'Oprechte interesse',
    description: 'Een collega vraagt vol oprechte interesse naar je thuissituatie en geeft je een dik compliment over hoe snel je Nederlands leert. Je voelt je echt gezien.',
    actionText: 'Ga 1 stap vooruit.',
    conversationPrompt: 'Hoe tonen we waardering voor de enorme inzet van een internationale collega, zonder onbedoeld de focus te leggen op de taal als tekortkoming?',
    action: (p) => ({ position: Math.min(64, p.position + 1) })
  },
  {
    id: 'p9',
    type: 'positive',
    title: 'Duidelijke structuur',
    description: 'Elke week zit je direct na je les standaard een halfuur met je begeleider samen met een kop koffie. Dit wekelijkse reflectiemoment geeft je houvast en structuur.',
    actionText: 'Ga 2 stappen vooruit.',
    conversationPrompt: 'Wat zijn effectieve manieren om een stagiair houvast en structuur te bieden, terwijl we hem of haar ook voorbereiden op de dagelijkse, dynamische schoolpraktijk?',
    action: (p) => ({ position: Math.min(64, p.position + 2) })
  },
  {
    id: 'p10',
    type: 'positive',
    title: 'Duidelijke planning',
    description: 'Samen met je begeleider maak je een strakke planning voor de komende weken. Je weet nu precies aan welke doelen je elke week moet werken, wat je veel rust geeft.',
    actionText: 'Ga 2 stappen vooruit.',
    conversationPrompt: 'Hoe zorgen we ervoor dat doelen in een planning echt in samenspraak worden opgesteld en aansluiten bij de behoeften van de internationale docent?',
    action: (p) => ({ position: Math.min(64, p.position + 2) })
  },
  {
    id: 'p11',
    type: 'positive',
    title: 'Veilige en voorbereide start',
    description: 'Voordat je eerste les begint, drukt je begeleider je een namenlijst met pasfoto\'s van de leerlingen in de hand. Dit maakt het ijs breken en het persoonlijk contact leggen veel makkelijker.',
    actionText: 'Ga 1 stap vooruit.',
    conversationPrompt: 'Welke kleine, praktische hulpmiddelen en aanpassingen (zoals een namenlijst met foto\'s) kunnen we nog meer inzetten om de start soepeler te maken?',
    action: (p) => ({ position: Math.min(64, p.position + 1) })
  },
  {
    id: 'p12',
    type: 'positive',
    title: 'Klein beginnen',
    description: 'Je start niet direct voor een volle klas, maar geeft je eerste uitleg aan een groepje van vijf leerlingen. Dit is de perfecte, veilige setting om zonder druk te oefenen met lesgeven.',
    actionText: 'Ga 2 stappen vooruit.',
    conversationPrompt: 'Hoe bepalen we samen met de docent het ideale moment om de stap te maken van een kleine, veilige setting naar een volledige klas?',
    action: (p) => ({ position: Math.min(64, p.position + 2) })
  },
  {
    id: 'p13',
    type: 'positive',
    title: 'Gespreksbegeleiding',
    description: 'Tijdens de lunch gaat het gesprek in de lerarenkamer erg snel. Je begeleider leunt even naar je toe en fluistert wat een specifiek Nederlands spreekwoord betekent. Wat fijn!',
    actionText: 'Ga 1 stap vooruit.',
    conversationPrompt: 'Hoe kunnen we de pauzes zo insteken dat er sprake is van een gelijkwaardige uitwisseling van cultuur en taal, in plaats van een eenrichtingsverkeer?',
    action: (p) => ({ position: Math.min(64, p.position + 1) })
  },
  {
    id: 'p14',
    type: 'positive',
    title: 'Toegankelijke begeleiding',
    description: 'Je krijgt een appje van je begeleider: "Als je even vastloopt bij het voorbereiden, stuur me gewoon een berichtje!". Deze laagdrempelige bereikbaarheid stelt je enorm gerust.',
    actionText: 'Ga 1 stap vooruit.',
    conversationPrompt: 'Hoe kunnen we naast een "stuur maar een appje"-beleid ook proactieve check-ins organiseren, zodat de drempel om hulp te vragen echt minimaal is?',
    action: (p) => ({ position: Math.min(64, p.position + 1) })
  },
  {
    id: 'p15',
    type: 'positive',
    title: 'Lunch contact',
    description: 'Tijdens de pauze haakt je begeleider je aan bij een gezellig groepje docenten en helpt je in het gesprek te komen. Je lacht mee en voelt je echt onderdeel van het team.',
    actionText: 'Ga 2 stappen vooruit.',
    conversationPrompt: 'Hoe creëren we als team een brede cultuur waarin iedereen, en niet slechts de directe begeleider, zich verantwoordelijk voelt om nieuwe collega\'s bij gesprekken te betrekken?',
    action: (p) => ({ position: Math.min(64, p.position + 2) })
  },
  {
    id: 'p16',
    type: 'positive',
    title: 'Autonomie',
    description: 'Je krijgt op je eerste dag direct je eigen schoolpas, een sleutelbos en inloggegevens voor Magister. Je kunt nu helemaal zelfstandig aan de slag als een volwaardige docent.',
    actionText: 'Ga 3 stappen vooruit en gooi nog een keer.',
    conversationPrompt: 'Hoe zorgen we ervoor dat we naast facilitaire zaken (sleutels, inlog) ook direct de juiste inhoudelijke introductie bieden om echt vol vertrouwen aan de slag te kunnen?',
    action: (p) => ({ position: Math.min(64, p.position + 3), extraTurn: true })
  },
  {
    id: 'p17',
    type: 'positive',
    title: 'Welkomstpakket',
    description: 'Bij je kennismaking krijg je een uitgebreid welkomstpakket met het jaarplan, roosters en alle schoolinfo. Je kunt je thuis in alle rust inlezen en voorbereiden.',
    actionText: 'Ga 2 stappen vooruit.',
    conversationPrompt: 'Hoe kunnen we ons welkomstpakket en de interne documentatie zo vormgeven dat deze ook voor collega\'s met een totaal ander referentiekader direct helder zijn?',
    action: (p) => ({ position: Math.min(64, p.position + 2) })
  },
  {
    id: 'p18',
    type: 'positive',
    title: 'Informele activiteiten',
    description: 'Je gaat als begeleider mee met een excursie naar een museum. In de bus en tijdens de rondleiding maak je op een ontspannen, gelijkwaardige manier contact met je leerlingen.',
    actionText: 'Ga 2 stappen vooruit.',
    conversationPrompt: 'Welke rol kunnen informele activiteiten spelen in het versterken van de band tussen leerlingen en de docent, en hoe stimuleren we een open houding bij leerlingen?',
    action: (p) => ({ position: Math.min(64, p.position + 2) })
  }
];

export const NEGATIVE_FACTORS: Factor[] = [
  {
    id: 'n1',
    type: 'negative',
    title: 'Systeem-uitsluiting',
    description: 'Je staat voor een gesloten lokaal zonder sleutel en je hebt geen wifi of inlog voor Magister. Na weken kom je er pas toevallig achter dat er een systeem is voor digitaal lesmateriaal.',
    actionText: 'Sla 1 beurt over.',
    conversationPrompt: 'Ligt de schuld van systeem-uitsluiting bij gebrekkige onboarding, of bij een cultuur waarin we ervan uitgaan dat \'iedereen wel weet hoe het hier werkt\'?',
    action: () => ({ skipNextTurn: true })
  },
  {
    id: 'n2',
    type: 'negative',
    title: 'De "Kijk-maar-valkuil"',
    description: 'Je zit al wekenlang stil achterin de klas te observeren en mag zelf niets doen. De verveling slaat toe, je leermotivatie keldert en je mist de kans om zelf van je fouten te leren.',
    actionText: 'Sla 1 beurt over.',
    conversationPrompt: 'Waarom laten we internationale docenten vaak langer observeren dan Nederlandse docenten? Speelt hier onbewust een gebrek aan vertrouwen in hun kunnen mee?',
    action: () => ({ skipNextTurn: true })
  },
  {
    id: 'n3',
    type: 'negative',
    title: 'Taal als harde barrière',
    description: 'Je stelt voor om de volgende les een stukje uit te leggen. Je begeleider zegt hardop: "Nee, jouw Nederlands is nog niet goed genoeg, dat gaat ten koste van de leerlingen." Au.',
    actionText: 'Ga 3 stappen terug.',
    conversationPrompt: 'Wanneer is taal écht een belemmering voor het leerproces van de leerling, en wanneer gebruiken we het als excuus om af te wijken van onze inclusieplicht?',
    action: (p) => ({ position: Math.max(1, p.position - 3) })
  },
  {
    id: 'n4',
    type: 'negative',
    title: 'Vocabulaire',
    description: 'Je staat voor de klas en wilt een abstract concept uitleggen, maar je komt simpelweg niet op de Nederlandse term. Je hapert, de klas wordt onrustig en je verliest je flow.',
    actionText: 'Ga 1 stap terug.',
    conversationPrompt: 'Hoe creëren we een klasseklimaat waarin een docent die hapert om een woord te vinden, niet direct gezag verliest, maar waar kwetsbaarheid juist wordt gewaardeerd?',
    action: (p) => ({ position: Math.max(1, p.position - 1) })
  },
  {
    id: 'n5',
    type: 'negative',
    title: 'Irrelevante toetsing',
    description: 'Je bent hard aan het blokken voor je verplichte taaltoets, maar de woordenlijsten gaan over willekeurige onderwerpen zoals politiek, terwijl jij in jouw vakles hele andere termen nodig hebt.',
    actionText: 'Ga 2 stappen terug.',
    conversationPrompt: 'In hoeverre zijn gestandaardiseerde taaleisen een vorm van institutionele uitsluiting voor internationale professionals met veel vakspecifieke expertise?',
    action: (p) => ({ position: Math.max(1, p.position - 2) })
  },
  {
    id: 'n6',
    type: 'negative',
    title: 'Ongeschreven regels',
    description: 'Je bent niet komen opdagen bij het schoolfeest, omdat niemand je had verteld dat het voor stagiairs ook gewenst is om mee te helpen. Collega\'s kijken je de volgende dag scheef aan.',
    actionText: 'Ga 1 stap terug.',
    conversationPrompt: 'Hoe kunnen we onze eigen ongeschreven regels expliciteren, zonder onszelf als de absolute \'norm\' en de ander als de \'afwijking\' te positioneren?',
    action: (p) => ({ position: Math.max(1, p.position - 1) })
  },
  {
    id: 'n7',
    type: 'negative',
    title: 'Cultuurverschillen',
    description: 'Een leerling reageert heel direct op je. Je weet niet dat deze mondigheid hier in de klas heel normaal is, waardoor je veel te streng reageert en het conflict escaleert.',
    actionText: 'Ga 2 stappen terug.',
    conversationPrompt: 'Zijn we bereid om onze eigen \'normale\' directheid in de klas kritisch te bekijken, in plaats van alleen van de internationale docent te verwachten dat zij zich aanpassen?',
    action: (p) => ({ position: Math.max(1, p.position - 2) })
  },
  {
    id: 'n8',
    type: 'negative',
    title: 'Uitsluiting door lunch en pauzes',
    description: 'Je eet je boterhammen alleen in een leeg kantoortje, omdat niemand je vertelt wanneer en waar het team samen luncht. Als je toch aanschuift, praat iedereen zo snel over privézaken dat je geen woord meekrijgt.',
    actionText: 'Ga 2 stappen terug.',
    conversationPrompt: 'Als iedereen \'gewoon\' in hoog tempo Nederlands praat tijdens de lunch, zijn we dan als team medeplichtig aan de isolatie van onze internationale collega?',
    action: (p) => ({ position: Math.max(1, p.position - 2) })
  },
  {
    id: 'n9',
    type: 'negative',
    title: 'Verscholen vooroordelen',
    description: 'Wanneer je hapert bij het zoeken naar de juiste Nederlandse woorden tijdens een overleg, zucht een collega en insinueert hij dat je de vakkennis niet beheerst.',
    actionText: 'Ga 3 stappen terug.',
    conversationPrompt: 'Hoe spreek je een collega aan die (onbewust) de taalvaardigheid van een internationale docent verwart met een gebrek aan didactische of vakinhoudelijke competentie?',
    action: (p) => ({ position: Math.max(1, p.position - 3) })
  },
  {
    id: 'n10',
    type: 'negative',
    title: 'Taal ondersteuning',
    description: 'In de lerarenkamer wordt een belangrijk nieuwtje verteld, maar in hoog tempo. Je vraagt of ze het in het Engels kunnen herhalen, maar ze gaan gewoon in rap Nederlands verder.',
    actionText: 'Ga 1 stap terug.',
    conversationPrompt: 'Is de weigering om even over te schakelen naar het Engels in de lerarenkamer een teken van tijdsgebrek, of een dieperliggende onwil om ruimte te maken voor de ander?',
    action: (p) => ({ position: Math.max(1, p.position - 1) })
  },
  {
    id: 'n11',
    type: 'negative',
    title: 'Ontbreken van formele introductie',
    description: 'Je loopt de docentenkamer in, maar niemand weet wie je bent. Je moet voor de zoveelste keer aan vreemde gezichten uitleggen dat je hier stage loopt.',
    actionText: 'Ga 2 stappen terug.',
    conversationPrompt: 'Wat zegt het over onze schoolorganisatie als nieuwe, internationale collega\'s zichzelf keer op keer moeten verantwoorden bij de koffieautomaat?',
    action: (p) => ({ position: Math.max(1, p.position - 2) })
  },
  {
    id: 'n12',
    type: 'negative',
    title: 'Onduidelijke verwachtingen',
    description: 'Een collega vraagt geïrriteerd waarom jij na een maand nog steeds geen hele klas draait, in tegenstelling tot andere stagiairs. Jouw specifieke en aangepaste stageleerdoelen blijken nergens bekend te zijn.',
    actionText: 'Ga 2 stappen terug.',
    conversationPrompt: 'Hoe voorkomen we dat stagiairs slachtoffer worden van gebrekkige interne communicatie over aangepaste trajecten, waardoor zij onterecht als \'traag\' of \'incompetent\' worden gezien?',
    action: (p) => ({ position: Math.max(1, p.position - 2) })
  },
  {
    id: 'n13',
    type: 'negative',
    title: 'Cognitieve overbelasting',
    description: 'Je komt thuis van je stage en moet eigenlijk nog aan je masteropleiding werken én Nederlandse woordjes stampen. Je bent compleet gesloopt en de stress wordt je te veel.',
    actionText: 'Sla 1 beurt over.',
    conversationPrompt: 'Hebben we als werkplek realistische verwachtingen van de enorme extra cognitieve load die het werken in een tweede taal en nieuwe cultuur met zich meebrengt?',
    action: () => ({ skipNextTurn: true })
  },
  {
    id: 'n14',
    type: 'negative',
    title: 'Lesvoorbereiding',
    description: 'Je bent je hele zondag kwijt aan het voorbereiden van één simpele les, simpelweg omdat je overal in verschillende mappen en systemen moet zoeken naar de exameneisen en het lesmateriaal.',
    actionText: 'Ga 2 stappen terug.',
    conversationPrompt: 'Zijn onze systemen en mappenstructuren eigenlijk onnodig complex ontworpen?',
    action: (p) => ({ position: Math.max(1, p.position - 2) })
  },
  {
    id: 'n15',
    type: 'negative',
    title: 'Kennisgat in het schoolsysteem',
    description: 'Tijdens een docentenvergadering gaat het minutenlang over de overgangsnormen van havo-4 naar vwo-5. Je kent deze typisch Nederlandse schoolsysteem-termen niet en kunt niet meepraten.',
    actionText: 'Ga 1 stap terug.',
    conversationPrompt: 'Hoeveel van onze vergaderingen bestaan uit \'systeem-jargon\' dat niet alleen internationale, maar eigenlijk alle startende docenten buitensluit?',
    action: (p) => ({ position: Math.max(1, p.position - 1) })
  },
  {
    id: 'n16',
    type: 'negative',
    title: 'Belemmeringen in de communicatie',
    description: 'Je wilt een groepje luidruchtige leerlingen in de gang aanspreken, maar uit angst dat je een taalfout maakt slik je je woorden in en loop je met een boogje om ze heen.',
    actionText: 'Sla 1 beurt over.',
    conversationPrompt: 'Hoe doorbreken we de vicieuze cirkel waarin de angst om taalfouten te maken leidt tot vermijding, wat vervolgens weer de integratie en taalontwikkeling afremt?',
    action: () => ({ skipNextTurn: true })
  },
  {
    id: 'n17',
    type: 'negative',
    title: 'Onveilige feedback',
    description: 'Terwijl de leerlingen meeluisteren, roept je begeleider vanuit de achterkant van de klas: "Nee, dat leg je verkeerd uit!" Je voelt je publiekelijk voor schut gezet.',
    actionText: 'Ga 3 stappen terug.',
    conversationPrompt: 'Als een begeleider publiekelijk ingrijpt, beschermt hij dan de leerlingen, of ondermijnt hij vooral de professionele identiteit van de internationale docent?',
    action: (p) => ({ position: Math.max(1, p.position - 3) })
  },
  {
    id: 'n18',
    type: 'negative',
    title: 'Onbekende humor',
    description: 'Een collega maakt een cynische opmerking over de directie. Jij neemt dit volledig letterlijk en maakt je er de hele dag grote zorgen over, tot iemand lachend uitlegt dat het een grapje was.',
    actionText: 'Ga 1 stap terug.',
    conversationPrompt: 'Is onze \'typisch Nederlandse\' cynische humor op de werkvloer eigenlijk wel zo onschuldig, of is het een subtiel mechanisme van in- en uitsluiting?',
    action: (p) => ({ position: Math.max(1, p.position - 1) })
  },
  {
    id: 'n19',
    type: 'negative',
    title: 'Cultuurkloof rondom proactiviteit',
    description: 'Je wacht beleefd af tot je begeleider je een taak geeft, want dat is in jouw cultuur respectvol. Je begeleider ergert zich echter groen omdat hij vindt dat je totaal geen initiatief toont.',
    actionText: 'Ga 2 stappen terug.',
    conversationPrompt: 'Waarom zien wij de \'Nederlandse\' vorm van proactiviteit als de universele norm voor een goede werkhouding, ten koste van andere uitingen van professionaliteit en respect?',
    action: (p) => ({ position: Math.max(1, p.position - 2) })
  },
  {
    id: 'n20',
    type: 'negative',
    title: 'Last-minute informatie',
    description: 'Pas tien minuten voor de bel gaat, roept je begeleider dat jij vandaag tóch de hele les over de relativiteitstheorie mag geven. Je raakt volledig in paniek door deze onverwachte actie.',
    actionText: 'Ga 1 stap terug.',
    conversationPrompt: 'Wanneer we improvisatievermogen verwachten, houden we er dan rekening mee dat improviseren in een tweede taal exponentieel veel meer energie en veiligheid vereist?',
    action: (p) => ({ position: Math.max(1, p.position - 1) })
  },
  {
    id: 'n21',
    type: 'negative',
    title: 'Werkplekbegeleider',
    description: 'Je vaste aanspreekpunt blijkt een docent te zijn van een heel ander vakgebied die maar twee dagen per week op school is. Je voelt je in de steek gelaten en moet alles zelf uitzoeken.',
    actionText: 'Sla 1 beurt over.',
    conversationPrompt: 'Hoe waarborgen we de kwaliteit van werkplekbegeleiding als deze afhankelijk is van docenten die zelf overbelast of fysiek afwezig zijn?',
    action: () => ({ skipNextTurn: true })
  },
  {
    id: 'n22',
    type: 'negative',
    title: 'Logistieke belemmering',
    description: 'Je bent elke dag twee uur aan het reizen met bussen en treinen om op stage te komen. Je kunt hierdoor helaas nooit na schooltijd nog even blijven hangen voor een borrel of teamoverleg.',
    actionText: 'Ga 2 stappen terug.',
    conversationPrompt: 'Als sociale inclusie vooral na schooltijd plaatsvindt, hoe voorkomen we dan dat logistieke uitdagingen (zoals lange reistijden) leiden tot professionele isolatie?',
    action: (p) => ({ position: Math.max(1, p.position - 2) })
  }
];

export const ALL_FACTORS = [...POSITIVE_FACTORS, ...NEGATIVE_FACTORS];
