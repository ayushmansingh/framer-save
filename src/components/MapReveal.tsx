import { motion } from "framer-motion";
import skyBase from "../assets/Sky_Base.png";

/**
 * Uses Sky_Base.png as the map reveal background (stand-in for base_map_reveal.webp).
 * Fades in with a subtle zoom-in scale animation.
 */
export default function MapReveal({ visible }: { visible: boolean }) {
  if (!visible) return null;

  return (
    <motion.div
      className="absolute inset-0 z-20"
      initial={{ opacity: 0, scale: 1.15 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 2, ease: "easeOut" }}
    >
      <img
        src={skyBase}
        alt="Revealed scene"
        className="w-full h-full object-cover"
        draggable={false}
      />
      {/* Subtle overlay to differentiate from the hero sky */}
      <div className="absolute inset-0 bg-gradient-to-t from-amber-900/30 via-transparent to-sky-900/20" />
    </motion.div>
  );
}
