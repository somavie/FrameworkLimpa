import axios from "axios";
import { getCookies } from "@/actions/auth.action"; // Função para obter o token dos cookies do Next.js

// Função para pegar o token do cookie 'userAuth' usando o getCookies do Next.js
const getTokenFromCookies = async () => {
  return await getCookies(); // Chama a função que acessa os cookies no servidor
};

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8088", // URL padrão do backend
  headers: {
    "Content-Type": "application/json",
  },
});

// Intercepta cada requisição e adiciona o token no header
api.interceptors.request.use(
  async (config) => {
    const token = await getTokenFromCookies(); // Pega o token dos cookies
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Adiciona o token no header Authorization
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
