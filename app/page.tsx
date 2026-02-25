"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { useAuthInit } from "@/hooks/useAuthInit"
import { useUserProfile } from "@/hooks/useUserProfile"

export default function Home() {
  const router = useRouter()
  const { loading: authLoading } = useAuthInit()
  const { profile, loading: profileLoading } = useUserProfile()

  useEffect(() => {
    if (authLoading || profileLoading) return

    if (!profile?.parish_id) {
      router.replace("/onboarding")
    } else {
      router.replace("/album")
    }
  }, [authLoading, profileLoading, profile, router])

  return <div>Carregando...</div>
}