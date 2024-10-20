import React, { useState, useMemo } from "react";
import {
  Tooltip,
  Pagination,
  Input,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { DeleteIcon } from "../icons/table/delete-icon";
import { EditIcon } from "../icons/table/edit-icon";
import { EyeIcon } from "../icons/table/eye-icon";
import { ArrowUp, ArrowDown } from "lucide-react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import { RenderCell } from "./render-cell";
import DynamicPDFGenerator from "../pdf/DynamicPDFGenerator";

interface TableWrapperProps<T> {
  data: T[];
  columns: string[];
  headers: string[];
  onView?: (item: T) => void;
  onEdit?: (item: T) => void;
  onDelete: (id: number) => void;
  columnConfig?: {
    [key: string]: (item: T) => React.ReactNode;
  };
}

interface SortDescriptor {
  column: string;
  direction: "ascending" | "descending";
}

export const TableWrapper = <T extends { id: number }>({
  data,
  columns,
  headers,
  onView,
  onEdit,
  onDelete,
  columnConfig = {},
}: TableWrapperProps<T>) => {
  const [page, setPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filters, setFilters] = useState<{ column: string; query: string }[]>(
    []
  );
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: "",
    direction: "ascending",
  });

  const columnsWithActions: string[] = [...columns, "acoes"];
  const headersWithActions: string[] = [...headers, "Ações"];

  const filteredData = useMemo(() => {
    let filtered = data;

    // Aplicar pesquisa geral
    if (searchQuery) {
      filtered = filtered.filter((item) => {
        return Object.values(item)
          .join(" ")
          .toLowerCase()
          .includes(searchQuery.toLowerCase());
      });
    }

    // Aplicar filtros combinados
    filters.forEach(({ column, query }) => {
      if (query) {
        filtered = filtered.filter((item) => {
          const value = item[column as keyof T];

          // Verifica se o campo é numérico (ex.: classe) e faz a comparação exata
          if (column === "classe") {
            // Tenta converter query e value para número
            const queryAsNumber = Number(query);
            const valueAsNumber = Number(value);
            return valueAsNumber === queryAsNumber;
          } else {
            // Caso contrário, faz a comparação de string
            return value
              ?.toString()
              .toLowerCase()
              .includes(query.toLowerCase());
          }
        });
      }
    });

    return filtered;
  }, [data, filters, searchQuery]);

  const sortedData = useMemo(() => {
    if (!sortDescriptor.column) return filteredData;
    return [...filteredData].sort((a, b) => {
      const aValue = a[sortDescriptor.column as keyof T];
      const bValue = b[sortDescriptor.column as keyof T];

      if (aValue < bValue)
        return sortDescriptor.direction === "ascending" ? -1 : 1;
      if (aValue > bValue)
        return sortDescriptor.direction === "ascending" ? 1 : -1;
      return 0;
    });
  }, [filteredData, sortDescriptor]);

  const totalPages = Math.ceil(sortedData.length / rowsPerPage);
  const paginatedData = sortedData.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setPage(1);
  };

  const handleAddFilter = () => {
    setFilters([...filters, { column: "", query: "" }]);
  };

  const handleFilterChange = (index: number, column: string, query: string) => {
    const newFilters = [...filters];
    newFilters[index] = { column, query };
    setFilters(newFilters);
  };

  const handleRemoveFilter = (index: number) => {
    const newFilters = filters.filter((_, i) => i !== index);
    setFilters(newFilters);
  };

  const handleSortChange = (column: string) => {
    setSortDescriptor((prev) => {
      if (prev.column === column) {
        return {
          column,
          direction:
            prev.direction === "ascending" ? "descending" : "ascending",
        };
      } else {
        return { column, direction: "ascending" };
      }
    });
  };

  const handleRowsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  };

  return (
    <div>
      <div className="flex flex-row mb-3 gap-1.5 items-center">
        <div className="w-1/6">
          <Input
            placeholder="Buscar..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
        <button onClick={handleAddFilter} className="btn btn-primary">
          Adicionar Filtro
        </button>
      </div>
      <div>
        {" "}
        {/* Botão para gerar o PDF */}
        <DynamicPDFGenerator
          title="Lista"
          data={sortedData}
          columns={columns}
          headers={headers}
          columnConfig={columnConfig}
          fileName="relatorio.pdf"
        />
      </div>
      {filters.map((filter, index) => (
        <div className="flex items-center mb-2" key={index}>
          <Select
            selectedKeys={new Set([filter.column])}
            onSelectionChange={(keys) => {
              const key = keys.currentKey ?? "";
              handleFilterChange(index, key, filter.query);
            }}
            size="md"
            className="mr-2"
          >
            {columns.map((column, index) => (
              <SelectItem key={column} value={column}>
                {headers[index]}
              </SelectItem>
            ))}
          </Select>
          <Input
            placeholder={`Buscar por ${filter.column}...`}
            value={filter.query}
            onChange={(e) =>
              handleFilterChange(index, filter.column, e.target.value)
            }
            className="w-1/4"
          />
          <button
            onClick={() => handleRemoveFilter(index)}
            className="ml-2 text-red-500"
          >
            Remover
          </button>
        </div>
      ))}

      <div className="flex justify-between items-center">
        <span>
          Página {page} de {totalPages}
        </span>
        <Pagination
          total={totalPages}
          page={page}
          onChange={setPage}
          size="sm"
          color="primary"
          loop
          aria-label="Paginação de tabela"
        />
      </div>

      <Table sortDescriptor={sortDescriptor} aria-label="Tabela">
        <TableHeader>
          {headersWithActions.map((header, index) => {
            const columnKey = columnsWithActions[index];
            const isSortable = columnKey !== "acoes";

            return (
              <TableColumn
                key={index}
                onClick={() => isSortable && handleSortChange(columnKey)}
              >
                {header}
                {sortDescriptor.column === columnKey && (
                  <>
                    {sortDescriptor.direction === "ascending" ? (
                      <ArrowUp size={16} />
                    ) : (
                      <ArrowDown size={16} />
                    )}
                  </>
                )}
              </TableColumn>
            );
          })}
        </TableHeader>

        <TableBody>
          {paginatedData.map((item) => (
            <TableRow key={item.id}>
              {columnsWithActions.map((columnKey) => (
                <TableCell key={columnKey}>
                  {columnKey === "acoes" ? (
                    <div className="flex items-center gap-4">
                      {onView && (
                        <div>
                          <Tooltip content="Detalhes">
                            <button onClick={() => onView(item)}>
                              <EyeIcon size={20} fill="#979797" />
                            </button>
                          </Tooltip>
                        </div>
                      )}
                      {onEdit && (
                        <div>
                          <Tooltip content="Editar item" color="secondary">
                            <button onClick={() => onEdit(item)}>
                              <EditIcon size={20} fill="#979797" />
                            </button>
                          </Tooltip>
                        </div>
                      )}
                      <div>
                        <Tooltip content="Excluir item" color="danger">
                          <button onClick={() => onDelete(item.id)}>
                            <DeleteIcon size={20} fill="#FF0080" />
                          </button>
                        </Tooltip>
                      </div>
                    </div>
                  ) : (
                    <RenderCell
                      item={item}
                      columnKey={columnKey}
                      columnConfig={columnConfig}
                    />
                  )}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="mt-3">
        <label htmlFor="rowsPerPage">Linhas por página:</label>
        <select
          id="rowsPerPage"
          value={rowsPerPage}
          onChange={handleRowsPerPageChange}
          className="ml-2"
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
        </select>
      </div>
    </div>
  );
};
