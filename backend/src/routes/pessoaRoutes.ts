import { Router } from "express";
import {
  createPessoa,
  getAllPessoas,
  getPessoaById,
  updatePessoa,
  deletePessoa,
  updatePessoaImagem,
  deletePessoasoft,
} from "../controllers/pessoaController";
import upload from "../middleware/upload";

const router = Router();

router.post("/", upload.single("imagem"), createPessoa); // Criar uma pessoa
router.get("/", getAllPessoas); // Obter todas as pessoas
router.get("/:id", getPessoaById); // Obter uma pessoa por ID
router.put("/:id", updatePessoa); // Atualizar uma pessoa

router.delete("/:id", deletePessoa); // Deletar uma pessoa
router.put("/imagem/:id", upload.single("imagem"), updatePessoaImagem); // Atualizar a imagem de uma pessoa
router.delete("/soft/:id", deletePessoasoft); // Soft delete de pessoa

export default router;
