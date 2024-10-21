import QRCode from "qrcode";

// Função que gera o QR Code e retorna como base64
export async function gerarQRCode(
  conteudo: string,
  width: number = 75,
  height: number = 75
): Promise<string> {
  const qrOptions = {
    errorCorrectionLevel: "M" as const,
    margin: 1,
    width,
    height,
  };

  try {
    // Gera o QR code com o conteúdo fornecido
    const qrCode = await QRCode.toDataURL(conteudo, qrOptions);
    return qrCode;
  } catch (error) {
    console.error("Erro ao gerar o QR Code:", error);
    throw new Error("Erro ao gerar o QR Code");
  }
}
