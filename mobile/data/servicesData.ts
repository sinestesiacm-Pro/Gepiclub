export type ServiceCategory = 'viaggi' | 'fitness' | 'moda' | 'cosmetica';

export interface ServiceItem {
  id: string;
  category: ServiceCategory;
  categoryLabel: string;
  title: string;
  partnerName: string;
  location: string;
  rating: number;
  reviewsCount: number;
  image: any;
  galleryImages?: any[];
  shortDescription: string;
  fullDescription: string;
  publicPrice: number;
  vipPrice: number;
  currency: 'EUR' | 'USD';
  currencySymbol: string;
  discountPercentage: number;
  pointsEarned: number;
  vipPerks: string[];
  options: {
    id: string;
    label: string;
    priceModifier: number;
    description: string;
  }[];
  includes: string[];
  terms: string;
}

export const SERVICES_CATALOG: ServiceItem[] = [
  // 1. VIAGGI
  {
    id: 'hotel-cipriani',
    category: 'viaggi',
    categoryLabel: 'Resort & Hotel 5★',
    title: 'Belmond Hotel Cipriani',
    partnerName: 'Belmond Luxury Collection',
    location: 'Isola della Giudecca, Venezia',
    rating: 5.0,
    reviewsCount: 482,
    image: require('@/assets/images/hotel-suite.jpg'),
    shortDescription: 'Oasi privata con piscina olimpionica e viste mozzafiato su Piazza San Marco.',
    fullDescription:
      'Immerso tra giardini lussureggianti sulla punta dell’Isola della Giudecca, l’Hotel Cipriani offre un rifugio di pura quiete a soli quattro minuti di barca privata da Piazza San Marco. Un servizio impeccabile, cucina stellata Michelin e terrazze sospese sulla laguna veneziana.',
    publicPrice: 1150,
    vipPrice: 890,
    currency: 'EUR',
    currencySymbol: '€',
    discountPercentage: 23,
    pointsEarned: 1780,
    vipPerks: [
      'Upgrade gratuito di camera garantito (secondo disponibilità)',
      'Colazione gourmet à la carte inclusa per 2 persone',
      '$100 di credito utilizzabile presso la Casanova Spa',
      'Check-in anticipato alle 11:00 e Late check-out alle 16:00',
    ],
    options: [
      {
        id: 'opt-junior',
        label: 'Junior Suite Laguna',
        priceModifier: 0,
        description: 'Ampia camera con balcone privato affacciato sull’acqua',
      },
      {
        id: 'opt-deluxe',
        label: 'Deluxe Suite con Giardino',
        priceModifier: 280,
        description: 'Giardino privato e soggiorno separato arredato con sete veneziane',
      },
    ],
    includes: [
      'Soggiorno 1 notte per 2 ospiti',
      'Accesso illimitato alla piscina riscaldata con acqua di mare',
      'Transfer continuo in motoscafo privato per San Marco',
      'Tassa di soggiorno e assicurazione annullamento incluse',
    ],
    terms: 'Cancellazione gratuita fino a 48 ore prima del check-in. Pagamento protetto con tariffa garantita Gepiclub.',
  },
  {
    id: 'sanctuary-lodge',
    category: 'viaggi',
    categoryLabel: 'Lodge Esclusivo',
    title: 'Sanctuary Lodge, A Belmond Hotel',
    partnerName: 'Belmond Peru Experience',
    location: 'Machu Picchu, Cusco, Perù',
    rating: 4.9,
    reviewsCount: 310,
    image: require('@/assets/images/machu-picchu.jpg'),
    shortDescription: 'L’unico hotel situato proprio alle porte dell’antica cittadella Inca.',
    fullDescription:
      'L’unico resort adiacente all’ingresso di Machu Picchu. Svegliati prima di chiunque altro per ammirare l’alba sulle rovine senza folla, concedendoti poi massaggi rilassanti con erbe andine e alta cucina peruviana.',
    publicPrice: 980,
    vipPrice: 740,
    currency: 'USD',
    currencySymbol: '$',
    discountPercentage: 25,
    pointsEarned: 1480,
    vipPerks: [
      'Accesso prioritario esclusivo alle rovine all’alba',
      'Pensione completa con menu degustazione andino',
      'Guida archeologica privata madrelingua inclusa',
      'Accoglienza speciale con cerimonia tradizionale Inca',
    ],
    options: [
      {
        id: 'opt-classic',
        label: 'Classic Mountain View',
        priceModifier: 0,
        description: 'Camera con vista maestosa sulla catena montuosa',
      },
      {
        id: 'opt-terrace',
        label: 'Sanctuary Suite con Terrazza',
        priceModifier: 220,
        description: 'Ampia terrazza panoramica circondata da orchidee selvagge',
      },
    ],
    includes: [
      'Soggiorno per 2 adulti',
      'Tutti i pasti (colazione, pranzo gourmet, cena)',
      'Escursione privata con guida certificata',
      'Transfer da/per stazione ferroviaria di Aguas Calientes',
    ],
    terms: 'Tariffa prepagata non rimborsabile con possibilità di modifica data gratuita per soci Gepiclub.',
  },
  {
    id: 'volo-business-vce-lim',
    category: 'viaggi',
    categoryLabel: 'Voli Intercontinentali',
    title: 'Volo Business Class Venezia ⇄ Lima',
    partnerName: 'LATAM Airlines & Iberia',
    location: 'VCE Venezia - LIM Lima Jorge Chávez',
    rating: 4.8,
    reviewsCount: 654,
    image: require('@/assets/images/flight-window.jpg'),
    shortDescription: 'Viaggio intercontinentale in poltrona lie-flat con accesso VIP Lounge.',
    fullDescription:
      'Vola tra il Veneto e il Perù nel massimo comfort. Sedili completamente reclinabili a 180°, menu gourmet curato da chef stellati, carta dei vini premium e franchigia di 2 bagagli da 32kg ciascuno.',
    publicPrice: 1290,
    vipPrice: 980,
    currency: 'EUR',
    currencySymbol: '€',
    discountPercentage: 24,
    pointsEarned: 1960,
    vipPerks: [
      'Tariffa B2B negoziata con sconto del 24%',
      'Accesso illimitato alla VIP Lounge Marco Polo e Salón VIP Jorge Chávez',
      'Priority Boarding e Fast Track di sicurezza su tutti gli scali',
      'Modifica data gratuita fino a 24 ore prima del decollo',
    ],
    options: [
      {
        id: 'opt-biz-standard',
        label: 'Business Class Standard',
        priceModifier: 0,
        description: 'Poltrona letto lie-flat, 2 bagagli in stiva da 32kg',
      },
      {
        id: 'opt-biz-flex',
        label: 'Business Class Flex Platinum',
        priceModifier: 150,
        description: 'Rimborsabilità totale in caso di imprevisto e posto prima fila',
      },
    ],
    includes: [
      'Biglietto A/R per 1 passeggero',
      'Selezione posto avanzata gratuita',
      'Wi-Fi satellitare gratuito a bordo',
      'Assicurazione bagaglio e coincidenza garantita',
    ],
    terms: 'Emissione immediata del biglietto elettronico con PNR confermato via WhatsApp dal Concierge.',
  },

  // 2. FITNESS & BENESSERE
  {
    id: 'virgin-active-collection',
    category: 'fitness',
    categoryLabel: 'Palestre & Spa di Lusso',
    title: 'Virgin Active Collection Club & Spa',
    partnerName: 'Virgin Active Premium',
    location: 'Venezia Mestre / Padova / Milano',
    rating: 4.9,
    reviewsCount: 390,
    image: require('@/assets/images/hero-luxury.jpg'),
    shortDescription: 'Abbonamento All-Inclusive per fitness d’élite, spa rigenerante e piscina.',
    fullDescription:
      'I Club Collection di Virgin Active rappresentano l’apice del benessere urbano: attrezzature Technogym biomeccaniche di ultima generazione, corsi esclusivi Reformer Pilates, piscina olimpionica interna, area relax con sauna finlandese e bagno turco.',
    publicPrice: 230,
    vipPrice: 160,
    currency: 'EUR',
    currencySymbol: '€',
    discountPercentage: 30,
    pointsEarned: 480,
    vipPerks: [
      'Accesso illimitato a tutti i club Collection d’Europa',
      '2 sessioni al mese con Personal Trainer certificato incluse',
      'Telo fitness, accappatoio e kit cortesia omaggio a ogni ingresso',
      'Sconto del 20% su tutti i massaggi e trattamenti benessere',
    ],
    options: [
      {
        id: 'opt-mensile',
        label: 'Pass Mensile Open VIP',
        priceModifier: 0,
        description: 'Accesso completo senza vincoli di orario né costi di iscrizione',
      },
      {
        id: 'opt-trimestrale',
        label: 'Pacchetto 3 Mesi + 5 PT',
        priceModifier: 290,
        description: '3 mesi completi con 5 sedute private di coaching nutrizionale e fitness',
      },
    ],
    includes: [
      'Tessera digitale con ingresso prioritario biometrico',
      'Accesso spa, bagno turco, piscina e idromassaggio',
      'Tutti i corsi di gruppo (Yoga, Cycling, Pilates, Boxing)',
      'Armadietto personale dedicato',
    ],
    terms: 'Attivazione immediata. Possibilità di sospensione temporanea in caso di viaggi o trasferte.',
  },
  {
    id: 'padel-club-privato',
    category: 'fitness',
    categoryLabel: 'Club Sportivo Privato',
    title: 'Esclusivo Padel & Tennis Country Club',
    partnerName: 'Grand Slam Country Club',
    location: 'Treviso / Riviera del Brenta',
    rating: 4.8,
    reviewsCount: 175,
    image: require('@/assets/images/hero-luxury.jpg'),
    shortDescription: 'Campi panoramici coperti di ultima generazione con lounge riservata.',
    fullDescription:
      'Un ambiente raffinato e riservato per gli amanti del Padel e del Tennis. Campi con vetri panoramici senza montanti, illuminazione LED antiriflesso, maestri federali per lezioni private e club house esclusiva con ristorante.',
    publicPrice: 70,
    vipPrice: 45,
    currency: 'EUR',
    currencySymbol: '€',
    discountPercentage: 35,
    pointsEarned: 220,
    vipPerks: [
      'Priorità assoluta nella prenotazione dei campi fino a 14 giorni prima',
      'Racchette professionali Nox/Babolat a noleggio gratuito',
      'Accesso alla Club House e welcome drink post-partita',
      'Docce private con sauna finlandese inclusa',
    ],
    options: [
      {
        id: 'opt-partita',
        label: 'Partita 90 Minuti + Noleggio',
        priceModifier: 0,
        description: 'Campo riservato per 90 minuti con palline e racchette premium',
      },
      {
        id: 'opt-lezione',
        label: 'Partita + Lezione Privata Maestro',
        priceModifier: 40,
        description: 'Include 60 minuti di masterclass tecnica individuale',
      },
    ],
    includes: [
      'Prenotazione campo per 4 giocatori',
      'Spogliatoi privati con set asciugamani',
      'Bottiglie di acqua termale e integratori omaggio',
      'Parcheggio interno custodito gratuito',
    ],
    terms: 'Cancellazione con riaccredito fino a 12 ore prima dell’orario prenotato.',
  },

  // 3. MODA & BOUTIQUE
  {
    id: 'sartoria-veneta',
    category: 'moda',
    categoryLabel: 'Alta Sartoria & Moda',
    title: 'Atelier Sartoria Veneta Bespoke',
    partnerName: 'Sartoria Veneta 1928',
    location: 'Venezia / Verona / Milano',
    rating: 5.0,
    reviewsCount: 140,
    image: require('@/assets/images/madrid.jpg'),
    shortDescription: 'Abiti e camicie su misura cuciti a mano con i tessuti più pregiati al mondo.',
    fullDescription:
      'Tradizione sartoriale italiana senza compromessi. Ogni capo viene realizzato su misura con oltre 40 misurazioni anatomiche, impiegando tessuti Loro Piana, Ermenegildo Zegna e Holland & Sherry. Bottoni in madreperla naturale e fodere in pura seta.',
    publicPrice: 1950,
    vipPrice: 1400,
    currency: 'EUR',
    currencySymbol: '€',
    discountPercentage: 28,
    pointsEarned: 2800,
    vipPerks: [
      'Sconto soci del 28% su tutto il catalogo bespoke',
      'Consulenza privata con il Maestro Sarto a domicilio o in hotel',
      'Camicia in cotone egiziano Giza 87 inclusa nel pacchetto',
      'Custodia da viaggio in pelle e legno di cedro in omaggio',
    ],
    options: [
      {
        id: 'opt-abito-2pz',
        label: 'Abito Completo 2 Pezzi (Giacca + Pantalone)',
        priceModifier: 0,
        description: 'Tessuto 100% Lana Merino Super 150s o Cashmere a scelta',
      },
      {
        id: 'opt-abito-3pz',
        label: 'Abito 3 Pezzi con Panciotto e 2 Camicie',
        priceModifier: 350,
        description: 'Completo cerimoniale o business con gilet sartoriale abbinato',
      },
    ],
    includes: [
      '2 sessioni di prova personalizzate',
      'Regolazioni sartoriali a vita gratuite',
      'Incisione monogramma ricamato a mano',
      'Consegna express garantita in 15 giorni',
    ],
    terms: 'Garanzia di vestibilità perfetta al 100%. Modifiche gratuite fino alla completa soddisfazione.',
  },

  // 4. COSMETICA & BEAUTY
  {
    id: 'clinica-med-spa',
    category: 'cosmetica',
    categoryLabel: 'Med-Beauty & Estetica',
    title: 'Clinica Med-Spa Platinum Rejuvenation',
    partnerName: 'Swiss Platinum Aesthetic Clinic',
    location: 'Padova / Treviso / Venezia',
    rating: 4.9,
    reviewsCount: 288,
    image: require('@/assets/images/hero-luxury.jpg'),
    shortDescription: 'Protocolli anti-age avanzati, ossigenoterapia iperbarica e oro 24 carati.',
    fullDescription:
      'Centro medico estetico all’avanguardia specializzato in trattamenti non invasivi di ringiovanimento cellulare e benessere olistico. Tecnologie svizzere brevettate, cosmetici a base di estratti di caviale e peptidi biomimetici applicati da medici estetici specializzati.',
    publicPrice: 350,
    vipPrice: 240,
    currency: 'EUR',
    currencySymbol: '€',
    discountPercentage: 31,
    pointsEarned: 720,
    vipPerks: [
      'Check-up cutaneo computerizzato 3D gratuito',
      'Sconto del 31% sul protocollo completo viso e collo',
      'Maschera all’oro 24 carati idratante omaggio post-seduta',
      'Tisana rigenerante e accesso alla private spa della clinica',
    ],
    options: [
      {
        id: 'opt-viso-gold',
        label: 'Trattamento Viso Gold Cellular 75 min',
        priceModifier: 0,
        description: 'Detersione profonda ultrasonica, biorivitalizzazione e oro 24k',
      },
      {
        id: 'opt-full-body',
        label: 'Rituale Viso & Corpo Platinum 120 min',
        priceModifier: 110,
        description: 'Include massaggio decontratturante corpo e drenaggio linfatico',
      },
    ],
    includes: [
      'Trattamento completo eseguito da personale medico',
      'Kit domiciliare di creme siero-filler da viaggio (valore €85)',
      'Parcheggio riservato con servizio valet',
    ],
    terms: 'Valido 12 mesi dalla data di acquisto. Prenotazione flessibile con possibilità di disdetta entro 24 ore.',
  },
];

export const getServiceById = (id: string): ServiceItem | undefined => {
  return SERVICES_CATALOG.find((s) => s.id === id);
};
