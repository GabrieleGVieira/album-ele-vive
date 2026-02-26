"use client";
import { Empty, Layout, Progress, Space } from "antd";
import { MehOutlined } from "@ant-design/icons";
import { Content } from "antd/es/layout/layout";
import { Typography } from "antd";
import { AlbumWithRelations, CategoryWithStats } from "@/types/database";
import { CategoryCard } from "./CategoryCard";
import { useRouter } from "next/navigation";
import { useUserProfile } from "@/hooks/useUserProfile";
import { useEffect, useState } from "react";
import { getAlbum, getOwnedStickers } from "@/lib/getAlbum";

const { Title } = Typography;

export default function AlbumHome() {
  const { profile } = useUserProfile();
  const userID = profile?.id ? profile.id : "0";

  const [album, setAlbum] = useState<AlbumWithRelations>(
    {} as AlbumWithRelations,
  );
  const [coladas, setColadas] = useState(0);
  const percent =
    album.total > 0 ? Math.round((coladas / album.total) * 100) : 0;

  useEffect(() => {
    async function fetchSticker() {
      const data = await getOwnedStickers(userID);
      setColadas(data);
    }

    if (userID) fetchSticker();
  }, [userID]);

  useEffect(() => {
    async function fetchAlbum() {
      const data = await getAlbum(userID);
      setAlbum(data);
    }

    if (userID) fetchAlbum();
  }, [userID]);

  const categories = album?.category? album.category.sort((a, b) => {
    return (a.position ?? 0) - (b.position ?? 0);
  }) : []
  const router = useRouter();

  if (!album) {
    return (
      <Layout style={{ minHeight: "100vh" }}>
        <Content style={{ padding: 24 }}>
          <Empty description="Nenhum album encontrado" />
          <MehOutlined />
        </Content>
      </Layout>
    );
  }

  return (
    <Layout style={{ minHeight: "100vh", background: "#f5f5f5" }}>
      <Content
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "24px 16px",
          alignContent: "space-between",
        }}
      >
        <Title
          level={2}
          style={{
            marginBottom: 24,
            textAlign: "center",
            color: "#016021",
          }}
        >
          {album.title}
        </Title>
        {album.subtitle && (
          <Title
            level={5}
            style={{
              marginBottom: 24,
              textAlign: "center",
              color: "#FAAE00",
            }}
          >
            {album.subtitle}
          </Title>
        )}

        <Progress percent={percent} />

        <Space
          orientation="vertical"
          style={{ width: "100%", paddingTop: "20px" }}
          size={16}
        >
          {categories.map((category) => (
            <div key={category.id} style={{ width: "100%" }}>
              <div
                onClick={() => router.push(`/album/${category.id}`)}
                style={{ cursor: "pointer", transition: "0.3s" }}
              >
                <CategoryCard
                  image_url="/setor-juventude.jpeg"
                  name={category.name}
                  total={category.total}
                  coladas={category.owned_stickers}
                />
              </div>
            </div>
          ))}
        </Space>
      </Content>
    </Layout>
  );
}
