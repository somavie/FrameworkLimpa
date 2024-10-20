"use client";
import React, { useEffect, useState } from "react";
import { CardDashboard } from "../home/CardDashboard";
import { Spinner } from "@nextui-org/react";
import api from "../../helpers/api";
import { AlunoTypeHome } from "@/helpers/types";
import dynamic from "next/dynamic";
import { Props } from "react-apexcharts";

// Carregar o gráfico dinamicamente
const Chart = dynamic(
  () => import("../charts/steam").then((mod) => mod.Steam),
  {
    ssr: false,
  }
);

const columns = ["pessoa", "genero", "classe", "turno"];
const headers = ["Nome", "Gênero", "Classe", "Turno"];

export const Content = () => {
  const [alunos, setAlunos] = useState<AlunoTypeHome[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [series, setSeries] = useState<Props["series"]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [classes, setClasses] = useState<string[]>([]);
  const [turmas, setTurmas] = useState<string[]>([]);
  const [selectedClasse, setSelectedClasse] = useState<string>("");
  const [selectedTurma, setSelectedTurma] = useState<string>("");

  const fetchAlunos = async () => {
    try {
      const response = await api.get<AlunoTypeHome[]>("/matriculas");
      setAlunos(response.data);
      processChartData(response.data);
      extractClassesAndTurmas(response.data); // Extraímos classes e turmas aqui
    } catch (error) {
      console.error("Erro ao buscar alunos:", error);
    } finally {
      setLoading(false);
    }
  };

  // Função para extrair classes e turmas únicas
  const extractClassesAndTurmas = (data: AlunoTypeHome[]) => {
    const uniqueClasses = Array.from(
      new Set(
        data
          .map((aluno) => aluno.classe)
          .filter((classe): classe is string => classe !== undefined)
      )
    );
    const uniqueTurmas = Array.from(
      new Set(
        data
          .map((aluno) => aluno.turma) // Adicionando a extração de turmas
          .filter((turma): turma is string => turma !== undefined)
      )
    );

    setClasses(uniqueClasses);
    setTurmas(uniqueTurmas); // Atualiza as turmas
  };

  // Processar os dados para o gráfico
  const processChartData = (data: AlunoTypeHome[]) => {
    const classesData: {
      [key: string]: { masculino: number; feminino: number };
    } = {};

    data.forEach((aluno) => {
      const { classe, genero } = aluno;

      // Verifique se classe é uma string antes de usá-la
      if (classe && typeof classe === "string") {
        if (!classesData[classe]) {
          classesData[classe] = { masculino: 0, feminino: 0 };
        }
        if (genero === "Masculino") {
          classesData[classe].masculino += 1;
        } else if (genero === "Feminino") {
          classesData[classe].feminino += 1;
        }
      }
    });

    const categorias = Object.keys(classesData);
    const masculinoSeries = categorias.map(
      (classe) => classesData[classe].masculino
    );
    const femininoSeries = categorias.map(
      (classe) => classesData[classe].feminino
    );

    setCategories(categorias);
    setSeries([
      { name: "Masculino", data: masculinoSeries },
      { name: "Feminino", data: femininoSeries },
    ]);
  };

  // Filtrar alunos de acordo com a classe e turma selecionadas
  const filterAlunos = () => {
    return alunos.filter(
      (aluno) =>
        (!selectedClasse || aluno.classe === selectedClasse) &&
        (!selectedTurma || aluno.turma === selectedTurma)
    );
  };

  useEffect(() => {
    fetchAlunos();
  }, []);

  return (
    <div className="h-full flex flex-col items-center justify-center lg:px-8">
      {/* Card Section */}
      <div className="flex flex-col items-center w-full max-w-[90rem] gap-6 mb-6">
        <div className="grid grid-cols-1 lg:grid-cols-1 gap-6 w-full">
          <CardDashboard />
        </div>
      </div>

      {/* Filtros */}
      <div className="flex flex-row gap-4 mb-4">
        {/* Filtro de Classe */}
        <select
          value={selectedClasse}
          onChange={(e) => setSelectedClasse(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="">Todas as Classes</option>
          {classes.map((classe) => (
            <option key={classe} value={classe}>
              {classe}
            </option>
          ))}
        </select>

        {/* Filtro de Turma */}
        <select
          value={selectedTurma}
          onChange={(e) => setSelectedTurma(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="">Todas as Turmas</option>
          {turmas.map((turma) => (
            <option key={turma} value={turma}>
              {turma}
            </option>
          ))}
        </select>
      </div>

      {/* Chart Section */}
      <div className="w-full bg-default-50 shadow-lg rounded-2xl p-6 flex items-center justify-center">
        {loading ? (
          <Spinner size="lg" label="Carregando gráfico..." />
        ) : (
          <Chart series={series} categories={categories} />
        )}
      </div>
    </div>
  );
};
