"use client";

import { Button, Input, Spinner } from "@nextui-org/react";
import { useCallback, useEffect, useState } from "react";
import api from "../../helpers/api";
import { AddEndereco } from "./add-endereco";
import { EnderecoType } from "@/helpers/types";
import { PlusIcon } from "../icons/plus-icon";
import { TableWrapper } from "../tableDinamica/table";

import { useDisclosure } from "@nextui-org/react";

export const Endereco = () => {
  const [enderecos, setEnderecos] = useState<EnderecoType[]>([]);
  const [allEnderecos, setAllEnderecos] = useState<EnderecoType[]>([]); // Todos os endereços para pesquisa
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [editingEndereco, setEditingEndereco] = useState<EnderecoType | null>(
    null
  );
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const columns = ["id", "provincia", "municipio", "numero_casa", "bairro"];
  const headers = ["ID", "Província", "Município", "Número da Casa", "Bairro"];

  const fetchEnderecos = useCallback(async () => {
    try {
      const response = await api.get<EnderecoType[]>("/enderecos");
      setEnderecos(response.data);
      setAllEnderecos(response.data); // Armazena todos os dados para filtro
    } catch (error) {
      setError("Erro ao buscar endereços");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEnderecos();
  }, [fetchEnderecos]);

  const handleEditEndereco = useCallback(
    (endereco: EnderecoType) => {
      setEditingEndereco(endereco);
      onOpen();
    },
    [onOpen]
  );

  const handleNewEndereco = useCallback(() => {
    setEditingEndereco(null);
    onOpen();
  }, [onOpen]);

  const handleDeleteEndereco = useCallback(
    async (id: number) => {
      if (confirm("Tem certeza que deseja eliminar este endereço?")) {
        try {
          await api.delete(`/enderecos/${id}`);
          fetchEnderecos();
        } catch (error) {
          console.error("Erro ao excluir endereço:", error);
        }
      }
    },
    [fetchEnderecos]
  );

  const handleFilteredData = (filteredData: EnderecoType[]) => {
    setEnderecos(filteredData); // Atualiza a tabela com os dados filtrados
  };

  return (
    <>
      <div className="my-2 px-4 lg:px-6 max-w-[95rem] mx-auto w-full flex flex-col gap-4">
        <h3 className="text-4xl font-semibold">Endereços</h3>
        <div className="flex justify-between flex-wrap gap-4 items-center">
          <div className="flex items-center gap-3 flex-wrap md:flex-nowrap"></div>
          <div className="flex flex-row gap-3.5 flex-wrap">
            <Button
              startContent={<PlusIcon />}
              color="primary"
              className="bg-blue-600 hover:bg-blue-700 text-white"
              onPress={handleNewEndereco} // Chama a função para abrir a modal de adicionar
            >
              Adicionar Endereço
            </Button>
          </div>
        </div>
        <div className="max-w-[95rem] mx-auto w-full">
          {loading && (
            <div className="flex justify-center items-center w-full">
              <Spinner size="lg" />
            </div>
          )}
          {error && <div>{error}</div>}
          {!loading && !error && (
            <TableWrapper
              data={enderecos} // Usa os dados filtrados
              columns={columns}
              headers={headers}
              onEdit={handleEditEndereco}
              onDelete={handleDeleteEndereco}
            />
          )}
        </div>
        <AddEndereco
          title={"Endereço"}
          editingEndereco={editingEndereco}
          onCloseAndRefresh={fetchEnderecos}
          isOpen={isOpen}
          onOpenChange={onOpenChange}
        />
      </div>
    </>
  );
};

export default Endereco;
