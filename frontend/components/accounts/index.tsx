"use client";
import { Button, Input, Spinner } from "@nextui-org/react";
import { useCallback, useEffect, useState } from "react";
import { TableWrapper } from "../tableDinamica/table";
import api from "../../helpers/api";
import { AddUser } from "./add-user";
import { useDisclosure } from "@nextui-org/react";
import { PlusIcon } from "../icons/plus-icon";
import { UsuarioType } from "@/helpers/types";
import { FaCheck, FaTimes } from "react-icons/fa"; // Ícones de verificação
import React from "react";

export const Account = () => {
  const [usuarios, setUsuarios] = useState<UsuarioType[]>([]);
  const [allUsuarios, setAllUsuarios] = useState<UsuarioType[]>([]); // Todos os usuários para pesquisa
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [editingUsuario, setEditingUsuario] = useState<UsuarioType | null>(
    null
  );
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const columns = [
    "nomeUsuario",
    "pessoa",
    "tipousuario",
    "delete_permissao",
    "update_permissao",
    "view_permissao",
    "create_permissao",
    "estado",
    "data_criacao",
  ];

  const headers = [
    "Nome de Usuário",
    "Nome Próprio",
    "Tipo de Usuário",
    "Deletar",
    "Atualizar",
    "Visualizar",
    "Criar",
    "Estado",
    "Data de Criação",
  ];

  const fetchUsuarios = useCallback(async () => {
    try {
      const response = await api.get("/auth");
      setUsuarios(response.data);
      setAllUsuarios(response.data); // Armazena todos os dados para filtro
    } catch (err) {
      setError("Falha ao buscar usuários");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsuarios();
  }, [fetchUsuarios]);

  const handleEditUsuario = useCallback(
    (usuario: UsuarioType) => {
      setEditingUsuario(usuario);
      onOpen();
    },
    [onOpen]
  );

  const handleNewUsuario = useCallback(() => {
    setEditingUsuario(null);
    onOpen();
  }, [onOpen]);

  const handleDeleteUsuario = useCallback(
    async (id: number) => {
      if (confirm("Tem certeza que deseja eliminar este usuário?")) {
        try {
          await api.delete(`/auth/${id}`);
          fetchUsuarios();
        } catch (error) {
          console.error("Erro ao eliminar usuário:", error);
        }
      }
    },
    [fetchUsuarios]
  );

  const handleFilteredData = (filteredData: UsuarioType[]) => {
    setUsuarios(filteredData); // Atualiza a tabela com os dados filtrados
  };

  return (
    <>
      <div className="my-10 px-4 lg:px-6 max-w-[95rem] mx-auto w-full flex flex-col gap-4">
        <h3 className="text-xl font-semibold">Todos Usuários</h3>
        <div className="flex justify-between flex-wrap gap-4 items-center">
          <div className="flex flex-row gap-3.5 flex-wrap">
            <Button
              startContent={<PlusIcon />}
              color="primary"
              className="bg-blue-600 hover:bg-blue-700 text-white"
              onPress={handleNewUsuario} // Chama a função para abrir a modal de adicionar
            >
              Adicionar Usuario
            </Button>
            <AddUser
              editingUsuario={editingUsuario}
              onCloseAndRefresh={fetchUsuarios}
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
              data={usuarios} // Usa os dados filtrados
              columns={columns}
              headers={headers}
              onEdit={handleEditUsuario}
              onDelete={handleDeleteUsuario}
              columnConfig={{
                delete_permissao: (item) =>
                  item.delete_permissao ? (
                    <FaCheck className="text-green-500" />
                  ) : (
                    <FaTimes className="text-red-500" />
                  ),
                update_permissao: (item) =>
                  item.update_permissao ? (
                    <FaCheck className="text-green-500" />
                  ) : (
                    <FaTimes className="text-red-500" />
                  ),
                view_permissao: (item) =>
                  item.view_permissao ? (
                    <FaCheck className="text-green-500" />
                  ) : (
                    <FaTimes className="text-red-500" />
                  ),
                create_permissao: (item) =>
                  item.create_permissao ? (
                    <FaCheck className="text-green-500" />
                  ) : (
                    <FaTimes className="text-red-500" />
                  ),
                estado: (item) =>
                  item.estado ? (
                    <FaCheck className="text-green-500" />
                  ) : (
                    <FaTimes className="text-red-500" />
                  ),
                data_criacao: (item) =>
                  item.data_criacao
                    ? new Date(item.data_criacao).toLocaleDateString("pt-BR", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })
                    : "Data não disponível",
              }}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Account;
