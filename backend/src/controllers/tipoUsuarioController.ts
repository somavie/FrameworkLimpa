import { Request, Response } from "express";
import * as tipoUsuarioService from "../services/tipoUsuarioService";

// Criar um tipo de usuário
export const createTipoUsuario = async (req: Request, res: Response) => {
  try {
    const { nome, descricao } = req.body;
    const insertId = await tipoUsuarioService.createTipoUsuario(
      nome,
      descricao
    );
    res.status(201).json({ id: insertId });
  } catch (error) {
    res.status(500).json({ error: "error.message" });
  }
};

// Obter todos os tipos de usuário
export const getAllTipoUsuario = async (_req: Request, res: Response) => {
  try {
    const tiposUsuario = await tipoUsuarioService.getAllTipoUsuario();
    res.status(200).json(tiposUsuario);
  } catch (error) {
    res.status(500).json({ error: "error.message" });
  }
};

// Obter um tipo de usuário por ID
export const getTipoUsuarioById = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const tipoUsuario = await tipoUsuarioService.getTipoUsuarioById(id);
    if (tipoUsuario) {
      res.status(200).json(tipoUsuario);
    } else {
      res.status(404).json({ message: "Tipo de usuário não encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: "error.message " });
  }
};

// Atualizar um tipo de usuário
export const updateTipoUsuario = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const { nome, descricao } = req.body;
    const affectedRows = await tipoUsuarioService.updateTipoUsuario(
      id,
      nome,
      descricao
    );
    if (affectedRows > 0) {
      res
        .status(200)
        .json({ message: "Tipo de usuário atualizado com sucesso" });
    } else {
      res.status(404).json({ message: "Tipo de usuário não encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: " error.message " });
  }
};

// Deletar um tipo de usuário
export const deleteTipoUsuario = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const affectedRows = await tipoUsuarioService.deleteTipoUsuario(id);
    if (affectedRows > 0) {
      res.status(200).json({ message: "Tipo de usuário deletado com sucesso" });
    } else {
      res.status(404).json({ message: "Tipo de usuário não encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: "error.message" });
  }
};
