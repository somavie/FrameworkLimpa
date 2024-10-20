import React, { useState, useMemo } from "react";
import Image from "next/image"; // Import Image from next/image
import {
  Tooltip,
  Pagination,
  Input,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { DeleteIcon } from "../../icons/table/delete-icon";
import { EditIcon } from "../../icons/table/edit-icon";
import { EyeIcon } from "../../icons/table/eye-icon";

interface TableWrapperProps<T> {
  data: T[];
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

export const CardGrid = <T extends { id: number }>({
  data,
  onView,
  onEdit,
  onDelete,
  columnConfig = {},
}: TableWrapperProps<T>) => {
  const [page, setPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedColumn, setSelectedColumn] = useState<string>("");
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: "",
    direction: "ascending",
  });

  const columns = Object.keys(data[0] || {});
  const headers = columns.map(
    (col) => col.charAt(0).toUpperCase() + col.slice(1)
  );

  const filteredData = useMemo(() => {
    if (!searchQuery) return data;
    return data.filter((item) => {
      if (!selectedColumn) {
        return Object.values(item).some((value) =>
          String(value).toLowerCase().includes(searchQuery.toLowerCase())
        );
      } else {
        const value = item[selectedColumn as keyof T]?.toString().toLowerCase();
        return value?.includes(searchQuery.toLowerCase());
      }
    });
  }, [data, searchQuery, selectedColumn]);

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
        <div className="min-w-56">
          <Select
            selectedKeys={new Set([String(selectedColumn)])}
            onSelectionChange={(keys) =>
              setSelectedColumn(keys.currentKey ?? "")
            }
            startContent={
              <p className="text-sm mr-0 whitespace-nowrap">Coluna de busca:</p>
            }
            size="md"
          >
            {["", ...columns].map((column, index) => (
              <SelectItem
                key={column}
                value={column}
                textValue={index === 0 ? "Busca Geral" : headers[index - 1]}
              >
                {index === 0 ? "Busca Geral" : headers[index - 1]}
              </SelectItem>
            ))}
          </Select>
        </div>
        <div className="min-w-48">
          <Select
            selectedKeys={new Set([String(rowsPerPage)])}
            onSelectionChange={(keys) =>
              setRowsPerPage(Number(keys.currentKey))
            }
            startContent={
              <p className="text-sm mr-0 whitespace-nowrap">
                Registros por Pág:
              </p>
            }
            size="md"
          >
            <SelectItem key={5}>5</SelectItem>
            <SelectItem key={10}>10</SelectItem>
            <SelectItem key={15}>15</SelectItem>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-5 gap-4">
        {paginatedData.map((item) => (
          <div key={item.id} className="p-4 border rounded-lg shadow-md">
            {columns.map((columnKey) => (
              <div key={columnKey} className="mb-2">
                <strong>
                  {columnKey.charAt(0).toUpperCase() + columnKey.slice(1)}:
                </strong>
                <span className="ml-2">
                  {columnKey === "image" ? ( // Check if column is 'image'
                    <Image
                      src={item[columnKey as keyof T] as string} // Adjust to your image source type
                      alt="Imagem"
                      width={100} // Set the desired width
                      height={100} // Set the desired height
                      className="rounded" // Optional: Add your own styles
                    />
                  ) : columnConfig[columnKey] ? (
                    columnConfig[columnKey](item)
                  ) : (
                    item[columnKey as keyof T]?.toString()
                  )}
                </span>
              </div>
            ))}

            <div className="flex items-center gap-4 mt-4">
              {onView && (
                <Tooltip content="Detalhes">
                  <button onClick={() => onView(item)}>
                    <EyeIcon size={20} fill="#979797" />
                  </button>
                </Tooltip>
              )}
              {onEdit && (
                <Tooltip content="Editar item" color="secondary">
                  <button onClick={() => onEdit(item)}>
                    <EditIcon size={20} fill="#979797" />
                  </button>
                </Tooltip>
              )}
              <Tooltip content="Excluir item" color="danger">
                <button onClick={() => onDelete(item.id)}>
                  <DeleteIcon size={20} fill="#FF0080" />
                </button>
              </Tooltip>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center mt-4">
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
          aria-label="Paginação de cards"
        />
      </div>
    </div>
  );
};
