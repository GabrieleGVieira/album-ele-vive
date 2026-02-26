"use client";

import { Col, Layout, Row } from "antd";
import { useAuthInit } from "../hooks/useAuthInit";
import { Content } from "antd/es/layout/layout";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { ArrowLeftOutlined } from "@ant-design/icons";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useAuthInit();
  const pathname = usePathname();
  const router = useRouter();

  const isHome = pathname === "/" || pathname === "/home";

  return (
    <html lang="pt-BR">
      <body style={{ margin: 0 }}>
        <Layout style={{ minHeight: "100vh", background: "white" }}>
          <Row
            align="middle"
            style={{ 
              background: "#FDD001", 
              height: 50, 
              padding: "0 20px"
            }}
          >
            <Col 
              span={24} 
              style={{ 
                display: "flex", 
                alignItems: "center", 
                justifyContent: isHome ? "center" : "space-between" 
              }}
            >
              {!isHome && (
                <ArrowLeftOutlined 
                  style={{ fontSize: 20, cursor: "pointer" }} 
                  onClick={() => router.back()}
                />
              )}

              <Image
                src="/setor-juventude.jpeg"
                alt="header"
                width={40}
                height={40}
                style={{ 
                  marginLeft: isHome ? 0 : "auto" 
                }}
              />
            </Col>
          </Row>
          
          <Content style={{ background: "#F5F5F5" }}>{children}</Content>
        </Layout>
      </body>
    </html>
  );
}