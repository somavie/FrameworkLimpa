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
import { Formik, FormikHelpers, ErrorMessage } from "formik";
import api from "../../helpers/api";
import { PessoaSchema } from "@/helpers/schemas";
import { useAllEnderecos } from "../hooks/allselect";
import { useAllMunicipios } from "../hooks/allselect"; // Hook para buscar municípios
import { PessoaType } from "@/helpers/types";

interface AddPessoaProps {
  title: string;
  editingPessoa: PessoaType | null;
  onCloseAndRefresh: () => void;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

interface PessoaForm {
  id: number;
  nome: string;
  data_nascimento: string; // Data é representada como string no formato 'YYYY-MM-DD'
  genero: "Masculino" | "Feminino" | "Outro";
  endereco_id: number;
  municipio_id: number; // Campo para município
  imagem: File | null; // Campo para a imagem
}

export const AddPessoa = ({
  title,
  editingPessoa,
  onCloseAndRefresh,
  isOpen,
  onOpenChange,
}: AddPessoaProps) => {
  const { endereco, loading: enderecosLoading } = useAllEnderecos();
  const { municipios, loading: municipiosLoading } = useAllMunicipios(); // Hook para buscar municípios
  const [imagem, setImagem] = useState<File | null>(null);

  const initialValues: PessoaForm = {
    id: editingPessoa?.id || 0,
    nome: editingPessoa?.nome || "",
    data_nascimento: editingPessoa?.data_nascimento || "", // Garante que a data seja uma string
    genero: editingPessoa?.genero || "Masculino",
    endereco_id: editingPessoa?.endereco_id || 0,
    municipio_id: editingPessoa?.municipio_id || 0, // Inicializa o município
    imagem: null, // Inicializa o campo da imagem como null
  };

  const handlePessoaSubmit = useCallback(
    async (values: PessoaForm, { resetForm }: FormikHelpers<PessoaForm>) => {
      try {
        const formData = new FormData();
        formData.append("nome", values.nome);
        formData.append("data_nascimento", values.data_nascimento);
        formData.append("genero", values.genero);
        formData.append("endereco_id", String(values.endereco_id));
        formData.append("municipio_id", String(values.municipio_id));

        if (imagem) {
          formData.append("imagem", imagem); // Adiciona a imagem ao FormData
        }

        if (editingPessoa) {
          await api.put(`/pessoas/${editingPessoa.id}`, formData);
        } else {
          await api.post("/pessoas", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
        }

        resetForm();
        onCloseAndRefresh();
        onOpenChange(false); // Fecha o modal após a operação
      } catch (error) {
        console.error("Erro ao criar/atualizar pessoa:", error);
      }
    },
    [editingPessoa, onCloseAndRefresh, onOpenChange, imagem]
  );

  const handleImagemChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files?.[0];
    setImagem(file || null); // Atualiza o estado da imagem
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
            <ModalBody>
              <Formik
                initialValues={initialValues}
                enableReinitialize
                validationSchema={PessoaSchema}
                onSubmit={handlePessoaSubmit}
              >
                {({ values, errors, touched, handleChange, handleSubmit }) => (
                  <>
                    <div className="flex flex-col gap-4 mb-4">
                      {enderecosLoading ? (
                        <Spinner size="sm" label="Carregando endereços..." />
                      ) : (
                        <Select
                          label="Endereço"
                          selectedKeys={new Set([String(values.endereco_id)])}
                          onSelectionChange={(keys) =>
                            handleChange({
                              target: {
                                name: "endereco_id",
                                value: Number(keys.currentKey),
                              },
                            })
                          }
                        >
                          {endereco?.map((end) => (
                            <SelectItem key={end.id}>
                              {end.endereco_completo}
                            </SelectItem>
                          ))}
                        </Select>
                      )}

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
                            <SelectItem key={municipio.id}>
                              {municipio.nome}
                            </SelectItem>
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
                        placeholder="Digite o nome"
                      />
                      <Input
                        variant="bordered"
                        type="date"
                        label="Data de Nascimento"
                        value={values.data_nascimento}
                        isInvalid={
                          !!errors.data_nascimento && !!touched.data_nascimento
                        }
                        errorMessage={errors.data_nascimento}
                        onChange={handleChange("data_nascimento")}
                      />
                      <Select
                        label="Gênero"
                        selectedKeys={new Set([values.genero])}
                        onSelectionChange={(keys) =>
                          handleChange({
                            target: {
                              name: "genero",
                              value: keys.currentKey as
                                | "Masculino"
                                | "Feminino"
                                | "Outro",
                            },
                          })
                        }
                      >
                        <SelectItem key="Masculino">Masculino</SelectItem>
                        <SelectItem key="Feminino">Feminino</SelectItem>
                        <SelectItem key="Outro">Outro</SelectItem>
                      </Select>
                      <Input
                        variant="bordered"
                        type="file"
                        label="Imagem"
                        accept="image/*"
                        onChange={handleImagemChange}
                      />
                    </div>
                    <Button
                      onPress={(e) => {
                        // Previna o comportamento padrão
                        handleSubmit(); // Chama a função de envio
                      }}
                      variant="flat"
                      color="primary"
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      {editingPessoa ? "Atualizar Pessoa" : "Cadastrar Pessoa"}
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
