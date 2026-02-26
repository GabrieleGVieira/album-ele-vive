import { OpenPack } from "@/types/database";
import { supabase } from "../supabaseClient"

export async function openPack(userID: string) : Promise<OpenPack>  {
  const { data, error } = await supabase.rpc("open_pack_rpc", {
  p_user_id: userID,
});
  if (error) throw error

  return data
}