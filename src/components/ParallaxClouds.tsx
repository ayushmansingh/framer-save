import { motion } from "framer-motion";
import cloudsImg from "../assets/Clouds.png";

interface CloudLayerProps {
  speed: number;
  opacity: number;
  width: string;
  left: string;
  top: string;
  xRange: [number, number];
  yRange: [number, number];
}

function CloudLayer({ speed, opacity, width, left, top, xRange, yRange }: CloudLayerProps) {
  return (
    <motion.img
      src={cloudsImg}
      alt=""
      className="absolute pointer-events-none"
      style={{ opacity, width, left, top }}
      animate={{
        x: xRange,
        y: yRange,
      }}
      transition={{
        duration: speed,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
      }}
      draggable={false}
    />
  );
}

export default function ParallaxClouds() {
  const layers: CloudLayerProps[] = [
    // === Top row (4x original size, 3x movement) ===
    { speed: 18, opacity: 0.6,  width: "220%", left: "-60%", top: "-15%", xRange: [0, 240],   yRange: [0, -90] },
    { speed: 22, opacity: 0.35, width: "144%", left: "-20%", top: "-8%",  xRange: [0, -180],  yRange: [0, 75] },
    { speed: 15, opacity: 0.5,  width: "176%", left: "10%",  top: "-18%", xRange: [0, 210],   yRange: [0, -60] },
    { speed: 20, opacity: 0.45, width: "200%", left: "20%",  top: "-12%", xRange: [0, -240],  yRange: [0, 90] },
    { speed: 25, opacity: 0.3,  width: "120%", left: "50%",  top: "-5%",  xRange: [0, -150],  yRange: [0, -54] },

    // === Upper-mid row ===
    { speed: 20, opacity: 0.4,  width: "160%", left: "-30%", top: "10%",  xRange: [0, 195],   yRange: [0, -75] },
    { speed: 17, opacity: 0.55, width: "128%", left: "0%",   top: "6%",   xRange: [0, -135],  yRange: [0, 60] },
    { speed: 26, opacity: 0.25, width: "112%", left: "25%",  top: "12%",  xRange: [0, 165],   yRange: [0, -45] },
    { speed: 19, opacity: 0.45, width: "152%", left: "40%",  top: "8%",   xRange: [0, -180],  yRange: [0, 66] },

    // === Middle row ===
    { speed: 22, opacity: 0.5,  width: "256%", left: "-80%", top: "24%",  xRange: [0, 270],   yRange: [0, -75] },
    { speed: 19, opacity: 0.3,  width: "96%",  left: "-10%", top: "30%",  xRange: [0, -120],  yRange: [0, 54] },
    { speed: 24, opacity: 0.35, width: "104%", left: "50%",  top: "28%",  xRange: [0, -150],  yRange: [0, -60] },
    { speed: 16, opacity: 0.5,  width: "240%", left: "30%",  top: "34%",  xRange: [0, -255],  yRange: [0, 84] },

    // === Lower-mid row ===
    { speed: 20, opacity: 0.45, width: "136%", left: "-15%", top: "48%",  xRange: [0, 165],   yRange: [0, -66] },
    { speed: 27, opacity: 0.3,  width: "160%", left: "5%",   top: "54%",  xRange: [0, -180],  yRange: [0, 54] },
    { speed: 17, opacity: 0.4,  width: "128%", left: "30%",  top: "46%",  xRange: [0, 135],   yRange: [0, -45] },
    { speed: 21, opacity: 0.5,  width: "176%", left: "40%",  top: "52%",  xRange: [0, -210],  yRange: [0, 75] },

    // === Bottom row ===
    { speed: 23, opacity: 0.35, width: "192%", left: "-40%", top: "64%",  xRange: [0, 225],   yRange: [0, -60] },
    { speed: 19, opacity: 0.4,  width: "120%", left: "-5%",  top: "72%",  xRange: [0, -150],  yRange: [0, 45] },
    { speed: 26, opacity: 0.3,  width: "144%", left: "15%",  top: "68%",  xRange: [0, 180],   yRange: [0, -54] },
    { speed: 22, opacity: 0.45, width: "168%", left: "35%",  top: "66%",  xRange: [0, -165],  yRange: [0, 66] },
    { speed: 18, opacity: 0.35, width: "128%", left: "60%",  top: "74%",  xRange: [0, -135],  yRange: [0, -42] },

    // === Extra scattered wisps ===
    { speed: 28, opacity: 0.2,  width: "80%",  left: "-10%", top: "20%",  xRange: [0, 105],   yRange: [0, -36] },
    { speed: 30, opacity: 0.18, width: "88%",  left: "20%",  top: "40%",  xRange: [0, -120],  yRange: [0, 45] },
    { speed: 29, opacity: 0.22, width: "72%",  left: "10%",  top: "78%",  xRange: [0, 135],   yRange: [0, -30] },
    { speed: 27, opacity: 0.2,  width: "96%",  left: "35%",  top: "16%",  xRange: [0, -105],  yRange: [0, 36] },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
      {layers.map((layer, i) => (
        <CloudLayer key={i} {...layer} />
      ))}
    </div>
  );
}
