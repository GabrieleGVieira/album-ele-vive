import { Metadata } from "next";
import ClientLayout from "../components/ClientLayout/ClientLayout";

export const metadata: Metadata = {
  title: "Ele Vive",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body style={{ margin: 0 }}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
