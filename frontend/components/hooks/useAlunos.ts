import { useState, useEffect } from "react";
import api from "../../helpers/api";
import { AlunoType } from "@/helpers/types";

export const useAlunos = () => {
  const [alunos, setAlunos] = useState<AlunoType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Função para buscar alunos
  const fetchAlunos = async () => {
    try {
      const response = await api.get<AlunoType[]>("/matriculas/alunos");
      console.log("Dados recebidos da API:", response.data); // Para debug
      setAlunos(response.data); // Atualiza corretamente o estado
    } catch (error) {
      setError("Erro ao buscar alunos");
      console.error("Erro ao buscar alunos:", error);
    } finally {
      setLoading(false); // Desativa o estado de carregamento
    }
  };

  useEffect(() => {
    fetchAlunos(); // Chama a função ao montar o componente
  }, []); // O array vazio garante que só execute uma vez

  return { alunos, loading, error };
};
