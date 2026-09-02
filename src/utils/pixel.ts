// Meta Pixel Event Tracking Helper
declare global {
  interface Window {
    fbq?: any;
  }
}

export const trackPixelEvent = (eventName: string, params?: Record<string, any>) => {
  try {
    if (typeof window !== 'undefined' && window.fbq) {
      if (params) {
        window.fbq('track', eventName, params);
      } else {
        window.fbq('track', eventName);
      }
      console.log(`[Meta Pixel] Event tracked: ${eventName}`, params);
    }
  } catch (error) {
    console.error('[Meta Pixel] Error tracking event:', error);
  }
};
