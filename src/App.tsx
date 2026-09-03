import { useState, useEffect, Suspense, lazy } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ScreenId } from './types/lar';
import { MobileViewport } from './components/layout/MobileViewport';
import { Screen1Hook } from './components/screens/Screen1Hook';
import { trackPixelEvent } from './utils/pixel';

// Lazy load subsequent screens for ultra-fast First Contentful Paint (100 PageSpeed)
const Screen2Diagnosis = lazy(() => import('./components/screens/Screen2Diagnosis').then(m => ({ default: m.Screen2Diagnosis })));
const Screen3MechanismROI = lazy(() => import('./components/screens/Screen3MechanismROI').then(m => ({ default: m.Screen3MechanismROI })));
const Screen4Booking = lazy(() => import('./components/screens/Screen4Booking').then(m => ({ default: m.Screen4Booking })));
const LegalModal = lazy(() => import('./components/ui/LegalModal').then(m => ({ default: m.LegalModal })));

export function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenId>(() => {
    try {
      const saved = sessionStorage.getItem('lar_active_screen');
      if (saved) {
        const parsed = parseInt(saved, 10);
        if (parsed >= 1 && parsed <= 4) {
          return parsed as ScreenId;
        }
      }
    } catch {
      // ignore in incognito or restricted environments
    }
    return 1;
  });
  const [direction, setDirection] = useState<1 | -1>(1);

  // Sincronizar estado silencioso en sessionStorage para preservar la sesión en recargas
  useEffect(() => {
    try {
      sessionStorage.setItem('lar_active_screen', String(currentScreen));
    } catch {
      // ignore
    }
  }, [currentScreen]);


  useEffect(() => {
    if (currentScreen === 1) {
      trackPixelEvent('PageView');
    } else if (currentScreen === 2) {
      trackPixelEvent('ViewContent', { content_name: 'Diagnostico VIP Quant Partners' });
    } else if (currentScreen === 3) {
      trackPixelEvent('ViewContent', { content_name: 'Mecanismo LAR' });
    } else if (currentScreen === 4) {
      trackPixelEvent('InitiateCheckout', {
        content_name: 'Sesion Arquitectura Privada',
        value: 300,
        currency: 'USD',
      });
    }
  }, [currentScreen]);

  const handleNext = () => {
    if (currentScreen < 4) {
      setDirection(1);
      setCurrentScreen((prev) => (prev + 1) as ScreenId);
    }
  };

  // Preload subsequent screens on user interaction OR when browser is idle
  useEffect(() => {
    let preloaded = false;
    const preload = () => {
      if (preloaded) return;
      preloaded = true;
      import('./components/screens/Screen2Diagnosis');
      import('./components/screens/Screen3MechanismROI');
      import('./components/screens/Screen4Booking');
      import('./components/ui/LegalModal');
      window.removeEventListener('pointerdown', preload);
      window.removeEventListener('touchstart', preload);
      window.removeEventListener('scroll', preload);
    };

    window.addEventListener('pointerdown', preload, { passive: true, once: true });
    window.addEventListener('touchstart', preload, { passive: true, once: true });
    window.addEventListener('scroll', preload, { passive: true, once: true });

    // Preload when main thread is idle so screens 2-4 are 100% cached before user swipes
    let idleId: number | undefined;
    let timerId: ReturnType<typeof setTimeout> | undefined;
    if ('requestIdleCallback' in window) {
      idleId = (window as unknown as { requestIdleCallback: (cb: () => void, opts?: { timeout: number }) => number }).requestIdleCallback(preload, { timeout: 2500 });
    } else {
      timerId = setTimeout(preload, 2000);
    }

    return () => {
      window.removeEventListener('pointerdown', preload);
      window.removeEventListener('touchstart', preload);
      window.removeEventListener('scroll', preload);
      if (idleId && 'cancelIdleCallback' in window) {
        (window as unknown as { cancelIdleCallback: (id: number) => void }).cancelIdleCallback(idleId);
      }
      if (timerId) {
        clearTimeout(timerId);
      }
    };
  }, []);

  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 30 : -30,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        x: { type: 'spring', stiffness: 400, damping: 32 },
        opacity: { duration: 0.2 },
      },
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -30 : 30,
      opacity: 0,
      transition: {
        x: { type: 'spring', stiffness: 400, damping: 32 },
        opacity: { duration: 0.15 },
      },
    }),
  };

  return (
    <MobileViewport>
      {/* 4-Screen Sequential Attention Gateway Engine */}
      <div className="flex-1 w-full relative overflow-hidden flex flex-col justify-between">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentScreen}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            className="w-full flex-1 flex flex-col justify-between"
          >
            {currentScreen === 1 && <Screen1Hook onAdvance={handleNext} />}
            <Suspense
              fallback={
                <div className="flex-1 w-full flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-[#D4AF37]/20 border-t-[#D4AF37] rounded-full animate-spin" />
                </div>
              }
            >
              {currentScreen === 2 && <Screen2Diagnosis onAdvance={handleNext} />}
              {currentScreen === 3 && <Screen3MechanismROI onAdvance={handleNext} />}
              {currentScreen === 4 && <Screen4Booking />}
            </Suspense>
          </motion.div>
        </AnimatePresence>

        {/* Legal & Meta Compliance Footer Modal */}
        <Suspense fallback={null}>
          <LegalModal />
        </Suspense>
      </div>
    </MobileViewport>
  );
}

export default App;


