// components/CardDashboard.tsx
import React from "react";
import { CardBalance } from "./CardBalance";
import {
  FaChalkboardTeacher,
  FaUserGraduate,
  FaUserTie,
  FaUsers,
} from "react-icons/fa";

import {
  useFetchUsuario,
  useAllFuncionarios,
  useAllMatriculas,
  useAllProfessores,
  useAllTurmas,
} from "../hooks/allselect"; // Importe o hook para usuários

export const CardDashboard: React.FC = () => {
  // Hooks para obter os dados
  const { professor } = useAllProfessores();
  const { matricula } = useAllMatriculas();
  const { funcionarios } = useAllFuncionarios();
  const { usuarios } = useFetchUsuario();
  const { turmas } = useAllTurmas();

  // Contadores
  const numeroDeProfessores = professor ? professor.length : 0;
  const numeroDeAlunos = matricula ? matricula.length : 0;
  const numeroDeFuncionarios = funcionarios ? funcionarios.length : 0;
  const numeroDeUsuarios = usuarios ? usuarios.length : 0;
  const numeroDeTurmas = turmas ? turmas.length : 0;

  return (
    <div className="flex flex-col lg:flex-row gap-6 xl:gap-4">
      <CardBalance
        title="Alunos"
        count={numeroDeAlunos}
        icon={FaUserGraduate}
        bgColor="bg-blue-500"
        textColor="text-white"
      />
      <CardBalance
        title="Professores"
        count={numeroDeProfessores}
        icon={FaUsers}
        bgColor="bg-green-500"
        textColor="text-white"
      />
      <CardBalance
        title="Turmas"
        count={numeroDeTurmas}
        icon={FaUsers}
        bgColor="bg-red-500"
        textColor="text-white"
      />

      <CardBalance
        title="Funcionários"
        count={numeroDeFuncionarios}
        icon={FaUsers}
        bgColor="bg-red-500"
        textColor="text-white"
      />
    </div>
  );
};
function useFetchTurmas(): { usuarios: any } {
  throw new Error("Function not implemented.");
}
