import {
  motion,
  useMotionValue,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useRef, useCallback } from "react";

interface CoupleToggleSliderProps {
  casualSrc: string;
  traditionalSrc: string;
  progress: MotionValue<number>;
  onComplete: () => void;
}

export default function CoupleToggleSlider({
  casualSrc,
  traditionalSrc,
  progress,
  onComplete,
}: CoupleToggleSliderProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const handleX = useMotionValue(0);
  const maxDrag = useRef(0);

  // Fill bar
  const fillWidth = useTransform(handleX, (x) =>
    maxDrag.current > 0 ? `${(x / maxDrag.current) * 100}%` : "0%"
  );

  // Crossfade images inside the bulb
  const casualOpacity = useTransform(progress, [0, 0.5], [1, 0]);
  const traditionalOpacity = useTransform(progress, [0.5, 1], [0, 1]);

  const handleDragStart = useCallback(() => {
    if (trackRef.current) {
      const handleWidth = trackRef.current.offsetHeight; // bulb is square/circle
      maxDrag.current = trackRef.current.offsetWidth - handleWidth - 8;
    }
  }, []);

  const handleDrag = useCallback(() => {
    if (maxDrag.current > 0) {
      const p = Math.min(1, Math.max(0, handleX.get() / maxDrag.current));
      progress.set(p);
    }
  }, [handleX, progress]);

  const handleDragEnd = useCallback(() => {
    if (maxDrag.current > 0) {
      const p = handleX.get() / maxDrag.current;
      if (p >= 0.92) {
        handleX.set(maxDrag.current);
        progress.set(1);
        onComplete();
      }
    }
  }, [handleX, progress, onComplete]);

  return (
    <div className="w-[88%] max-w-[750px] mx-auto z-20">
      {/* Pill-shaped track */}
      <div
        ref={trackRef}
        className="relative w-full h-[110px] rounded-full overflow-hidden
          border border-white/30
          bg-white/10 backdrop-blur-[20px]
          shadow-[0_8px_32px_rgba(0,0,0,0.15)]"
      >
        {/* Glass shimmer */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(135deg, rgba(255,255,255,0.12) 0%, transparent 50%, rgba(255,255,255,0.06) 100%)",
          }}
        />

        {/* Fill indicator */}
        <motion.div
          className="absolute top-0 left-0 h-full rounded-full bg-white/10"
          style={{ width: fillWidth }}
        />

        {/* Draggable bulb with couple images inside */}
        <motion.div
          className="absolute top-1 left-1 bottom-1
            aspect-square rounded-full cursor-grab active:cursor-grabbing
            bg-white/20 backdrop-blur-sm border border-white/50
            overflow-hidden
            shadow-[0_4px_20px_rgba(0,0,0,0.2)] z-30"
          style={{ x: handleX }}
          drag="x"
          dragConstraints={trackRef}
          dragElastic={0}
          dragMomentum={false}
          onDragStart={handleDragStart}
          onDrag={handleDrag}
          onDragEnd={handleDragEnd}
        >
          {/* Asset A (casual) — visible initially */}
          <motion.img
            src={casualSrc}
            alt="Casual"
            className="absolute inset-0 w-full h-full object-cover object-top"
            style={{ opacity: casualOpacity }}
            draggable={false}
          />
          {/* Asset B (traditional) — fades in as you slide */}
          <motion.img
            src={traditionalSrc}
            alt="Traditional"
            className="absolute inset-0 w-full h-full object-cover object-top"
            style={{ opacity: traditionalOpacity }}
            draggable={false}
          />

          {/* Chevron hint overlay */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="flex items-center text-white/50 drop-shadow-md">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="-ml-3">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
