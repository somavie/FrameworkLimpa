"use client";

import React, { useState } from "react";
import {
  Modal,
  Button,
  Input,
  ModalBody,
  ModalHeader,
  ModalFooter,
  ModalContent,
} from "@nextui-org/react";

interface ResetPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onResetPassword: (newPassword: string) => Promise<void>;
}

const ResetPasswordModal: React.FC<ResetPasswordModalProps> = ({
  isOpen,
  onClose,
  onResetPassword,
}) => {
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleConfirm = async () => {
    // Verificação de senhas iguais
    if (newPassword === confirmPassword) {
      try {
        // Tenta redefinir a senha
        await onResetPassword(newPassword);
        // Fecha o modal após sucesso
        onClose();
      } catch (error) {
        setErrorMessage("Erro ao redefinir a senha. Tente novamente.");
      }
    } else {
      setErrorMessage("As senhas não coincidem!");
    }
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onClose}>
      <ModalContent>
        <ModalHeader>Redefinir Senha</ModalHeader>
        <ModalBody>
          {/* Exibe uma mensagem de erro se houver */}
          {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

          <Input
            label="Nova Senha"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Digite a nova senha"
            required
          />
          <Input
            label="Confirme a Nova Senha"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirme a nova senha"
            required
          />
        </ModalBody>
        <ModalFooter>
          <Button onClick={handleConfirm}>Confirmar</Button>
          <Button color="danger" onClick={onClose}>
            Cancelar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ResetPasswordModal;
