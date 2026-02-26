"use client"

import { Row, Col } from "antd"
import { Sticker } from "@/types/database"
import StickerCard from "../StickerCard"

type AlbumGridProps = {
  stickers: Sticker[]
}

export default function AlbumGrid({ stickers }: AlbumGridProps) {
  const sortedStickers = [...stickers].sort(
    (a, b) => a.position - b.position
  )

  return (
    <Row gutter={[12, 12]}>
      {sortedStickers.map((sticker) => (
        <Col
          key={sticker.id}
          xs={8}   // 3 por linha no mobile (24 / 8 = 3)
          sm={6}   // 4 por linha
          md={4}   // 6 por linha
          lg={3}   // 8 por linha
        >
          <StickerCard sticker={sticker} />
        </Col>
      ))}
    </Row>
  )
}