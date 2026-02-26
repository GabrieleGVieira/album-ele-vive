"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuthInit } from "@/hooks/useAuthInit";
import { useUserProfile } from "@/hooks/useUserProfile";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

export default function Login() {
  const router = useRouter();
  const { loading: authLoading } = useAuthInit();
  const { profile, loading: profileLoading } = useUserProfile();

  useEffect(() => {
    if (authLoading || profileLoading) return;

    if (!profile?.parish_id) {
      router.replace("/onboarding");
    } else {
      router.replace("/home");
    }
  }, [authLoading, profileLoading, profile, router]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "90vh",
      }}
    >
          <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
    </div>
  );
}
