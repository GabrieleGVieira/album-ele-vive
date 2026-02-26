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
  sticker?: StickerWithUser[];
  total_stickers?: number;
  owned_stickers?: number;
  progress_percent?: number;
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
  is_owned?: boolean
}

export type CategoryWithRelations = Category & {
    sticker: Sticker[]
  }

export type StickerFromSupabase = Sticker & {
  user_sticker: { user_id: string }[];
};

export interface UserSticker {
  user_id: string;
}

export interface StickerWithUser {
  id: string;
  category_id: string;
  name: string;
  image_url: string;
  thumbnail_url: string;
  description: string;
  rarity: "common" | "rare" | "legendary";
  number: number;
  position: number;
  created_at: string;
  user_sticker?: UserSticker[];
}

export interface CategoryWithStats {
  id: string;
  name: string;
  total: number;
  created_at: string;
  sticker: StickerWithUser[];
  total_stickers: number;
  owned_stickers: number;
  progress_percent: number;
}

export type AlbumWithRelations = Album & {
  category: Category[];
}

export type OpenPack = {
  stickers: string[],
  success: boolean
}

export type UserPack = {
  id: string,
  quantity: number,
  updated_at: string,
  user_id: number
}