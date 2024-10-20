import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import React from "react";
import { Formik, FormikHelpers } from "formik";
import api from "../../helpers/api";

import { ProvinciaSchema } from "@/helpers/schemas"; // Esquema adaptado
import { useCallback } from "react";
import { ProvinciaType } from "@/helpers/types";

interface AddProvinciaProps {
  editingProvincia: ProvinciaType | null;
  onCloseAndRefresh: () => void;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export const AddProvincia = ({
  editingProvincia,
  onCloseAndRefresh,
  isOpen,
  onOpenChange,
}: AddProvinciaProps) => {
  interface ProvinciaFormType {
    nome: string;
    id: number;
  }

  const initialValues: ProvinciaFormType = {
    nome: editingProvincia?.nome || "",
    id: editingProvincia?.id || 0,
  };

  const handleProvinciaSubmit = useCallback(
    async (
      values: typeof initialValues,
      { resetForm }: FormikHelpers<typeof initialValues>
    ) => {
      try {
        if (editingProvincia) {
          await api.put(`/provincias/${editingProvincia.id}`, values);
        } else {
          await api.post("/provincias", values);
        }

        resetForm();
        onCloseAndRefresh();
        onOpenChange(false);
      } catch (error) {
        console.error("Erro ao criar/atualizar província:", error);
      }
    },
    [editingProvincia, onCloseAndRefresh, onOpenChange]
  );

  return (
    <div>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {editingProvincia
                  ? "Editar Província"
                  : "Cadastro de Província"}
              </ModalHeader>
              <ModalBody>
                <Formik
                  initialValues={editingProvincia || initialValues}
                  enableReinitialize
                  validationSchema={ProvinciaSchema}
                  onSubmit={handleProvinciaSubmit}
                >
                  {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleSubmit,
                  }) => (
                    <>
                      <div className="flex flex-col gap-4 mb-4">
                        <Input
                          variant="bordered"
                          label="Nome da Província"
                          value={values.nome}
                          isInvalid={!!errors.nome && !!touched.nome}
                          errorMessage={errors.nome}
                          onChange={handleChange("nome")}
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
                        {editingProvincia
                          ? "Atualizar Província"
                          : "Cadastrar Província"}
                      </Button>
                    </>
                  )}
                </Formik>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};
