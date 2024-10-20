"use client";

import { Button, Input, Spinner } from "@nextui-org/react";
import { useCallback, useEffect, useState } from "react";
import { TableWrapper } from "../tableDinamica/table";
import api from "../../helpers/api";
import { AddTipoUsuario } from "./add-tipousuario";
import { useDisclosure } from "@nextui-org/react";
import { PlusIcon } from "../icons/plus-icon";
import { TipoUsuarioType } from "@/helpers/types";

export const TipoUsuario = () => {
  const [tiposUsuario, setTiposUsuario] = useState<TipoUsuarioType[]>([]);
  const [allTiposUsuario, setAllTiposUsuario] = useState<TipoUsuarioType[]>([]); // Todos os tipos de usuário para pesquisa
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [editingTipoUsuario, setEditingTipoUsuario] =
    useState<TipoUsuarioType | null>(null);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const columns = ["nome", "descricao"];
  const headers = ["Nome", "Descrição"];

  const fetchTiposUsuario = useCallback(async () => {
    try {
      const response = await api.get("/tipousuarios");
      setTiposUsuario(response.data);
      setAllTiposUsuario(response.data); // Armazena todos os dados para filtro
    } catch (err) {
      setError("Falha ao buscar tipos de usuário");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTiposUsuario();
  }, [fetchTiposUsuario]);

  const handleEditTipoUsuario = useCallback(
    (tipoUsuario: TipoUsuarioType) => {
      setEditingTipoUsuario(tipoUsuario);
      onOpen();
    },
    [onOpen]
  );

  const handleNewTipoUsuario = useCallback(() => {
    setEditingTipoUsuario(null);
    onOpen();
  }, [onOpen]);

  const handleDeleteTipoUsuario = useCallback(
    async (id: number) => {
      if (confirm("Tem certeza que deseja eliminar este tipo de usuário?")) {
        try {
          await api.delete(`/tipousuarios/${id}`);
          fetchTiposUsuario();
        } catch (error) {
          console.error("Erro ao eliminar tipo de usuário:", error);
        }
      }
    },
    [fetchTiposUsuario]
  );

  const handleFilteredData = (filteredData: TipoUsuarioType[]) => {
    setTiposUsuario(filteredData); // Atualiza a tabela com os dados filtrados
  };

  return (
    <>
      <div className="my-10 px-4 lg:px-6 max-w-[95rem] mx-auto w-full flex flex-col gap-4">
        <h3 className="text-xl font-semibold">Todos Tipos de Usuário</h3>
        <div className="flex justify-between flex-wrap gap-4 items-center">
          <div className="flex flex-row gap-3.5 flex-wrap">
            <Button
              startContent={<PlusIcon />}
              color="primary"
              className="bg-blue-600 hover:bg-blue-700 text-white"
              onPress={handleNewTipoUsuario}
            >
              Adicionar Tipo de Usuário
            </Button>
            <AddTipoUsuario
              editingTipoUsuario={editingTipoUsuario}
              onCloseAndRefresh={fetchTiposUsuario}
              isOpen={isOpen}
              onOpenChange={onOpenChange}
            />
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
              data={tiposUsuario} // Usa os dados filtrados
              columns={columns}
              headers={headers}
              onEdit={handleEditTipoUsuario}
              onDelete={handleDeleteTipoUsuario}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default TipoUsuario;
