"use client";

import React, { useCallback, useEffect, useState } from "react";
import { Button, Input, Spinner } from "@nextui-org/react";
import Image from "next/image";
import api from "../../helpers/api";
import { AddPessoa } from "./add-pessoa";
import { PessoaType } from "@/helpers/types";
import { PlusIcon } from "../icons/plus-icon";
import { TableWrapper } from "../tableDinamica/table";

import { useDisclosure } from "@nextui-org/react";

export const Pessoa = () => {
  const [pessoas, setPessoas] = useState<PessoaType[]>([]);
  const [allPessoas, setAllPessoas] = useState<PessoaType[]>([]); // Todos os dados para pesquisa
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [editingPessoa, setEditingPessoa] = useState<PessoaType | null>(null);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const columns = [
    "imagem",
    "nome",
    "data_nascimento",
    "genero",
    "naturalidade",
    "endereco_completo",
  ];

  const headers = [
    "Imagem",
    "Nome",
    "Data de Nascimento",
    "Gênero",
    "Naturalidade",
    "Endereço",
  ];

  const fetchPessoas = useCallback(async () => {
    try {
      const response = await api.get<PessoaType[]>("/pessoas");
      setPessoas(response.data);
      setAllPessoas(response.data); // Armazena todos os dados para filtro
    } catch (error) {
      setError("Erro ao buscar pessoas");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPessoas();
  }, [fetchPessoas]);

  const handleEditPessoa = useCallback(
    (pessoa: PessoaType) => {
      setEditingPessoa(pessoa);
      onOpen();
    },
    [onOpen]
  );

  const handleNewPessoa = useCallback(() => {
    setEditingPessoa(null);
    onOpen();
  }, [onOpen]);

  const handleDeletePessoa = useCallback(
    async (id: number) => {
      if (confirm("Tem certeza que deseja eliminar esta pessoa?")) {
        try {
          await api.delete(`/pessoas/${id}`);
          fetchPessoas();
        } catch (error) {
          console.error("Erro ao excluir pessoa:", error);
        }
      }
    },
    [fetchPessoas]
  );

  const handleFilteredData = (filteredData: PessoaType[]) => {
    setPessoas(filteredData); // Atualiza a tabela com os dados filtrados
  };

  return (
    <>
      <div className="my-2 px-4 lg:px-6 max-w-[95rem] mx-auto w-full flex flex-col gap-4">
        <h3 className="text-4xl font-semibold">Pessoas</h3>
        <div className="flex justify-between flex-wrap gap-4 items-center">
          <div className="flex items-center gap-3 flex-wrap md:flex-nowrap"></div>
          <div className="flex flex-row gap-3.5 flex-wrap">
            <Button
              startContent={<PlusIcon />}
              color="primary"
              className="bg-blue-600 hover:bg-blue-700 text-white"
              onPress={handleNewPessoa} // Chama a função para abrir a modal de adicionar
            >
              Adicionar Pessoa
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
              data={pessoas} // Usa os dados filtrados
              columns={columns}
              headers={headers}
              onEdit={handleEditPessoa}
              onDelete={handleDeletePessoa}
              columnConfig={{
                data_nascimento: (item) =>
                  item.data_nascimento
                    ? new Date(item.data_nascimento).toLocaleDateString()
                    : "Data não disponível",
                imagem: (item) => (
                  <Image
                    src={`${process.env.NEXT_PUBLIC_API_URL}/uploads/${item.imagem}`}
                    alt="Imagem"
                    width={80}
                    height={80}
                    style={{ borderRadius: "80px" }}
                    objectFit="cover"
                  />
                ),
              }}
            />
          )}
        </div>
        <AddPessoa
          title={"Pessoa"}
          editingPessoa={editingPessoa}
          onCloseAndRefresh={fetchPessoas}
          isOpen={isOpen}
          onOpenChange={onOpenChange}
        />
      </div>
    </>
  );
};

export default Pessoa;
