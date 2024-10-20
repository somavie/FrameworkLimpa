"use client";

import {
  Button,
  Input,
  Select,
  SelectItem,
  Spinner,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
} from "@nextui-org/react";
import React, { useCallback, useState } from "react";
import { Formik, FormikHelpers } from "formik";
import api from "../../helpers/api";
import { UsuarioSchema } from "@/helpers/schemas";
import { UsuarioType } from "@/helpers/types";
import { useAllPessoas, useAllTiposUsuarios } from "../hooks/allselect";

interface AddUsuarioProps {
  editingUsuario: UsuarioType | null;
  onCloseAndRefresh: () => void;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

interface UsuarioForm {
  id: number;
  nomeUsuario: string;
  senha: string; // Mantenha a senha no tipo para controle no formulário
  confirmPassword: string;
  pessoa_id: number;
  tipo_usuario_id: number;
  delete_permissao: boolean;
  update_permissao: boolean;
  view_permissao: boolean;
  create_permissao: boolean;
  estado: boolean | number;
}

export const AddUser = ({
  editingUsuario,
  onCloseAndRefresh,
  isOpen,
  onOpenChange,
}: AddUsuarioProps) => {
  const { pessoas, loading: pessoasLoading } = useAllPessoas();
  const { tiposUsuario, loading: tiposUsuariosLoading } = useAllTiposUsuarios();
  const [errorMessage, setErrorMessage] = useState("");

  const initialValues: UsuarioForm = {
    id: editingUsuario?.id || 0,
    nomeUsuario: editingUsuario?.nomeUsuario || "",
    senha: "",
    confirmPassword: "",
    pessoa_id: editingUsuario?.pessoa_id || 0,
    tipo_usuario_id: editingUsuario?.tipo_usuario_id || 0,
    delete_permissao: editingUsuario?.delete_permissao || false,
    update_permissao: editingUsuario?.update_permissao || false,
    view_permissao: editingUsuario?.view_permissao || true,
    create_permissao: editingUsuario?.create_permissao || false,
    estado: editingUsuario?.estado || 1,
  };

  const handleUserSubmit = useCallback(
    async (values: UsuarioForm, { resetForm }: FormikHelpers<UsuarioForm>) => {
      setErrorMessage("");
      try {
        // Criação de um objeto finalValues como uma cópia de values
        const finalValues: Partial<UsuarioForm> = { ...values };

        // Remover a senha se não foi redefinida
        if (!values.senha) {
          delete finalValues.senha;
        }

        console.log("Dados enviados:", finalValues); // Log dos dados

        const response = await api[editingUsuario ? "put" : "post"](
          `/auth${editingUsuario ? `/${editingUsuario.id}` : ""}`,
          finalValues
        );

        resetForm();
        onCloseAndRefresh();
        onOpenChange(false);
      } catch (error) {
        console.error("Erro ao criar/atualizar usuário:", error);
        setErrorMessage("Ocorreu um erro ao processar sua solicitação.");
      }
    },
    [editingUsuario, onCloseAndRefresh, onOpenChange]
  );

  const handlePasswordReset = async () => {
    if (editingUsuario) {
      await api.put(`/auth/${editingUsuario.id}`, { senha: "12345678" });
      onCloseAndRefresh();
      onOpenChange(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          {editingUsuario ? "Editar Usuário" : "Cadastro de Usuário"}
        </ModalHeader>
        <ModalBody>
          <Formik
            initialValues={initialValues}
            enableReinitialize
            validationSchema={UsuarioSchema}
            onSubmit={handleUserSubmit}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleSubmit,
              setFieldValue,
            }) => (
              <form
                className="flex flex-col gap-4 mb-4"
                onSubmit={handleSubmit}
              >
                {errorMessage && (
                  <div className="text-red-600 mb-4">{errorMessage}</div>
                )}

                {pessoasLoading ? (
                  <Spinner size="sm" label="Carregando pessoas..." />
                ) : (
                  <Select
                    label="Pessoa"
                    selectedKeys={new Set([String(values.pessoa_id)])}
                    onSelectionChange={(keys) =>
                      setFieldValue("pessoa_id", Number(keys.currentKey))
                    }
                  >
                    {pessoas.map((pessoa) => (
                      <SelectItem key={pessoa.id} value={pessoa.id}>
                        {pessoa.nome}
                      </SelectItem>
                    ))}
                  </Select>
                )}

                {tiposUsuariosLoading ? (
                  <Spinner size="sm" label="Carregando tipos de usuário..." />
                ) : (
                  <Select
                    label="Tipo de Usuário"
                    selectedKeys={new Set([String(values.tipo_usuario_id)])}
                    onSelectionChange={(keys) =>
                      setFieldValue("tipo_usuario_id", Number(keys.currentKey))
                    }
                  >
                    {tiposUsuario.map((tipo) => (
                      <SelectItem key={tipo.id} value={tipo.id}>
                        {tipo.nome}
                      </SelectItem>
                    ))}
                  </Select>
                )}

                <Input
                  label="Nome de Usuário"
                  variant="bordered"
                  value={values.nomeUsuario}
                  isInvalid={!!errors.nomeUsuario && !!touched.nomeUsuario}
                  errorMessage={errors.nomeUsuario}
                  onChange={handleChange("nomeUsuario")}
                  fullWidth
                />

                {!editingUsuario && (
                  <>
                    <Input
                      label="Nova Senha"
                      type="password"
                      variant="bordered"
                      value={values.senha}
                      isInvalid={!!errors.senha && !!touched.senha}
                      errorMessage={errors.senha}
                      onChange={handleChange("senha")}
                      fullWidth
                    />
                    <Input
                      label="Confirme a Senha"
                      type="password"
                      variant="bordered"
                      value={values.confirmPassword}
                      isInvalid={
                        !!errors.confirmPassword && !!touched.confirmPassword
                      }
                      errorMessage={errors.confirmPassword}
                      onChange={handleChange("confirmPassword")}
                      fullWidth
                    />
                  </>
                )}
                {editingUsuario && (
                  <>
                    <Button
                      type="button"
                      onClick={handlePasswordReset}
                      variant="flat"
                      color="warning"
                      className="w-full"
                    >
                      Redefinir Senha para 12345678
                    </Button>
                  </>
                )}
                <div className="flex flex-col gap-2">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={values.delete_permissao}
                      onChange={() =>
                        setFieldValue(
                          "delete_permissao",
                          !values.delete_permissao
                        )
                      }
                    />
                    Delete Permissão
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={values.update_permissao}
                      onChange={() =>
                        setFieldValue(
                          "update_permissao",
                          !values.update_permissao
                        )
                      }
                    />
                    Update Permissão
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={values.view_permissao}
                      onChange={() =>
                        setFieldValue("view_permissao", !values.view_permissao)
                      }
                    />
                    View Permissão
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={values.create_permissao}
                      onChange={() =>
                        setFieldValue(
                          "create_permissao",
                          !values.create_permissao
                        )
                      }
                    />
                    Create Permissão
                  </label>
                </div>

                <Button
                  type="submit"
                  variant="flat"
                  color="primary"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                >
                  {editingUsuario ? "Atualizar" : "Cadastrar"}
                </Button>
              </form>
            )}
          </Formik>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
