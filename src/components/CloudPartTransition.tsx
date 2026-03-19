import { motion } from "framer-motion";
import heroCloud from "../assets/Hero Cloud.png";

interface CloudPartTransitionProps {
  /** When true, clouds slide in, meet, then part */
  active: boolean;
  onPartComplete: () => void;
}

export default function CloudPartTransition({
  active,
  onPartComplete,
}: CloudPartTransitionProps) {
  if (!active) return null;

  return (
    <div className="absolute inset-0 z-30 pointer-events-none overflow-hidden">
      {/* Left cloud */}
      <motion.div
        className="absolute top-0 left-0 w-[60%] h-full"
        initial={{ x: "-100%" }}
        animate={{
          x: ["-100%", "0%", "-110%"],
        }}
        transition={{
          duration: 3,
          times: [0, 0.4, 1],
          ease: "easeInOut",
        }}
        onAnimationComplete={onPartComplete}
      >
        <img
          src={heroCloud}
          alt=""
          className="w-full h-full object-cover scale-x-[-1]"
          draggable={false}
        />
      </motion.div>

      {/* Right cloud */}
      <motion.div
        className="absolute top-0 right-0 w-[60%] h-full"
        initial={{ x: "100%" }}
        animate={{
          x: ["100%", "0%", "110%"],
        }}
        transition={{
          duration: 3,
          times: [0, 0.4, 1],
          ease: "easeInOut",
        }}
      >
        <img
          src={heroCloud}
          alt=""
          className="w-full h-full object-cover"
          draggable={false}
        />
      </motion.div>
    </div>
  );
}
