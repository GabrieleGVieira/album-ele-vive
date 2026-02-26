import { UserPack } from "@/types/database";
import { supabase } from "../supabaseClient";

export async function getMyPacks(userID: string): Promise<UserPack> {
  const { data, error } = await supabase
    .from("user_pack")
    .select("*")
    .eq("user_id", userID)
    .maybeSingle()

  if (error) throw error;

  return data;
}