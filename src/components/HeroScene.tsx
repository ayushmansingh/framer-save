import { useState, useCallback } from "react";
import { useMotionValue, AnimatePresence, motion } from "framer-motion";
import skyBase from "../assets/Sky_Base.png";
import coupleCasual from "../assets/Asset A.png";
import coupleTraditional from "../assets/Asset B.png";
import postSliderVideo from "../assets/PostSlider.mov";
import ParallaxClouds from "./ParallaxClouds";
import CoupleToggleSlider from "./CoupleToggleSlider";

type Scene = "hero" | "video";

export default function HeroScene() {
  const progress = useMotionValue(0);
  const [scene, setScene] = useState<Scene>("hero");

  const handleSliderComplete = useCallback(() => {
    setScene("video");
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#1a3a5c]">
      {/* Sky base — solid blue PNG over dark fallback */}
      <img
        src={skyBase}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
        draggable={false}
      />

      <AnimatePresence>
        {scene === "hero" && (
          <motion.div
            key="hero"
            className="absolute inset-0 flex flex-col items-center justify-center"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Parallax cloud layers interspersed over the sky */}
            <ParallaxClouds />

            {/* Toggle slider — positioned in the bottom 25% */}
            <div className="absolute bottom-[15%] z-20 w-full flex items-center justify-center">
              <CoupleToggleSlider
                casualSrc={coupleCasual}
                traditionalSrc={coupleTraditional}
                progress={progress}
                onComplete={handleSliderComplete}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Full-screen video after slider completes */}
      <AnimatePresence>
        {scene === "video" && (
          <motion.div
            key="video"
            className="absolute inset-0 z-30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <video
              src={postSliderVideo}
              autoPlay
              muted
              playsInline
              className="w-full h-full object-cover"
            />

            <motion.button
              className="absolute bottom-10 left-1/2 -translate-x-1/2 z-40
                px-8 py-3 rounded-xl
                bg-white/10 backdrop-blur-[20px] border border-white/30
                text-white font-medium tracking-wider uppercase text-sm
                cursor-pointer hover:bg-white/20 transition-colors"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.5 }}
              onClick={() => {
                progress.set(0);
                setScene("hero");
              }}
            >
              Replay
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
