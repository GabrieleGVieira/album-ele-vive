"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"

export function useAuthInit() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const init = async () => {
      const { data } = await supabase.auth.getSession()

      if (!data.session) {
        await supabase.auth.signInAnonymously()
      }

      setLoading(false)
    }

    init()
  }, [])

  return { loading }
}