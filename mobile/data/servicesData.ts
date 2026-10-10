export type ServiceCategory =
  | 'viaggi'
  | 'fitness'
  | 'moda'
  | 'cosmetica'
  | 'estadias'
  | 'tours'
  | 'traslados'
  | 'streaming';

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
  // 0. ESTADÍAS INCLUIDAS DE MEMBRESÍA ($99 HERO PRODUCT)
  {
    id: 'estadia-cancun',
    category: 'estadias',
    categoryLabel: 'Estadía de Regalo Membresía',
    title: 'Cancún Luxury Beach Resort (5D / 4N)',
    partnerName: 'Cancún Diamond Collection',
    location: 'Zona Hotelera, Cancún, México',
    rating: 5.0,
    reviewsCount: 620,
    image: require('@/assets/images/cancun-resort.jpg'),
    shortDescription: '5 días y 4 noches para 4 personas incluidas con tu membresía anual Gepiclub.',
    fullDescription:
      'Disfruta de las paradisíacas playas de Cancún con tu familia o amigos. Esta estadía para hasta 4 personas está completamente incluida como beneficio de bienvenida al afiliarte a Gepiclub. Suites de lujo frente al mar, piscinas infinitas y acceso exclusivo.',
    publicPrice: 1200,
    vipPrice: 0,
    currency: 'USD',
    currencySymbol: '$',
    discountPercentage: 100,
    pointsEarned: 2400,
    vipPerks: [
      'Estadía completa de 4 noches para hasta 4 personas',
      'Acceso libre a instalaciones de resort 5 estrellas',
      'Asistencia y reserva prioritaria con tu Concierge 24/7',
      'Descuento exclusivo en tours y gastronomía del resort',
    ],
    options: [
      {
        id: 'opt-standard-4p',
        label: 'Suite Familiar (4 Personas)',
        priceModifier: 0,
        description: 'Capacidad para 2 adultos y 2 niños o 4 adultos',
      },
      {
        id: 'opt-all-inclusive-upgrade',
        label: 'Upgrade Plan Todo Incluido Gourmet',
        priceModifier: 190,
        description: 'Bebidas ilimitadas y 6 restaurantes de especialidad por estancia',
      },
    ],
    includes: [
      '4 noches de alojamiento de lujo para 4 personas',
      'WiFi de alta velocidad y acceso a club de playa',
      'Impuestos hoteleros e IVA cubiertos',
      'Concierge personal asignado antes de tu llegada',
    ],
    terms: 'Válido durante todo el año de tu membresía. Fechas sujetas a disponibilidad previa reserva con tu Concierge.',
  },
  {
    id: 'estadia-miami',
    category: 'estadias',
    categoryLabel: 'Estadía de Regalo Membresía',
    title: 'Miami Oceanfront Suites (7D / 6N)',
    partnerName: 'Miami Luxury Bay Suites',
    location: 'South Beach & Sunny Isles, Miami, USA',
    rating: 4.9,
    reviewsCount: 510,
    image: require('@/assets/images/caribbean-resort.jpg'),
    shortDescription: '7 días y 6 noches en Miami Beach para 4 personas incluidas con tu membresía.',
    fullDescription:
      'Vive una semana inolvidable en el corazón del sol de Miami. Suites de diseño contemporáneo a pasos de la arena blanca y la vida cosmopolita de Florida, incluidas para 4 huéspedes con tu membresía Gepiclub.',
    publicPrice: 1600,
    vipPrice: 0,
    currency: 'USD',
    currencySymbol: '$',
    discountPercentage: 100,
    pointsEarned: 3200,
    vipPerks: [
      '6 noches consecutivas para hasta 4 huéspedes',
      'Piscina infinita con vista al océano y gimnasio panorámico',
      'Descuento del 20% en alquiler de autos convertibles y SUV',
      'Check-out extendido sin costo para socios Gepiclub',
    ],
    options: [
      {
        id: 'opt-ocean-suite',
        label: 'Ocean View Suite (4 Huéspedes)',
        priceModifier: 0,
        description: 'Cama King + Sofá cama matrimonial con cocina completa',
      },
    ],
    includes: [
      '6 noches de estancia completa para 4 personas',
      'Acceso privado a playa con sombrillas y toallas',
      'Seguro de viaje nacional en destino',
    ],
    terms: 'Reserva con un mínimo de 15 días de anticipación mediante la línea VIP de tu app o WhatsApp.',
  },
  {
    id: 'estadia-colombia',
    category: 'estadias',
    categoryLabel: 'Estadía de Regalo Membresía',
    title: 'Cartagena de Indias Colonial & Beach (3D / 2N)',
    partnerName: 'Cartagena Heritage Collection',
    location: 'Centro Histórico & Bocagrande, Colombia',
    rating: 4.9,
    reviewsCount: 430,
    image: require('@/assets/images/cruise.jpg'),
    shortDescription: '3 días y 2 noches en la joya colonial del Caribe para 4 personas.',
    fullDescription:
      'La magia de las murallas coloniales, balcones floridos y la brisa caribeña. Tu escapada perfecta a Colombia incluida con tu membresía anual.',
    publicPrice: 650,
    vipPrice: 0,
    currency: 'USD',
    currencySymbol: '$',
    discountPercentage: 100,
    pointsEarned: 1300,
    vipPerks: [
      '2 noches para 4 personas en hotel boutique colonial',
      'Desayuno caribeño gourmet incluido',
      'Paseo privado en coche de caballos al atardecer',
    ],
    options: [
      {
        id: 'opt-colonial-suite',
        label: 'Suite Colonial Familiar (4 Personas)',
        priceModifier: 0,
        description: 'Techos altos, vigas de madera y máximo confort',
      },
    ],
    includes: [
      '2 noches para hasta 4 huéspedes',
      'Cóctel de bienvenida de frutas exóticas',
      'Concierge en español disponible 24/7',
    ],
    terms: 'Canjeable en cualquier momento durante la vigencia de tu membresía activa.',
  },

  // 1. TOURS & EXPERIENCIAS VIP
  {
    id: 'tour-machu-picchu',
    category: 'tours',
    categoryLabel: 'Tours & Experiencias',
    title: 'Machu Picchu VIP & Valle Sagrado',
    partnerName: 'Inca Trail & Heritage Luxury',
    location: 'Cusco & Machu Picchu, Perú',
    rating: 5.0,
    reviewsCount: 780,
    image: require('@/assets/images/machu-picchu.jpg'),
    shortDescription: 'Tren panorámico Vistadome, guía arqueológico privado y entradas VIP.',
    fullDescription:
      'Descubre la maravilla del mundo con el máximo nivel de exclusividad. Recorrido privado sin multitudes, almuerzo gourmet en Belmond Sanctuary Lodge y vistas inolvidables.',
    publicPrice: 380,
    vipPrice: 240,
    currency: 'USD',
    currencySymbol: '$',
    discountPercentage: 37,
    pointsEarned: 480,
    vipPerks: [
      'Guía privado exclusivo para tu grupo',
      'Tickets de tren panorámico ida y vuelta',
      'Almuerzo buffet gourmet en la montaña',
    ],
    options: [
      {
        id: 'opt-expedition',
        label: 'Pase VIP Completo (1 Día)',
        priceModifier: 0,
        description: 'Todo incluido desde tu hotel en Cusco',
      },
    ],
    includes: ['Traslados privados', 'Tickets de ingreso oficiales', 'Guía y almuerzo gourmet'],
    terms: 'Confirmación sujeta a disponibilidad de boletos oficiales del parque.',
  },

  // 2. TRASLADOS & CHAUFFEUR
  {
    id: 'transfer-mercedes-vip',
    category: 'traslados',
    categoryLabel: 'Traslados & Chauffeur',
    title: 'Transfer Ejecutivo Mercedes Clase S / V Aeropuerto',
    partnerName: 'Black Car Executive Mobility',
    location: 'Lima / Madrid / Miami / Venecia',
    rating: 4.9,
    reviewsCount: 290,
    image: require('@/assets/images/hero-luxury.jpg'),
    shortDescription: 'Chofer profesional de traje, espera con cartel y agua mineral premium.',
    fullDescription:
      'Llega a tu destino con tranquilidad total. Flota de vehículos Mercedes Benz de última generación, seguimiento de vuelo en tiempo real y asistencia con tu equipaje.',
    publicPrice: 160,
    vipPrice: 95,
    currency: 'EUR',
    currencySymbol: '€',
    discountPercentage: 40,
    pointsEarned: 190,
    vipPerks: [
      'Espera de hasta 60 minutos en aeropuerto sin costo extra',
      'Vehículo desinfectado con WiFi a bordo y cargadores',
      'Cancelación gratuita hasta 24h antes',
    ],
    options: [
      {
        id: 'opt-sedan',
        label: 'Sedán Ejecutivo (1-3 Pasajeros)',
        priceModifier: 0,
        description: 'Mercedes Clase E o Clase S',
      },
      {
        id: 'opt-van',
        label: 'Van VIP (4-7 Pasajeros)',
        priceModifier: 40,
        description: 'Mercedes Clase V con asientos tipo conferencia',
      },
    ],
    includes: ['Combustible, peajes y chofer privado', 'Seguro de transporte de pasajeros'],
    terms: 'Reserva mínima 12 horas antes de la llegada de tu vuelo.',
  },

  // 3. STREAMING & ENTRETENIMIENTO (VIVE MÁS POR MENOS)
  {
    id: 'streaming-pass-vip',
    category: 'streaming',
    categoryLabel: 'Streaming & Entretenimiento',
    title: 'Pase Global Streaming VIP (Netflix 4K, Disney+, Spotify)',
    partnerName: 'Global Media Network',
    location: 'Acceso Global sin restricciones territoriales',
    rating: 5.0,
    reviewsCount: 890,
    image: require('@/assets/images/flight-window.jpg'),
    shortDescription: 'Cuentas Premium 4K UHD para tus viajes y tu hogar sin anuncios con tarifa de socio.',
    fullDescription:
      'Disfruta de tus películas, series y música favorita en cualquier parte del mundo. Acceso a plataformas líderes de streaming en calidad 4K UHD sin cortes ni restricciones geográficas durante tus traslados y estancias.',
    publicPrice: 180,
    vipPrice: 45,
    currency: 'USD',
    currencySymbol: '$',
    discountPercentage: 75,
    pointsEarned: 220,
    vipPerks: [
      'Acceso 4K HDR ilimitado en hasta 4 pantallas simultáneas',
      'Descarga de contenido offline para vuelos y cruceros',
      'Sin anuncios y con soporte prioritario 24/7',
    ],
    options: [
      {
        id: 'opt-streaming-anual',
        label: 'Pase Anual Completo (12 Meses)',
        priceModifier: 0,
        description: 'Suscripción activa para toda la familia',
      },
    ],
    includes: ['Netflix Premium 4K', 'Disney+ Premium', 'Spotify Premium Individual'],
    terms: 'Activación inmediata mediante tu correo de socio en la aplicación.',
  },
  {
    id: 'starlink-travel-wifi',
    category: 'streaming',
    categoryLabel: 'Conectividad & Streaming Satelital',
    title: 'Starlink In-Flight & Travel WiFi Satelital',
    partnerName: 'Starlink Mobility Global',
    location: 'Cobertura Satelital en Vuelos, Cruceros y Hoteles',
    rating: 4.9,
    reviewsCount: 420,
    image: require('@/assets/images/hero-luxury.jpg'),
    shortDescription: 'Internet satelital de ultra alta velocidad (hasta 220 Mbps) en cualquier rincón del mundo.',
    fullDescription:
      'Mantente conectado y reproduce contenido en streaming en pleno vuelo o en medio del mar. Red satelital de baja órbita con latencia mínima exclusiva para miembros Gepiclub.',
    publicPrice: 120,
    vipPrice: 35,
    currency: 'USD',
    currencySymbol: '$',
    discountPercentage: 70,
    pointsEarned: 180,
    vipPerks: [
      'Velocidad de descarga hasta 220 Mbps con datos ilimitados',
      'Conexión garantizada en más de 120 países y rutas marítimas',
      'Soporte técnico y activación por eSIM digital en 1 toque',
    ],
    options: [
      {
        id: 'opt-starlink-pass',
        label: 'Pase de Viaje 30 Días',
        priceModifier: 0,
        description: 'Válido durante todo tu itinerario internacional',
      },
    ],
    includes: ['eSIM de datos satelitales globales', 'Acceso ilimitado sin roaming'],
    terms: 'Requiere dispositivo compatible con eSIM o módem portátil Gepiclub.',
  },
  {
    id: 'cinema-vip-pass',
    category: 'streaming',
    categoryLabel: 'Cine & Estrenos VIP',
    title: 'Pase Anual Salas de Cine VIP 2x1 & IMAX',
    partnerName: 'Circuito Cine VIP (Cineplanet / Yelmo / UCI)',
    location: 'Perú, España, Italia, México & USA',
    rating: 4.8,
    reviewsCount: 340,
    image: require('@/assets/images/hotel-suite.jpg'),
    shortDescription: 'Entradas 2x1 y butacas reclinables de cuero en salas VIP y premieres exclusivas.',
    fullDescription:
      'Vive el séptimo arte con el máximo confort: butacas ejecutivas reclinables, servicio a la sala de coctelería y barra gourmet, además de entradas 2x1 durante todo el año.',
    publicPrice: 60,
    vipPrice: 18,
    currency: 'USD',
    currencySymbol: '$',
    discountPercentage: 70,
    pointsEarned: 120,
    vipPerks: [
      'Promoción 2x1 todos los días en salas Prime y VIP',
      'Acceso a premieres privadas antes del estreno comercial',
      'Descuento del 30% en confitería gourmet y barra',
    ],
    options: [
      {
        id: 'opt-cine-vip',
        label: 'Membresía Anual 2x1 Cine VIP',
        priceModifier: 0,
        description: 'Válido para hasta 2 personas por función',
      },
    ],
    includes: ['Códigos QR canjeables en taquilla o app de cines aliados'],
    terms: 'Válido de lunes a domingo incluyendo festivos en salas participantes.',
  },

  // 4. HOTELES & RESORTS
  {
    id: 'hotel-cipriani',
    category: 'viaggi',
    categoryLabel: 'Resort & Hotel 5★',
    title: 'Belmond Hotel Cipriani',
    partnerName: 'Belmond Luxury Collection',
    location: 'Isla de la Giudecca, Venecia',
    rating: 5.0,
    reviewsCount: 482,
    image: require('@/assets/images/hotel-suite.jpg'),
    shortDescription: 'Oasis privado con piscina olímpica y vistas privilegiadas a la Plaza San Marcos.',
    fullDescription:
      'Inmerso en jardines exuberantes en la punta de la Isla de la Giudecca, el Hotel Cipriani ofrece un refugio de serenidad absoluta a solo 4 minutos en lancha privada de la Plaza San Marcos. Cocina con estrella Michelin y terrazas sobre la laguna.',
    publicPrice: 1150,
    vipPrice: 890,
    currency: 'EUR',
    currencySymbol: '€',
    discountPercentage: 23,
    pointsEarned: 1780,
    vipPerks: [
      'Upgrade gratuito de habitación garantizado (según disponibilidad)',
      'Desayuno gourmet a la carta incluido para 2 personas',
      '$100 de crédito utilizable en Casanova Spa',
      'Check-in anticipado a las 11:00 y Late check-out a las 16:00',
    ],
    options: [
      {
        id: 'opt-junior',
        label: 'Junior Suite Laguna',
        priceModifier: 0,
        description: 'Amplia habitación con balcón privado sobre el agua',
      },
      {
        id: 'opt-deluxe',
        label: 'Deluxe Suite con Jardín',
        priceModifier: 280,
        description: 'Jardín privado y sala de estar decorada con sedas venecianas',
      },
    ],
    includes: [
      'Estancia de 1 noche para 2 huéspedes',
      'Acceso ilimitado a piscina climatizada con agua de mar',
      'Traslado continuo en lancha privada a San Marcos',
      'Tasa turística y seguro de viaje incluidos',
    ],
    terms: 'Cancelación gratuita hasta 48 horas antes del check-in. Tarifa protegida Gepiclub.',
  },
  {
    id: 'sanctuary-lodge',
    category: 'viaggi',
    categoryLabel: 'Lodge Exclusivo',
    title: 'Sanctuary Lodge, A Belmond Hotel',
    partnerName: 'Belmond Peru Experience',
    location: 'Machu Picchu, Cusco, Perú',
    rating: 4.9,
    reviewsCount: 310,
    image: require('@/assets/images/machu-picchu.jpg'),
    shortDescription: 'El único hotel situado justo a las puertas de la ciudadela sagrada Inca.',
    fullDescription:
      'El único resort contiguo a la entrada de Machu Picchu. Despiértate antes que nadie para contemplar el amanecer sobre las ruinas sin aglomeraciones, masajes con hierbas andinas y alta gastronomía peruana.',
    publicPrice: 980,
    vipPrice: 740,
    currency: 'USD',
    currencySymbol: '$',
    discountPercentage: 25,
    pointsEarned: 1480,
    vipPerks: [
      'Acceso prioritario exclusivo a las ruinas al amanecer',
      'Pensión completa con menú degustación andino',
      'Guía arqueológico privado certificado incluido',
      'Recepción especial con ceremonia tradicional andina',
    ],
    options: [
      {
        id: 'opt-classic',
        label: 'Classic Mountain View',
        priceModifier: 0,
        description: 'Habitación con vista majestuosa a la montaña',
      },
      {
        id: 'opt-terrace',
        label: 'Sanctuary Suite con Terraza',
        priceModifier: 220,
        description: 'Amplia terraza panorámica rodeada de orquídeas silvestres',
      },
    ],
    includes: [
      'Alojamiento para 2 adultos',
      'Todas las comidas (desayuno, almuerzo gourmet, cena)',
      'Excursión privada con guía oficial',
      'Traslado desde/hacia la estación de tren de Aguas Calientes',
    ],
    terms: 'Tarifa prepagada con cambio de fecha gratuito para socios Gepiclub.',
  },
  {
    id: 'volo-business-vce-lim',
    category: 'viaggi',
    categoryLabel: 'Vuelos Internacionales',
    title: 'Vuelo Clase Ejecutiva Lima ⇄ Madrid / Venecia',
    partnerName: 'LATAM Airlines & Iberia Business',
    location: 'LIM Lima Jorge Chávez - MAD Madrid / VCE',
    rating: 4.8,
    reviewsCount: 654,
    image: require('@/assets/images/flight-window.jpg'),
    shortDescription: 'Viaje transatlántico en butaca lie-flat con acceso a salas VIP.',
    fullDescription:
      'Vuela con el máximo confort: asientos completamente reclinables a 180°, menú gourmet diseñado por chefs reconocidos, carta de vinos premium y franquicia de 2 maletas de 32kg.',
    publicPrice: 1290,
    vipPrice: 980,
    currency: 'USD',
    currencySymbol: '$',
    discountPercentage: 24,
    pointsEarned: 1960,
    vipPerks: [
      'Tarifa B2B negociada con descuento exclusivo de socio',
      'Acceso ilimitado a Salones VIP Jorge Chávez y Barajas',
      'Embarque prioritario y Fast Track de seguridad',
      'Cambio de fecha flexible hasta 24h antes del vuelo',
    ],
    options: [
      {
        id: 'opt-biz-standard',
        label: 'Clase Ejecutiva Estándar',
        priceModifier: 0,
        description: 'Asiento cama lie-flat, 2 maletas en bodega de 32kg',
      },
      {
        id: 'opt-biz-flex',
        label: 'Clase Ejecutiva Flex Platinum',
        priceModifier: 150,
        description: 'Reembolso total ante imprevistos y primera fila preferente',
      },
    ],
    includes: [
      'Billete Ida y Vuelta para 1 pasajero',
      'Selección de asiento avanzada sin costo',
      'WiFi satelital a bordo',
      'Seguro de equipaje y conexión garantizada',
    ],
    terms: 'Emisión electrónica inmediata con código PNR confirmado vía WhatsApp por tu Concierge.',
  },

  // 5. FITNESS & BIENESTAR
  {
    id: 'virgin-active-collection',
    category: 'fitness',
    categoryLabel: 'Gimnasios & Spas de Élite',
    title: 'Virgin Active Collection Club & Spa',
    partnerName: 'Virgin Active Premium',
    location: 'Madrid / Milán / Lima Luxury Partners',
    rating: 4.9,
    reviewsCount: 390,
    image: require('@/assets/images/hero-luxury.jpg'),
    shortDescription: 'Membresía All-Inclusive de fitness premium, spa regenerador y piscina.',
    fullDescription:
      'Los Clubes Collection representan la cúspide del bienestar: maquinaria Technogym biomecánica de última generación, clases exclusivas de Reformer Pilates, piscina climatizada, sauna finlandesa y baño turco.',
    publicPrice: 230,
    vipPrice: 160,
    currency: 'USD',
    currencySymbol: '$',
    discountPercentage: 30,
    pointsEarned: 480,
    vipPerks: [
      'Acceso ilimitado a todos los clubes Collection internacionales',
      '2 sesiones al mes con Entrenador Personal certificado',
      'Toalla, bata y kit de cortesía de cortesía en cada visita',
      'Descuento del 20% en masajes y tratamientos de spa',
    ],
    options: [
      {
        id: 'opt-mensile',
        label: 'Pase Mensual Open VIP',
        priceModifier: 0,
        description: 'Acceso completo sin restricciones de horario ni matrícula',
      },
      {
        id: 'opt-trimestrale',
        label: 'Paquete 3 Meses + 5 Entrenamientos Personales',
        priceModifier: 290,
        description: '3 meses completos con 5 sesiones privadas de coaching y nutrición',
      },
    ],
    includes: [
      'Pase digital con ingreso biométrico prioritario',
      'Acceso a spa, sauna, piscina e hidromasaje',
      'Todas las clases grupales (Yoga, Cycling, Pilates, Boxeo)',
      'Casillero personal privado',
    ],
    terms: 'Activación inmediata con posibilidad de congelamiento temporal por viajes.',
  },
  {
    id: 'padel-club-privato',
    category: 'fitness',
    categoryLabel: 'Club Deportivo Exclusivo',
    title: 'Club Privado de Pádel & Tenis Country Club',
    partnerName: 'Grand Slam Country Club',
    location: 'Lima / Madrid / Costa Rica',
    rating: 4.8,
    reviewsCount: 175,
    image: require('@/assets/images/hero-luxury.jpg'),
    shortDescription: 'Pistas panorámicas techadas con iluminación LED y lounge privado.',
    fullDescription:
      'Un entorno refinado y exclusivo para amantes del Pádel y el Tenis. Pistas panorámicas de vidrio sin pilares, iluminación antirreflejo, profesores certificados y Club House con gastronomía de autor.',
    publicPrice: 70,
    vipPrice: 45,
    currency: 'USD',
    currencySymbol: '$',
    discountPercentage: 35,
    pointsEarned: 220,
    vipPerks: [
      'Prioridad de reserva de pistas con hasta 14 días de antelación',
      'Alquiler gratuito de palas de competición Nox/Babolat',
      'Acceso a Club House con cóctel de bienvenida',
      'Vestuarios privados con sauna finlandesa',
    ],
    options: [
      {
        id: 'opt-partita',
        label: 'Partido 90 Minutos + Equipamiento',
        priceModifier: 0,
        description: 'Pista reservada por 90 minutos con pelotas y palas premium',
      },
    ],
    includes: [
      'Reserva de pista para 4 jugadores',
      'Vestuarios privados con toallas',
      'Agua mineral e isotónicos incluidos',
      'Estacionamiento privado vigilado',
    ],
    terms: 'Cancelación con reprogramación hasta 12 horas antes del horario reservado.',
  },

  // 6. MODA & BOUTIQUE
  {
    id: 'sartoria-veneta',
    category: 'moda',
    categoryLabel: 'Alta Sastrería & Moda',
    title: 'Atelier de Sastrería Bespoke a Medida',
    partnerName: 'Atelier Sartoria 1928',
    location: 'Madrid / Milán / Lima Atelier',
    rating: 5.0,
    reviewsCount: 140,
    image: require('@/assets/images/madrid.jpg'),
    shortDescription: 'Trajes y camisas a medida confeccionados a mano con los mejores tejidos del mundo.',
    fullDescription:
      'Tradición sartorial artesanal sin concesiones. Cada prenda se elabora a medida con más de 40 mediciones anatómicas, empleando telas Loro Piana, Zegna y Holland & Sherry. Botones de nácar natural y forros de pura seda.',
    publicPrice: 1950,
    vipPrice: 1400,
    currency: 'USD',
    currencySymbol: '$',
    discountPercentage: 28,
    pointsEarned: 2800,
    vipPerks: [
      'Descuento exclusivo de socio del 28% en catálogo bespoke',
      'Cita privada con el Maestro Sastre a domicilio o en hotel',
      'Camisa de algodón egipcio Giza 87 incluida en el paquete',
      'Portatrajes de viaje de cuero genuino de regalo',
    ],
    options: [
      {
        id: 'opt-abito-2pz',
        label: 'Traje Completo 2 Piezas (Chaqueta + Pantalón)',
        priceModifier: 0,
        description: 'Tejido 100% Lana Merino Super 150s o Cashmere a elección',
      },
      {
        id: 'opt-abito-3pz',
        label: 'Traje 3 Piezas con Chaleco y 2 Camisas',
        priceModifier: 350,
        description: 'Traje ceremonial o de negocios con chaleco sartorial a juego',
      },
    ],
    includes: [
      '2 sesiones de prueba personalizadas',
      'Ajustes de sastrería de por vida gratuitos',
      'Bordado de iniciales personalizado a mano',
      'Entrega express garantizada en 15 días',
    ],
    terms: 'Garantía de ajuste perfecto al 100%. Modificaciones sin costo hasta plena satisfacción.',
  },

  // 7. COSMÉTICA & ESTÉTICA
  {
    id: 'clinica-med-spa',
    category: 'cosmetica',
    categoryLabel: 'Med-Beauty & Estética Avanzada',
    title: 'Clínica Med-Spa Platinum Rejuvenation',
    partnerName: 'Swiss Platinum Aesthetic Clinic',
    location: 'Madrid / Lima / Miami Clinics',
    rating: 4.9,
    reviewsCount: 288,
    image: require('@/assets/images/hero-luxury.jpg'),
    shortDescription: 'Protocolos antiedad avanzados, oxigenoterapia hiperbárica y oro de 24 quilates.',
    fullDescription:
      'Centro médico estético de vanguardia especializado en tratamientos no invasivos de rejuvenecimiento celular y bienestar integral. Tecnologías patentadas, cosmética con extracto de caviar y péptidos biomiméticos aplicados por médicos especialistas.',
    publicPrice: 350,
    vipPrice: 240,
    currency: 'USD',
    currencySymbol: '$',
    discountPercentage: 31,
    pointsEarned: 720,
    vipPerks: [
      'Diagnóstico cutáneo computarizado 3D gratuito',
      'Descuento del 31% en protocolo completo rostro y cuello',
      'Mascarilla de oro de 24 quilates de regalo post-sesión',
      'Infusión regeneradora y acceso al spa privado de la clínica',
    ],
    options: [
      {
        id: 'opt-viso-gold',
        label: 'Tratamiento Facial Gold Cellular 75 min',
        priceModifier: 0,
        description: 'Limpieza ultrasónica profunda, bioestimulación y oro 24k',
      },
      {
        id: 'opt-full-body',
        label: 'Ritual Facial & Corporal Platinum 120 min',
        priceModifier: 110,
        description: 'Incluye masaje descontracturante corporal y drenaje linfático',
      },
    ],
    includes: [
      'Tratamiento completo realizado por personal médico',
      'Kit domiciliario de sérum y crema antiedad de viaje',
      'Estacionamiento reservado con servicio valet',
    ],
    terms: 'Válido durante 12 meses. Reserva flexible con reprogramación hasta 24 horas antes.',
  },
];

export const getServiceById = (id: string): ServiceItem | undefined => {
  return SERVICES_CATALOG.find((s) => s.id === id);
};
