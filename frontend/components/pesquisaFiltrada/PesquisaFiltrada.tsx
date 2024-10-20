import React, { useState, useEffect } from "react";

interface PesquisaFiltradaProps<T> {
  data: T[];
  columns: string[];
  headers: string[];
  onFilter: (filteredData: T[]) => void;
}

export const PesquisaFiltrada = <T,>({
  data,
  columns,
  headers,
  onFilter,
}: PesquisaFiltradaProps<T>) => {
  const [searchText, setSearchText] = useState<string>("");
  const [selectedColumn, setSelectedColumn] = useState<string>("");

  // Função para filtrar os dados com base no texto de pesquisa e na coluna selecionada
  const handleFilter = () => {
    if (searchText === "") {
      // Se o campo de pesquisa estiver vazio, restaura os dados originais
      onFilter(data);
    } else {
      const filteredData = data.filter((item) => {
        if (!selectedColumn) return true;
        const value = item[selectedColumn as keyof T]?.toString().toLowerCase();
        return value?.includes(searchText.toLowerCase());
      });
      onFilter(filteredData);
    }
  };

  // Executa o filtro sempre que o texto de pesquisa ou a coluna selecionada mudam
  useEffect(() => {
    handleFilter();
  }, [searchText, selectedColumn]);

  return (
    <div className="flex items-center gap-3 flex-wrap md:flex-nowrap">
      <select
        className="border border-gray-300 rounded p-2"
        value={selectedColumn}
        onChange={(e) => setSelectedColumn(e.target.value)}
      >
        <option value="">Selecionar Coluna</option>
        {columns.map((column, index) => (
          <option key={column} value={column}>
            {headers[index]}
          </option>
        ))}
      </select>
      <input
        type="text"
        className="border border-gray-300 rounded p-2 w-full"
        placeholder="Buscar"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
    </div>
  );
};
