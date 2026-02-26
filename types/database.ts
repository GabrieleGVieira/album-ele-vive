export type UserProfile = {
  id: string
  auth_user_id: string
  name: string | null
  parish_id: string | null
  phone_number: string
  birthday: Date
  created_at: string
  updated_at: string
}

export type Parish = {
  id: string
  name: string
  pastoral_region: string
  created_at: string
  updated_at: string
}

export type Group = {
  id: string
  name: string
  created_at: string
  updated_at: string
}

export type Album = {
  id: string
  title: string
  subtitle: string
  cover_image: string | null
  description: string | null
  is_active: boolean
  starts_at: string | null
  ends_at: string | null
  created_at: string
  total: number
}

export type Category = {
  id: string
  album_id: string
  name: string
  description: string | null
  position: number
  created_at: string
  total: number
}

export type Sticker = {
  id: string
  category_id: string
  name: string
  image_url: string
  thumbnail_url: string | null
  description: string | null
  rarity: "common" | "rare" | "legendary"
  number: number
  position: number
  created_at: string
}

export type AlbumWithRelations = Album & {
  category: (Category & {
    sticker: Sticker[]
  })[]
}
