import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import HeroScene from "./components/HeroScene";
import CloudCurtain from "./components/CloudCurtain";

export default function App() {
  const [introDone, setIntroDone] = useState(false);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <HeroScene />

      <AnimatePresence>
        {!introDone && (
          <motion.div
            key="curtain"
            className="absolute inset-0 z-50"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <CloudCurtain onComplete={() => setIntroDone(true)} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
