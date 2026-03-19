import { motion } from "framer-motion";
import skyBase from "../assets/Sky_Base.png";
import cloudBand1 from "../assets/Cloud_Band_1.png";
import cloudBand2 from "../assets/Cloud_Band_2.png";
import cloudLeft from "../assets/Cloud_left.png";
import cloudRight from "../assets/Cloud_right.png";
import cloudCentre from "../assets/Cloud_centre.png";
import mist from "../assets/mist.png";

interface CloudCurtainProps {
  onComplete: () => void;
}

export default function CloudCurtain({ onComplete }: CloudCurtainProps) {
  return (
    <div className="absolute inset-0 z-50 overflow-hidden bg-[#b8d4e8]">
      {/* Sky background */}
      <img
        src={skyBase}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
        draggable={false}
      />

      {/* Cloud Band 1 — top, slides left */}
      <motion.img
        src={cloudBand1}
        alt=""
        className="absolute w-[140%] pointer-events-none"
        style={{ top: "0%", left: "-20%" }}
        initial={{ x: 0 }}
        animate={{ x: "-110%" }}
        transition={{ duration: 2, delay: 1.2, ease: [0.4, 0, 0.2, 1] }}
        draggable={false}
      />

      {/* Cloud Band 2 — middle, slides right */}
      <motion.img
        src={cloudBand2}
        alt=""
        className="absolute w-[140%] pointer-events-none"
        style={{ top: "30%", left: "-20%" }}
        initial={{ x: 0 }}
        animate={{ x: "110%" }}
        transition={{ duration: 2, delay: 1.35, ease: [0.4, 0, 0.2, 1] }}
        draggable={false}
      />

      {/* Cloud Band 1 mirrored — lower, slides left */}
      <motion.img
        src={cloudBand1}
        alt=""
        className="absolute w-[140%] pointer-events-none"
        style={{ top: "55%", left: "-20%", transform: "scaleX(-1)" }}
        initial={{ x: 0 }}
        animate={{ x: "-110%" }}
        transition={{ duration: 2, delay: 1.5, ease: [0.4, 0, 0.2, 1] }}
        draggable={false}
      />

      {/* Left cloud — slides left */}
      <motion.img
        src={cloudLeft}
        alt=""
        className="absolute h-[80vh] pointer-events-none"
        style={{ top: "5%", left: "-5%" }}
        initial={{ x: 0 }}
        animate={{ x: "-130%" }}
        transition={{ duration: 1.8, delay: 1.1, ease: [0.4, 0, 0.2, 1] }}
        draggable={false}
      />

      {/* Right cloud — slides right */}
      <motion.img
        src={cloudRight}
        alt=""
        className="absolute h-[80vh] pointer-events-none"
        style={{ top: "5%", right: "-5%" }}
        initial={{ x: 0 }}
        animate={{ x: "130%" }}
        transition={{ duration: 1.8, delay: 1.1, ease: [0.4, 0, 0.2, 1] }}
        draggable={false}
      />

      {/* Centre cloud — larger, scales up and fades */}
      <motion.img
        src={cloudCentre}
        alt=""
        className="absolute pointer-events-none"
        style={{
          top: "50%",
          left: "50%",
          width: "55vw",
          transform: "translate(-50%, -50%)",
        }}
        initial={{ opacity: 1, scale: 1 }}
        animate={{ opacity: 0, scale: 2 }}
        transition={{ duration: 1.6, delay: 1.4, ease: "easeOut" }}
        draggable={false}
      />

      {/* Mist layer — bottom, fades out last */}
      <motion.img
        src={mist}
        alt=""
        className="absolute bottom-0 left-0 w-full pointer-events-none"
        style={{ height: "25vh", objectFit: "cover" }}
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 1.5, delay: 1.8, ease: "easeOut" }}
        onAnimationComplete={onComplete}
        draggable={false}
      />
    </div>
  );
}
