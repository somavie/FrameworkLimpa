import { Card, CardBody } from "@nextui-org/react";
import React from "react";
import { Community } from "../icons/community";
import { useAllProfessores } from "../hooks/allselect"; // Importe o hook

export const CardBalance2 = () => {
  const { professor } = useAllProfessores(); // Use o hook para obter a lista de professores

  // Conta o número de professores
  const numeroDeProfessores = professor ? professor.length : 0;

  return (
    <Card className="xl:max-w-sm bg-yellow-500 rounded-lg shadow-lg px-4 py-3 transition-transform transform hover:scale-105 w-full h-32">
      <CardBody className="flex flex-col justify-between h-full">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-yellow-600 rounded-full">
            {/* Adicione a classe ao wrapper ao invés do componente */}
            <Community />
          </div>
          <div className="flex flex-col">
            <span className="text-white text-sm font-medium">
              Número de Professores
            </span>
            <span className="text-white text-lg font-bold">
              {numeroDeProfessores}
            </span>
          </div>
        </div>
        <div className="flex justify-center items-end mt-3"></div>
      </CardBody>
    </Card>
  );
};
