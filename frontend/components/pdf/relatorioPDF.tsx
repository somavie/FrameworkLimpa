import jsPDF from "jspdf";
import autoTable, { UserOptions } from "jspdf-autotable";
import { buscarDadosRelatorio } from "./relatorio";
import { Equipamento, Observacao } from "@/helpers/types";

import { gerarQRCode } from "../QRCode/QRCodeComponent"; // Importando o gerador de QR Code
// Interface para estender o tipo jsPDF e incluir lastAutoTable
interface jsPDFWithAutoTable extends jsPDF {
  lastAutoTable?: { finalY: number };
}

export default async function gerarPDF(relatorioId: number) {
  const doc = new jsPDF() as jsPDFWithAutoTable;

  // Define as margens
  const marginLeft = 15;
  const marginRight = 15;
  const pageHeight = doc.internal.pageSize.getHeight();
  const pageWidth = doc.internal.pageSize.getWidth();
  const usableWidth = pageWidth - marginLeft - marginRight;

  // Busca os dados do relatório
  const { equipamentos, observacoes, entrante, cessante, data_criacao } =
    await buscarDadosRelatorio(relatorioId);

  // Cabeçalho com imagem
  const logoImage = "./logo.png"; // Substitua pelo caminho correto da imagem
  const imageHeight = 30;
  const imageWidth = 30;

  // Adiciona a imagem no topo, centralizada
  const imageXPosition = (pageWidth - imageWidth) / 2;
  doc.addImage(logoImage, "PNG", imageXPosition, 10, imageWidth, imageHeight);

  // Adiciona o texto do cabeçalho logo abaixo da imagem
  doc.setFontSize(14);
  doc.text("Serviço de Inteligência e Segurança Militar", pageWidth / 2, 50, {
    align: "center",
  });
  doc.text(
    "Direção de Telecomunicação e Tecnologia de Informação",
    pageWidth / 2,
    60,
    { align: "center" }
  );

  // Cálculo da data seguinte
  const dataFormatada = new Date(data_criacao).toLocaleDateString("pt-BR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const dataSeguinte = new Date(
    new Date(data_criacao).setDate(new Date(data_criacao).getDate() + 1)
  );
  const dataSeguinteFormatada = dataSeguinte.toLocaleDateString("pt-BR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  // Assunto (respeita margens)
  const assuntoText = `Assunto: Informe do Técnico - DTTI/SISM referente ao dia ${dataFormatada} à ${dataSeguinteFormatada}`;
  const assuntoLines = doc.splitTextToSize(assuntoText, usableWidth);
  doc.setFontSize(12);
  doc.text(assuntoLines, marginLeft, 70);

  // Texto de introdução (respeita margens)
  const introText =
    "Durante as 24 horas de serviço, os sistemas TIC foram assegurados, destacando-se os seguintes pontos:";
  const introLines = doc.splitTextToSize(introText, usableWidth);
  doc.text(introLines, marginLeft, 85);

  // Adiciona as observações ao PDF (respeita margens)
  let yPosition = 100;
  doc.setFontSize(12);

  observacoes.forEach((obs: Observacao, index: number) => {
    const obsText = `${index + 1}. ${obs.nome}: ${obs.descricao}`;
    const obsLines = doc.splitTextToSize(obsText, usableWidth);

    // Verifica se a próxima linha ultrapassaria a página
    if (yPosition + obsLines.length * 10 > pageHeight - 60) {
      doc.addPage();
      yPosition = 20; // Reinicia a posição Y na nova página
    }

    // Adiciona as observações e ajusta a posição Y
    doc.text(obsLines, marginLeft, yPosition);
    yPosition += obsLines.length * 10 + 5;
  });

  // Definição das colunas e cabeçalhos da tabela
  const headers = ["Meio", "Quantidade", "Estado", "Local"];
  const columns: Array<keyof Equipamento> = [
    "nome",
    "quantidade",
    "status",
    "localizacao",
  ];

  // Configurações personalizadas para formatação das colunas
  const columnConfig: {
    [key in keyof Equipamento]?: (item: Equipamento) => string;
  } = {
    // quantidade: (item) => item.quantidade.toString(),
    // status: (item) =>
    //   item.status === "operacional" ? "Operacional" : "Inativo",
  };

  // Mapeamento do corpo da tabela
  const tableBody = equipamentos.map((item) =>
    columns.map((column) => {
      if (columnConfig[column]) {
        return columnConfig[column]!(item);
      }
      return item[column]?.toString() || "";
    })
  );

  // Renderiza a tabela com autoTable
  const autoTableOptions: UserOptions = {
    head: [headers],
    body: tableBody,
    startY: yPosition,
    styles: {
      cellPadding: 3,
      fontSize: 10,
    },
    headStyles: {
      fillColor: [22, 160, 133],
    },
    margin: { top: 30, left: marginLeft, right: marginRight },
  };

  autoTable(doc, autoTableOptions);

  // Pega a última posição Y após a tabela
  const finalY = doc.lastAutoTable?.finalY || yPosition;

  // Calcula a posição para o QR code
  yPosition = finalY + 20;

  // Verifica se há espaço suficiente para o QR code, senão, adiciona nova página
  if (yPosition + 60 > pageHeight) {
    doc.addPage();
    yPosition = 20; // Posição inicial na nova página
  }

  const qrContent = `Técnico Entrante: ${entrante}, Técnico Cessante: ${cessante}`;
  const qrCode = await gerarQRCode(qrContent, 75, 75);

  // Centraliza e adiciona o QR code no PDF
  const qrXPosition = (pageWidth - 40) / 2; // Centralizar o QR code de 40mm
  doc.addImage(qrCode, "JPEG", qrXPosition, yPosition, 40, 40);
  // Salva o PDF
  doc.save(`relatorio_${relatorioId}.pdf`);
}
