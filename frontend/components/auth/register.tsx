"use client";

import { Input, Button, Spinner } from "@nextui-org/react";
import { Select, SelectSection, SelectItem } from "@nextui-org/select";
import { Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { RegisterSchema } from "@/helpers/schemas";
import { RegisterFormType } from "@/helpers/types";
import api from "@/helpers/api";
import { useRegisterUser } from "../hooks/useRegisterUser";
import { CircularProgress } from "@mui/material";
import React from "react";

export const Register = () => {
  const { registerUser, loading } = useRegisterUser();
  const [pessoas, setPessoas] = useState<{ id: number; nome: string }[]>([]);
  const [tiposUsuario, setTiposUsuario] = useState<
    { id: number; nome: string }[]
  >([]);
  const [dataLoading, setDataLoading] = useState<boolean>(true);

  const fetchData = async () => {
    try {
      const [pessoas, tiposUsuario] = await Promise.all([
        api.get("/pessoas"),
        api.get("/tipousuarios"),
      ]);
      setPessoas(pessoas.data);
      setTiposUsuario(tiposUsuario.data);
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    } finally {
      setDataLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const initialValues: RegisterFormType = {
    id: 0,
    pessoa_id: 0,
    nomeUsuario: "",
    senha: "",
    confirmPassword: "",
    tipo_usuario_id: 0,
  };

  if (dataLoading) return <CircularProgress />;

  return (
    <>
      <div className="text-center text-[25px] font-bold mb-6">Register</div>
      {/*<Select
                items={pessoas}
                label= "Pessoasss"
                placeholder="Quem é o usuario?"
                className="max-w-xs"
              >
                {(pessoa) => <SelectItem key={pessoa.id}>{pessoa.nome}</SelectItem>}
              </Select>*/}
      <Formik
        initialValues={initialValues}
        validationSchema={RegisterSchema}
        onSubmit={registerUser}
      >
        {({ values, errors, touched, handleChange, handleSubmit }) => (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <div className="flex flex-col gap-4 mb-8 font-bold w-[500px]">
              <Input
                label="Nome de Usuário"
                variant="bordered"
                value={values.nomeUsuario}
                isInvalid={!!errors.nomeUsuario && !!touched.nomeUsuario}
                errorMessage={errors.nomeUsuario}
                onChange={handleChange("nomeUsuario")}
                fullWidth
              />
              <Input
                label="Senha"
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

              <Select
                variant="bordered"
                label="Pessoa"
                value={values.pessoa_id}
                isInvalid={!!errors.pessoa_id && !!touched.pessoa_id}
                errorMessage={errors.pessoa_id}
                onChange={handleChange("pessoa_id")}
                fullWidth
              >
                {pessoas.map((pessoa) => (
                  <SelectItem key={pessoa.id}>{pessoa.nome}</SelectItem>
                ))}
              </Select>
              <Select
                variant="bordered"
                label="Tipo Usuário"
                value={values.tipo_usuario_id}
                isInvalid={
                  !!errors.tipo_usuario_id && !!touched.tipo_usuario_id
                }
                errorMessage={errors.tipo_usuario_id}
                onChange={handleChange("tipo_usuario_id")}
              >
                {tiposUsuario.map((tipo) => (
                  <SelectItem key={tipo.id}>{tipo.nome}</SelectItem>
                ))}
              </Select>
            </div>

            <Button
              onPress={() => handleSubmit()}
              variant="flat"
              color="primary"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            >
              Registrar
            </Button>
          </form>
        )}
      </Formik>

      <div className="font-light text-slate-400 mt-4 text-sm">
        Já tem uma conta?{" "}
        <Link href="/login" className="font-bold">
          Faça login aqui
        </Link>
      </div>
    </>
  );
};
