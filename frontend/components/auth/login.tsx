"use client";

import { createAuthCookie } from "@/actions/auth.action";
import { LoginSchema } from "@/helpers/schemas";
import { LoginFormType } from "@/helpers/types";
import { Button, Input } from "@nextui-org/react";
import { Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import api from "@/helpers/api";
import React from "react";

export const Login = () => {
  const router = useRouter();

  const initialValues: LoginFormType = {
    nomeUsuario: "",
    senha: "",
  };

  const handleLogin = useCallback(
    async (values: LoginFormType) => {
      try {
        // Envia uma requisição POST para o backend com nomeUsuario e senha
        const response = await api.post("/auth/login", values);

        // Simula a criação de cookie de autenticação
        await createAuthCookie(response.data.token);

        // Redireciona para a página inicial após autenticação
        router.replace("/");
      } catch (error) {
        console.error("Erro ao fazer login:", error);
      }
    },
    [router]
  );

  return (
    <>
      <div className="text-center text-[25px] font-bold mb-6 ">Login</div>

      <Formik
        initialValues={initialValues}
        validationSchema={LoginSchema}
        onSubmit={handleLogin}
      >
        {({ values, errors, touched, handleChange, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6 mb-6">
              <Input
                variant="bordered"
                label="Nome de Usuário"
                type="text"
                value={values.nomeUsuario}
                isInvalid={!!errors.nomeUsuario && !!touched.nomeUsuario}
                errorMessage={errors.nomeUsuario}
                onChange={(e) =>
                  handleChange({
                    target: { name: "nomeUsuario", value: e.target.value },
                  })
                }
              />
              <Input
                variant="bordered"
                label="Senha"
                type="password"
                value={values.senha}
                isInvalid={!!errors.senha && !!touched.senha}
                errorMessage={errors.senha}
                onChange={(e) =>
                  handleChange({
                    target: { name: "senha", value: e.target.value },
                  })
                }
              />
            </div>

            <Button type="submit" variant="flat" color="primary">
              Login
            </Button>
          </form>
        )}
      </Formik>
    </>
  );
};
