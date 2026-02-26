import { Typography, Card, Tag } from "antd";
import { Sticker } from "@/types/database";
import { InfoCircleOutlined } from "@ant-design/icons";

const { Title, Paragraph, Text } = Typography;

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
export default function Verso({ isFlipped, config, sticker }: FrenteProps) {
  return (
    <div
      style={{
        backfaceVisibility: "hidden",
        WebkitBackfaceVisibility: "hidden",
        transform: "rotateY(180deg)",
        zIndex: isFlipped ? 1 : 0,
      }}
    >
      <Card
        hoverable
        className="h-full w-full shadow-2xl"
        style={{
          borderRadius: 24,
          borderColor: config.borderColor,
          aspectRatio: "3/4",
          margin: 10,
          borderWidth: "6px",
          background: config.background,
          boxShadow: "0 4px 12px rgba(250, 174, 0, 0.2)",
          cursor: "pointer",
        }}
        styles={{
          body: {
            height: "100%",
            display: "flex",
            flexDirection: "column",
          },
        }}
      >
        <div className="flex items-center gap-2 mb-4">
          <InfoCircleOutlined
            style={{ color: config.borderColor, fontSize: "20px" }}
          />
          <Title level={4} style={{ margin: 0 }}>
            História
          </Title>
        </div>

        <div className="flex-grow overflow-y-auto pr-2 custom-scrollbar">
          <Paragraph className="text-slate-600 text-sm leading-relaxed text-justify italic">
            {sticker.description || "Descrição em breve..."}
          </Paragraph>
        </div>

        <div className="mt-auto pt-4 border-t">
          <Text>Classe:</Text>
          <Tag color={config.borderColor}>
            <Text color="black">{config.label}</Text>
          </Tag>
        </div>
      </Card>
    </div>
  );
}
