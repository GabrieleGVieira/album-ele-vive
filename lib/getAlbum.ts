import { supabase } from "@/lib/supabaseClient"
import { AlbumWithRelations } from "@/types/database"

export async function getAlbum(): Promise<AlbumWithRelations> {
  const { data, error } = await supabase
    .from("album")
    .select(`
      *,
      category (
        *,
        sticker (*)
      )
    `)
    .eq("is_active", true)
     .maybeSingle()

     console.log(data)
  if (error) throw error
  return data
}