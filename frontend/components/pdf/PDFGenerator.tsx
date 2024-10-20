import React from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

interface PDFGeneratorProps {
  headers: string[];
  data: any[];
  title?: string;
}

const PDFGenerator: React.FC<PDFGeneratorProps> = ({
  headers,
  data,
  title = "Tabela de Dados",
}) => {
  const generatePDF = () => {
    const doc = new jsPDF();

    // Adicionar título
    doc.setFontSize(18);
    doc.text(title, 14, 20);

    // Adicionar tabela com todos os registros
    autoTable(doc, {
      head: [headers], // Cabeçalho da tabela
      body: data.map((item) => {
        return headers.map((header) => item[header] || "");
      }),
      theme: "grid", // Tema da tabela
      styles: {
        cellPadding: 2,
        fontSize: 10,
        valign: "middle",
        halign: "center",
        overflow: "linebreak",
        lineColor: [0, 0, 0],
        fillColor: [255, 255, 255],
      },
      headStyles: {
        fillColor: [220, 220, 220],
        textColor: [0, 0, 0],
        fontSize: 12,
        halign: "center",
      },
      didDrawCell: (data) => {
        const { cell } = data;
        if (cell.section === "body") {
          doc.setTextColor(0, 0, 0);
        }
      },
    });

    // Salvar PDF
    doc.save(`${title}.pdf`);
  };

  return (
    <button onClick={generatePDF} className="btn btn-secondary">
      Gerar PDF
    </button>
  );
};

export default PDFGenerator;
