import { Request, Response } from "express";
import * as permissaoService from "../services/permissaoService";

// Criar uma permissão
export const createPermissao = async (req: Request, res: Response) => {
  try {
    const {
      usuario_id,
      delete_permissao,
      update_permissao,
      view_permissao,
      create_permissao,
    } = req.body;
    const insertId = await permissaoService.createPermissao(
      usuario_id,
      delete_permissao,
      update_permissao,
      view_permissao,
      create_permissao
    );
    res.status(201).json({ id: insertId });
  } catch (error) {
    res.status(500).json({ error: "error.message" });
  }
};

// Obter todas as permissões
export const getAllPermissoes = async (_req: Request, res: Response) => {
  try {
    const permissoes = await permissaoService.getAllPermissoes();
    res.status(200).json(permissoes);
  } catch (error) {
    res.status(500).json({ error: "error.message" });
  }
};

// Obter uma permissão por ID
export const getPermissaoById = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const permissao = await permissaoService.getPermissaoById(id);
    if (permissao) {
      res.status(200).json(permissao);
    } else {
      res.status(404).json({ message: "Permissão not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "error.message" });
  }
};

// Atualizar uma permissão
export const updatePermissao = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const {
      usuario_id,
      delete_permissao,
      update_permissao,
      view_permissao,
      create_permissao,
    } = req.body;
    const affectedRows = await permissaoService.updatePermissao(
      id,
      usuario_id,
      delete_permissao,
      update_permissao,
      view_permissao,
      create_permissao
    );
    if (affectedRows > 0) {
      res.status(200).json({ message: "Permissão updated successfully" });
    } else {
      res.status(404).json({ message: "Permissão not found" });
    }
  } catch (error) {
    res.status(500).json({ error: " error.message" });
  }
};

// Deletar uma permissão
export const deletePermissao = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const affectedRows = await permissaoService.deletePermissao(id);
    if (affectedRows > 0) {
      res.status(200).json({ message: "Permissão deleted successfully" });
    } else {
      res.status(404).json({ message: "Permissão not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "error.message" });
  }
};
