/**
 * Gepi Club Travel - Authentication & Member Management
 */

class GepiAuth {
  constructor() {
    this.storageKey = 'gepiclub_user_session';
    this.currentUser = this.loadUserSession();
    this.listeners = [];
  }

  loadUserSession() {
    try {
      const data = localStorage.getItem(this.storageKey);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      return null;
    }
  }

  saveUserSession(user) {
    this.currentUser = user;
    localStorage.setItem(this.storageKey, JSON.stringify(user));
    this.notify();
  }

  subscribe(callback) {
    this.listeners.push(callback);
    callback(this.currentUser);
  }

  notify() {
    this.listeners.forEach(fn => fn(this.currentUser));
  }

  login(email, password) {
    // Check credentials or provide seamless mock authentication
    if (!email || !password) {
      throw new Error('Por favor ingresa tu correo y contraseña.');
    }

    const member = {
      id: 'GEPI-' + Math.floor(100000 + Math.random() * 900000),
      name: email.split('@')[0].replace('.', ' ').replace(/\b\w/g, l => l.toUpperCase()),
      email: email,
      membershipTier: 'Socio Oro',
      points: 2450,
      memberSince: '2024',
      status: 'Activo',
      benefits: [
        'Descuento hasta 20% en vuelos seleccionados',
        'Estadía anual bonificada (Cancún / Miami / Colombia)',
        'Asistencia médica internacional de cortesía',
        'Atención prioritaria y asesoría 24/7'
      ]
    };

    this.saveUserSession(member);
    return member;
  }

  loginDemoUser() {
    const demo = {
      id: 'GEPI-789421',
      name: 'Carlos Alberto',
      email: 'carlos@gepiclub.com',
      membershipTier: 'Socio Platino',
      points: 4820,
      memberSince: '2023',
      status: 'Activo',
      benefits: [
        'Descuento preferencial del 25% en vuelos y paquetes',
        'Estadías exclusivas Cancún, Miami y San Andrés',
        'Acceso a Salón VIP y seguro de viaje total',
        'Asesor de viajes personal asignado'
      ]
    };
    this.saveUserSession(demo);
    return demo;
  }

  register({ fullName, email, phone, dni }) {
    if (!fullName || !email) {
      throw new Error('Completa los campos obligatorios para registrarte.');
    }

    const newUser = {
      id: 'GEPI-' + Math.floor(100000 + Math.random() * 900000),
      name: fullName,
      email: email,
      phone: phone || '',
      dni: dni || '',
      membershipTier: 'Socio Club Nuevo',
      points: 500, // Welcome bonus points!
      memberSince: '2026',
      status: 'Activo',
      benefits: [
        'Bono de 500 Puntos Gepi de bienvenida',
        'Acceso a tarifas de club en vuelos y hoteles',
        'Asesoría personalizada por WhatsApp'
      ]
    };

    this.saveUserSession(newUser);
    return newUser;
  }

  logout() {
    this.currentUser = null;
    localStorage.removeItem(this.storageKey);
    this.notify();
  }

  isLoggedIn() {
    return Boolean(this.currentUser);
  }

  getUser() {
    return this.currentUser;
  }
}

window.gepiAuth = new GepiAuth();
