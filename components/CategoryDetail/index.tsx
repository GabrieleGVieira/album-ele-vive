"use client";

import { Row, Col } from "antd";
import { CategoryWithRelations } from "@/types/database";
import StickerCard from "../StickerCard";

import { Typography } from "antd";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getCategory } from "@/lib/getAlbum";
import { useUserProfile } from "@/hooks/useUserProfile";

const { Text, Title } = Typography;

export default function CategoryDetail() {
  const { profile } = useUserProfile();
  const userID = profile?.id ? profile.id : "0";
  const params = useParams();
  const categoryID = String(params.categoryID);

  const [category, setCategory] = useState<CategoryWithRelations>(
    {} as CategoryWithRelations,
  );
  const stickers = category?.sticker ? category.sticker : [];

  useEffect(() => {
    async function fetchSticker() {
      const data = await getCategory(categoryID, userID);
      setCategory(data);
    }

    if (categoryID) fetchSticker();
  }, [categoryID, userID]);

  const sortedStickers = [...stickers].sort((a, b) => a.position - b.position);

  return (
    <div style={{ padding: "16px", background: "#f5f5f5", minHeight: "100vh" }}>
      <div style={{ textAlign: "center", marginBottom: 24 }}>
        <Title level={3} style={{ margin: 0 }}>
          {category.name}
        </Title>
        <Text type="secondary">{category.total} figurinhas no total</Text>
      </div>

      <Row gutter={[16, 16]}>
        {sortedStickers.map((sticker) => (
          <Col xs={12} sm={12} md={8} lg={6} key={sticker.id}>
            <StickerCard sticker={sticker} forceShow={false} />
          </Col>
        ))}
      </Row>
    </div>
  );
}
