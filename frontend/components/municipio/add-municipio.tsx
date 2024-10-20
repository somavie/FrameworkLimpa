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
import React, { useCallback, useState, useEffect } from "react";
import { Formik, FormikHelpers } from "formik";
import api from "../../helpers/api";
import { MunicipioSchema } from "@/helpers/schemas";
import { useAllProvincias } from "../hooks/allselect";
import { MunicipioType } from "@/helpers/types";

interface AddMunicipioProps {
  editingMunicipio: MunicipioType | null;
  onCloseAndRefresh: () => void;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

interface MunicipioForm {
  id: number;
  nome: string;
  provincia_id: number;
}

export const AddMunicipio = ({
  editingMunicipio,
  onCloseAndRefresh,
  isOpen,
  onOpenChange,
}: AddMunicipioProps) => {
  const { provincias, loading: provinciasLoading } = useAllProvincias();

  const initialValues: MunicipioForm = {
    id: editingMunicipio?.id || 0,
    nome: editingMunicipio?.nome || "",
    provincia_id: editingMunicipio?.provincia_id || 0,
  };

  const handleMunicipioSubmit = useCallback(
    async (values: MunicipioForm, { resetForm }: FormikHelpers<MunicipioForm>) => {
      try {
        if (editingMunicipio) {
          await api.put(`/municipios/${editingMunicipio.id}`, values);
        } else {
          await api.post("/municipios", values);
        }

        resetForm();
        onCloseAndRefresh();
        onOpenChange(false);
      } catch (error) {
        console.error("Erro ao criar/atualizar município:", error);
      }
    },
    [editingMunicipio, onCloseAndRefresh, onOpenChange]
  );

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              {editingMunicipio ? "Editar Município" : "Cadastro de Município"}
            </ModalHeader>
            <ModalBody>
              <Formik
                initialValues={initialValues}
                enableReinitialize
                validationSchema={MunicipioSchema}
                onSubmit={handleMunicipioSubmit}
              >
                {({ values, errors, touched, handleChange, handleSubmit }) => (
                  <>
                    <div className="flex flex-col gap-4 mb-4">
                      {provinciasLoading ? (
                        <Spinner size="sm" label="Carregando..." />
                      ) : (
                        <Select
                          label="Província"
                          selectedKeys={new Set([String(values.provincia_id)])}
                          onSelectionChange={(keys) =>
                            handleChange({
                              target: {
                                name: "provincia_id",
                                value: Number(keys.currentKey),
                              },
                            })
                          }
                        >
                          {provincias?.map((provincia) => (
                            <SelectItem key={provincia.id}>{provincia.nome}</SelectItem>
                          ))}
                        </Select>
                      )}
                      <Input
                        variant="bordered"
                        label="Nome"
                        value={values.nome}
                        isInvalid={!!errors.nome && !!touched.nome}
                        errorMessage={errors.nome}
                        onChange={handleChange("nome")}
                        placeholder="Digite o nome do município"
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
                      {editingMunicipio ? "Atualizar Município" : "Cadastrar Município"}
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
