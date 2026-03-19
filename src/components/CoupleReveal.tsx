import { motion, type MotionValue, useTransform } from "framer-motion";

interface CoupleRevealProps {
  /** 0 to 1 progress from the slider */
  progress: MotionValue<number>;
  casualSrc: string;
  traditionalSrc: string;
}

export default function CoupleReveal({
  progress,
  casualSrc,
  traditionalSrc,
}: CoupleRevealProps) {
  const clipRight = useTransform(progress, [0, 1], [100, 0]);
  const clipPath = useTransform(clipRight, (v) => `inset(0 ${v}% 0 0)`);

  // Use both mask (to feather hard edges) and multiply (to blend white into background)
  const imgStyle: React.CSSProperties = {
    mixBlendMode: "multiply",
    WebkitMaskImage:
      "radial-gradient(ellipse 75% 85% at 50% 48%, black 40%, transparent 72%)",
    maskImage:
      "radial-gradient(ellipse 75% 85% at 50% 48%, black 40%, transparent 72%)",
  };

  return (
    <div className="relative w-[min(60vw,550px)] h-[75vh] z-10 -mb-16">
      {/* Casual (base layer - always visible) */}
      <img
        src={casualSrc}
        alt="Casual outfit"
        className="absolute inset-0 w-full h-full object-contain"
        style={imgStyle}
        draggable={false}
      />
      {/* Traditional (revealed via clip-path) */}
      <motion.img
        src={traditionalSrc}
        alt="Traditional outfit"
        className="absolute inset-0 w-full h-full object-contain"
        style={{ ...imgStyle, clipPath }}
        draggable={false}
      />
    </div>
  );
}
