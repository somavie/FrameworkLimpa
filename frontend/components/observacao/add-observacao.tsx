import { Observacao } from "@/helpers/types"; // Tipagem que você mencionou

interface ObservacaoFormProps {
  observacoes: Observacao[];
  setObservacoes: React.Dispatch<React.SetStateAction<Observacao[]>>;
}

export default function ObservacaoForm({
  observacoes,
  setObservacoes,
}: ObservacaoFormProps) {
  // Função para adicionar novas observações dinamicamente
  const adicionarNovaObservacao = () => {
    setObservacoes([...observacoes, { situacao_id: 0, descricao: "" }]);
  };

  return (
    <div>
      <h2 className="text-lg font-bold mb-4">Adicionar Observações</h2>
      {observacoes.map((observacao, index) => (
        <div key={index}>
          <div className="mb-4">
            <label className="block mb-2">Situação ID:</label>
            <input
              type="number"
              className="border p-2 w-full"
              value={observacao.situacao_id}
              onChange={(e) =>
                setObservacoes((prev) =>
                  prev.map((obs, i) =>
                    i === index ? { ...obs, situacao_id: +e.target.value } : obs
                  )
                )
              }
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Descrição:</label>
            <textarea
              className="border p-2 w-full"
              value={observacao.descricao}
              onChange={(e) =>
                setObservacoes((prev) =>
                  prev.map((obs, i) =>
                    i === index ? { ...obs, descricao: e.target.value } : obs
                  )
                )
              }
            ></textarea>
          </div>
        </div>
      ))}
      <button
        className="bg-green-500 text-white p-2"
        onClick={adicionarNovaObservacao}
      >
        + Adicionar Outra Observação
      </button>
    </div>
  );
}
