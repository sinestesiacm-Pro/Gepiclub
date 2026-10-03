/**
 * Gepi Club Travel - Multi-Service Search Engine
 * High-End Luxury Agency Architecture
 */

class SearchEngine {
  constructor() {
    this.currentTab = 'vuelos';
    this.currentCurrency = localStorage.getItem('gepi_currency') || 'USD';
    this.exchangeRate = 3.75; // 1 USD = 3.75 PEN
    
    // Curated Luxury Catalog
    this.catalog = {
      hoteles: [
        {
          id: 'HT-01',
          name: 'Grand Fiesta Americana Coral Beach',
          location: 'Cancún, México — Zona Hotelera',
          stars: 5,
          image: 'assets/images/cancun-resort.jpg',
          rating: 4.9,
          reviewsCount: 342,
          tag: 'Todo Incluido Luxury',
          amenities: ['Frente al mar', 'Piscina infinita', 'Spa de clase mundial', '7 Restaurantes gourmet'],
          pricePerNightUsd: 280,
          clubPricePerNightUsd: 225,
          savingsUsd: 55,
          includes: 'Habitación Suite vista mar, desayunos, almuerzos, cenas a la carta y bebidas premium ilimitadas.',
          notIncludes: 'Propinas adicionales, traslados privados no especificados.'
        },
        {
          id: 'HT-02',
          name: 'JW Marriott Hotel Lima',
          location: 'Miraflores, Lima — Malecón de la Reserva',
          stars: 5,
          image: 'assets/images/hotel-suite.jpg',
          rating: 4.8,
          reviewsCount: 512,
          tag: 'Vista Panorámica al Pacífico',
          amenities: ['Vista al mar', 'Piscina temperada', 'Restaurante Nikkei', 'Wellness Center'],
          pricePerNightUsd: 210,
          clubPricePerNightUsd: 165,
          savingsUsd: 45,
          includes: 'Alojamiento en Habitación Deluxe, desayuno buffet incluido en restaurante La Vista.',
          notIncludes: 'Consumos de minibar, llamadas internacionales.'
        },
        {
          id: 'HT-03',
          name: 'Palacio del Inka, A Luxury Collection Hotel',
          location: 'Centro Histórico, Cusco',
          stars: 5,
          image: 'assets/images/machu-picchu.jpg',
          rating: 4.95,
          reviewsCount: 680,
          tag: 'Patrimonio Histórico',
          amenities: ['Oxigenación en habitación', 'Spa Inti Raymi', 'Patio colonial', 'Concierge histórico'],
          pricePerNightUsd: 295,
          clubPricePerNightUsd: 235,
          savingsUsd: 60,
          includes: 'Desayuno buffet andino, tour histórico guiado por el convento y palacio colonial.',
          notIncludes: 'Tours adicionales a sitios arqueológicos fuera de la propiedad.'
        },
        {
          id: 'HT-04',
          name: 'Fontainebleau Miami Beach',
          location: 'Miami Beach, Florida, EE.UU.',
          stars: 5,
          image: 'assets/images/hotel-suite.jpg',
          rating: 4.7,
          reviewsCount: 890,
          tag: 'Icono de Miami',
          amenities: ['Acceso directo a playa', 'Piscinas de diseño', 'LIV Nightclub', 'Lapis Spa'],
          pricePerNightUsd: 340,
          clubPricePerNightUsd: 275,
          savingsUsd: 65,
          includes: 'Acceso completo a piscinas, sombrillas y servicio de playa.',
          notIncludes: 'Resort fee obligatorio y valet parking.'
        }
      ],
      paquetes: [
        {
          id: 'PKG-01',
          title: 'Cancún Paradisíaco Todo Incluido',
          duration: '5 Días / 4 Noches',
          destination: 'Cancún y Riviera Maya, México',
          image: 'assets/images/caribbean-resort.jpg',
          featuredTag: 'Experiencia Héroe',
          priceUsd: 899,
          clubPriceUsd: 749,
          savingsUsd: 150,
          highlights: ['Vuelos directos desde Lima', 'Resort 5 estrellas All Inclusive', 'Traslados aeropuerto-hotel', 'Excursión a Isla Mujeres'],
          includes: 'Boleto aéreo Lima-Cancún-Lima con equipaje, 4 noches en resort 5 estrellas todo incluido, alimentación gourmet ilimitada, traslados in/out y cobertura médica internacional.',
          notIncludes: 'Tasa ambiental municipal de Quintana Roo (~$4 USD/noche), gastos personales.'
        },
        {
          id: 'PKG-02',
          title: 'Miami & Orlando Magic Experience',
          duration: '7 Días / 6 Noches',
          destination: 'Florida, Estados Unidos',
          image: 'assets/images/hero-family.jpg',
          featuredTag: 'Viaje Familiar Exclusivo',
          priceUsd: 1250,
          clubPriceUsd: 1050,
          savingsUsd: 200,
          highlights: ['Vuelos con aerolíneas de primer nivel', 'Hoteles 4 estrellas superiores', 'Auto de alquiler categoría SUV', 'Pases a parques temáticos'],
          includes: 'Vuelo internacional, 3 noches en Miami Beach + 3 noches en Orlando, auto compacto con seguros básicos, asistencia médica internacional 24h.',
          notIncludes: 'Combustible, peajes SunPass, trámite de visa americana (requerida).'
        },
        {
          id: 'PKG-03',
          title: 'Cartagena & Islas del Rosario',
          duration: '4 Días / 3 Noches',
          destination: 'Cartagena de Indias, Colombia',
          image: 'assets/images/cruise.jpg',
          featuredTag: 'Escapada del Caribe',
          priceUsd: 580,
          clubPriceUsd: 460,
          savingsUsd: 120,
          highlights: ['Vuelos directos seleccionados', 'Hotel boutique Ciudad Amurallada', 'Día de club de playa en Barú', 'Tour cultural guiado'],
          includes: 'Pasajes aéreos ida y vuelta, desayunos diarios, tour a las Islas del Rosario en lancha rápida, asistencia de viaje.',
          notIncludes: 'Impuestos de muelle de Cartagena (~$6 USD), cenas no detalladas.'
        },
        {
          id: 'PKG-04',
          title: 'Cusco Imperial & Machu Picchu VIP',
          duration: '4 Días / 3 Noches',
          destination: 'Cusco, Valle Sagrado y Machu Picchu',
          image: 'assets/images/machu-picchu.jpg',
          featuredTag: 'Maravilla del Mundo',
          priceUsd: 490,
          clubPriceUsd: 395,
          savingsUsd: 95,
          highlights: ['Vuelos Lima-Cusco-Lima', 'Tren Panorámico Vistadome', 'Boleto circuito Machu Picchu', 'Guía privado en español'],
          includes: 'Vuelos internos, 3 noches en hotel 4★ con oxígeno y desayuno, tren turístico ida y vuelta, bus Consettur, ticket de ingreso a Llaqta Machu Picchu, guía profesional y traslados.',
          notIncludes: 'Alimentación no descrita, propinas al guía.'
        }
      ],
      cruceros: [
        {
          id: 'CR-01',
          name: 'Caribe Tropical & Bahamas Luxury',
          line: 'Royal Caribbean International',
          ship: 'Wonder of the Seas',
          duration: '8 Días / 7 Noches',
          departurePort: 'Puerto de Miami, Florida',
          image: 'assets/images/cruise.jpg',
          ports: 'Miami — CocoCay Bahamas — Cozumel — Roatán — Costa Maya',
          priceUsd: 820,
          clubPriceUsd: 690,
          savingsUsd: 130,
          includes: 'Camarote con balcón exterior, todas las comidas gourmet a bordo, entretenimiento de clase mundial y solarium para adultos.',
          notIncludes: 'Propinas reglamentarias a bordo ($18 USD/día por persona), paquete de bebidas alcohólicas.'
        },
        {
          id: 'CR-02',
          name: 'Mediterráneo Clásico & Joyas de Europa',
          line: 'MSC Cruceros',
          ship: 'MSC World Europa',
          duration: '8 Días / 7 Noches',
          departurePort: 'Puerto de Barcelona, España',
          image: 'assets/images/cruise.jpg',
          ports: 'Barcelona — Marsella — Génova — Nápoles — Mesina — La Valeta',
          priceUsd: 950,
          clubPriceUsd: 799,
          savingsUsd: 151,
          includes: 'Pensión completa con gastronomía mediterránea, espectáculos teatrales, piscinas y solarium panorámico.',
          notIncludes: 'Vuelos intercontinentales a Europa, cuota de servicio de hotel a bordo.'
        }
      ],
      tours: [
        {
          id: 'TR-01',
          title: 'Machu Picchu Full Day en Tren Panorámico',
          location: 'Cusco, Perú',
          duration: 'Día Completo (Full Day)',
          image: 'assets/images/machu-picchu.jpg',
          category: 'Cultura & Patrimonio',
          priceUsd: 260,
          clubPriceUsd: 215,
          savingsUsd: 45,
          includes: 'Recojo en hotel de Cusco, tren Voyager/Expedition ida y retorno, bus ecológico Consettur, ticket oficial de ingreso a Machu Picchu y guía privado.',
          notIncludes: 'Almuerzo en Aguas Calientes (disponible como upgrade).'
        },
        {
          id: 'TR-02',
          title: 'Montaña de 7 Colores (Vinicunca) & Valle Rojo',
          location: 'Cusco, Perú',
          duration: '1 Día (04:00 — 16:30)',
          image: 'assets/images/machu-picchu.jpg',
          category: 'Aventura & Naturaleza',
          priceUsd: 65,
          clubPriceUsd: 48,
          savingsUsd: 17,
          includes: 'Transporte turístico privado ida y vuelta, desayuno buffet andino, almuerzo novoandino, bastones de trekking, botiquín con oxígeno medicinal y guía oficial.',
          notIncludes: 'Boleto de entrada comunal, alquiler de caballo opcional.'
        },
        {
          id: 'TR-03',
          title: 'Paracas, Islas Ballestas & Oasis de Huacachina',
          location: 'Ica, Perú',
          duration: 'Full Day desde Lima',
          image: 'assets/images/hero-family.jpg',
          category: 'Naturaleza & Dunas',
          priceUsd: 95,
          clubPriceUsd: 75,
          savingsUsd: 20,
          includes: 'Movilidad privada con aire acondicionado desde Lima, lancha rápida a Islas Ballestas, tubulares y sandboarding en Huacachina, cata guiada.',
          notIncludes: 'Tasa de muelle SERNANP (S/ 16).'
        }
      ]
    };
  }

