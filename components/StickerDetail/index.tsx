"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { Sticker } from "@/types/database";
import { getSticker } from "@/lib/stickers/get";
import Frente from "./Frente";
import Verso from "./Verso";

export default function StickerDetail() {
  const [isFlipped, setIsFlipped] = useState(false);

  const params = useParams();
  const stickerID = String(params.stickerID);

  const [sticker, setSticker] = useState<Sticker>({} as Sticker);

  useEffect(() => {
    async function fetchSticker() {
      const data = await getSticker(stickerID);

      setSticker(data);
    }

    if (stickerID) fetchSticker();
  }, [stickerID]);


  const rarityConfig = {
    common: {
      borderColor: "#d9d9d9",
      shadow: "none",
      label: "Comum",
      background: "#ffff",
    },
    epic: {
      borderColor: "#4B0082",
      shadow: "0 4px 12px rgba(72,61,139, 0.5)",
      label: "Rara",
      background: "#F0FFFF",
    },
    rare: {
      borderColor: "#1890ff",
      shadow: "0 4px 12px rgba(24, 144, 255, 0.3)",
      label: "Rara",
      background: "#F0FFFF",
    },
    legendary: {
      borderColor: "#FAAE00",
      shadow: "0 4px 15px rgba(250, 174, 0, 0.5)",
      label: "Lendária",
      background: "#FFFFE0",
    },
  };
  const config = rarityConfig[sticker.rarity] || rarityConfig.common;

  return (
      <div
        style={{ perspective: "1500px" }}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <motion.div
          className="w-full h-full relative"
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{
            duration: 0.6,
            type: "spring",
            stiffness: 260,
            damping: 20,
          }}
          style={{ transformStyle: "preserve-3d" }}
        >
          {isFlipped ? (
            <Verso sticker={sticker} config={config} isFlipped={isFlipped} />
          ) : (
            <Frente sticker={sticker} config={config} isFlipped={isFlipped} />
          )}{" "}
        </motion.div>
      </div>
  );
}
