import { Card, Typography, Button, Badge, Col } from "antd";
import { GiftOutlined, ThunderboltFilled } from "@ant-design/icons";

const { Title } = Typography;

type PackCardProps = {
  handleOpenPack: (index: number) => void;
  index: number;
};
export default function PackCard({ handleOpenPack, index }: PackCardProps) {
  return (
    <Col xs={24} sm={12} md={8} key={index}>
      <Badge.Ribbon text="NOVO" color="red">
        <Card
          hoverable
          style={{
            borderRadius: 16,
            textAlign: "center",
            background: "linear-gradient(135deg, #05631D 10%, #6e8efb 100%)",
            border: "none",
          }}
          cover={
            <GiftOutlined
              style={{
                fontSize: 64,
                color: "#fff",
                paddingTop: 40,
              }}
            />
          }
        >
          <Title level={5} style={{ color: "#fff" }}>
            Pacote Santidade
          </Title>
          <Button
            block
            shape="round"
            icon={<ThunderboltFilled />}
            onClick={() => handleOpenPack(index)}
            style={{ marginTop: 10, fontWeight: "bold" }}
          >
            ABRIR
          </Button>
        </Card>
      </Badge.Ribbon>
    </Col>
  );
}
