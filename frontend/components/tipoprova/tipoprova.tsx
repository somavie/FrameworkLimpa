"use client";

import React, { useCallback, useEffect, useState } from "react";
import { Button, Spinner, Modal } from "@nextui-org/react";
import api from "../../helpers/api";
import { AddTipoProva } from "./add-tipoprova"; // Componente para adicionar/editar tipos de prova
import { TipoProvaType } from "@/helpers/types"; // Interface para tipos de prova
import { PlusIcon } from "../icons/plus-icon"; // Ícone para adicionar
import { TableWrapper } from "../tableDinamica/table"; // Componente para a tabela
import { useDisclosure } from "@nextui-org/react";

export const TipoProva = () => {
  const [tiposProva, setTiposProva] = useState<TipoProvaType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [editingTipoProva, setEditingTipoProva] =
    useState<TipoProvaType | null>(null);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const columns = ["id", "nome", "descricao", "estado"];
  const headers = ["ID", "Nome", "Descrição", "Estado"];

  const fetchTiposProva = useCallback(async () => {
    try {
      const response = await api.get<TipoProvaType[]>("/tipoprovas");
      setTiposProva(response.data);
    } catch (error) {
      setError("Erro ao buscar tipos de prova");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTiposProva();
  }, [fetchTiposProva]);

  const handleEditTipoProva = useCallback(
    (tipoProva: TipoProvaType) => {
      setEditingTipoProva(tipoProva);
      onOpen();
    },
    [onOpen]
  );

  const handleNewTipoProva = useCallback(() => {
    setEditingTipoProva(null);
    onOpen();
  }, [onOpen]);

  const handleDeleteTipoProva = useCallback(
    async (id: number) => {
      if (confirm("Tem certeza que deseja eliminar este tipo de prova?")) {
        try {
          await api.delete(`/tipoprovas/${id}`);
          fetchTiposProva();
        } catch (error) {
          console.error("Erro ao excluir tipo de prova:", error);
        }
      }
    },
    [fetchTiposProva]
  );

  return (
    <>
      <div className="my-10 px-4 lg:px-6 max-w-[95rem] mx-auto w-full flex flex-col gap-4">
        <h3 className="text-xl font-semibold">Todos os Tipos de Prova</h3>
        <div className="flex justify-between flex-wrap gap-4 items-center">
          <div className="flex flex-row gap-3.5 flex-wrap">
            <Button
              startContent={<PlusIcon />}
              color="primary"
              className="bg-blue-600 hover:bg-blue-700 text-white"
              onPress={handleNewTipoProva}
            >
              Adicionar Tipo de Prova
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
              data={tiposProva}
              columns={columns}
              headers={headers}
              onEdit={handleEditTipoProva}
              onDelete={handleDeleteTipoProva}
            />
          )}
        </div>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
          <AddTipoProva
            editingTipoProva={editingTipoProva}
            onCloseAndRefresh={fetchTiposProva}
            isOpen={isOpen}
            onOpenChange={onOpenChange}
          />
        </Modal>
      </div>
    </>
  );
};

export default TipoProva;
