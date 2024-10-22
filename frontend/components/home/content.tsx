"use client";
import React, { useState } from "react";
import { CardDashboard } from "../home/CardDashboard";
import { Spinner } from "@nextui-org/react";

import dynamic from "next/dynamic";
import { Props } from "react-apexcharts";

// Carregar o gráfico dinamicamente
const Chart = dynamic(
  () => import("../charts/steam").then((mod) => mod.Steam),
  {
    ssr: false,
  }
);

export const Content = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [series, setSeries] = useState<Props["series"]>([]);
  const [categories, setCategories] = useState<string[]>([]);

  return (
    <div className="h-full flex flex-col items-center justify-center lg:px-8">
      {/* Card Section */}
      <div className="flex flex-col items-center w-full max-w-[90rem] gap-6 mb-6">
        <div className="grid grid-cols-1 lg:grid-cols-1 gap-6 w-full">
          <CardDashboard />
        </div>
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
