"use server";
import { cookies } from "next/headers";

// Função para criar o cookie de autenticação
export const createAuthCookie = async (token: string) => {
  cookies().set("userAuth", token, { secure: true });
};

// Função para obter o valor do token do cookie
export const getCookies = () => {
  const cookie = cookies().get("userAuth");
  return cookie?.value || null; // Retorna o valor do token, ou null se não houver cookie
};

// Função para deletar o cookie de autenticação
export const deleteAuthCookie = async () => {
  cookies().delete("userAuth");
};
