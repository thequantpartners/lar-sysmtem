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
  const [currentScreen, setCurrentScreen] = useState<ScreenId>(1);
  const [direction, setDirection] = useState<1 | -1>(1);

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

  // Preload subsequent screens on browser idle so transitions are instant
  useEffect(() => {
    const preload = () => {
      import('./components/screens/Screen2Diagnosis');
      import('./components/screens/Screen3MechanismROI');
      import('./components/screens/Screen4Booking');
      import('./components/ui/LegalModal');
    };
    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(preload);
    } else {
      setTimeout(preload, 1500);
    }
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
            <Suspense fallback={<div className="flex-1 w-full" />}>
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


