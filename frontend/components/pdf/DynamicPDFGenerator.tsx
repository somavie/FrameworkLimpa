// components/DynamicPDFGenerator.tsx
"use client";

import React from "react";
import { jsPDF } from "jspdf"; // Importando jsPDF
import autoTable from "jspdf-autotable"; // Importando autoTable

interface DynamicPDFGeneratorProps {
  title: string; // Título do documento
  data: Array<{ [key: string]: any }>; // Dados a serem exibidos no PDF
  fileName?: string; // Nome do arquivo PDF gerado
  columns: string[]; // Chaves dos dados para a tabela
  headers: string[]; // Títulos das colunas da tabela
  columnConfig?: { [key: string]: (item: any) => any }; // Configuração de formatação para colunas
}

const DynamicPDFGenerator: React.FC<DynamicPDFGeneratorProps> = ({
  title,
  data,
  fileName = "document.pdf",
  columns,
  headers,
  columnConfig = {}, // Definindo um valor padrão vazio para columnConfig
}) => {
  const generatePdf = () => {
    const doc = new jsPDF();

    // Configurações do título
    doc.setFontSize(22);
    doc.text(title, 14, 20); // Ajuste as coordenadas conforme necessário

    // Geração da tabela
    autoTable(doc, {
      head: [headers], // Usando o cabeçalho personalizado
      body: data.map((item) =>
        columns.map((column) => {
          // Verifica se existe uma configuração de coluna para formatação
          if (columnConfig[column]) {
            return columnConfig[column](item); // Aplica a formatação personalizada
          }
          return item[column] || ""; // Valor padrão se não houver configuração
        })
      ),
      startY: 40,
      styles: {
        cellPadding: 3,
        fontSize: 10,
      },
      headStyles: {
        fillColor: [22, 160, 133],
      },
      margin: { top: 30 },
    });

    // Salva o PDF
    doc.save(fileName);
  };

  return (
    <button
      onClick={generatePdf}
      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
    >
      Gerar PDF Dinâmico
    </button>
  );
};

export default DynamicPDFGenerator;
