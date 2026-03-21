import { useState, useCallback, useRef, useEffect } from "react";
import { useMotionValue, AnimatePresence, motion } from "framer-motion";
import coupleCasual from "../assets/Asset A.png";
import coupleTraditional from "../assets/Asset B.png";
import asset1Video from "../assets/Asset1.mp4";
import assetBVideo from "../assets/AssetB.mp4";
import CoupleToggleSlider from "./CoupleToggleSlider";

type Scene = "loading" | "intro" | "slider" | "video";

export default function HeroScene() {
  const progress = useMotionValue(0);
  const [scene, setScene] = useState<Scene>("loading");
  const bgVideoRef = useRef<HTMLVideoElement>(null);
  const assetBRef = useRef<HTMLVideoElement>(null);

  const hasStarted = useRef(false);

  // Wait for Asset1 video to be playing before showing anything — once only
  useEffect(() => {
    if (hasStarted.current) return;
    const vid = bgVideoRef.current;
    if (!vid) return;

    const onPlaying = () => {
      if (hasStarted.current) return;
      hasStarted.current = true;
      vid.removeEventListener("playing", onPlaying);
      setScene("intro");
    };

    if (!vid.paused && vid.readyState >= 2) {
      hasStarted.current = true;
      setScene("intro");
      return;
    }

    vid.addEventListener("playing", onPlaying);
    return () => vid.removeEventListener("playing", onPlaying);
  }, []);

  const introTimerFired = useRef(false);

  const handleSliderComplete = useCallback(() => {
    const bgVid = bgVideoRef.current;
    if (bgVid) bgVid.pause();

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

      {/* Intro text overlay — only after video is playing */}
      <AnimatePresence>
        {scene === "intro" && (
          <motion.div
            key="intro"
            className="absolute inset-0 z-20 flex items-center justify-center"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-center px-8">
              <motion.p
                className="text-black text-3xl md:text-5xl leading-relaxed drop-shadow-lg"
                style={{ fontFamily: "'Slight', cursive" }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
              >
                Once upon a time
              </motion.p>
              <motion.p
                className="text-black text-3xl md:text-5xl leading-relaxed drop-shadow-lg"
                style={{ fontFamily: "'Slight', cursive" }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 1, ease: "easeOut" }}
              >
                a guy met a girl
              </motion.p>

              <motion.p
                className="text-black/70 text-lg md:text-2xl mt-12 drop-shadow-md"
                style={{ fontFamily: "'Slight', cursive" }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: [0, 1, 1, 0.6, 1] }}
                transition={{ duration: 2, delay: 2.5, ease: "easeInOut" }}
                onAnimationComplete={() => {
                  if (introTimerFired.current) return;
                  introTimerFired.current = true;
                  setTimeout(() => setScene("slider"), 1500);
                }}
              >
                Swipe to know more
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Slider overlay */}
      <AnimatePresence>
        {scene === "slider" && (
          <motion.div
            key="slider"
            className="absolute inset-0 z-20 flex items-end justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
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

    </div>
  );
}
