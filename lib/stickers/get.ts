import { OpenPack, Sticker } from "@/types/database";
import { supabase } from "../supabaseClient";

export async function getStickers(stickersIDs: OpenPack): Promise<Sticker[]> {
  const { data, error } = await supabase
    .from("sticker")
    .select("*")
    .in("id", stickersIDs.stickers);

  if (error) throw error;

  return data ?? [];
}


export async function getSticker(id: string): Promise<Sticker> {
  const { data, error } = await supabase
    .from("sticker")
    .select("*")
    .eq("id", id)
    .maybeSingle()

  if (error) throw error;

  return data;
}