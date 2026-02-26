"use client";
import { Button, Space } from "antd";
import { useRouter } from "next/navigation";

export default function StickersPage() {
   const router = useRouter()
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "90vh",
      }}
    >
      <Space orientation="vertical" size="large" >
        <Button size="large" style={{ width: 220 }} onClick={() => router.push("/stickers/packs")}>Abrir Pacotes</Button>
        <Button size="large" style={{ width: 220 }} onClick={() => router.push("/stickers")} disabled>Trocar Figurinhas</Button>
      </Space>
    </div>
  )
}
