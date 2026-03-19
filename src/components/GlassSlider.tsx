import {
  motion,
  useMotionValue,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useRef, useCallback } from "react";

interface GlassSliderProps {
  /** Exposes 0–1 progress to parent */
  progress: MotionValue<number>;
  onComplete: () => void;
}

export default function GlassSlider({ progress, onComplete }: GlassSliderProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const handleX = useMotionValue(0);
  const trackWidth = useRef(0);

  // Fill bar width follows handle
  const fillWidth = useTransform(handleX, (x) =>
    trackWidth.current > 0 ? `${(x / trackWidth.current) * 100}%` : "0%"
  );

  const handleDragStart = useCallback(() => {
    if (trackRef.current) {
      trackWidth.current =
        trackRef.current.offsetWidth - 56; // handle width = 56px
    }
  }, []);

  const handleDrag = useCallback(() => {
    if (trackWidth.current > 0) {
      const p = Math.min(1, Math.max(0, handleX.get() / trackWidth.current));
      progress.set(p);
    }
  }, [handleX, progress]);

  const handleDragEnd = useCallback(() => {
    if (trackWidth.current > 0) {
      const p = handleX.get() / trackWidth.current;
      if (p >= 0.95) {
        // Snap to 100% and trigger scene change
        handleX.set(trackWidth.current);
        progress.set(1);
        onComplete();
      }
    }
  }, [handleX, progress, onComplete]);

  return (
    <div
      className="relative w-[80%] mx-auto h-[12vh]"
    >
      {/* Glass track */}
      <div
        ref={trackRef}
        className="relative w-full h-full rounded-2xl overflow-hidden
          border border-white/30
          bg-white/10 backdrop-blur-[20px]
          shadow-[0_8px_32px_rgba(0,0,0,0.1)]"
      >
        {/* Glass texture overlay */}
        <div
          className="absolute inset-0 opacity-[0.05] pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(ellipse at 50% 0%, rgba(255,255,255,0.4) 0%, transparent 70%)",
          }}
        />

        {/* Fill bar */}
        <motion.div
          className="absolute top-0 left-0 h-full rounded-2xl bg-white/20"
          style={{ width: fillWidth }}
        />

        {/* Labels */}
        <div className="absolute inset-0 flex items-center justify-between px-8 pointer-events-none">
          <span className="text-white/60 text-sm font-medium tracking-wider uppercase select-none">
            Casual
          </span>
          <span className="text-white/60 text-sm font-medium tracking-wider uppercase select-none">
            Traditional
          </span>
        </div>

        {/* Draggable handle */}
        <motion.div
          className="absolute top-1/2 -translate-y-1/2 left-0
            w-14 h-[80%] rounded-xl cursor-grab active:cursor-grabbing
            bg-white/30 backdrop-blur-sm border border-white/50
            flex items-center justify-center
            shadow-lg z-20"
          style={{ x: handleX }}
          drag="x"
          dragConstraints={trackRef}
          dragElastic={0}
          dragMomentum={false}
          onDragStart={handleDragStart}
          onDrag={handleDrag}
          onDragEnd={handleDragEnd}
        >
          {/* Handle grip lines */}
          <div className="flex gap-1">
            <div className="w-0.5 h-6 bg-white/60 rounded-full" />
            <div className="w-0.5 h-6 bg-white/60 rounded-full" />
            <div className="w-0.5 h-6 bg-white/60 rounded-full" />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
