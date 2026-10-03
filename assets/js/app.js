/**
 * Gepi Club Travel - Main Application Controller
 * Luxury Bespoke Travel Agency UI
 */

class GepiApp {
  constructor() {
    this.init();
  }

  init() {
    document.addEventListener('DOMContentLoaded', () => {
      this.bindEvents();
      this.setupAuthObserver();
      this.setDefaultDates();
      this.setupSearchModal();
      
      // Auto run service-specific rendering based on page type
      const pageType = document.body.dataset.pageType;
      if (pageType === 'vuelos') {
        setTimeout(() => {
          window.gepiSearchEngine.executeFlightSearch({
            origin: document.getElementById('flight-origin')?.value || 'LIM',
            destination: document.getElementById('flight-destination')?.value || 'MIA',
            departureDate: document.getElementById('flight-dep-date')?.value || '2026-11-15',
            returnDate: document.getElementById('flight-ret-date')?.value || '2026-11-25',
            adults: 1,
            travelClass: 'ECONOMY'
          });
        }, 350);
      } else if (pageType === 'hoteles') {
        window.gepiSearchEngine.renderHotelCards();
      } else if (pageType === 'paquetes') {
        window.gepiSearchEngine.renderPackageCards();
      } else if (pageType === 'cruceros') {
        window.gepiSearchEngine.renderCruiseCards();
      } else if (pageType === 'excursiones') {
        window.gepiSearchEngine.renderTourCards();
      }
    });
  }

