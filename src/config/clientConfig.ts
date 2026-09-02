export interface ClientConfig {
  brand: {
    expertName: string;
    companyName: string;
    heroNiche: string;
    avatarMobileWebp: string;
    avatarDesktopWebp: string;
    logoWebp: string;
  };
  audio: {
    section1: string;
    section2: string;
    section3: string;
    section4: string;
  };
  pricing: {
    currency: string;
    regularPriceText: string;
    launchPriceText: string;
    fullPriceOptionTitle: string;
    fullPriceOptionDesc: string;
    splitPriceOptionTitle: string;
    splitPriceOptionDesc: string;
    pixelConversionValueUSD: number;
  };
  whatsapp: {
    phoneNumber: string; // formato internacional sin signos ej: 51987654321
    customMessageFull: string;
    customMessageSplit: string;
  };
  metaPixel: {
    pixelId: string;
  };
}

export const clientConfig: ClientConfig = {
  brand: {
    expertName: 'Kenneth',
    companyName: 'Quant Partners',
    heroNiche: 'Coaches, Infoproductores y Agencias',
    avatarMobileWebp: '/avatar-kenneth-mobile.webp',
    avatarDesktopWebp: '/avatar-kenneth.webp',
    logoWebp: '/quant-logo.webp',
  },
  audio: {
    section1: '/audio-section-1.mp3',
    section2: '/audio-section-2.mp3',
    section3: '/audio-section-3.mp3',
    section4: '/audio-section-4.mp3',
  },
  pricing: {
    currency: 'PEN',
    regularPriceText: 'S/ 3,000 PEN ($850 USD)',
    launchPriceText: 'S/ 1,000 PEN ($300 USD)',
    fullPriceOptionTitle: '🔥 Pago Único: S/ 1,000 PEN ($300 USD)',
    fullPriceOptionDesc: 'Ahorras S/ 2,000 PEN del precio regular de S/ 3,000 PEN',
    splitPriceOptionTitle: '⚡ Separar con 50%: S/ 500 PEN hoy',
    splitPriceOptionDesc: 'Congela la tarifa y abona los S/ 500 restantes al recibir el sistema',
    pixelConversionValueUSD: 300,
  },
  whatsapp: {
    phoneNumber: '', // Vacío para abrir selector o colocar número ej: '51987654321'
    customMessageFull: 'Hola Kenneth! Acabo de escuchar la auditoría y quiero asegurar mi cupo para el Sistema LAR con Pago Único promocional de S/ 1,000 PEN ($300 USD).\n\n• Descuento Aplicado: Ahorro de S/ 2,000 PEN del precio regular.\n\n¿Cuáles son los pasos para agendar la sesión de arquitectura privada?',
    customMessageSplit: 'Hola Kenneth! Acabo de escuchar la auditoría y quiero congelar mi cupo para el Sistema LAR con la modalidad del 50% (S/ 500 PEN hoy + S/ 500 al entregar).\n\n• Tarifa Promocional: S/ 1,000 PEN ($300 USD) en lugar de S/ 3,000 PEN.\n\n¿Cómo coordinamos los detalles para iniciar el desarrollo?',
  },
  metaPixel: {
    pixelId: '1481108957086201',
  },
};
