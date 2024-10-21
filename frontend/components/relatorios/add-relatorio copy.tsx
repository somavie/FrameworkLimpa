"use client";
import { Select, SelectItem, Spinner } from "@nextui-org/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import api from "@/helpers/api";
import ObservacaoForm from "../observacao/add-observacao";
import EquipamentoForm from "../equipamento/add-equipamento";
import gerarPDF from "../pdf/relatorioPDF";
import { Equipamento } from "@/helpers/types";
import { useFetchData } from "../hooks/useFetchData"; // Importando o hook genérico

// Definindo a interface para o técnico
interface Tecnico {
  id: number;
  nome: string;
}

interface RelatorioFormData {
  observacao_final: string;
  tecnico_cessante_id: number;
  tecnico_entrante_id: number;
}

interface CreateEquipamentoInput {
  relatorios_id: number;
  quantidade: number;
  status: string;
  localizacao: string | null; // Pode ser string ou null
}

export default function RelatorioForm() {
  const { register, handleSubmit, setValue } = useForm<RelatorioFormData>();
  const { data: tecnicos, loading: loadingTecnicos } =
    useFetchData<Tecnico>("/tecnicos"); // Buscando técnicos
  const [relatorioId, setRelatorioId] = useState<number | null>(null);
  const [observacoes, setObservacoes] = useState<
    { situacao_id: number; descricao: string }[]
  >([]);
  const [equipamentos, setEquipamentos] = useState<Equipamento[]>([]);
  const [isFinalStep, setIsFinalStep] = useState(false);

  const criarRelatorio = async () => {
    try {
      const response = await api.post("/relatorios");
      setRelatorioId(response.data.id);
      alert("Relatório criado com sucesso!");
    } catch (error) {
      console.error("Erro ao criar o relatório:", error);
    }
  };

  const salvarDadosRelacionados = async () => {
    try {
      await Promise.all(
        observacoes.map((observacao) => {
          const observacaoData = { ...observacao, relatorios_id: relatorioId };
          return api.post("/observacoes", observacaoData);
        })
      );

      await Promise.all(
        equipamentos.map((equipamento) => {
          const equipamentoData: CreateEquipamentoInput = {
            ...equipamento,
            relatorios_id: relatorioId!,
          };
          return api.post("/equipamento", equipamentoData);
        })
      );
    } catch (error) {
      console.error("Erro ao salvar observações ou equipamentos:", error);
    }
  };

  const onSubmitFinalizar = async (data: RelatorioFormData) => {
    const { tecnico_cessante_id, tecnico_entrante_id, observacao_final } = data;

    const updateData = {
      tecnico_cessante_id: tecnico_cessante_id
        ? Number(tecnico_cessante_id)
        : undefined,
      tecnico_entrante_id: tecnico_entrante_id
        ? Number(tecnico_entrante_id)
        : undefined,
      data_criacao: new Date(),
      observacoes_finais: observacao_final
        ? String(observacao_final)
        : undefined,
    };

    try {
      await api.put(`/relatorios/${relatorioId}`, updateData);
      await salvarDadosRelacionados();
      if (relatorioId === null) {
        console.error("Erro: relatorioId não pode ser nulo.");
        return;
      }

      await gerarPDF(relatorioId);
      alert("Relatório salvo e PDF gerado com sucesso!");
    } catch (error) {
      console.error("Erro ao finalizar o relatório:", error);
    }
  };

  // Função para lidar com as mudanças nos selects
  const handleChange = (name: keyof RelatorioFormData, value: number) => {
    setValue(name, value); // Atualiza o valor do campo no formulário
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-xl font-bold mb-4">
        Relatório de Equipamentos e Ocorrências
      </h1>

      {!relatorioId && (
        <button
          className="bg-green-500 text-white p-2 mb-6"
          onClick={criarRelatorio}
        >
          Fazer Relatório
        </button>
      )}

      {relatorioId && !isFinalStep && (
        <>
          <ObservacaoForm
            observacoes={observacoes}
            setObservacoes={setObservacoes}
          />
          <EquipamentoForm
            equipamentos={equipamentos}
            setEquipamentos={setEquipamentos}
          />
          <button
            className="bg-yellow-500 text-white p-2 mt-6"
            onClick={() => setIsFinalStep(true)}
          >
            Prosseguir para Técnicos
          </button>
        </>
      )}

      {isFinalStep && (
        <form onSubmit={handleSubmit(onSubmitFinalizar)}>
          <div className="mb-4">
            <label className="block mb-2">Observação Final:</label>
            <textarea
              className="border p-2 w-full"
              {...register("observacao_final")}
            ></textarea>
          </div>

          <div className="mb-4">
            <label className="block mb-2">Técnico Cessante:</label>
            {loadingTecnicos ? (
              <Spinner size="sm" label="Carregando técnicos..." />
            ) : (
              <Select
                label="Técnico Cessante"
                onSelectionChange={(keys) => {
                  const selectedKey = keys.currentKey;
                  if (selectedKey) {
                    handleChange("tecnico_cessante_id", Number(selectedKey));
                  }
                }}
              >
                {tecnicos?.map((tecnico: Tecnico) => (
                  <SelectItem key={tecnico.id}>{tecnico.nome}</SelectItem>
                ))}
              </Select>
            )}
          </div>

          <div className="mb-4">
            <label className="block mb-2">Técnico Entrante:</label>
            {loadingTecnicos ? (
              <Spinner size="sm" label="Carregando técnicos..." />
            ) : (
              <Select
                label="Técnico Entrante"
                onSelectionChange={(keys) => {
                  const selectedKey = keys.currentKey;
                  if (selectedKey) {
                    handleChange("tecnico_entrante_id", Number(selectedKey));
                  }
                }}
              >
                {tecnicos?.map((tecnico: Tecnico) => (
                  <SelectItem key={tecnico.id}>{tecnico.nome}</SelectItem>
                ))}
              </Select>
            )}
          </div>

          <button className="bg-blue-500 text-white p-2" type="submit">
            Finalizar Relatório e Gerar PDF
          </button>
        </form>
      )}
    </div>
  );
}
