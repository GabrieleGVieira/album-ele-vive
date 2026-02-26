import { supabase } from "@/lib/supabaseClient";
import {
  AlbumWithRelations,
  Category,
  CategoryWithRelations,
  CategoryWithStats,
  StickerFromSupabase,
} from "@/types/database";

export async function getAlbum(userID: string): Promise<AlbumWithRelations> {
  const { data, error } = await supabase
    .from("album")
    .select(`
      *,
      category (
        *,
        sticker (
          *,
          user_sticker (
            user_id
          )
        )
      )
    `)
    .eq("is_active", true)
    .eq("category.sticker.user_sticker.user_id", userID)
    .maybeSingle();

  if (error) throw error;
  if (!data) throw new Error("Álbum não encontrado");

  const rawAlbum = data as AlbumWithRelations;

  const formattedCategories = rawAlbum.category.map((cat): CategoryWithStats => {
    const stickersWithOwnership = cat.sticker.map((s) => ({
      ...s,
      is_owned: s.user_sticker && s.user_sticker.length > 0,
    }));

    const owned = stickersWithOwnership.filter((s) => s.is_owned).length;
    const percentage = cat.total > 0 ? Math.round((owned / cat.total) * 100) : 0;

    return {
      ...cat,
      sticker: cat.sticker, 
      owned_stickers: owned,
      progress_percent: percentage,
    };
  });

  return {
    ...rawAlbum,
    category: formattedCategories,
  };
}

export async function getOwnedStickers(userID: string): Promise<number> {
  const { count, error } = await supabase
    .from("user_sticker")
    .select("*", { count: "exact", head: true }) 
    .eq("user_id", userID);

  if (error) {
    console.error("Erro ao contar figurinhas:", error);
    throw error;
  }

  return count || 0;
}

export async function getCategory(
  id: string,
  userId: string,
): Promise<CategoryWithRelations> {
  const { data, error } = await supabase
    .from("category")
    .select(
      `
        *,
        sticker (
          *,
          user_sticker (
            user_id
          )
        )
    `,
    )
    .eq("id", id)
    .eq("sticker.user_sticker.user_id", userId)
    .maybeSingle();

  if (error) throw error;
  if (!data) throw new Error("Categoria não encontrada");

  const supabaseData = data as Category & { sticker: StickerFromSupabase[] };

  const formattedData: CategoryWithRelations = {
    ...supabaseData,
    sticker: supabaseData.sticker.map((s: StickerFromSupabase) => ({
      id: s.id,
      category_id: s.category_id,
      name: s.name,
      image_url: s.image_url,
      thumbnail_url: s.thumbnail_url,
      description: s.description,
      rarity: s.rarity,
      number: s.number,
      position: s.position,
      created_at: s.created_at,

      is_owned: Array.isArray(s.user_sticker) && s.user_sticker.length > 0,
    })),
  };

  return formattedData;
}

