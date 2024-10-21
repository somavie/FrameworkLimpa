import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import api from "../../helpers/api";
interface Equipamento {
  equipamentos_id: number;
  relatorios_id: number;
  quantidade: number;
  status: string;
  localizacao: string;
  data_verificacao: string;
}

const EquipamentoDetalhe = () => {
  const router = useRouter();
  const { id } = router.query;
  const [equipamento, setEquipamento] = useState<Equipamento | null>(null);

  useEffect(() => {
    if (id) {
      api
        .get(`/equipamento/${id}`)
        .then((response) => setEquipamento(response.data))
        .catch((error) => console.error("Erro ao buscar equipamento:", error));
    }
  }, [id]);

  if (!equipamento) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="container mx-auto">
      <h1 className="text-xl font-bold my-4">
        Detalhes do Equipamento {equipamento.equipamentos_id}
      </h1>
      <div className="bg-white p-4 border rounded">
        <p>
          <strong>ID:</strong> {equipamento.equipamentos_id}
        </p>
        <p>
          <strong>Quantidade:</strong> {equipamento.quantidade}
        </p>
        <p>
          <strong>Status:</strong> {equipamento.status}
        </p>
        <p>
          <strong>Localização:</strong> {equipamento.localizacao || "N/A"}
        </p>
        <p>
          <strong>Data de Verificação:</strong>{" "}
          {equipamento.data_verificacao || "N/A"}
        </p>
      </div>
    </div>
  );
};

export default EquipamentoDetalhe;
