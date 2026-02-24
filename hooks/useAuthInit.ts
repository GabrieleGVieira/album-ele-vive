"use client"

import { useEffect } from "react"
import { supabase } from "../lib/supabaseClient"

export function useAuthInit() {
  useEffect(() => {
    const init = async () => {
      // 1️⃣ pega sessão atual
      let { data: { session } } = await supabase.auth.getSession()

      // 2️⃣ se não existir, cria login anônimo
      if (!session) {
        await supabase.auth.signInAnonymously()
        const res = await supabase.auth.getSession()
        session = res.data.session
      }

      // 3️⃣ se agora temos sessão, envia token
      if (session) {
        await fetch("/api/profile/init", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${session.access_token}`,
          },
        })
      }
    }

    init()
  }, [])
}