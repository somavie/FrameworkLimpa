// hooks/useRegisterUser.ts
"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import api from "@/helpers/api";
import { RegisterFormType } from "@/helpers/types";

export const useRegisterUser = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const registerUser = useCallback(
    async (values: RegisterFormType) => {
      setLoading(true);
      const usuarioData = {
        ...values,
        pessoa_id: values.pessoa_id,
        tipo_usuario_id: values.tipo_usuario_id,
      };

      try {
        await api.post("/auth/register", usuarioData);
      } catch (error) {
        console.error("Erro ao registrar:", error);
      } finally {
        setLoading(false);
      }
    },
    [router]
  );

  return { registerUser, loading };
};
