// ChangeUserNameModal.tsx
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

interface ChangeUserNameModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUserName: string;
  onUpdateUserName: (newUserName: string) => Promise<void>;
}

const ChangeUserNameModal: React.FC<ChangeUserNameModalProps> = ({
  isOpen,
  onClose,
  currentUserName,
  onUpdateUserName,
}) => {
  const [newUserName, setNewUserName] = useState(currentUserName);

  const handleConfirm = async () => {
    await onUpdateUserName(newUserName);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onClose}>
      <ModalContent>
        <ModalHeader>Alterar Nome de Usuário</ModalHeader>
        <ModalBody>
          <Input
            label="Novo Nome de Usuário"
            value={newUserName}
            onChange={(e) => setNewUserName(e.target.value)}
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

export default ChangeUserNameModal;
