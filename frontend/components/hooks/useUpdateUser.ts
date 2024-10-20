// hooks/useUpdateUser.ts
"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import api from "@/helpers/api";
import { RegisterFormType } from "@/helpers/types";

export const useUpdateUser = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const updateUser = useCallback(
    async (userId: number, values: RegisterFormType) => {
      setLoading(true);
      const usuarioData = {
        ...values,
        pessoa_id: values.pessoa_id,
        tipo_usuario_id: values.tipo_usuario_id,
      };

      try {
        await api.put(`/auth/${userId}`, usuarioData);
        router.replace("/admin/accounts");
      } catch (error) {
        console.error("Erro ao atualizar:", error);
      } finally {
        setLoading(false);
      }
    },
    [router]
  );

  return { updateUser, loading };
};
