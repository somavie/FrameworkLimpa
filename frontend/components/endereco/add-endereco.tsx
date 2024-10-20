"use client";

import {
  Button,
  Input,
  Spinner,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
} from "@nextui-org/react";
import { Select, SelectItem } from "@nextui-org/select";
import React, { useCallback } from "react";
import { Formik, FormikHelpers, ErrorMessage } from "formik";
import api from "../../helpers/api";
import { EnderecoSchema } from "@/helpers/schemas"; // Esquema de validação para Endereço
import { useAllMunicipios } from "../hooks/allselect"; // Hook para buscar municípios
import { EnderecoType } from "@/helpers/types"; // Definir o tipo Endereço

interface AddEnderecoProps {
  title: String;
  editingEndereco: EnderecoType | null;
  onCloseAndRefresh: () => void;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

interface EnderecoForm {
  id: number;
  municipio_id: number;
  numero_casa: string;
  bairro: string;
}

export const AddEndereco = ({
  title,
  editingEndereco,
  onCloseAndRefresh,
  isOpen,
  onOpenChange,
}: AddEnderecoProps) => {
  const { municipios, loading: municipiosLoading } = useAllMunicipios();

  const initialValues: EnderecoForm = {
    id: editingEndereco?.id || 0,
    municipio_id: editingEndereco?.municipio_id || 0,
    numero_casa: editingEndereco?.numero_casa || "",
    bairro: editingEndereco?.bairro || "",
  };

  const handleEnderecoSubmit = useCallback(
    async (values: EnderecoForm, { resetForm }: FormikHelpers<EnderecoForm>) => {
      try {
        if (editingEndereco) {
          await api.put(`/enderecos/${editingEndereco.id}`, values);
        } else {
          await api.post("/enderecos", values);
        }

        resetForm();
        onCloseAndRefresh();
        onOpenChange(false);
      } catch (error) {
        console.error("Erro ao criar/atualizar endereço:", error);
      }
    },
    [editingEndereco, onCloseAndRefresh, onOpenChange]
  );

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              {title}
            </ModalHeader>
            <ModalBody>
              <Formik
                initialValues={initialValues}
                enableReinitialize
                validationSchema={EnderecoSchema}
                onSubmit={handleEnderecoSubmit}
              >
                {({ values, errors, touched, handleChange, handleSubmit }) => (
                  <>
                    <div className="flex flex-col gap-4 mb-4">
                      {municipiosLoading ? (
                        <Spinner size="sm" label="Carregando municípios..." />
                      ) : (
                        <Select
                          label="Município"
                          selectedKeys={new Set([String(values.municipio_id)])}
                          onSelectionChange={(keys) =>
                            handleChange({
                              target: {
                                name: "municipio_id",
                                value: Number(keys.currentKey),
                              },
                            })
                          }
                        >
                          {municipios?.map((municipio) => (
                            <SelectItem key={municipio.id}>{municipio.nome}</SelectItem>
                          ))}
                        </Select>
                      )}

                      <Input
                        label="Número da Casa"
                        name="numero_casa"
                        value={values.numero_casa}
                        onChange={handleChange}
                        placeholder="Digite o número da casa"
                      />
                      <ErrorMessage name="numero_casa" component="div" className="text-red-500" />

                      <Input
                        label="Bairro"
                        name="bairro"
                        value={values.bairro}
                        onChange={handleChange}
                        placeholder="Digite o bairro"
                      />
                      <ErrorMessage name="bairro" component="div" className="text-red-500" />
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
                      {editingEndereco ? "Atualizar Endereço" : "Cadastrar Endereço"}
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
