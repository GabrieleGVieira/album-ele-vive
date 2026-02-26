import { useEffect, useState } from "react";
import { Row, Col, Typography, Button, Image, Space } from "antd";
import { motion, AnimatePresence } from "framer-motion";
import {
  GiftOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";
import { openPack } from "@/lib/packs/open";
import { useUserProfile } from "@/hooks/useUserProfile";
import { getStickers } from "@/lib/stickers/get";
import { Sticker } from "@/types/database";
import { getMyPacks } from "@/lib/packs/get";
import StickerCard from "../StickerCard";
import PackCard from "./PackCard";

const { Title, Text } = Typography;

export default function PackInventory() {
  const [loading, setLoading] = useState(false);
  const [openedPackId, setOpenedPackId] = useState<number | null>(null);
  const [totalPacks, setTotalPacks] = useState<number>(0);
  const [stickers, setStickers] = useState<Sticker[]>([]);
  const { profile } = useUserProfile();
  const userID = profile?.id ? profile.id : "0";

  const handleOpenPack = async (id: number) => {
    setLoading(true);
    setOpenedPackId(id);

    const ids = await openPack(userID);
    const stickers_list = await getStickers(ids);
    const fullList = ids.stickers
      .map((id) => {
        return stickers_list.find((s) => s.id === id);
      })
      .filter(Boolean) as Sticker[];

    setTimeout(() => {
      setStickers(fullList);
      setLoading(false);
    }, 1500);
  };

  const resetView = () => {
    setOpenedPackId(null);
    setStickers([]);
  };

  useEffect(() => {
    async function fetchPacks() {
      const data = await getMyPacks(userID);
      setTotalPacks(data.quantity);
    }
    fetchPacks();
  }, [userID, openedPackId]);

  return (
    <div style={{ padding: "24px", background: "#f0f2f5", minHeight: "100vh" }}>
      <AnimatePresence mode="wait">
        {!openedPackId ? (
          <motion.div
            key="list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              style={{
                background: "#fff",
                padding: "20px",
                borderRadius: 16,
                marginBottom: 24,
                textAlign: "center",
                boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
              }}
            >
              <Title level={4} style={{ margin: 0 }}>
                Seus Pacotinhos
              </Title>
              <Text type="secondary">
                Você tem <b>{totalPacks}</b> pacotes prontos para abrir!
              </Text>
            </div>

            <Row gutter={[16, 16]}>
              {totalPacks > 0 ? (
                Array.from({ length: totalPacks }).map((_, index) => (
                  <PackCard
                    handleOpenPack={handleOpenPack}
                    index={index + 1}
                    key={index + 1}
                  />
                ))
              ) : (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "50vh",
                    margin: 50,
                    textAlign: "center"
                  }}
                >
                  <Space orientation="vertical" size="large">
                    <Text strong style={{ fontSize: 24, color: '#262626'}}>
                      Você não tem pacotinhos novos por enquanto. Volte mais
                      tarde!
                    </Text>
                    <Image src="/francisco.jpeg" alt="francisco" style={{borderRadius: 24}}/>
                  </Space>
                </div>
              )}
            </Row>
          </motion.div>
        ) : (
          <motion.div
            key="opening"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex flex-col items-center justify-center"
            style={{ minHeight: "70vh" }}
          >
            {loading ? (
              <div style={{ textAlign: "center" }}>
                <motion.div
                  animate={{
                    rotate: [0, -10, 10, -10, 10, 0],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                  style={{ fontSize: 120, color: "#05631d", marginBottom: 20 }}
                >
                  <GiftOutlined />
                </motion.div>
                <Title level={3}>Abrindo pacotinho...</Title>
              </div>
            ) : (
              <div style={{ textAlign: "center" }}>
                <Title level={2} style={{ marginBottom: 40 }}>
                  Você recebeu:
                </Title>

                <Row
                  gutter={[16, 16]}
                  justify="center"
                  style={{ marginBottom: 40 }}
                >
                  {stickers.map((s, index) => (
                    <Col key={s.id}>
                      <motion.div
                        initial={{ opacity: 0, y: 40, rotateY: 180 }}
                        animate={{ opacity: 1, y: 0, rotateY: 0 }}
                        transition={{ delay: index * 0.3, duration: 0.6 }}
                        style={{
                          width: 120,
                          height: 180,
                          background: "#fff",
                          borderRadius: 12,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: 20,
                          fontWeight: "bold",
                          boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
                          border: "4px solid #f0f0f0",
                        }}
                      >
                        <StickerCard sticker={s} forceShow={true} />
                      </motion.div>
                    </Col>
                  ))}
                </Row>

                <Space size="middle">
                  <Button
                    size="large"
                    icon={<ArrowLeftOutlined />}
                    onClick={resetView}
                  >
                    Voltar aos pacotes
                  </Button>
                  <Button
                    type="primary"
                    size="large"
                    onClick={() => (window.location.href = "/album")}
                  >
                    Ir para o álbum
                  </Button>
                </Space>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