  bindEvents() {
    // Search tab buttons
    document.querySelectorAll('.search-tab-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const tab = e.currentTarget.dataset.tab;
        window.gepiSearchEngine.setActiveTab(tab);
      });
    });

    // Flight search form submit
    const flightForm = document.getElementById('flight-search-form');
    if (flightForm) {
      flightForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const origin = document.getElementById('flight-origin').value.trim().toUpperCase() || 'LIM';
        const destination = document.getElementById('flight-destination').value.trim().toUpperCase() || 'MIA';
        const departureDate = document.getElementById('flight-dep-date').value;
        const returnDate = document.getElementById('flight-ret-date').value;
        const adults = document.getElementById('flight-passengers').value;
        const travelClass = document.getElementById('flight-class').value;

        window.gepiSearchEngine.executeFlightSearch({
          origin,
          destination,
          departureDate,
          returnDate,
          adults,
          travelClass
        });

        this.closeModal('search-overlay-modal');
      });
    }

    // Hotel search form submit
    const hotelForm = document.getElementById('hotel-search-form');
    if (hotelForm) {
      hotelForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const destination = document.getElementById('hotel-destination').value;
        window.gepiSearchEngine.executeHotelSearch(destination);
        this.closeModal('search-overlay-modal');
      });
    }

    // Package search form submit
    const packageForm = document.getElementById('package-search-form');
    if (packageForm) {
      packageForm.addEventListener('submit', (e) => {
        e.preventDefault();
        window.gepiSearchEngine.executePackageSearch();
        this.closeModal('search-overlay-modal');
      });
    }

    // Cruise search form submit
    const cruiseForm = document.getElementById('cruise-search-form');
    if (cruiseForm) {
      cruiseForm.addEventListener('submit', (e) => {
        e.preventDefault();
        window.gepiSearchEngine.executeCruiseSearch();
        this.closeModal('search-overlay-modal');
      });
    }

    // Tour search form submit
    const tourForm = document.getElementById('tour-search-form');
    if (tourForm) {
      tourForm.addEventListener('submit', (e) => {
        e.preventDefault();
        window.gepiSearchEngine.executeTourSearch();
        this.closeModal('search-overlay-modal');
      });
    }

    // Currency Switcher
    const currencySelect = document.getElementById('currency-selector');
    if (currencySelect) {
      currencySelect.value = window.gepiSearchEngine.currentCurrency;
      currencySelect.addEventListener('change', (e) => {
        window.gepiSearchEngine.setCurrency(e.target.value);
        this.showToast(`Moneda actualizada: ${e.target.value}`);
      });
    }

    // Minimalist Search Icon in Header
    const headerSearchBtn = document.getElementById('header-search-icon-btn');
    if (headerSearchBtn) {
      headerSearchBtn.addEventListener('click', (e) => {
        e.preventDefault();
        this.openHeaderSearch();
      });
    }

    // Header Login Button
    const headerLoginBtn = document.getElementById('header-login-btn');
    if (headerLoginBtn) {
      headerLoginBtn.addEventListener('click', () => {
        this.openLoginModal();
      });
    }

    // Close Modals on click outside or close button
    document.querySelectorAll('.modal-backdrop, .modal-close-btn').forEach(el => {
      el.addEventListener('click', (e) => {
        const modal = e.target.closest('.modal-container');
        if (modal) {
          modal.classList.remove('active');
        }
      });
    });

    // Mobile Hamburger (Morphs into 'X') & Full Screen Drawer
    const mobileMenuBtn = document.getElementById('mobile-menu-toggle');
    const navLinks = document.getElementById('nav-links-menu');
    if (mobileMenuBtn && navLinks) {
      mobileMenuBtn.addEventListener('click', () => {
        const isOpen = mobileMenuBtn.classList.toggle('active');
        navLinks.classList.toggle('mobile-active');
        document.body.style.overflow = isOpen ? 'hidden' : '';
      });

      // Close full-screen menu when clicking any nav link
      navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
          mobileMenuBtn.classList.remove('active');
          navLinks.classList.remove('mobile-active');
          document.body.style.overflow = '';
        });
      });
    }

    // Login Form Submit
    const loginForm = document.getElementById('login-form-element');
    if (loginForm) {
      loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('login-email').value;
        const pass = document.getElementById('login-password').value;
        try {
          const user = window.gepiAuth.login(email, pass);
          this.showToast(`Bienvenido de vuelta, ${user.name}`);
          this.closeModal('login-modal');
        } catch (err) {
          this.showToast(err.message);
        }
      });
    }

    // Register Form Submit
    const registerForm = document.getElementById('register-form-element');
    if (registerForm) {
      registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const fullName = document.getElementById('reg-name').value;
        const email = document.getElementById('reg-email').value;
        const phone = document.getElementById('reg-phone').value;
        const dni = document.getElementById('reg-dni').value;

        try {
          const user = window.gepiAuth.register({ fullName, email, phone, dni });
          this.showToast(`Membresía activada con éxito para ${user.name}`);
          this.closeModal('login-modal');
        } catch (err) {
          this.showToast(err.message);
        }
      });
    }

    // Booking Confirmation Form
    const bookingForm = document.getElementById('booking-submit-form');
    if (bookingForm) {
      bookingForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('booking-name').value;
        const phone = document.getElementById('booking-phone').value;
        const service = document.getElementById('booking-item-title').textContent;
        const notes = document.getElementById('booking-notes').value;

        this.closeModal('booking-modal');
        this.showToast(`Solicitud recibida. Un concierge se comunicará contigo al ${phone}`);
        
        // Open WhatsApp directly with formatted luxury message
        const msg = encodeURIComponent(`Hola Gepi Travel. Mi nombre es ${name}. Deseo coordinar la reserva de la tarifa preferencial para: ${service}. Notas adicionales: ${notes}`);
        window.open(`https://wa.me/51999999999?text=${msg}`, '_blank');
      });
    }
  }

  setupSearchModal() {
    const quickInput = document.getElementById('overlay-search-input');
    if (quickInput) {
      quickInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          const q = quickInput.value.trim().toLowerCase();
          this.handleQuickSearch(q);
        }
      });
    }
  }

  openHeaderSearch() {
    const modal = document.getElementById('glass-search-modal');
    if (modal) {
      modal.classList.add('active');
    }
  }

  closeGlassSearch() {
    const modal = document.getElementById('glass-search-modal');
    if (modal) {
      modal.classList.remove('active');
    }
  }

  handleQuickSearch(query) {
    this.closeModal('search-overlay-modal');
    
    if (query.includes('cancun') || query.includes('cancún')) {
      window.gepiSearchEngine.setActiveTab('paquetes');
      window.gepiSearchEngine.executePackageSearch();
    } else if (query.includes('miami')) {
      window.gepiSearchEngine.setActiveTab('vuelos');
      document.getElementById('flight-destination').value = 'MIA';
      window.gepiSearchEngine.executeFlightSearch({
        origin: 'LIM',
        destination: 'MIA',
        departureDate: document.getElementById('flight-dep-date')?.value || '2026-11-15',
        returnDate: document.getElementById('flight-ret-date')?.value || '2026-11-25',
        adults: 1,
        travelClass: 'ECONOMY'
      });
    } else if (query.includes('cusco') || query.includes('machu')) {
      window.gepiSearchEngine.setActiveTab('tours');
      window.gepiSearchEngine.executeTourSearch();
    } else if (query.includes('crucero') || query.includes('barco')) {
      window.gepiSearchEngine.setActiveTab('cruceros');
      window.gepiSearchEngine.executeCruiseSearch();
    } else if (query.includes('hotel')) {
      window.gepiSearchEngine.setActiveTab('hoteles');
      window.gepiSearchEngine.executeHotelSearch(query);
    } else {
      window.gepiSearchEngine.setActiveTab('vuelos');
      const searchSection = document.getElementById('hero-search-section');
      if (searchSection) searchSection.scrollIntoView({ behavior: 'smooth' });
    }
  }

  openLoginModal(tab = 'login') {
    const modal = document.getElementById('login-modal');
    if (!modal) return;
    this.switchAuthTab(tab);
    modal.classList.add('active');
  }

  switchAuthTab(tab) {
    document.querySelectorAll('.auth-tab-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.tab === tab);
    });
    const loginForm = document.getElementById('login-form-element');
    const registerForm = document.getElementById('register-form-element');
    if (loginForm && registerForm) {
      loginForm.classList.toggle('hidden', tab !== 'login');
      registerForm.classList.toggle('hidden', tab !== 'register');
    }
  }

  closeModal(modalId) {
    const m = document.getElementById(modalId);
    if (m) m.classList.remove('active');
  }

  toggleMobileFilters() {
    const toggleBtn = document.getElementById('mobile-filter-toggle');
    const searchCard = document.querySelector('.page-search-wrapper .search-card-box');
    if (!searchCard) return;
    const isOpen = searchCard.classList.toggle('is-open');
    if (toggleBtn) {
      toggleBtn.classList.toggle('is-open', isOpen);
      const text = toggleBtn.querySelector('.filter-summary-text');
      if (text) {
        text.textContent = isOpen ? 'Ocultar Filtros' : 'Modificar Búsqueda & Filtros';
      }
    }
  }

  setupAuthObserver() {
    window.gepiAuth.subscribe((user) => {
      const authBox = document.getElementById('header-auth-box');
      if (!authBox) return;

      if (user) {
        authBox.innerHTML = `
          <div class="user-profile-badge" id="user-profile-menu-trigger">
            <div class="user-avatar-circle">
              ${user.name.charAt(0)}
            </div>
            <div class="user-info-text">
              <span class="user-name-label">${user.name}</span>
              <span class="user-tier-pill">Socio ${user.membershipTier} • ${user.points} pts</span>
            </div>
            <button class="btn-logout" title="Cerrar sesión" onclick="window.gepiApp.handleLogout(event)">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                <polyline points="16 17 21 12 16 7"></polyline>
                <line x1="21" y1="12" x2="9" y2="12"></line>
              </svg>
            </button>
          </div>
        `;
      } else {
        authBox.innerHTML = `
          <button class="btn btn-outline-navy btn-sm" id="header-login-btn" onclick="window.gepiApp.openLoginModal('login')">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
            Acceso Clientes
          </button>
          <button class="btn btn-primary btn-sm" onclick="window.gepiApp.openLoginModal('register')">
            Membresía Club
          </button>
        `;
      }
    });
  }

  handleLogout(e) {
    e.stopPropagation();
    window.gepiAuth.logout();
    this.showToast('Sesión finalizada.');
  }

  demoLogin() {
    const user = window.gepiAuth.loginDemoUser();
    this.showToast(`Bienvenido ${user.name} (${user.membershipTier})`);
    this.closeModal('login-modal');
  }

  openAdvisorModal(topic = 'Asesoría Especializada') {
    const name = window.gepiAuth.getUser()?.name || 'Cliente';
    const message = encodeURIComponent(`Hola Gepi Travel. Mi nombre es ${name}. Quisiera coordinar asesoría personalizada sobre: ${topic}.`);
    window.open(`https://wa.me/51999999999?text=${message}`, '_blank');
  }

  openMedicalModal() {
    const message = encodeURIComponent('Hola Gepi Travel. Deseo información y cotización sobre Cobertura de Asistencia Médica Internacional para viajes.');
    window.open(`https://wa.me/51999999999?text=${message}`, '_blank');
  }

  openWhatsAppInquiry(details) {
    const user = window.gepiAuth.getUser();
    const prefix = user ? `Socio ${user.membershipTier} (${user.name})` : 'Cliente Web';
    const msg = encodeURIComponent(`Hola Gepi Travel. [${prefix}] Deseo consultar disponibilidad y cotización para: ${details}.`);
    window.open(`https://wa.me/51999999999?text=${msg}`, '_blank');
  }

  setDefaultDates() {
    const today = new Date();
    const depDate = new Date(today);
    depDate.setDate(today.getDate() + 14);

    const retDate = new Date(today);
    retDate.setDate(today.getDate() + 21);

    const depStr = depDate.toISOString().split('T')[0];
    const retStr = retDate.toISOString().split('T')[0];

    const depEl = document.getElementById('flight-dep-date');
    const retEl = document.getElementById('flight-ret-date');
    if (depEl) depEl.value = depStr;
    if (retEl) retEl.value = retStr;

    const checkinEl = document.getElementById('hotel-checkin');
    const checkoutEl = document.getElementById('hotel-checkout');
    if (checkinEl) checkinEl.value = depStr;
    if (checkoutEl) checkoutEl.value = retStr;
  }

  showToast(message) {
    let container = document.getElementById('toast-notification-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-notification-container';
      container.className = 'toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = 'toast-bubble';
    toast.innerHTML = `
      <div class="toast-content">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FF007F" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
        <span>${message}</span>
      </div>
    `;

    container.appendChild(toast);
    setTimeout(() => {
      toast.classList.add('show');
    }, 20);

    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 250);
    }, 3500);
  }
}

window.gepiApp = new GepiApp();
