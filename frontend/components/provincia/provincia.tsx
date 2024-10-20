"use client";

import React, { useCallback, useEffect, useState } from "react";
import { Button, Input, Spinner } from "@nextui-org/react";
import api from "../../helpers/api";
import { AddProvincia } from "./add-provincia";
import { ProvinciaType } from "@/helpers/types";
import { PlusIcon } from "../icons/plus-icon";
import { TableWrapper } from "../tableDinamica/table";
import { useDisclosure } from "@nextui-org/react";

export const Provincia = () => {
  const [provincias, setProvincias] = useState<ProvinciaType[]>([]);
  const [allProvincias, setAllProvincias] = useState<ProvinciaType[]>([]); // Todos os dados para pesquisa
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [editingProvincia, setEditingProvincia] =
    useState<ProvinciaType | null>(null);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const columns = ["id", "nome"];
  const headers = ["ID", "Nome"];

  const fetchProvincias = useCallback(async () => {
    try {
      const response = await api.get<ProvinciaType[]>("/provincias");
      setProvincias(response.data);
      setAllProvincias(response.data); // Armazena todos os dados para filtro
    } catch (error) {
      setError("Erro ao buscar províncias");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProvincias();
  }, [fetchProvincias]);

  const handleEditProvincia = useCallback(
    (provincia: ProvinciaType) => {
      setEditingProvincia(provincia);
      onOpen();
    },
    [onOpen]
  );

  const handleNewProvincia = useCallback(() => {
    setEditingProvincia(null);
    onOpen();
  }, [onOpen]);

  const handleDeleteProvincia = useCallback(
    async (id: number) => {
      if (confirm("Tem certeza que deseja eliminar esta província?")) {
        try {
          await api.delete(`/provincias/${id}`);
          fetchProvincias();
        } catch (error) {
          console.error("Erro ao excluir província:", error);
        }
      }
    },
    [fetchProvincias]
  );

  const handleFilteredData = (filteredData: ProvinciaType[]) => {
    setProvincias(filteredData); // Atualiza a tabela com os dados filtrados
  };

  return (
    <>
      <div className="my-2 px-4 lg:px-6 max-w-[95rem] mx-auto w-full flex flex-col gap-4">
        <h3 className="text-4xl font-semibold">Provincias</h3>
        <div className="flex justify-between flex-wrap gap-4 items-center">
          <div className="flex items-center gap-3 flex-wrap md:flex-nowrap"></div>
          <div className="flex flex-row gap-3.5 flex-wrap">
            <Button
              startContent={<PlusIcon />}
              color="primary"
              className="bg-blue-600 hover:bg-blue-700 text-white"
              onPress={handleNewProvincia}
            >
              Adicionar Província
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
              data={provincias}
              columns={columns}
              headers={headers}
              onEdit={handleEditProvincia}
              onDelete={handleDeleteProvincia}
            />
          )}
        </div>
        <AddProvincia
          editingProvincia={editingProvincia}
          onCloseAndRefresh={fetchProvincias}
          isOpen={isOpen}
          onOpenChange={onOpenChange}
        />
      </div>
    </>
  );
};

export default Provincia;
