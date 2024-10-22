import { Request, Response } from "express";
import * as pessoaService from "../services/pessoaService";
import path from "path";

// Criar uma pessoa
export const createPessoa = async (req: Request, res: Response) => {
  try {
    const { nome, data_nascimento, genero, endereco_id, municipio_id } =
      req.body;

    // Validação básica dos dados
    if (!nome || !data_nascimento || !genero) {
      return res
        .status(400)
        .json({
          message: "Nome, data de nascimento e gênero são obrigatórios.",
        });
    }

    const imagem = req.file?.path ? path.basename(req.file.path) : undefined;
    const insertId = await pessoaService.createPessoa(
      nome,
      data_nascimento,
      genero,
      endereco_id,
      municipio_id,
      imagem
    );
    res.status(201).json({ id: insertId });
  } catch (error) {
    console.error("Erro ao criar pessoa:", error);
    res.status(500).json({ error: "Erro desconhecido ao criar pessoa" });
  }
};

// Obter todas as pessoas
export const getAllPessoas = async (_req: Request, res: Response) => {
  try {
    const pessoas = await pessoaService.getAllPessoas();
    res.status(200).json(pessoas);
  } catch (error) {
    console.error("Erro ao obter pessoas:", error);
    res.status(500).json({ error: "Erro desconhecido ao obter pessoas" });
  }
};

// Obter uma pessoa por ID
export const getPessoaById = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const pessoa = await pessoaService.getPessoaById(id);
    if (pessoa) {
      res.status(200).json(pessoa);
    } else {
      res.status(404).json({ message: "Pessoa não encontrada" });
    }
  } catch (error) {
    console.error("Erro ao obter pessoa:", error);
    res.status(500).json({ error: "Erro desconhecido ao obter pessoa" });
  }
};

// Atualizar uma pessoa
export const updatePessoa = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Validação básica dos dados
    if (!req.body) {
      return res
        .status(400)
        .json({ message: "Dados para atualização são obrigatórios." });
    }

    const updatedPessoa = await pessoaService.updatePessoa(
      Number(id),
      req.body
    );
    if (updatedPessoa) {
      res.json({ message: "Pessoa atualizada com sucesso" });
    } else {
      res.status(404).json({ message: "Pessoa não encontrada" });
    }
  } catch (error) {
    console.error("Erro ao atualizar pessoa:", error);
    res.status(500).json({ error: "Erro desconhecido ao atualizar pessoa" });
  }
};

// Soft delete (remoção segura) de pessoa
export const deletePessoasoft = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await pessoaService.softDeletePessoa(Number(id));
    if (result) {
      res.status(204).end(); // Sucesso sem conteúdo
    } else {
      res.status(404).json({ message: "Pessoa não encontrada" });
    }
  } catch (error) {
    console.error("Erro ao remover pessoa:", error);
    res.status(500).json({ error: "Erro desconhecido ao remover pessoa" });
  }
};

// Deletar uma pessoa
export const deletePessoa = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const affectedRows = await pessoaService.deletePessoa(id);
    if (affectedRows > 0) {
      res.status(200).json({ message: "Pessoa deletada com sucesso" });
    } else {
      res.status(404).json({ message: "Pessoa não encontrada" });
    }
  } catch (error) {
    console.error("Erro ao deletar pessoa:", error);
    res.status(500).json({ error: "Erro desconhecido ao deletar pessoa" });
  }
};

// Atualizar a imagem de uma pessoa
export const updatePessoaImagem = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const { imagem } = req.body;

    if (!imagem) {
      return res.status(400).json({ message: "Imagem é obrigatória." });
    }

    const result = await pessoaService.updatePessoaImagem(id, imagem);
    if (result) {
      res.status(200).json({ message: "Imagem atualizada com sucesso" });
    } else {
      res.status(404).json({ message: "Pessoa não encontrada" });
    }
  } catch (error) {
    console.error("Erro ao atualizar imagem:", error);
    res.status(500).json({ error: "Erro desconhecido ao atualizar imagem" });
  }
};
