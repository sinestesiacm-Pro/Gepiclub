# Guía de Trabajo del Equipo — Gepiclub Travel

Este documento define la arquitectura, roles y metodología de trabajo colaborativo en paralelo entre **Carlos Alberto (Italia - Véneto)**, **Luca (Italia - Véneto)** y **Adriano (Perú)**.

---

## 1. Distribución de Roles y Responsabilidades

| Miembro | Ubicación & Hardware | Entorno de IA | Rol Principal | Responsabilidades |
| :--- | :--- | :--- | :--- | :--- |
| **Carlos Alberto** *(Lead)* | Véneto (Mac) | Antigravity IDE | **Supervisor General & Web Lead** | • Revisión y aprobación de Pull Requests (PRs).<br>• Desarrollo y evolución de la plataforma Web.<br>• Generación y firma de compilaciones nativas de iOS (.ipa / App Store) con Mac / EAS. |
| **Luca** | Véneto (PC Windows/Linux + iPhone) | Antigravity IDE | **Mobile UI / Frontend iOS** | • Maquetación de componentes móviles con React Native & Expo.<br>• Validación visual y experiencia táctil en iPhone físico mediante **Expo Go**.<br>• *Nota:* No requiere Mac para desarrollar ni testear. |
| **Adriano** | Perú (Android) | Antigravity + Codex + GPT Pro | **Mobile Logic & Android QA** | • Integración de APIs, manejo de estados, tarifas y servicios.<br>• Validación nativa y testing en teléfono Android físico y/o emulador.<br>• Optimización de rendimiento móvil asistido por Codex y Antigravity. |

---

## 2. Arquitectura del Repositorio

El repositorio sigue un esquema unificado para mantener sincronizados el diseño y la lógica de negocio:

```text
Gepiclub/
├── assets/                  # Assets, imágenes y estilos del portal Web
├── *.html                   # Páginas web (index, vuelos, hoteles, paquetes, cruceros, excursiones)
├── mobile/                  # Aplicación Móvil Cross-Platform (React Native + Expo)
│   ├── app/                 # Navegación con Expo Router (Tabs: Vuelos, Hoteles, Club, Perfil)
│   ├── components/          # Componentes reutilizables UI
│   ├── constants/Colors.ts  # Paleta de colores de marca Gepiclub Travel
│   └── package.json         # Dependencias de Expo SDK
├── .agents/                 # Configuración de agentes y MCP servers (Figma, Playwright)
├── TEAM_GUIDE.md            # Este manual de sincronización
└── README.md                # Descripción general del proyecto
```

---

## 3. Instrucciones de Inicio Rápido para Luca y Adriano

### A. Clonar el repositorio
```bash
git clone https://github.com/sinestesiacm-Pro/Gepiclub.git
cd Gepiclub
```

### B. Ejecutar la App Móvil (Expo)
```bash
cd mobile
npm install
npx expo start
```
- **Luca (en iPhone):** Abre la app **Expo Go** (descargable gratis desde el App Store de iOS), abre la cámara de su iPhone, escanea el código QR que aparece en la terminal y la app cargará de inmediato en su iPhone con recarga en vivo (Fast Refresh).
- **Adriano (en Android):** Abre la app **Expo Go** (descargable desde Google Play), escanea el QR y prueba en vivo en su teléfono Android.

### C. Pruebas Remotas en Vivo entre Italia y Perú (Expo Tunnel)
Si Adriano en Perú o Luca en Italia quieren mostrarle al resto del equipo una función en tiempo real sin subir a Git:
```bash
npx expo start --tunnel
```
Esto genera una URL pública segura que cualquier miembro del equipo puede abrir en su teléfono escaneando el QR a miles de kilómetros de distancia.

---

## 4. Política de Git y Control de Calidad

1. **La rama `main` es sagrada y protegida:**
   - Nadie realiza `git push` directo a `main`.
2. **Flujo de ramas (Branching):**
   - Para nuevas funciones móviles: `git checkout -b feature/mobile-<nombre>`
   - Ejemplo: `feature/mobile-flight-search`, `feature/mobile-vip-club`
3. **Pull Requests (PR):**
   - Al terminar una funcionalidad, se empuja la rama: `git push origin feature/mobile-...`
   - Se abre un Pull Request en GitHub hacia `main`.
   - **Carlos Alberto** revisa el código, verifica compatibilidad y aprueba el merge.

---

## 5. Estándares de Diseño Gepiclub ($150k Look)

1. **Cero Emojis:** Todos los iconos deben ser vectoriales (`SymbolView`, `@expo/vector-icons`, SVG).
2. **Paleta Oficial:**
   - Azul Marino Profundo: `#0A1B40`
   - Azul Primario: `#0073E6`
   - Azul Cielo: `#38B6FF`
   - Rosa Acento: `#FF3366`
   - Oro VIP Club: `#D4AF37`
   - Fondo Claro: `#F8FAFC`
3. **Enfoque de Agencia:** Destacar seguridad, atención 24/7, tarifas exclusivas y estatus VIP de club privado.
