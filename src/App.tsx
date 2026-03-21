import { useRef, useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import HeroScene from "./components/HeroScene";
import bgMusic from "./assets/BGMusic.mp3";

export default function App() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [started, setStarted] = useState(false);

  const handleStart = () => {
    const audio = audioRef.current;
    if (audio) {
      audio.play().catch(() => {});
    }
    setStarted(true);
  };

  // Pause/resume audio when tab visibility changes
  useEffect(() => {
    const handleVisibility = () => {
      const audio = audioRef.current;
      if (!audio) return;
      if (document.hidden) {
        audio.pause();
      } else if (started) {
        audio.play().catch(() => {});
      }
    };

    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, [started]);

  return (
    <>
      <audio ref={audioRef} src={bgMusic} loop preload="auto" />

      {/* Main content renders underneath */}
      {started && <HeroScene />}

      {/* "Tap to start" overlay */}
      <AnimatePresence>
        {!started && (
          <motion.div
            key="start-screen"
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center
              bg-black cursor-pointer select-none"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            onClick={handleStart}
          >
            {/* Subtle radial glow */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse at center, rgba(255,255,255,0.04) 0%, transparent 70%)",
              }}
            />

            {/* Pulsing ring */}
            <motion.div
              className="w-24 h-24 rounded-full border-2 border-white/20 flex items-center justify-center mb-8"
              animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.8, 0.4] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            >
              {/* Play icon */}
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="white"
                className="ml-1"
              >
                <polygon points="6,3 20,12 6,21" />
              </svg>
            </motion.div>

            <motion.p
              className="text-white/60 text-sm tracking-[0.3em] uppercase font-light"
              animate={{ opacity: [0.4, 0.8, 0.4] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            >
              Tap to begin
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