  // Vector SVG helper utilities
  svgStar(filled = true) {
    return `<svg class="star-icon ${filled ? 'filled' : ''}" width="16" height="16" viewBox="0 0 24 24" fill="${filled ? '#F59E0B' : 'none'}" stroke="#F59E0B" stroke-width="1.8"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>`;
  }

  svgCheck() {
    return `<svg class="check-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>`;
  }

  svgPlane() {
    return `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/></svg>`;
  }

  setCurrency(curr) {
    this.currentCurrency = curr;
    localStorage.setItem('gepi_currency', curr);
    document.querySelectorAll('.currency-symbol').forEach(el => {
      el.textContent = curr === 'PEN' ? 'S/' : (curr === 'EUR' ? '€' : '$');
    });
    document.querySelectorAll('.currency-code').forEach(el => {
      el.textContent = curr;
    });
    const currencySelect = document.getElementById('currency-selector');
    if (currencySelect && currencySelect.value !== curr) {
      currencySelect.value = curr;
    }
    document.querySelectorAll('.currency-pill-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.cur === curr);
    });
    this.renderCurrentResults();
  }

  formatPrice(usdAmount) {
    if (this.currentCurrency === 'PEN') {
      const pen = Math.round(usdAmount * this.exchangeRate);
      return `S/ ${pen.toLocaleString('es-PE')}`;
    }
    return `$ ${Math.round(usdAmount).toLocaleString('en-US')}`;
  }

  setActiveTab(tabName) {
    this.currentTab = tabName;
    document.querySelectorAll('.search-tab-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.tab === tabName);
    });
    document.querySelectorAll('.search-panel-form').forEach(form => {
      form.classList.toggle('active', form.dataset.tab === tabName);
    });
  }

  /**
   * Execute flight search using verified GDS data engine
   */
  async executeFlightSearch(formData) {
    const resultsContainer = document.getElementById('search-results-section');
    const resultsList = document.getElementById('results-list');
    const resultsTitle = document.getElementById('results-heading');
    const resultsBadge = document.getElementById('results-badge');
    const loadingIndicator = document.getElementById('results-loading');

    if (!resultsContainer || !resultsList) return;

    resultsContainer.classList.remove('hidden');
    resultsContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
    loadingIndicator.classList.remove('hidden');
    resultsList.innerHTML = '';
    resultsTitle.textContent = `Buscando itinerarios: ${formData.origin} — ${formData.destination}`;
    resultsBadge.textContent = 'Verificando asientos y tarifas disponibles...';

    try {
      const searchRes = await window.gepiAmadeusService.searchFlightOffers({
        originLocationCode: formData.origin,
        destinationLocationCode: formData.destination,
        departureDate: formData.departureDate,
        returnDate: formData.returnDate,
        adults: parseInt(formData.adults, 10) || 1,
        travelClass: formData.travelClass || 'ECONOMY',
        currencyCode: this.currentCurrency
      });

      this.lastFlightResults = searchRes.results;
      loadingIndicator.classList.add('hidden');
      
      resultsTitle.textContent = `Vuelos disponibles: ${formData.origin} a ${formData.destination}`;
      resultsBadge.innerHTML = `<span class="badge-verified-dot"></span> Tarifas en tiempo real (${searchRes.results.length} opciones)`;

      this.renderFlightCards(searchRes.results);
    } catch (err) {
      loadingIndicator.classList.add('hidden');
      resultsTitle.textContent = 'No fue posible completar la consulta';
      resultsList.innerHTML = `
        <div class="search-empty-state">
          <p>Se produjo una interrupción en el enlace de datos. Por favor, comunícate con un asesor.</p>
          <button class="btn btn-primary mt-3" onclick="window.gepiApp.openAdvisorModal('Consulta de Vuelo')">
            Hablar con Concierge Gepi
          </button>
        </div>
      `;
    }
  }

  renderFlightCards(flights) {
    const resultsList = document.getElementById('results-list');
    if (!resultsList) return;

    if (!flights || flights.length === 0) {
      resultsList.innerHTML = `
        <div class="search-empty-state">
          <h3>No se encontraron vuelos para la fecha solicitada</h3>
          <p>Un concierge de Gepi Travel puede cotizar conexiones alternativas con disponibilidad inmediata.</p>
          <button class="btn btn-primary" onclick="window.gepiApp.openAdvisorModal('Vuelos a medida')">
            Contactar a Concierge
          </button>
        </div>
      `;
      return;
    }

    resultsList.innerHTML = flights.map(flight => {
      const price = this.currentCurrency === 'PEN' ? flight.basePricePen : flight.basePriceUsd;
      const clubPrice = this.currentCurrency === 'PEN' ? flight.clubPricePen : flight.clubPriceUsd;
      const savings = this.currentCurrency === 'PEN' ? (flight.basePricePen - flight.clubPricePen) : flight.clubSavingsUsd;
      const symbol = this.currentCurrency === 'PEN' ? 'S/' : '$';

      return `
        <div class="flight-result-card" data-flight-id="${flight.id}">
          <div class="flight-card-main">
            <!-- Airline Info -->
            <div class="flight-airline">
              <div class="airline-brand-badge">${flight.airlineName.split(' ')[0]}</div>
              <div class="airline-meta">
                <strong class="airline-name">${flight.airlineName}</strong>
                <span class="flight-number">${flight.flightNumber} • Clase ${flight.cabinClass === 'BUSINESS' ? 'Ejecutiva' : 'Económica'}</span>
              </div>
            </div>

            <!-- Times & Route -->
            <div class="flight-times-route">
              <div class="time-point">
                <span class="time-large">${flight.departureTime}</span>
                <span class="iata-code">${flight.origin}</span>
                <span class="city-name">${flight.originCity}</span>
              </div>

              <div class="flight-middle-path">
                <span class="flight-duration">${flight.duration}</span>
                <div class="path-visual">
                  <span class="path-dot"></span>
                  <span class="path-line"></span>
                  <span class="path-plane-icon">${this.svgPlane()}</span>
                  <span class="path-line"></span>
                  <span class="path-dot"></span>
                </div>
                <span class="flight-stops ${flight.stops === 0 ? 'text-success' : 'text-neutral'}">
                  ${flight.stopsText}
                </span>
              </div>

              <div class="time-point">
                <span class="time-large">${flight.arrivalTime}</span>
                <span class="iata-code">${flight.destination}</span>
                <span class="city-name">${flight.destinationCity}</span>
              </div>
            </div>

            <!-- Inclusions -->
            <div class="flight-amenities-pill">
              <span class="amenity-item">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="icon-inline"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>
                ${flight.baggage}
              </span>
              <span class="amenity-item">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="icon-inline"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
                Asistencia de viaje elegible
              </span>
              <span class="amenity-item">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="icon-inline"><polyline points="20 6 9 17 4 12"></polyline></svg>
                Confirmación Inmediata
              </span>
            </div>
          </div>

          <!-- Price & Booking Action -->
          <div class="flight-card-pricing">
            <span class="price-header-tag">Tarifa Negociada</span>
            <div class="regular-price">
              Público: <del>${symbol} ${price.toLocaleString()}</del>
            </div>
            <div class="club-price-box">
              <span class="club-tag">Tarifa Gepi Travel</span>
              <div class="club-amount">
                ${symbol} ${clubPrice.toLocaleString()}
              </div>
              <span class="club-savings-alert">Ahorro: ${symbol} ${savings.toLocaleString()}</span>
            </div>

            <button class="btn btn-primary btn-block mt-2" onclick="window.gepiSearchEngine.openBookingModal('vuelo', '${flight.id}')">
              Reservar Tarifa
            </button>
            <button class="btn btn-outline-navy btn-sm btn-block mt-1" onclick="window.gepiApp.openWhatsAppInquiry('Vuelo ${flight.flightNumber}: ${flight.origin} a ${flight.destination}')">
              Consultar con Asesor
            </button>
          </div>
        </div>
      `;
    }).join('');
  }

  /**
   * Search Hotels
   */
  executeHotelSearch(destination) {
    const resultsContainer = document.getElementById('search-results-section');
    const resultsList = document.getElementById('results-list');
    const resultsTitle = document.getElementById('results-heading');
    const resultsBadge = document.getElementById('results-badge');
    const loadingIndicator = document.getElementById('results-loading');

    resultsContainer.classList.remove('hidden');
    resultsContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
    loadingIndicator.classList.remove('hidden');
    resultsList.innerHTML = '';

    setTimeout(() => {
      loadingIndicator.classList.add('hidden');
      const filtered = this.catalog.hoteles;
      resultsTitle.textContent = `Alojamiento 4 y 5 Estrellas`;
      resultsBadge.textContent = `${filtered.length} hoteles con tarifa preferencial`;

      resultsList.innerHTML = filtered.map(hotel => {
        const starsHtml = Array.from({ length: hotel.stars }).map(() => this.svgStar(true)).join('');
        return `
          <div class="service-card hotel-card">
            <div class="card-img-wrapper">
              <img src="${hotel.image}" alt="${hotel.name}" loading="lazy">
              <span class="card-badge-floating">${hotel.tag}</span>
            </div>
            <div class="card-content">
              <div class="rating-stars">
                ${starsHtml}
                <span class="rating-text">(${hotel.rating} / 5 • ${hotel.reviewsCount} opiniones)</span>
              </div>
              <h3 class="card-title">${hotel.name}</h3>
              <p class="card-location">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="icon-inline"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                ${hotel.location}
              </p>
              
              <div class="amenities-tags">
                ${hotel.amenities.map(a => `<span class="badge-amenity">${this.svgCheck()} ${a}</span>`).join('')}
              </div>

              <div class="card-policy-box">
                <p><strong>Incluye:</strong> ${hotel.includes}</p>
                <p class="text-muted"><strong>No incluye:</strong> ${hotel.notIncludes}</p>
              </div>

              <div class="card-pricing-footer">
                <div class="price-col">
                  <span class="price-label">Por noche desde</span>
                  <div class="price-values">
                    <del class="text-muted">${this.formatPrice(hotel.pricePerNightUsd)}</del>
                    <strong class="price-club-highlight">${this.formatPrice(hotel.clubPricePerNightUsd)}</strong>
                  </div>
                  <span class="savings-pill">Ahorro: ${this.formatPrice(hotel.savingsUsd)}</span>
                </div>
                <button class="btn btn-primary" onclick="window.gepiSearchEngine.openBookingModal('hotel', '${hotel.id}')">
                  Reservar Hotel
                </button>
              </div>
            </div>
          </div>
        `;
      }).join('');
    }, 350);
  }

  /**
   * Search Packages
   */
  executePackageSearch() {
    const resultsContainer = document.getElementById('search-results-section');
    const resultsList = document.getElementById('results-list');
    const resultsTitle = document.getElementById('results-heading');
    const resultsBadge = document.getElementById('results-badge');
    const loadingIndicator = document.getElementById('results-loading');

    resultsContainer.classList.remove('hidden');
    resultsContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
    loadingIndicator.classList.remove('hidden');
    resultsList.innerHTML = '';

    setTimeout(() => {
      loadingIndicator.classList.add('hidden');
      const packages = this.catalog.paquetes;
      resultsTitle.textContent = `Paquetes Todo Incluido`;
      resultsBadge.textContent = `${packages.length} experiencias disponibles`;

      resultsList.innerHTML = packages.map(pkg => {
        return `
          <div class="service-card package-card">
            <div class="card-img-wrapper">
              <img src="${pkg.image}" alt="${pkg.title}" loading="lazy">
              <span class="card-badge-floating">${pkg.featuredTag}</span>
              <span class="card-duration-badge">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="icon-inline"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                ${pkg.duration}
              </span>
            </div>
            <div class="card-content">
              <h3 class="card-title">${pkg.title}</h3>
              <p class="card-location">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="icon-inline"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                ${pkg.destination}
              </p>
              
              <ul class="highlights-list">
                ${pkg.highlights.map(h => `<li>${this.svgCheck()} ${h}</li>`).join('')}
              </ul>

              <div class="card-policy-box">
                <p><strong>Qué incluye:</strong> ${pkg.includes}</p>
                <p class="text-muted"><strong>No incluye:</strong> ${pkg.notIncludes}</p>
              </div>

              <div class="card-pricing-footer">
                <div class="price-col">
                  <span class="price-label">Precio por persona</span>
                  <div class="price-values">
                    <del class="text-muted">${this.formatPrice(pkg.priceUsd)}</del>
                    <strong class="price-club-highlight">${this.formatPrice(pkg.clubPriceUsd)}</strong>
                  </div>
                  <span class="savings-pill">Ahorro: ${this.formatPrice(pkg.savingsUsd)}</span>
                </div>
                <button class="btn btn-primary" onclick="window.gepiSearchEngine.openBookingModal('paquete', '${pkg.id}')">
                  Ver Paquete & Reservar
                </button>
              </div>
            </div>
          </div>
        `;
      }).join('');
    }, 350);
  }

  /**
   * Search Cruises
   */
  executeCruiseSearch() {
    const resultsContainer = document.getElementById('search-results-section');
    const resultsList = document.getElementById('results-list');
    const resultsTitle = document.getElementById('results-heading');
    const resultsBadge = document.getElementById('results-badge');
    const loadingIndicator = document.getElementById('results-loading');

    resultsContainer.classList.remove('hidden');
    resultsContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
    loadingIndicator.classList.remove('hidden');
    resultsList.innerHTML = '';

    setTimeout(() => {
      loadingIndicator.classList.add('hidden');
      const cruises = this.catalog.cruceros;
      resultsTitle.textContent = `Cruceros Internacionales`;
      resultsBadge.textContent = 'Cabinas seleccionadas con tarifas negociadas';

      resultsList.innerHTML = cruises.map(cr => {
        return `
          <div class="service-card cruise-card">
            <div class="card-img-wrapper">
              <img src="${cr.image}" alt="${cr.name}" loading="lazy">
              <span class="card-badge-floating">${cr.line}</span>
              <span class="card-duration-badge">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="icon-inline"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                ${cr.duration}
              </span>
            </div>
            <div class="card-content">
              <h3 class="card-title">${cr.name}</h3>
              <p class="card-location">Barco: ${cr.ship} • Embarque: ${cr.departurePort}</p>
              <p class="cruise-route"><strong>Itinerario:</strong> ${cr.ports}</p>

              <div class="card-policy-box">
                <p><strong>Incluye:</strong> ${cr.includes}</p>
                <p class="text-muted"><strong>No incluye:</strong> ${cr.notIncludes}</p>
              </div>

              <div class="card-pricing-footer">
                <div class="price-col">
                  <span class="price-label">Desde por cabina</span>
                  <div class="price-values">
                    <del class="text-muted">${this.formatPrice(cr.priceUsd)}</del>
                    <strong class="price-club-highlight">${this.formatPrice(cr.clubPriceUsd)}</strong>
                  </div>
                  <span class="savings-pill">Ahorro: ${this.formatPrice(cr.savingsUsd)}</span>
                </div>
                <button class="btn btn-primary" onclick="window.gepiSearchEngine.openBookingModal('crucero', '${cr.id}')">
                  Cotizar Crucero
                </button>
              </div>
            </div>
          </div>
        `;
      }).join('');
    }, 350);
  }

  /**
   * Search Tours
   */
  executeTourSearch() {
    const resultsContainer = document.getElementById('search-results-section');
    const resultsList = document.getElementById('results-list');
    const resultsTitle = document.getElementById('results-heading');
    const resultsBadge = document.getElementById('results-badge');
    const loadingIndicator = document.getElementById('results-loading');

    resultsContainer.classList.remove('hidden');
    resultsContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
    loadingIndicator.classList.remove('hidden');
    resultsList.innerHTML = '';

    setTimeout(() => {
      loadingIndicator.classList.add('hidden');
      const tours = this.catalog.tours;
      resultsTitle.textContent = `Excursiones y Experiencias`;
      resultsBadge.textContent = `${tours.length} expediciones guiadas`;

      resultsList.innerHTML = tours.map(tour => {
        return `
          <div class="service-card tour-card">
            <div class="card-img-wrapper">
              <img src="${tour.image}" alt="${tour.title}" loading="lazy">
              <span class="card-badge-floating">${tour.category}</span>
              <span class="card-duration-badge">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="icon-inline"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                ${tour.duration}
              </span>
            </div>
            <div class="card-content">
              <h3 class="card-title">${tour.title}</h3>
              <p class="card-location">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="icon-inline"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                ${tour.location}
              </p>

              <div class="card-policy-box">
                <p><strong>Incluye:</strong> ${tour.includes}</p>
                <p class="text-muted"><strong>No incluye:</strong> ${tour.notIncludes}</p>
              </div>

              <div class="card-pricing-footer">
                <div class="price-col">
                  <span class="price-label">Precio por persona</span>
                  <div class="price-values">
                    <del class="text-muted">${this.formatPrice(tour.priceUsd)}</del>
                    <strong class="price-club-highlight">${this.formatPrice(tour.clubPriceUsd)}</strong>
                  </div>
                  <span class="savings-pill">Ahorro: ${this.formatPrice(tour.savingsUsd)}</span>
                </div>
                <button class="btn btn-primary" onclick="window.gepiSearchEngine.openBookingModal('tour', '${tour.id}')">
                  Reservar Tour
                </button>
              </div>
            </div>
          </div>
        `;
      }).join('');
    }, 350);
  }

  renderHotelCards(hotels) {
    const list = document.getElementById('results-list');
    if (!list) return;
    const items = hotels || this.catalog.hoteles;
    const symbol = this.currentCurrency === 'PEN' ? 'S/' : '$';
    const rate = this.currentCurrency === 'PEN' ? this.exchangeRate : 1;

    list.innerHTML = items.map(hotel => {
      const publicPrice = Math.round(hotel.pricePerNightUsd * rate);
      const clubPrice = Math.round(hotel.clubPricePerNightUsd * rate);
      const savings = publicPrice - clubPrice;
      const starsHtml = Array(hotel.stars).fill(0).map(() => this.svgStar(true)).join('');

      return `
        <article class="service-result-card" data-id="${hotel.id}">
          <div class="service-card-media">
            <img src="${hotel.image}" alt="${hotel.name}" class="service-card-img" loading="lazy">
            <span class="service-floating-badge">${hotel.tag}</span>
          </div>
          <div class="service-card-content">
            <div>
              <div class="service-header-meta">
                <span class="service-category-tag">Hotel 5★ Gran Lujo</span>
                <div class="service-rating-stars">${starsHtml}</div>
                <span class="service-reviews-text">(${hotel.reviewsCount} opiniones)</span>
              </div>
              <h3 class="service-card-title">${hotel.name}</h3>
              <div class="service-location-row">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                <span>${hotel.location}</span>
              </div>
              <div class="service-features-list">
                ${hotel.amenities.map(a => `<span class="service-feature-pill">${a}</span>`).join('')}
              </div>
            </div>
            <div class="service-inclusions-box">
              <strong>${this.svgCheck()} Incluye:</strong> ${hotel.includes}
            </div>
          </div>
          <div class="service-card-pricing">
            <span class="price-header-tag">Tarifa por Noche</span>
            <div class="regular-price">Público: <del>${symbol} ${publicPrice.toLocaleString()}</del></div>
            <div class="club-price-box">
              <span class="club-tag">Tarifa Gepiclub</span>
              <div class="club-amount">${symbol} ${clubPrice.toLocaleString()}</div>
              <span class="club-savings-alert">Ahorro: ${symbol} ${savings.toLocaleString()} / noche</span>
            </div>
            <button class="btn btn-primary btn-block" onclick="window.gepiSearchEngine.openBookingModal('hotel', '${hotel.id}')">
              Reservar Tarifa
            </button>
            <button class="btn btn-outline-navy btn-block" onclick="window.gepiApp.openWhatsAppInquiry('Hotel: ${hotel.name}')">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="icon-inline"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
              Consultar con Asesor
            </button>
          </div>
        </article>
      `;
    }).join('');
  }

  renderPackageCards(packages) {
    const list = document.getElementById('results-list');
    if (!list) return;
    const items = packages || this.catalog.paquetes;
    const symbol = this.currentCurrency === 'PEN' ? 'S/' : '$';
    const rate = this.currentCurrency === 'PEN' ? this.exchangeRate : 1;

    list.innerHTML = items.map(pkg => {
      const publicPrice = Math.round(pkg.priceUsd * rate);
      const clubPrice = Math.round(pkg.clubPriceUsd * rate);
      const savings = publicPrice - clubPrice;

      return `
        <article class="service-result-card" data-id="${pkg.id}">
          <div class="service-card-media">
            <img src="${pkg.image}" alt="${pkg.title}" class="service-card-img" loading="lazy">
            <span class="service-floating-badge">${pkg.duration}</span>
          </div>
          <div class="service-card-content">
            <div>
              <div class="service-header-meta">
                <span class="service-category-tag">${pkg.featuredTag}</span>
              </div>
              <h3 class="service-card-title">${pkg.title}</h3>
              <div class="service-location-row">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                <span>${pkg.destination}</span>
              </div>
              <div class="service-features-list">
                ${pkg.highlights.map(h => `<span class="service-feature-pill">${h}</span>`).join('')}
              </div>
            </div>
            <div class="service-inclusions-box">
              <strong>${this.svgCheck()} Paquete Completo:</strong> ${pkg.includes}
            </div>
          </div>
          <div class="service-card-pricing">
            <span class="price-header-tag">Precio por Pasajero</span>
            <div class="regular-price">Público: <del>${symbol} ${publicPrice.toLocaleString()}</del></div>
            <div class="club-price-box">
              <span class="club-tag">Tarifa Gepiclub</span>
              <div class="club-amount">${symbol} ${clubPrice.toLocaleString()}</div>
              <span class="club-savings-alert">Ahorro: ${symbol} ${savings.toLocaleString()}</span>
            </div>
            <button class="btn btn-primary btn-block" onclick="window.gepiSearchEngine.openBookingModal('paquete', '${pkg.id}')">
              Reservar Paquete
            </button>
            <button class="btn btn-outline-navy btn-block" onclick="window.gepiApp.openWhatsAppInquiry('Paquete: ${pkg.title}')">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="icon-inline"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
              Itinerario a Medida
            </button>
          </div>
        </article>
      `;
    }).join('');
  }

  renderCruiseCards(cruises) {
    const list = document.getElementById('results-list');
    if (!list) return;
    const items = cruises || this.catalog.cruceros;
    const symbol = this.currentCurrency === 'PEN' ? 'S/' : '$';
    const rate = this.currentCurrency === 'PEN' ? this.exchangeRate : 1;

    list.innerHTML = items.map(cr => {
      const publicPrice = Math.round(cr.priceUsd * rate);
      const clubPrice = Math.round(cr.clubPriceUsd * rate);
      const savings = publicPrice - clubPrice;

      return `
        <article class="service-result-card" data-id="${cr.id}">
          <div class="service-card-media">
            <img src="${cr.image}" alt="${cr.name}" class="service-card-img" loading="lazy">
            <span class="service-floating-badge">${cr.duration}</span>
          </div>
          <div class="service-card-content">
            <div>
              <div class="service-header-meta">
                <span class="service-category-tag">${cr.line}</span>
              </div>
              <h3 class="service-card-title">${cr.name}</h3>
              <div class="service-location-row">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon></svg>
                <span>Barco: <strong>${cr.ship}</strong> • Puerto: ${cr.departurePort}</span>
              </div>
              <div class="service-location-row" style="margin-top:-4px;">
                <span style="font-size:0.8rem; color:var(--navy-deep);"><strong>Escalas:</strong> ${cr.ports}</span>
              </div>
            </div>
            <div class="service-inclusions-box">
              <strong>${this.svgCheck()} A Bordo:</strong> ${cr.includes}
            </div>
          </div>
          <div class="service-card-pricing">
            <span class="price-header-tag">Cabina Exterior Balcón</span>
            <div class="regular-price">Público: <del>${symbol} ${publicPrice.toLocaleString()}</del></div>
            <div class="club-price-box">
              <span class="club-tag">Tarifa Gepiclub</span>
              <div class="club-amount">${symbol} ${clubPrice.toLocaleString()}</div>
              <span class="club-savings-alert">Ahorro: ${symbol} ${savings.toLocaleString()}</span>
            </div>
            <button class="btn btn-primary btn-block" onclick="window.gepiSearchEngine.openBookingModal('crucero', '${cr.id}')">
              Reservar Cabina
            </button>
            <button class="btn btn-outline-navy btn-block" onclick="window.gepiApp.openWhatsAppInquiry('Crucero: ${cr.name}')">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="icon-inline"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
              Consultar con Naviera
            </button>
          </div>
        </article>
      `;
    }).join('');
  }

  renderTourCards(tours) {
    const list = document.getElementById('results-list');
    if (!list) return;
    const items = tours || this.catalog.tours;
    const symbol = this.currentCurrency === 'PEN' ? 'S/' : '$';
    const rate = this.currentCurrency === 'PEN' ? this.exchangeRate : 1;

    list.innerHTML = items.map(tour => {
      const publicPrice = Math.round(tour.priceUsd * rate);
      const clubPrice = Math.round(tour.clubPriceUsd * rate);
      const savings = publicPrice - clubPrice;

      return `
        <article class="service-result-card" data-id="${tour.id}">
          <div class="service-card-media">
            <img src="${tour.image}" alt="${tour.title}" class="service-card-img" loading="lazy">
            <span class="service-floating-badge">${tour.duration}</span>
          </div>
          <div class="service-card-content">
            <div>
              <div class="service-header-meta">
                <span class="service-category-tag">${tour.category}</span>
              </div>
              <h3 class="service-card-title">${tour.title}</h3>
              <div class="service-location-row">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                <span>${tour.location}</span>
              </div>
              <div class="service-features-list">
                <span class="service-feature-pill">Guía Oficial Certificado</span>
                <span class="service-feature-pill">Protocolos de Seguridad</span>
                <span class="service-feature-pill">Grupos Reducidos</span>
              </div>
            </div>
            <div class="service-inclusions-box">
              <strong>${this.svgCheck()} Servicio Exclusivo:</strong> ${tour.includes}
            </div>
          </div>
          <div class="service-card-pricing">
            <span class="price-header-tag">Tarifa por Pasajero</span>
            <div class="regular-price">Público: <del>${symbol} ${publicPrice.toLocaleString()}</del></div>
            <div class="club-price-box">
              <span class="club-tag">Tarifa Gepiclub</span>
              <div class="club-amount">${symbol} ${clubPrice.toLocaleString()}</div>
              <span class="club-savings-alert">Ahorro: ${symbol} ${savings.toLocaleString()}</span>
            </div>
            <button class="btn btn-primary btn-block" onclick="window.gepiSearchEngine.openBookingModal('tour', '${tour.id}')">
              Reservar Excursión
            </button>
            <button class="btn btn-outline-navy btn-block" onclick="window.gepiApp.openWhatsAppInquiry('Tour: ${tour.title}')">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="icon-inline"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
              Consultar con Guía
            </button>
          </div>
        </article>
      `;
    }).join('');
  }

  renderCurrentResults() {
    const list = document.getElementById('results-list');
    if (!list) return;

    const pageType = document.body.dataset.pageType || 'vuelos';
    if (pageType === 'vuelos' && this.lastFlightResults) {
      this.renderFlightCards(this.lastFlightResults);
    } else if (pageType === 'hoteles') {
      this.renderHotelCards();
    } else if (pageType === 'paquetes') {
      this.renderPackageCards();
    } else if (pageType === 'cruceros') {
      this.renderCruiseCards();
    } else if (pageType === 'excursiones') {
      this.renderTourCards();
    }
  }

  /**
   * Open Booking / Quote Modal
   */
  openBookingModal(serviceType, itemId) {
    const modal = document.getElementById('booking-modal');
    if (!modal) return;

    let itemTitle = 'Servicio Turístico';
    let itemPrice = '$0';
    let serviceCategory = serviceType.toUpperCase();

    if (serviceType === 'vuelo') {
      const flight = (this.lastFlightResults || window.gepiAmadeusService.sampleFlightDatabase).find(f => f.id === itemId);
      if (flight) {
        itemTitle = `Vuelo ${flight.flightNumber}: ${flight.origin} — ${flight.destination}`;
        itemPrice = this.formatPrice(flight.clubPriceUsd);
      }
    } else if (serviceType === 'hotel') {
      const hotel = this.catalog.hoteles.find(h => h.id === itemId);
      if (hotel) {
        itemTitle = hotel.name;
        itemPrice = this.formatPrice(hotel.clubPricePerNightUsd);
      }
    } else if (serviceType === 'paquete') {
      const pkg = this.catalog.paquetes.find(p => p.id === itemId);
      if (pkg) {
        itemTitle = pkg.title;
        itemPrice = this.formatPrice(pkg.clubPriceUsd);
      }
    } else if (serviceType === 'crucero') {
      const cr = this.catalog.cruceros.find(c => c.id === itemId);
      if (cr) {
        itemTitle = `${cr.name} (${cr.ship})`;
        itemPrice = this.formatPrice(cr.clubPriceUsd);
      }
    } else if (serviceType === 'tour') {
      const tour = this.catalog.tours.find(t => t.id === itemId);
      if (tour) {
        itemTitle = tour.title;
        itemPrice = this.formatPrice(tour.clubPriceUsd);
      }
    }

    document.getElementById('booking-service-badge').textContent = serviceCategory;
    document.getElementById('booking-item-title').textContent = itemTitle;
    document.getElementById('booking-item-price').textContent = itemPrice;
    
    const user = window.gepiAuth.getUser();
    if (user) {
      document.getElementById('booking-name').value = user.name || '';
      document.getElementById('booking-email').value = user.email || '';
      document.getElementById('booking-phone').value = user.phone || '';
    }

    modal.classList.add('active');
  }
}

window.gepiSearchEngine = new SearchEngine();
