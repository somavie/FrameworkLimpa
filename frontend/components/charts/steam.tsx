import React from "react";
import Chart, { Props } from "react-apexcharts";

// Props para receber dados dinamicamente
interface SteamProps {
  series: Props["series"];
  categories: string[];
}

export const Steam: React.FC<SteamProps> = ({ series, categories }) => {
  const options: Props["options"] = {
    chart: {
      type: "area",
      animations: {
        easing: "linear",
        speed: 300,
      },
      sparkline: {
        enabled: false,
      },
      brush: {
        enabled: false,
      },
      id: "basic-bar",
      foreColor: "hsl(var(--nextui-default-800))",
      stacked: true,
      toolbar: {
        show: false,
      },
    },
    xaxis: {
      categories, // Usar as categorias passadas como props
      labels: {
        style: {
          colors: "hsl(var(--nextui-default-800))",
        },
      },
      axisBorder: {
        color: "hsl(var(--nextui-nextui-default-200))",
      },
      axisTicks: {
        color: "hsl(var(--nextui-nextui-default-200))",
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: "hsl(var(--nextui-default-800))",
        },
      },
    },
    grid: {
      show: true,
      borderColor: "hsl(var(--nextui-default-200))",
    },
    stroke: {
      curve: "smooth",
    },
    markers: {
      size: 0, // Define o tamanho do marcador como 0 para ocultá-los
    },
  };

  return (
    <div className="w-full z-20">
      <div id="chart">
        <Chart options={options} series={series} type="area" height={425} />
      </div>
    </div>
  );
};
