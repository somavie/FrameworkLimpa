"use client";

import {
  Button,
  Input,
  Textarea,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import React, { useCallback } from "react";
import { Formik, FormikHelpers } from "formik";
import api from "../../helpers/api";
import { TipoUsuarioSchema } from "@/helpers/schemas"; // Certifique-se de que o schema esteja corretamente definido
import { TipoUsuarioType } from "@/helpers/types";

interface AddTipoUsuarioProps {
  editingTipoUsuario: TipoUsuarioType | null;
  onCloseAndRefresh: () => void;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

interface TipoUsuarioFormType {
  nome: string;
  descricao: string;
}

export const AddTipoUsuario = ({
  editingTipoUsuario,
  onCloseAndRefresh,
  isOpen,
  onOpenChange,
}: AddTipoUsuarioProps) => {
  const initialValues: TipoUsuarioFormType = {
    nome: editingTipoUsuario?.nome || "",
    descricao: editingTipoUsuario?.descricao || "",
  };

  const handleTipoUsuarioSubmit = useCallback(
    async (
      values: TipoUsuarioFormType,
      { resetForm }: FormikHelpers<TipoUsuarioFormType>
    ) => {
      try {
        if (editingTipoUsuario) {
          await api.put(`/tipousuarios/${editingTipoUsuario.id}`, values);
        } else {
          await api.post("/tipousuarios", values);
        }

        resetForm();
        onCloseAndRefresh();
        onOpenChange(false);
      } catch (error) {
        console.error("Erro ao criar/atualizar tipo de usuário:", error);
      }
    },
    [editingTipoUsuario, onCloseAndRefresh, onOpenChange]
  );

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              {editingTipoUsuario
                ? "Editar Tipo de Usuário"
                : "Cadastro de Tipo de Usuário"}
            </ModalHeader>
            <ModalBody>
              <Formik
                initialValues={initialValues}
                enableReinitialize
                validationSchema={TipoUsuarioSchema}
                onSubmit={handleTipoUsuarioSubmit}
              >
                {({ values, errors, touched, handleChange, handleSubmit }) => (
                  <>
                    <div className="flex flex-col gap-4 mb-4">
                      <Input
                        variant="bordered"
                        label="Nome"
                        value={values.nome}
                        isInvalid={!!errors.nome && !!touched.nome}
                        errorMessage={errors.nome}
                        onChange={handleChange("nome")}
                      />
                      <Textarea
                        variant="bordered"
                        label="Descrição"
                        value={values.descricao}
                        isInvalid={!!errors.descricao && !!touched.descricao}
                        errorMessage={errors.descricao}
                        onChange={handleChange("descricao")}
                      />
                    </div>
                    <Button
                      onPress={() => {
                        handleSubmit();
                        onClose();
                      }}
                      variant="flat"
                      color="primary"
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      {editingTipoUsuario
                        ? "Atualizar Tipo de Usuário"
                        : "Cadastrar Tipo de Usuário"}
                    </Button>
                  </>
                )}
              </Formik>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
