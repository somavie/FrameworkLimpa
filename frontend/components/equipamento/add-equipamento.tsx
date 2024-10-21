import { Equipamento } from "@/helpers/types"; // Tipagem que você mencionou

interface EquipamentoFormProps {
  equipamentos: Equipamento[];
  setEquipamentos: React.Dispatch<React.SetStateAction<Equipamento[]>>;
}

export default function EquipamentoForm({
  equipamentos,
  setEquipamentos,
}: EquipamentoFormProps) {
  // Função para adicionar novos equipamentos dinamicamente
  const adicionarNovoEquipamento = () => {
    setEquipamentos([
      ...equipamentos,
      { equipamento_id: 0, quantidade: 0, status: "Bom", localizacao: "" }, // Definir "Bom" como valor padrão
    ]);
  };

  return (
    <div>
      <h2 className="text-lg font-bold mb-4">Adicionar Equipamentos</h2>
      {equipamentos.map((equipamento, index) => (
        <div key={index} className="mb-4 p-4 border border-gray-300 rounded">
          <h3 className="font-semibold mb-2">Equipamento {index + 1}</h3>
          <div className="mb-4">
            <label className="block mb-2">Equipamento ID:</label>
            <input
              type="number"
              className="border p-2 w-full"
              value={equipamento.equipamento_id}
              onChange={(e) =>
                setEquipamentos((prev) =>
                  prev.map((equip, i) =>
                    i === index
                      ? { ...equip, equipamento_id: +e.target.value }
                      : equip
                  )
                )
              }
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Quantidade:</label>
            <input
              type="number"
              className="border p-2 w-full"
              value={equipamento.quantidade}
              onChange={(e) =>
                setEquipamentos((prev) =>
                  prev.map((equip, i) =>
                    i === index
                      ? { ...equip, quantidade: +e.target.value }
                      : equip
                  )
                )
              }
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Estado:</label>
            <select
              className="border p-2 w-full"
              value={equipamento.status}
              onChange={(e) =>
                setEquipamentos((prev) =>
                  prev.map((equip, i) =>
                    i === index ? { ...equip, status: e.target.value } : equip
                  )
                )
              }
            >
              <option value="Bom">Bom</option>
              <option value="Mau">Mau</option>
              <option value="Manutenção">Manutenção</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block mb-2">Localização:</label>
            <input
              type="text"
              className="border p-2 w-full"
              value={equipamento.localizacao}
              onChange={(e) =>
                setEquipamentos((prev) =>
                  prev.map((equip, i) =>
                    i === index
                      ? { ...equip, localizacao: e.target.value }
                      : equip
                  )
                )
              }
            />
          </div>
        </div>
      ))}
      <button
        className="bg-green-500 text-white p-2"
        onClick={adicionarNovoEquipamento}
      >
        + Adicionar Outro Equipamento
      </button>
    </div>
  );
}
