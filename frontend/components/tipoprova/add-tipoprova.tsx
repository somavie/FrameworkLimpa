"use client";

import {
  Button,
  Input,
  Textarea,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
} from "@nextui-org/react";
import React, { useCallback } from "react";
import { Formik, FormikHelpers } from "formik";
import api from "../../helpers/api";
import { TipoProvaSchema } from "@/helpers/schemas"; // Defina o esquema de validação para TipoProva
import { TipoProvaType } from "@/helpers/types";

interface AddTipoProvaProps {
  editingTipoProva: TipoProvaType | null;
  onCloseAndRefresh: () => void;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

interface TipoProvaForm {
  id: number;
  nome: string;
  descricao: string | null;
}

export const AddTipoProva = ({
  editingTipoProva,
  onCloseAndRefresh,
  isOpen,
  onOpenChange,
}: AddTipoProvaProps) => {
  const initialValues: TipoProvaForm = {
    id: editingTipoProva?.id || 0,
    nome: editingTipoProva?.nome || "",
    descricao: editingTipoProva?.descricao || null,
  };

  const handleTipoProvaSubmit = useCallback(
    async (
      values: TipoProvaForm,
      { resetForm }: FormikHelpers<TipoProvaForm>
    ) => {
      try {
        if (editingTipoProva) {
          await api.put(`/tipoprovas/${editingTipoProva.id}`, values);
        } else {
          await api.post("/tipoprovas", values);
        }

        resetForm();
        onCloseAndRefresh();
        onOpenChange(false);
      } catch (error) {
        console.error("Erro ao criar/atualizar tipo de prova:", error);
      }
    },
    [editingTipoProva, onCloseAndRefresh, onOpenChange]
  );

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              {editingTipoProva
                ? "Editar Tipo de Prova"
                : "Cadastro de Tipo de Prova"}
            </ModalHeader>
            <ModalBody>
              <Formik
                initialValues={initialValues}
                enableReinitialize
                validationSchema={TipoProvaSchema} // Certifique-se de definir o esquema de validação
                onSubmit={handleTipoProvaSubmit}
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
                        placeholder="Digite o nome do tipo de prova"
                      />
                      <Textarea
                        variant="bordered"
                        label="Descrição"
                        value={values.descricao || ""}
                        isInvalid={!!errors.descricao && !!touched.descricao}
                        errorMessage={errors.descricao}
                        onChange={handleChange("descricao")}
                        placeholder="Digite a descrição do tipo de prova"
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
                      {editingTipoProva
                        ? "Atualizar Tipo de Prova"
                        : "Cadastrar Tipo de Prova"}
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

export default AddTipoProva;
