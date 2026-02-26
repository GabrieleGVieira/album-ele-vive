"use client";
import style from "./style.module.css";
import { Button, Space, Input, DatePicker, Select } from "antd";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import { Parish } from "@/types/database";

import { Typography } from 'antd';

const { Text } = Typography;

export default function OnboardingForm() {
  const router = useRouter();
  const [parishes, setParishes] = useState<Parish[]>([]);
  const [selectedParish, setSelectedParish] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const parishOptions = parishes.map((p) => ({
    value: p.id,
    label: p.name,
  }));

  const handleSubmit = async () => {
    await fetch("/api/profile/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${(await supabase.auth.getSession()).data.session?.access_token}`,
      },
      body: JSON.stringify({
        name: displayName,
        parish_id: selectedParish,
        phone_number: phoneNumber,
        birthday: birthDate,
      }),
    });

    router.push("/home");
  };

  useEffect(() => {
    const loadParishes = async () => {
      const { data } = await supabase.from("parish").select("*");
      setParishes(data || []);
    };

    loadParishes();
  }, []);

  return (
    <div className={style.loginPage}>
      <Space orientation="vertical" size={25} style={{ alignItems: "center" }}>
        <Text strong>Bem Vindo</Text>
        <Text strong>Cristo Vive e te quer vivo</Text>
      </Space>

      <section className={style.loginPage__Box}>
        <Space orientation="vertical">
          <Input
            placeholder="Nome Completo"
            style={{ width: 300 }}
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
          />
          <Input
            style={{ width: 300 }}
            defaultValue="(12) xxxxx-xxxx"
            placeholder="Celular"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <Select
            placeholder="Selecione sua paróquia"
            style={{ width: 300 }}
            onChange={(e) => setSelectedParish(e ? e : "")}
            options={parishOptions}
          />
          <DatePicker
            placeholder="Data de Nascimento"
            format={'DD/MM/YYYY'}
            style={{ width: 300 }}
            value={birthDate}
            onChange={(e) => setBirthDate(e? e : "")}
          />
        </Space>
      </section>
      <Button onClick={handleSubmit}> Confirmar </Button>
    </div>
  );
}

