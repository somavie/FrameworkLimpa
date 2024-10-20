"use client";

import { Button, Input, Spinner } from "@nextui-org/react";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { TableWrapper } from "@/components/tableDinamica/table";
import api from "../../helpers/api";

import { MunicipioType } from "@/helpers/types";
import { AddMunicipio } from "./add-municipio";
import { useDisclosure } from "@nextui-org/react";
import { PlusIcon } from "../icons/plus-icon";

export const Municipio = () => {
  const router = useRouter();
  const [municipios, setMunicipios] = useState<MunicipioType[]>([]);
  const [provincias, setProvincias] = useState<{ id: number; nome: string }[]>(
    []
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [editingMunicipio, setEditingMunicipio] =
    useState<MunicipioType | null>(null);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const fetchMunicipios = useCallback(async () => {
    try {
      const response = await api.get("/municipios");
      setMunicipios(response.data);
    } catch (err) {
      setError("Failed to fetch municipios");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMunicipios();
  }, [fetchMunicipios]);

  const fetchData = async () => {
    try {
      const [provincias] = await Promise.all([api.get("/provincias")]);
      setProvincias(provincias.data);
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    }
  };

  const handleEditMunicipio = useCallback(
    async (municipio: MunicipioType) => {
      await fetchData(); // Faz a busca das províncias antes de abrir a modal
      setEditingMunicipio(municipio);
      onOpen(); // Abre a modal
    },
    [onOpen]
  );

  const handleNewMunicipio = useCallback(async () => {
    await fetchData(); // Faz a busca das províncias antes de abrir a modal
    setEditingMunicipio(null);
    onOpen(); // Abre a modal para criar um novo município
  }, [onOpen]);

  const handleDeleteMunicipio = useCallback(
    async (id: number) => {
      if (confirm("Tem certeza que deseja eliminar este municipio?")) {
        try {
          await api.delete(`/municipios/${id}`);
          fetchMunicipios(); // Atualiza a lista após a eliminação
        } catch (error) {
          console.error("Erro ao eliminar municipio:", error);
        }
      }
    },
    [fetchMunicipios]
  );

  const columns = ["id", "nome", "provincia"];
  const headers = ["ID", "Nome", "provincia"];

  return (
    <>
      <div className="my-2 px-4 lg:px-6 max-w-[95rem] mx-auto w-full flex flex-col gap-4">
        <h3 className="text-4xl font-semibold">Municípios</h3>
        <div className="flex justify-between flex-wrap gap-4 items-center">
          <div className="flex items-center gap-3 flex-wrap md:flex-nowrap"></div>
          <div className="flex flex-row gap-3.5 flex-wrap">
            <Button
              startContent={<PlusIcon />}
              color="primary"
              className="bg-blue-600 hover:bg-blue-700 text-white"
              onPress={handleNewMunicipio} // Chama a função para abrir a modal de adicionar
            >
              Adicionar Municipio
            </Button>
            <AddMunicipio
              editingMunicipio={editingMunicipio}
              onCloseAndRefresh={fetchMunicipios}
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
              data={municipios}
              columns={columns}
              headers={headers}
              onEdit={handleEditMunicipio}
              onDelete={handleDeleteMunicipio}
            />
          )}
        </div>
      </div>
    </>
  );
};
