"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"
import { UserProfile } from "@/types/database"

export function useUserProfile() {
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      const { data: { user } } = await supabase.auth.getUser()

      if (!user) return

      const { data } = await supabase
        .from("user_profile")
        .select("*")
        .eq("auth_user_id", user.id)
        .single()

      setProfile(data)
      setLoading(false)
    }

    load()
  }, [])

  return { profile, loading }
}