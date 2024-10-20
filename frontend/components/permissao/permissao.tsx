"use client";

import { Button, Input, Spinner } from "@nextui-org/react";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { TableWrapper } from "@/components/tableDinamica/table";
import api from "../../helpers/api";
import { PermissaoType } from "@/helpers/types";
import { AddPermissao } from "./add-permissao";
import { useDisclosure } from "@nextui-org/react";
import { PlusIcon } from "../icons/plus-icon";

export const Permissao = () => {
  const router = useRouter();
  const [permissoes, setPermissaos] = useState<PermissaoType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [editingPermissao, setEditingPermissao] =
    useState<PermissaoType | null>(null);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const fetchPermissaos = useCallback(async () => {
    try {
      const response = await api.get("/permissoes");
      setPermissaos(response.data);
    } catch (err) {
      setError("Failed to fetch permissoes");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPermissaos();
  }, [fetchPermissaos]);

  const handleEditPermissao = useCallback(
    (permissao: PermissaoType) => {
      setEditingPermissao(permissao);
      onOpen(); // Abre a modal quando o permissao é selecionado para edição
    },
    [onOpen]
  );

  const handleNewPermissao = useCallback(() => {
    setEditingPermissao(null);
    onOpen(); // Abre a modal para criar um novo permissao
  }, [onOpen]);

  const handleDeletePermissao = useCallback(
    async (id: number) => {
      if (confirm("Tem certeza que deseja eliminar este permissao?")) {
        try {
          await api.delete(`/permissoes/${id}`);
          fetchPermissaos(); // Atualiza a lista após a eliminação
        } catch (error) {
          console.error("Erro ao eliminar permissao:", error);
        }
      }
    },
    [fetchPermissaos]
  );
  const columns = [
    "id",
    "nomeUsuario",
    "delete_permissao",
    "update_permissao",
    "view_permissao",
    "create_permissao",
  ];
  const headers = [
    "ID",
    "Nome Usuario",
    "Apagar",
    "Actualizar",
    "Ver",
    "Criar",
  ];
  return (
    <>
      <div className="my-10 px-4 lg:px-6 max-w-[95rem] mx-auto w-full flex flex-col gap-4">
        <h3 className="text-xl font-semibold">Todos Permissaos</h3>
        <div className="flex justify-between flex-wrap gap-4 items-center">
          <div className="flex items-center gap-3 flex-wrap md:flex-nowrap"></div>
          <div className="flex flex-row gap-3.5 flex-wrap">
            <Button
              startContent={<PlusIcon />}
              color="primary"
              className="bg-blue-600 hover:bg-blue-700 text-white"
              onPress={handleNewPermissao} // Chama a função para abrir a modal de adicionar
            >
              Adicionar Permissao
            </Button>
            <AddPermissao
              editingPermissao={editingPermissao}
              onCloseAndRefresh={fetchPermissaos}
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
              data={permissoes}
              columns={columns}
              headers={headers}
              onEdit={handleEditPermissao}
              onDelete={handleDeletePermissao}
            />
          )}
        </div>
      </div>
    </>
  );
};
