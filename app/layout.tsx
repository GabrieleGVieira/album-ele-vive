"use client"

import { useAuthInit } from "../hooks/useAuthInit"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  useAuthInit()

  return (
    <html lang="pt-br">
      <body>{children}</body>
    </html>
  )
}
