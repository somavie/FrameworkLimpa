"use client";

import { useUserData } from "../../../components/hooks/useUserData";
import Image from "next/image";
import ChangeUserNameModal from "@/components/userChange/ChangeUserNameModal";
import ResetPasswordModal from "@/components/userChange/ResetPasswordModal";
import React, { useState } from "react";
import api from "@/helpers/api";

const ProfilePage = () => {
  const { userName, userImage, permissions, estado, id } = useUserData();
  const [isChangeUserNameOpen, setIsChangeUserNameOpen] = useState(false);
  const [isResetPasswordOpen, setIsResetPasswordOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleUpdateUserName = async (newUserName: string) => {
    try {
      // Obter todos os usuários para verificar se o nome já está em uso
      const response = await api.get(`/auth`);
      const users = response.data;

      // Verificar se já existe um nome de usuário igual
      const userExists = users.some(
        (user: { nomeUsuario: string }) => user.nomeUsuario === newUserName
      );
      if (userExists) {
        setErrorMessage("O nome de usuário já está em uso. Escolha outro.");
        return;
      }

      // Atualizar o nome de usuário no banco de dados
      await api.put(`/auth/${id}`, { nomeUsuario: newUserName });

      console.log("Nome de usuário atualizado com sucesso");
      setErrorMessage("");
    } catch (error) {
      console.error("Erro ao atualizar o nome de usuário:", error);
      setErrorMessage("Erro ao atualizar o nome de usuário.");
    }
  };

  const handleResetPassword = async (newPassword: string) => {
    try {
      await api.put(`/auth/${id}`, { senha: newPassword });
      console.log("Senha redefinida com sucesso");
      setErrorMessage("");
    } catch (error) {
      console.error("Erro ao redefinir a senha:", error);
      setErrorMessage("Erro ao redefinir a senha.");
    }
  };

  return (
    <div className="flex flex-col items-center p-6 max-w-4xl mx-auto">
      <div className="w-full max-w-md rounded-lg shadow-lg p-6">
        <div className="flex flex-col items-center">
          <div className="relative w-24 h-24 mb-4 rounded-full overflow-hidden">
            <Image
              alt="Avatar do Usuário"
              src={
                userImage
                  ? `${process.env.NEXT_PUBLIC_API_URL}/uploads/${userImage}`
                  : "https://i.pravatar.cc/150?u=a042581f4e29026704d"
              }
              layout="fill"
              objectFit="cover"
            />
          </div>
          <h2 className="text-xl font-semibold mb-2">
            {userName || "Usuário"}
          </h2>
          <p className="text-gray-500">Perfil do Usuário</p>
        </div>

        {errorMessage && (
          <div
            className="mt-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
            role="alert"
          >
            <span className="block sm:inline">{errorMessage}</span>
          </div>
        )}

        <div className="mt-6">
          <h3 className="text-lg font-medium mb-4">Permissões</h3>
          <ul className="space-y-2">
            <li className="flex justify-between">
              <span>Visualizar:</span>
              <span>{permissions.canView ? "✔️" : "❌"}</span>
            </li>
            <li className="flex justify-between">
              <span>Atualizar:</span>
              <span>{permissions.canUpdate ? "✔️" : "❌"}</span>
            </li>
            <li className="flex justify-between">
              <span>Criar:</span>
              <span>{permissions.canCreate ? "✔️" : "❌"}</span>
            </li>
            <li className="flex justify-between">
              <span>Excluir:</span>
              <span>{permissions.canDelete ? "✔️" : "❌"}</span>
            </li>
          </ul>
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-medium mb-4">
            Estado {estado ? "✔️" : "❌"}
          </h3>
        </div>

        <div className="mt-6 flex justify-between">
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
            onClick={() => setIsChangeUserNameOpen(true)}
          >
            Alterar Nome de Usuário
          </button>
          <button
            className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-colors"
            onClick={() => setIsResetPasswordOpen(true)}
          >
            Redefinir Senha
          </button>
        </div>
      </div>

      <ChangeUserNameModal
        isOpen={isChangeUserNameOpen}
        onClose={() => setIsChangeUserNameOpen(false)}
        currentUserName={userName || ""}
        onUpdateUserName={handleUpdateUserName}
      />
      <ResetPasswordModal
        isOpen={isResetPasswordOpen}
        onClose={() => setIsResetPasswordOpen(false)}
        onResetPassword={handleResetPassword}
      />
    </div>
  );
};

export default ProfilePage;
