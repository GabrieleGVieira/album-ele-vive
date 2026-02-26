"use client"
import { Empty, Layout, Progress, Space } from "antd";
import { MehOutlined } from "@ant-design/icons";
import { Content } from "antd/es/layout/layout";
import { Typography } from 'antd';
import { AlbumWithRelations } from "@/types/database";
import { CategoryCard } from "./CategoryCard";
import { useRouter } from "next/navigation";

const { Title } = Typography;

type AlbumProps = {
    album: AlbumWithRelations
}
export default function AlbumHome({album} : AlbumProps) {
    const categories = album.category
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
        }}
      >
        <Title
          level={2}
          style={{
            marginBottom: 24,
            textAlign: "center",
            color: "#016021"
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
              color: "#FAAE00"
            }}
          >
            {album.subtitle}
          </Title>
        )}

        <Progress percent={30} />

       <Space orientation="vertical" style={{ width: '100%' }} size={16}>
          {categories.map((category) => (
            <div key={category.id} style={{ width: '100%' }}>
              <div 
                onClick={() => router.push("/category/[:id]")}
                style={{ cursor: 'pointer', transition: '0.3s' }}
              >
                <CategoryCard image_url="/setor-juventude.jpeg" name={category.name} total={category.total} />
              </div>
            </div>
          ))}
        </Space>
        </Content>
    </Layout>
  );
}
