import { Progress, Typography, Space, Card, Image } from "antd";

const { Text } = Typography;

type CategoryCardProps = {
  image_url: string;
  name: string;
  total: number;
  coladas?: number;
};

export const CategoryCard = ({
  image_url,
  name,
  total,
  coladas = 0,
}: CategoryCardProps) => {
  const percent = total > 0 ? Math.round((coladas / total) * 100) : 0;

  return (
    <Card
      hoverable
      bodyStyle={{ padding: "12px 16px" }}
      style={{
        borderRadius: 16,
        border: "1px solid #f0f0f0",
        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
        width: "100%",
        marginBottom: 8
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Space size={16}>
        <Image
            src={image_url}
            alt={name}
            width={54}
            height={54}
            preview={false}
            fallback="/placeholder-category.png"
            style={{ 
              borderRadius: 12, 
              objectFit: "cover",
            }}
            wrapperStyle={{
                borderRadius: 12,
                overflow: 'hidden',
                display: 'flex'
            }}
          />
          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Text strong style={{ fontSize: 16, color: '#262626' }}>
              {name}
            </Text>
            <Text type="secondary" style={{ fontSize: 12 }}>
              {total} figurinhas
            </Text>
          </div>
        </Space>

        <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
          <Progress
            type="circle"
            percent={percent}
            width={44}
            strokeWidth={10}
            strokeColor={percent === 100 ? "#52c41a" : "#1890ff"}
            format={(p) => (
              <span style={{ fontSize: 10, fontWeight: "800", color: "#000" }}>
                {p}%
              </span>
            )}
          />
        </div>
      </div>
    </Card>
  );
};