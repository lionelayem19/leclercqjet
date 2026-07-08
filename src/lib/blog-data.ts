export interface BlogArticle {
  slug: string;
  title: string;
  titleEn: string;
  excerpt: string;
  excerptEn: string;
  category: string;
  categoryEn: string;
  date: string;
  readTime: number;
  img: string;
  imgZone: number; // 1–12, zone in grille.png
  content: string;
  contentEn: string;
}

export const blogArticles: BlogArticle[] = [
  {
    slug: "comment-choisir-son-jet-prive",
    title: "Comment choisir son jet privé selon sa destination",
    titleEn: "How to choose your private jet based on your destination",
    excerpt: "Léger, moyen, lourd ou ultra long-range : chaque appareil répond à des usages précis. Notre guide pour ne pas se tromper.",
    excerptEn: "Light, midsize, heavy or ultra long-range: each aircraft serves specific purposes. Our guide to making the right choice.",
    category: "Guide",
    categoryEn: "Guide",
    date: "15 avril 2026",
    readTime: 5,
    img: "/images/grille.png",
    imgZone: 5,
    content: `Choisir le bon jet privé pour votre déplacement est une décision qui impacte directement votre confort, votre budget et vos possibilités de destination. Chez LECLERCQ'JET INTERNATIONAL, notre rôle de courtier est précisément de vous guider vers l'appareil le plus adapté à votre besoin.

## Les jets légers : efficacité et économie

Les jets légers, comme le Phenom 300, le Citation CJ3 ou le Learjet 75, accueillent entre 4 et 8 passagers pour des vols allant jusqu'à 3 000 km. Parfaits pour les trajets Paris–Genève, Paris–Londres ou Cannes–Barcelone, ils allient réactivité et coût maîtrisé. Un jet léger peut souvent opérer depuis des aérodromes de petite taille, vous rapprochant davantage de votre destination finale.

## Les jets de taille moyenne : le juste équilibre

La catégorie intermédiaire, Citation XLS, Learjet 60, Hawker 800, offre plus d'espace cabine et une autonomie portée à 4 500 km. Elle convient parfaitement aux voyages d'affaires en Europe, avec possibilité d'emporter davantage de bagages et de bénéficier d'une hauteur de cabine permettant de se tenir debout. Ces appareils représentent souvent le meilleur rapport confort/coût.

## Les jets lourds : confort long-courrier

Falcon 2000, Challenger 604, Global 5000,les jets lourds sont conçus pour les vols intercontinentaux ou les voyages en groupe. Avec des cabines pouvant accueillir jusqu'à 14 passagers, un espace de sommeil, un bureau et une galley complète, ils transforment le temps de vol en espace de productivité ou de repos.

## L'ultra long-range : sans escale partout dans le monde

Le Gulfstream G650, le Dassault Falcon 8X ou le Bombardier Global 7500 représentent le summum de l'aviation privée. Avec des autonomies dépassant 12 000 km, ils permettent des vols sans escale Paris–New York, Paris–Singapour ou Paris–Los Angeles. La cabine est conçue pour le confort absolu sur des vols de 14 à 17 heures.

## Notre conseil

Avant de sélectionner un appareil, définissez précisément : le nombre de passagers, la distance totale, la nécessité de travailler ou dormir à bord, et votre budget. Notre équipe analyse ces critères et vous soumet plusieurs options adaptées, en comparant disponibilité, confort et rapport qualité-prix. La sélection du bon appareil est la première étape d'un vol réussi.`,
    contentEn: `Choosing the right private jet for your trip directly impacts your comfort, budget and destination options. At LECLERCQ'JET INTERNATIONAL, our role as a broker is precisely to guide you toward the aircraft best suited to your needs.

## Light jets: efficiency and economy

Light jets, such as the Phenom 300, Citation CJ3 or Learjet 75, accommodate 4 to 8 passengers for flights up to 3,000 km. Perfect for Paris–Geneva, Paris–London or Cannes–Barcelona routes, they combine responsiveness with controlled costs. Light jets can often operate from smaller airfields, bringing you closer to your final destination.

## Midsize jets: the right balance

The middle category, Citation XLS, Learjet 60, Hawker 800, offers more cabin space and range up to 4,500 km. It's ideal for business travel across Europe, with more luggage capacity and stand-up cabin height. These aircraft often represent the best comfort-to-cost ratio.

## Heavy jets: long-range comfort

Falcon 2000, Challenger 604, Global 5000,heavy jets are designed for intercontinental flights or group travel. With cabins accommodating up to 14 passengers, sleeping areas, a desk and full galley, they transform flight time into productive or restful space.

## Ultra long-range: non-stop anywhere in the world

The Gulfstream G650, Dassault Falcon 8X or Bombardier Global 7500 represent the pinnacle of private aviation. With ranges exceeding 12,000 km, they enable non-stop flights Paris–New York, Paris–Singapore or Paris–Los Angeles. The cabin is designed for absolute comfort on 14 to 17-hour flights.

## Our advice

Before selecting an aircraft, clearly define: the number of passengers, total distance, the need to work or sleep on board, and your budget. Our team analyzes these criteria and presents several suitable options, comparing availability, comfort and value. Selecting the right aircraft is the first step to a successful flight.`,
  },
  {
    slug: "empty-legs-opportunite-voyage-prive",
    title: "Vols partagés : l'opportunité méconnue du voyage privé",
    titleEn: "Shared flights: the overlooked opportunity in private travel",
    excerpt: "Réductions pouvant atteindre 75% sur des jets de grande qualité. Comprendre le mécanisme des vols partagés pour en profiter pleinement.",
    excerptEn: "Discounts reaching up to 75% on high-quality jets. Understanding shared flights to make the most of them.",
    category: "Conseils",
    categoryEn: "Tips",
    date: "8 avril 2026",
    readTime: 4,
    img: "/images/grille.png",
    imgZone: 6,
    content: `Un vol partagé, ou vol de repositionnement, est un vol effectué par un jet privé sans passager commercial à bord, afin de ramener l'appareil à sa base ou de le positionner pour un autre vol. Pour l'opérateur, ce vol représente un coût fixe inévitable. Pour vous, c'est une opportunité unique de voyager en jet privé à un prix considérablement réduit.

## Comment fonctionne un vol partagé ?

Prenons un exemple concret. Un opérateur affrète un Falcon 2000 de Paris à Ibiza pour un client. À l'issue du voyage, l'avion doit rentrer à Paris à vide. Plutôt que de voler sans passagers, l'opérateur ou son courtier propose ce trajet retour Ibiza–Paris à prix réduit, parfois jusqu'à 75% du prix habituel.

## Les avantages des vols partagés

Les réductions sont substantielles et permettent d'accéder à des appareils que l'on ne pourrait pas s'offrir à tarif plein. Un Challenger 604 ou un Falcon 7X devient soudainement accessible pour un budget de jet léger. C'est aussi une façon élégante de découvrir des catégories d'appareils supérieures.

## Les contraintes à connaître

Un vol partagé s'accompagne de contraintes. La route est fixe : vous ne pouvez pas modifier le point de départ ou d'arrivée. L'horaire peut évoluer si le vol principal est décalé. Et l'opportunité peut disparaître si le vol commanditaire est annulé. Il faut donc faire preuve de flexibilité.

## Comment en profiter avec LECLERCQ'JET

Notre plateforme publie en temps réel les vols partagés disponibles auprès de nos opérateurs partenaires. Nos membres Aube, Azur et Astre reçoivent les alertes en avant-première, 24 à 48 heures avant la publication publique. Pour les voyageurs flexibles, c'est l'accès à l'aviation privée dans ses meilleures conditions tarifaires.

Inscrivez-vous à notre alerte email pour être informé dès qu'une opportunité correspond à vos destinations habituelles.`,
    contentEn: `A shared flight, or repositioning flight, is a flight operated by a private jet without commercial passengers on board, to return the aircraft to its base or position it for another flight. For the operator, this flight represents an unavoidable fixed cost. For you, it is a unique opportunity to fly privately at a significantly reduced price.

## How does a shared flight work?

A concrete example: an operator charters a Falcon 2000 from Paris to Ibiza for a client. After the journey, the aircraft must return to Paris empty. Rather than flying without passengers, the operator or their broker offers this return Ibiza–Paris leg at a reduced price, sometimes up to 75% off the normal rate.

## The advantages of shared flights

The discounts are substantial and provide access to aircraft that would otherwise be out of reach at full price. A Challenger 604 or Falcon 7X suddenly becomes accessible on a light jet budget. It's also an elegant way to discover higher aircraft categories.

## Constraints to be aware of

Shared flights come with constraints. The route is fixed: you cannot change the departure or arrival point. The schedule may shift if the main flight is delayed. And the opportunity can disappear if the originating flight is cancelled. Flexibility is therefore essential.

## How to benefit with LECLERCQ'JET

Our platform publishes shared flights in real time from our partner operators. Aube, Azur and Astre members receive alerts first, 24 to 48 hours before public listing. For flexible travellers, it's access to private aviation at its best value.

Sign up for our email alert to be notified whenever an opportunity matches your usual destinations.`,
  },
  {
    slug: "falcon-8x-long-courrier-prive",
    title: "Falcon 8X : le summum du long-courrier privé",
    titleEn: "Falcon 8X: the pinnacle of long-range private aviation",
    excerpt: "Dassault Aviation a créé un appareil d'exception. Retour sur ce qui fait du Falcon 8X une référence absolue du voyage privé transcontinental.",
    excerptEn: "Dassault Aviation has created an exceptional aircraft. What makes the Falcon 8X an absolute benchmark in transcontinental private travel.",
    category: "Actualités",
    categoryEn: "News",
    date: "1er avril 2026",
    readTime: 6,
    img: "/images/grille.png",
    imgZone: 7,
    content: `Depuis son entrée en service en 2016, le Dassault Falcon 8X s'est imposé comme l'un des appareils les plus performants et les plus raffinés de l'aviation privée mondiale. Successeur du Falcon 7X, il en reprend l'architecture triréacteur emblématique en la poussant vers de nouveaux sommets.

## Des performances qui repoussent les limites

Avec une autonomie de 11 450 km (6 450 nm), le Falcon 8X relie Paris à Hong Kong, New York, Singapore ou Los Angeles sans escale. Sa vitesse de croisière de Mach 0,80 (environ 900 km/h) permet de réduire les temps de vol à leur strict minimum. Il peut opérer depuis des aéroports présentant des contraintes particulières, notamment l'altitude élevée et la piste courte, grâce à ses excellentes performances au décollage.

## Une cabine pensée pour le confort absolu

Le Falcon 8X propose la cabine la plus longue de la gamme Falcon (12,13 m), divisée en trois zones configurables. La hauteur d'1,88 m permet de se déplacer librement. Les matériaux, cuirs Hermès, boiseries sur mesure et finitions métal brossé, sont sélectionnés avec le soin d'un appartement parisien. L'isolation acoustique du Falcon 8X est la meilleure de sa catégorie, permettant des conversations à voix normale en vol de croisière.

## Technologie et connectivité

Le système de gestion de vol EASY (Electronic Advanced Avionics System) de troisième génération offre une sécurité et une précision de navigation inégalées. La connectivité satellitaire haut débit permet des appels vidéo, téléconférences et streaming en qualité optimale au-dessus des océans.

## Un appareil pour les grands voyageurs

Le Falcon 8X est le choix de ceux dont les activités se déroulent sur plusieurs continents et pour qui le temps de vol est une extension du bureau ou de la résidence principale. Chez LECLERCQ'JET INTERNATIONAL, nous avons accès à plusieurs appareils de ce type au sein de notre réseau d'opérateurs certifiés. Contactez notre équipe pour une proposition personnalisée.`,
    contentEn: `Since entering service in 2016, the Dassault Falcon 8X has established itself as one of the most capable and refined aircraft in global private aviation. Successor to the Falcon 7X, it builds on its iconic tri-engine architecture, pushing performance to new heights.

## Performance that pushes limits

With a range of 11,450 km (6,450 nm), the Falcon 8X connects Paris to Hong Kong, New York, Singapore or Los Angeles non-stop. Its cruise speed of Mach 0.80 (approximately 900 km/h) minimises flight times. It can operate from airports with specific constraints, including high altitude and short runways, thanks to its excellent takeoff performance.

## A cabin designed for absolute comfort

The Falcon 8X offers the longest cabin in the Falcon range (12.13 m), divided into three configurable zones. The 1.88 m headroom allows free movement throughout. Materials, Hermès leathers, bespoke woodwork and brushed metal finishes, are selected with the care of a Parisian apartment. The Falcon 8X's acoustic insulation is the best in its class, enabling normal-voice conversations at cruise altitude.

## Technology and connectivity

The third-generation EASY (Electronic Advanced Avionics System) flight management system offers unmatched navigation safety and precision. High-bandwidth satellite connectivity enables video calls, teleconferences and streaming at optimal quality over oceans.

## An aircraft for frequent long-range travellers

The Falcon 8X is the choice of those whose activities span multiple continents and for whom flight time is an extension of the office or primary residence. At LECLERCQ'JET INTERNATIONAL, we have access to several aircraft of this type within our certified operator network. Contact our team for a personalised proposal.`,
  },
  {
    slug: "guide-aviation-privee-affaires",
    title: "Guide complet de l'aviation privée d'affaires",
    titleEn: "Complete guide to business private aviation",
    excerpt: "Tout ce que vous devez savoir avant votre premier vol privé : processus, formalités, conseils pratiques et ce à quoi s'attendre.",
    excerptEn: "Everything you need to know before your first private flight: process, formalities, practical tips and what to expect.",
    category: "Guide",
    categoryEn: "Guide",
    date: "25 mars 2026",
    readTime: 7,
    img: "/images/grille.png",
    imgZone: 8,
    content: `Pour beaucoup, l'aviation privée reste un univers méconnu, entouré d'une certaine opacité sur les prix, les procédures et l'accessibilité. Ce guide pratique vous donne toutes les clés pour préparer votre premier vol privé et en tirer le meilleur parti.

## Le courtier : votre interlocuteur unique

Contrairement à l'aviation commerciale, les jets privés ne sont pas réservés sur une plateforme grand public. Le courtier aérien, comme LECLERCQ'JET INTERNATIONAL, est votre interlocuteur unique. Il sollicite plusieurs opérateurs certifiés, compare les offres disponibles, négocie les meilleures conditions et s'assure de la conformité réglementaire de l'appareil. Son expertise vous protège et vous fait gagner un temps précieux.

## Les formalités : beaucoup plus simples que vous ne le pensez

L'un des grands avantages du vol privé est la simplification des formalités. Pas de file d'attente, pas d'enregistrement en ligne. Vous arrivez au terminal privé (FBO) 15 à 20 minutes avant le départ, présentez votre pièce d'identité ou passeport, et embarquez directement. Les bagages sont chargés sans limite de poids définie à l'avance (dans les limites de l'appareil).

## La tarification : ce qu'elle comprend

Le prix d'un vol charter comprend généralement : l'utilisation de l'appareil et son équipage, le carburant, les redevances aéroportuaires, et les frais de handling au terminal privé. Peuvent s'ajouter : les surcharges carburant, les frais de stationnement si l'appareil attend sur place, et les éventuels frais d'accès à certains aéroports. Notre équipe vous détaille chaque poste de coût avec transparence.

## À bord : ce à quoi s'attendre

La cabine est configurée selon vos besoins. Le service à bord dépend de l'opérateur et de l'appareil, mais inclut généralement boissons chaudes et froides, snacks ou restauration sur commande. Pour les vols longs, un service traiteur peut être organisé selon vos préférences alimentaires. L'équipage, pilotes et steward(esse), est entièrement à votre disposition.

## Notre recommandation pour un premier vol

Commencez par un vol de moins de 2 heures sur un jet léger ou moyen : vous découvrirez l'expérience dans des conditions idéales et comprendrez concrètement la différence avec le voyage commercial. Notre équipe se tient disponible pour vous accompagner à chaque étape.`,
    contentEn: `For many, private aviation remains an unfamiliar world, surrounded by opacity about prices, procedures and accessibility. This practical guide gives you all the keys to preparing your first private flight and getting the most from it.

## The broker: your single point of contact

Unlike commercial aviation, private jets are not booked on a public platform. The aviation broker, like LECLERCQ'JET INTERNATIONAL, is your single point of contact. They approach multiple certified operators, compare available offers, negotiate the best terms and ensure the aircraft's regulatory compliance. Their expertise protects you and saves you valuable time.

## Formalities: much simpler than you think

One of the great advantages of private aviation is simplified formalities. No queuing, no online check-in. You arrive at the private terminal (FBO) 15 to 20 minutes before departure, present your ID or passport, and board directly. Baggage is loaded without preset weight limits (within the aircraft's capacity).

## Pricing: what it includes

A charter flight price generally includes: aircraft and crew, fuel, airport fees, and handling charges at the private terminal. Additional charges may include: fuel surcharges, parking fees if the aircraft waits on-site, and access fees at certain airports. Our team details every cost item with full transparency.

## On board: what to expect

The cabin is configured to your needs. The on-board service depends on the operator and aircraft, but generally includes hot and cold beverages, snacks or catering on request. For longer flights, a catering service can be arranged to your dietary preferences. The crew, pilots and cabin attendant, is entirely at your disposal.

## Our recommendation for a first flight

Start with a flight of less than 2 hours on a light or midsize jet: you will discover the experience under ideal conditions and understand concretely what differentiates it from commercial travel. Our team is available to guide you at every step.`,
  },
  {
    slug: "destinations-jet-prive-paris",
    title: "Top 5 des destinations en jet privé depuis Paris",
    titleEn: "Top 5 private jet destinations from Paris",
    excerpt: "Genève en 1h, Ibiza en 2h, Mykonos en 3h. Les cinq destinations les plus demandées par nos clients, et pourquoi le jet privé y change tout.",
    excerptEn: "Geneva in 1h, Ibiza in 2h, Mykonos in 3h. The five destinations most requested by our clients, and why private aviation changes everything.",
    category: "Destinations",
    categoryEn: "Destinations",
    date: "18 mars 2026",
    readTime: 4,
    img: "/images/grille.png",
    imgZone: 9,
    content: `Depuis Le Bourget, Pontoise ou Toussus-le-Noble, Paris est une plaque tournante de l'aviation privée européenne. Voici les cinq destinations qui reviennent le plus souvent dans les demandes de nos clients, et ce qui rend chacune d'elle particulièrement adaptée au jet privé.

## 1. Genève,1h de vol

Genève-Cointrin accueille quotidiennement des dizaines de jets privés. La proximité avec la City de la finance, les stations de ski des Alpes et les palaces du lac Léman en fait une destination de prédilection. En jet privé, vous évitez les connexions et les aléas des vols commerciaux surchargés. Idéal pour une réunion aller-retour dans la journée.

## 2. Cannes-Mandelieu,1h30 de vol

L'aéroport de Cannes-Mandelieu, à 5 minutes du Palais des Festivals, est une destination premium par excellence. Festival de Cannes, Monaco Grand Prix, rendez-vous d'affaires sur la Côte d'Azur. La discrétion et l'efficacité du jet privé y sont particulièrement appréciées. Attention : les créneaux sont saturés en mai et juillet.

## 3. Ibiza,2h de vol

Ibiza représente le parfait usage du jet privé estival : arrivée directe à l'aéroport, pas d'attente, bagage à main ou lourd accepté. Pour un weekend ou une semaine sur l'île, le jet prive vous épargne les correspondances madrilènes et les retards inhérents à la saison touristique.

## 4. Mykonos,3h de vol

Mykonos est inaccessible en non-stop depuis Paris en vol commercial. En jet privé, c'est 3 heures de vol direct pour atterrir à quelques minutes des villas et des hôtels de luxe de Chora. L'expérience justifie pleinement le choix du jet pour cette destination.

## 5. Dubaï,6h de vol

Pour les vols vers Dubaï, la cabine d'un jet lourd devient un atout majeur : possibilité de dormir, de travailler dans le calme, d'arriver reposé pour des rendez-vous d'affaires critiques. Le DIFC et le quartier financier apprécient particulièrement cette forme de voyage.`,
    contentEn: `From Le Bourget, Pontoise or Toussus-le-Noble, Paris is a major hub for European private aviation. Here are the five destinations that appear most frequently in our clients' requests, and what makes each particularly suited to private jet travel.

## 1. Geneva,1 hour flight

Geneva Cointrin receives dozens of private jets daily. Its proximity to the financial city, Alpine ski resorts and Lake Geneva palaces makes it a preferred destination. By private jet, you avoid connections and the uncertainties of overcrowded commercial flights. Ideal for a same-day round trip meeting.

## 2. Cannes-Mandelieu,1.5 hour flight

Cannes-Mandelieu airport, 5 minutes from the Palais des Festivals, is a premium destination par excellence. Cannes Film Festival, Monaco Grand Prix, business appointments on the Côte d'Azur. The discretion and efficiency of private aviation are particularly valued here. Note: slots are heavily congested in May and July.

## 3. Ibiza,2 hour flight

Ibiza represents the perfect summer private jet use case: direct airport arrival, no waiting, hand or hold luggage accepted. For a weekend or week on the island, private aviation spares you Madrid connections and delays inherent to the tourist season.

## 4. Mykonos,3 hour flight

Mykonos is unreachable non-stop from Paris by commercial aviation. By private jet, it's a 3-hour direct flight, landing minutes from the luxury villas and hotels of Chora. The experience fully justifies the private jet choice for this destination.

## 5. Dubai,6 hour flight

For Dubai flights, a heavy jet cabin becomes a major asset: ability to sleep, work in peace, and arrive rested for critical business meetings. The DIFC and financial district particularly appreciate this form of travel.`,
  },
  {
    slug: "cout-reel-vol-jet-prive",
    title: "Le coût réel d'un vol en jet privé",
    titleEn: "The real cost of a private jet flight",
    excerpt: "De 3 000€ à 80 000€ selon la distance et l'appareil. Ce qui détermine réellement le prix d'un vol privé et comment l'optimiser.",
    excerptEn: "From €3,000 to €80,000 depending on distance and aircraft. What truly determines the price of a private flight and how to optimise it.",
    category: "Guide",
    categoryEn: "Guide",
    date: "11 mars 2026",
    readTime: 5,
    img: "/images/grille.png",
    imgZone: 10,
    content: `L'aviation privée souffre d'un manque de transparence sur la tarification qui freine souvent ceux qui envisagent de l'utiliser pour la première fois. Voici une décomposition honnête des coûts, des fourchettes réalistes et des leviers pour optimiser votre budget.

## Les principaux postes de coût

**Le taux horaire de l'appareil** constitue le poste principal. Il varie selon la catégorie : de 1 800€/h pour un jet léger à 10 000€/h pour un ultra long-range. Ce taux intègre l'amortissement de l'appareil, la maintenance, les assurances et la rémunération de l'équipage.

**Le carburant** est facteur de variabilité important. Il représente généralement 30 à 40% du coût total d'un vol. Son prix fluctue selon le kérosène mondial et les aéroports.

**Les redevances aéroportuaires et frais de handling** varient considérablement : de 200€ dans un petit aérodrome à 2 500€ à London City ou Nice pendant les événements.

**Les frais de repositionnement** s'ajoutent si l'appareil doit venir chercher les passagers depuis une autre base.

## Des fourchettes concrètes

- Paris–Genève en jet léger : 4 000–6 000€
- Paris–Ibiza en jet moyen : 9 000–13 000€
- Paris–Mykonos en jet lourd : 18 000–25 000€
- Paris–New York en ultra long-range : 55 000–85 000€

## Comment optimiser son budget

**Les vols partagés** permettent de réduire le coût de 40 à 75% sur des trajets fixes. Si votre planning est flexible, c'est la meilleure façon d'accéder à l'aviation privée.

**Voyager en groupe** divise naturellement le coût par passager. Un Falcon 2000 à 20 000€ pour un Paris–Mykonos aller-retour représente 2 000€ par personne pour un groupe de 10.

**Les memberships** de type Azur ou Astre permettent d'accéder à des tarifs préférentiels négociés auprès de nos opérateurs partenaires.

Notre équipe est à votre disposition pour vous fournir un devis transparent, sans frais cachés, sur tout type de vol.`,
    contentEn: `Private aviation suffers from a lack of pricing transparency that often deters first-time users. Here is an honest breakdown of costs, realistic price ranges and levers to optimise your budget.

## The main cost components

**The aircraft hourly rate** is the main cost. It varies by category: from €1,800/h for a light jet to €10,000/h for ultra long-range. This rate incorporates aircraft depreciation, maintenance, insurance and crew compensation.

**Fuel** is an important variable cost. It typically represents 30 to 40% of total flight cost. Its price fluctuates with global jet fuel prices and airports.

**Airport fees and handling charges** vary considerably: from €200 at a small airfield to €2,500 at London City or Nice during events.

**Repositioning fees** apply if the aircraft must travel from another base to collect passengers.

## Concrete price ranges

- Paris–Geneva by light jet: €4,000–6,000
- Paris–Ibiza by midsize jet: €9,000–13,000
- Paris–Mykonos by heavy jet: €18,000–25,000
- Paris–New York by ultra long-range: €55,000–85,000

## How to optimise your budget

**Shared flights** reduce costs by 40 to 75% on fixed routes. If your schedule is flexible, it's the best way to access private aviation.

**Group travel** naturally divides the per-passenger cost. A Falcon 2000 at €20,000 for a Paris–Mykonos return represents €2,000 per person for a group of 10.

**Azur or Astre memberships** provide access to preferential rates negotiated with our partner operators.

Our team is available to provide you with a transparent quote, with no hidden fees, for any type of flight.`,
  },
];
