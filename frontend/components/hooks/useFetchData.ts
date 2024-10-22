// hooks/useFetchData.ts
import { useState, useEffect, useCallback } from "react";
import api from "@/helpers/api";
import {
  DisciplinaType,
  EpocaType,
  TipoProvaType,
  TurmaType,
} from "@/helpers/types";

// Hook para buscar disciplinas e turmas permitidas para o professor
export const useFetchDisciplinasETurmas = (id: number | null) => {
  const [disciplinaPermitida, setDisciplinaPermitida] = useState<
    DisciplinaType[]
  >([]);
  const [turmasPermitidas, setTurmasPermitidas] = useState<TurmaType[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchDisciplinasETurmas = useCallback(async () => {
    try {
      const response = await api.get(`/professores/turmas/${id}`);
      const turmaprof = response.data;
      setDisciplinaPermitida(turmaprof);
      setTurmasPermitidas(turmaprof);
    } catch (error) {
      console.error("Erro ao buscar disciplinas e turmas:", error);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      fetchDisciplinasETurmas();
    }
  }, [id, fetchDisciplinasETurmas]);

  return { disciplinaPermitida, turmasPermitidas, loading };
};

// Hook para buscar disciplinas por turma selecionada
export const useFetchDisciplinasPorTurma = (
  id: number | null,
  turmaSelecionada: number | null
) => {
  const [disciplinasPermitidas, setDisciplinasPermitidas] = useState<
    DisciplinaType[]
  >([]);
  const [loading, setLoading] = useState(true);

  const fetchDisciplinasPorTurma = useCallback(
    async (turmaId: number) => {
      try {
        const response = await api.get(
          `professores/professores/${id}/turmas/${turmaId}`
        );
        const disciplinas = response.data;
        setDisciplinasPermitidas(disciplinas);
      } catch (error) {
        console.error(
          "Erro ao buscar disciplinas para a turma selecionada:",
          error
        );
      } finally {
        setLoading(false);
      }
    },
    [id]
  );

  useEffect(() => {
    if (turmaSelecionada) {
      fetchDisciplinasPorTurma(turmaSelecionada);
    }
  }, [turmaSelecionada, fetchDisciplinasPorTurma]);

  return { disciplinasPermitidas, loading };
};
