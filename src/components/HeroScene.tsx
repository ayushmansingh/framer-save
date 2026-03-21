import { useState, useCallback, useRef } from "react";
import { useMotionValue, AnimatePresence, motion } from "framer-motion";
import coupleCasual from "../assets/Asset A.png";
import coupleTraditional from "../assets/Asset B.png";
import asset1Video from "../assets/Asset1.mp4";
import assetBVideo from "../assets/AssetB.mp4";
import CoupleToggleSlider from "./CoupleToggleSlider";

type Scene = "slider" | "video";

export default function HeroScene() {
  const progress = useMotionValue(0);
  const [scene, setScene] = useState<Scene>("slider");
  const bgVideoRef = useRef<HTMLVideoElement>(null);
  const assetBRef = useRef<HTMLVideoElement>(null);

  const handleSliderComplete = useCallback(() => {
    // Pause looping background
    const bgVid = bgVideoRef.current;
    if (bgVid) {
      bgVid.pause();
    }

    // Play AssetB video (muted — BG music handles audio)
    const vid = assetBRef.current;
    if (vid) {
      vid.currentTime = 0;
      vid.play();
    }
    setScene("video");
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      {/* Part 1: Asset1 video looping as background */}
      <video
        ref={bgVideoRef}
        src={asset1Video}
        autoPlay
        loop
        muted
        playsInline
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
          scene === "video" ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      />

      {/* Part 2: AssetB video — always in DOM for ref access */}
      <video
        ref={assetBRef}
        src={assetBVideo}
        muted
        preload="auto"
        playsInline
        className={`absolute inset-0 w-full h-full object-cover z-10 transition-opacity duration-700 ${
          scene === "video" ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Slider overlay on top of looping video */}
      <AnimatePresence>
        {scene === "slider" && (
          <motion.div
            key="slider"
            className="absolute inset-0 z-20 flex items-end justify-center"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-[15%] w-full flex items-center justify-center">
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

      {/* Replay button over AssetB video */}
      <AnimatePresence>
        {scene === "video" && (
          <motion.button
            key="replay"
            className="absolute bottom-10 left-1/2 -translate-x-1/2 z-40
              px-8 py-3 rounded-xl
              bg-white/10 backdrop-blur-[20px] border border-white/30
              text-white font-medium tracking-wider uppercase text-sm
              cursor-pointer hover:bg-white/20 transition-colors"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
            onClick={() => {
              const vid = assetBRef.current;
              if (vid) {
                vid.pause();
                vid.currentTime = 0;
              }
              const bgVid = bgVideoRef.current;
              if (bgVid) {
                bgVid.play();
              }
              progress.set(0);
              setScene("slider");
            }}
          >
            Replay
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
