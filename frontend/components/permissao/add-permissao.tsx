
import {
  Button,
  Spinner,
  Input,
  Textarea,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select, 
  SelectItem,
  useDisclosure,
} from "@nextui-org/react";
import React from "react";
import { Formik, FormikHelpers } from "formik";
import api from "../../helpers/api";
import { PermissaoType } from "@/helpers/types";
import { useFetchUsuario } from "../hooks/allselect";
import { PermissaoSchema } from "@/helpers/schemas";
import { useCallback, useState } from "react";

interface AddPermissaoProps {
  editingPermissao: PermissaoType | null; // Permissao sendo editado ou null
  onCloseAndRefresh: () => void;  // Função de callback para fechar modal e atualizar tabela
  isOpen: boolean;                // Estado para abrir ou fechar modal
  onOpenChange: (open: boolean) => void; // Função para alterar estado da modal
}

export const AddPermissao = ({  editingPermissao, onCloseAndRefresh, isOpen, onOpenChange  }: AddPermissaoProps)=> {
  const { usuarios, loading: usuariosLoading } = useFetchUsuario();
  interface PermissaoFormType {
    id:number;
  usuario_id: number;
  delete_permissao?: boolean; 
  update_permissao?: boolean; 
  view_permissao?: boolean; 
  create_permissao?: boolean;
  }

  const initialValues: PermissaoFormType = {
    id: editingPermissao?.id || 0,
    usuario_id: editingPermissao?.usuario_id || 0,
    delete_permissao: editingPermissao?.delete_permissao || true, // Pode ser opcional se não for obrigatório
    update_permissao:editingPermissao?.update_permissao  || true, // Pode ser opcional se não for obrigatório
    view_permissao: editingPermissao?.view_permissao || true, // Pode ser opcional se não for obrigatório
    create_permissao: editingPermissao?.create_permissao || true,
  };

  const handlePermissaoSubmit = useCallback(
    async (values: typeof initialValues, { resetForm }: FormikHelpers<typeof initialValues>) => {
      try {
        if (editingPermissao) {
          await api.put(`/permissoes/${editingPermissao.id}`, values);
        } else {
          await api.post("/permissoes", values);
        }

        resetForm();
        onCloseAndRefresh(); // Atualiza a lista de permissoes
        onOpenChange(false);  // Fecha a modal
      } catch (error) {
        console.error("Erro ao criar/atualizar permissao:", error);
      }
    },
    [editingPermissao, onCloseAndRefresh, onOpenChange]
  );

  return (
    <div>
      <>
        
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  {editingPermissao ? "Editar Permissao" : "Cadastro de Permissao"}
                </ModalHeader>
                <ModalBody>
                  <Formik
                    initialValues={editingPermissao || initialValues}
                    enableReinitialize
                    validationSchema={PermissaoSchema}
                    onSubmit={handlePermissaoSubmit}
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
                        {usuariosLoading ? (
                        <Spinner size="sm" label="Carregando..." />
                      ) : (
                        <Select
                          label="Usuarios"
                          selectedKeys={new Set([String(values.id)])}
                          onSelectionChange={(keys) =>
                            handleChange({
                              target: {
                                name: "usuario_id",
                                value: Number(keys.currentKey),
                              },
                            })
                          }
                        >
                          {usuarios?.map((usuario) => (
                            <SelectItem key={usuario.id}>{usuario.nomeUsuario}</SelectItem>
                          ))}
                        </Select>
                      )}
                        </div>
                        <Button
                          onPress={() => {
                            handleSubmit();
                            onClose(); // fecha a modal
                          }}
                          variant="flat"
                          color="primary"
                          className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                        >
                          {editingPermissao ? "Atualizar Permissao" : "Cadastrar Permissao"}
                        </Button>
                      </>
                    )}
                  </Formik>
                </ModalBody>
              </>
            )}
          </ModalContent>
        </Modal>
      </>
    </div>
  );
};
