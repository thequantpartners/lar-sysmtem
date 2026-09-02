import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ScreenId } from './types/lar';
import { MobileViewport } from './components/layout/MobileViewport';
import { Screen1Hook } from './components/screens/Screen1Hook';
import { Screen2Diagnosis } from './components/screens/Screen2Diagnosis';
import { Screen3MechanismROI } from './components/screens/Screen3MechanismROI';
import { Screen4Booking } from './components/screens/Screen4Booking';
import { LegalModal } from './components/ui/LegalModal';
import { trackPixelEvent } from './utils/pixel';

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
            {currentScreen === 2 && <Screen2Diagnosis onAdvance={handleNext} />}
            {currentScreen === 3 && <Screen3MechanismROI onAdvance={handleNext} />}
            {currentScreen === 4 && <Screen4Booking />}
          </motion.div>
        </AnimatePresence>

        {/* Legal & Meta Compliance Footer Modal */}
        <LegalModal />
      </div>
    </MobileViewport>
  );
}

export default App;

