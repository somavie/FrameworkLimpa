import React from "react";

interface RenderCellProps<T> {
  item: T;
  columnKey: string;
  columnConfig: {
    [key: string]: (item: T) => React.ReactNode;
  };
}

export const RenderCell = <T extends object>({
  item,
  columnKey,
  columnConfig,
}: RenderCellProps<T>): JSX.Element => {
  // Verifica se existe uma função de renderização personalizada para a coluna
  if (columnConfig[columnKey]) {
    const customRender = columnConfig[columnKey](item);
    return <>{customRender}</>;
  }

  // Caso contrário, retorna o valor padrão
  const value = item[columnKey as keyof T];

  return <span>{String(value)}</span>;
};
