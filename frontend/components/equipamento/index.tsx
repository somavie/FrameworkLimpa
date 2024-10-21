import { useEffect, useState } from "react";
import api from "../../helpers/api";

interface Equipamento {
  equipamentos_id: number;
  relatorios_id: number;
  quantidade: number;
  status: string;
  localizacao: string;
  data_verificacao: string;
}

const EquipamentoList = () => {
  const [equipamentos, setEquipamentos] = useState<Equipamento[]>([]);

  useEffect(() => {
    api
      .get("/equipamento")
      .then((response) => setEquipamentos(response.data))
      .catch((error) => console.error("Erro ao buscar equipamentos:", error));
  }, []);

  return (
    <div className="container mx-auto">
      <h1 className="text-xl font-bold my-4">Lista de Equipamentos</h1>
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Quantidade</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">Localização</th>
            <th className="px-4 py-2">Data Verificação</th>
          </tr>
        </thead>
        <tbody>
          {equipamentos.map((equipamento) => (
            <tr key={equipamento.equipamentos_id}>
              <td className="border px-4 py-2">
                {equipamento.equipamentos_id}
              </td>
              <td className="border px-4 py-2">{equipamento.quantidade}</td>
              <td className="border px-4 py-2">{equipamento.status}</td>
              <td className="border px-4 py-2">
                {equipamento.localizacao || "N/A"}
              </td>
              <td className="border px-4 py-2">
                {equipamento.data_verificacao || "N/A"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EquipamentoList;
