import { Typography, Card, Image } from "antd";
import { RotateRightOutlined } from "@ant-design/icons";
import { Sticker } from "@/types/database";

const { Title, Text } = Typography;

type FrenteProps = {
  isFlipped: boolean;
  config: {
    borderColor: string;
    shadow: string;
    label: string;
    background: string;
  };
  sticker: Sticker;
};
export default function Frente({ isFlipped, config, sticker }: FrenteProps) {
  return (
    <div
      style={{
        backfaceVisibility: "hidden",
        WebkitBackfaceVisibility: "hidden",
        borderColor: config.borderColor,
        zIndex: isFlipped ? 0 : 1,
      }}
    >
      <Card
        hoverable
        className="h-full w-full shadow-2xl"
        style={{
          borderRadius: 24,
          borderColor: config.borderColor,
          borderWidth: "6px",
          overflow: "hidden",
          aspectRatio: "0/4",
          margin: 10,
          background: config.background,
          boxShadow: "0 4px 12px rgba(250, 174, 0, 0.2)",
          cursor: "pointer",
        }}
        styles={{
          body: { padding: "5px", display: "flex", flexDirection: "column" },
        }}
        cover={
          <div className="h-[280px] overflow-hidden border-b">
            <Image
              className="w-full h-full object-cover"
              src={sticker.image_url}
              alt={sticker.name}
              preview={false}
              style={{
                aspectRatio: "3/4",
                objectFit: "cover",
                transition: "all 0.3s ease",
              }}
              wrapperStyle={{ width: "100%", height: "100%" }}
            />
          </div>
        }
      >
        <Text className="text-slate-400 font-bold block">
          Nº {sticker.position}
        </Text>
        <Title level={3} style={{ margin: "4px 0", color: "#1e293b" }}>
          {sticker.name}
        </Title>
        <div className="mt-4 text-slate-400 flex justify-center items-center gap-2">
          <RotateRightOutlined />
          <span className="text-[10px] uppercase tracking-widest">
            Clique para detalhes
          </span>
        </div>
      </Card>
    </div>
  );
}
