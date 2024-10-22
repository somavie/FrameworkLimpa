import multer from "multer";
import fs from "fs";
import path from "path";

// Defina o caminho do diretório de uploads
const uploadDir = path.join(__dirname, "..", "uploads");

// Função para verificar se o diretório existe e, se não, criá-lo
const ensureDirExists = (dir: string) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

// Garanta que o diretório de uploads existe
ensureDirExists(uploadDir);

// Configuração de armazenamento do multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir); // Define o diretório de destino como o diretório de uploads
  },
  filename: (req, file, cb) => {
    const filename = Date.now() + path.extname(file.originalname);

    cb(null, filename); // Nome do arquivo com um timestamp para evitar duplicações
  },
});

// Middleware do multer configurado
const upload = multer({ storage });

export default upload;
