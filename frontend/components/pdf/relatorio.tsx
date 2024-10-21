import api from "@/helpers/api";
import { Equipamento, Observacao } from "@/helpers/types"; // As interfaces necessárias

// Função para buscar os dados do relatório pelo ID
async function buscarDadosRelatorio(relatorioId: number): Promise<{
  equipamentos: Equipamento[];
  observacoes: Observacao[];
  entrante: string;
  cessante: string;
  data_criacao: Date; // Data de criação do relatório (timestamp)
}> {
  try {
    const response = await api.get(`/relatorios/${relatorioId}`);

    // Verifica se o dado principal é um objeto e possui os campos esperados
    const relatorio = response.data;

    if (
      relatorio &&
      Array.isArray(relatorio.equipamentos) &&
      Array.isArray(relatorio.observacoes)
    ) {
      return {
        equipamentos: relatorio.equipamentos, // Array de equipamentos
        observacoes: relatorio.observacoes, // Array de observações
        entrante: relatorio.entrante, // ID do técnico entrante
        cessante: relatorio.cessante, // ID do técnico cessante
        data_criacao: relatorio.data_criacao,
      };
    } else {
      throw new Error("Os dados retornados não têm o formato esperado.");
    }
  } catch (error) {
    console.error("Erro ao buscar dados do relatório:", error);
    throw new Error("Não foi possível buscar os dados do relatório.");
  }
}

export { buscarDadosRelatorio };
