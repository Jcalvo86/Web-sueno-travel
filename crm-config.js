// Configuration file for ControlPanel CRM - Sueño Travel
window.CRM_CONFIG = {
  // 1. Data Source Provider Configuration
  provider: "firebase", // Activamos Firebase

  firebase: {
    apiKey: "AIzaSyD8-SBI4FjoVl1VSyIGlk52UQYdwERmKaI",         // Reemplaza con tu clave
    projectId: "suenotravel"    // Reemplaza con tu Project ID de Firebase
  },
  // 2. Active Modules for this project
  activeModules: ["terms", "products", "design_tokens"],
  // 3. Project Branding Customizations
  branding: {
    appName: "Sueño Travel",
    logoUrl: "../favicon.png",
    backUrl: "../index.html"
  }
};

// Fallback registry for backward compatibility
window.GLOSAURIO_DEFAULT_CONFIG = window.CRM_CONFIG;
