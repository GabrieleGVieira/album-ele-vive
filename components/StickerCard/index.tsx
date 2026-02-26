"use client";

import Link from "next/link";
import { Card, Typography, Image } from "antd";
import { Sticker } from "@/types/database";

const { Text, Title } = Typography;

const rarityConfig = {
  common: {
    borderColor: "#696969",
    shadow: "none",
    label: "Comum",
    background: "#DCDCDC"
  },
  rare: {
    borderColor: "#1890ff",
    shadow: "0 4px 12px rgba(24, 144, 255, 0.3)",
    label: "Rara",
    background: "#E0FFFF"
  },
  legendary: {
    borderColor: "#FAAE00",
    shadow: "0 4px 15px rgba(250, 174, 0, 0.5)",
    label: "Lendária",
    background: "#FFFFE0"
  },
};

export default function StickerCard({ sticker, forceShow }: { sticker: Sticker, forceShow: boolean }) {
  const isOwned = forceShow || sticker.is_owned;
  const config = rarityConfig[sticker.rarity] || rarityConfig.common;

  const CardContent = (
    <Card
      styles={{ body: { padding: "5px", display: "flex", flexDirection: "column" } }}
      style={{
        borderRadius: 16,
        borderWidth: 3,
        overflow: "hidden",
        aspectRatio: "3/4",
        border: isOwned
          ? `2px solid ${config.borderColor}`
          : "1px dashed #d9d9d9",
        background: config.background,
        boxShadow: isOwned ? config.shadow : "none",
        cursor: isOwned ? "pointer" : "default",
      }}
      hoverable={isOwned}
    >
      <div
        style={{
          width: "100%",
          aspectRatio: "1/1",
          position: "relative",
          borderRadius: 8,
          overflow: "hidden",
          marginBottom: 2,
        }}
      >
        <Image
          src={sticker.image_url}
          alt={sticker.name}
          preview={false}
          style={{
            objectFit: "cover",
            width: "100%",
            height: "100%",
            filter: isOwned
              ? "none"
              : "grayscale(1) brightness(0.7) opacity(0.5)",
            transition: "all 0.3s ease",
          }}
          wrapperStyle={{ width: "100%", height: "100%" }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 0,
            width: "100%",
            padding: "8px",
            background: "linear-gradient(transparent, rgba(0,0,0,0.7))",
            color: "#fff",
          }}
        ></div>

        {!isOwned && (
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              pointerEvents: "none",
            }}
          >
            <Text
              style={{
                fontSize: 32,
                color: "#fff",
                fontWeight: 900,
                textShadow: "0 2px 4px rgba(0,0,0,0.5)",
              }}
            >
              {sticker.number}
            </Text>
            <Text style={{ fontSize: 10, color: "#fff", fontWeight: "bold" }}>
              FALTANDO
            </Text>
          </div>
        )}
      </div>
      <div>
        <Title
          level={5}
          style={{
            margin: 0,
            fontSize: "14px",
            lineHeight: "1.2",
            display: "-webkit-box",
            WebkitLineClamp: 2, 
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            height: "34px", 
          }}
        >
          {sticker.name}
        </Title>
        <Text type="secondary" style={{ fontSize: "12px" }}>
          Nº {sticker.position}
        </Text>
      </div>
    </Card>
  );

  if (isOwned && !forceShow) {
    return (
      <Link href={`/album/${sticker.category_id}/${sticker.id}`} style={{ textDecoration: "none" }}>
        {CardContent}
      </Link>
    );
  }
  return <div>{CardContent}</div>;
}
