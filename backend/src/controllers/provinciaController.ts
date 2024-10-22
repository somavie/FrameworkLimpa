import { Request, Response } from "express";
import * as provinciaService from "../services/provinciaService";

// Criar uma província
export const createProvincia = async (req: Request, res: Response) => {
  try {
    const { nome } = req.body;
    const insertId = await provinciaService.createProvincia(nome);
    res.status(201).json({ id: insertId });
  } catch (error) {
    res.status(500).json({ error: "error.message" });
  }
};

// Obter todas as províncias
export const getAllProvincia = async (_req: Request, res: Response) => {
  try {
    const provincias = await provinciaService.getAllProvincia();
    res.status(200).json(provincias);
  } catch (error) {
    res.status(500).json({ error: "error.message" });
  }
};

// Obter uma província por ID
export const getProvinciaById = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const provincia = await provinciaService.getProvinciaById(id);
    if (provincia) {
      res.status(200).json(provincia);
    } else {
      res.status(404).json({ message: "Província não encontrada" });
    }
  } catch (error) {
    res.status(500).json({ error: " error.message" });
  }
};

// Atualizar uma província
export const updateProvincia = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const { nome } = req.body;
    const affectedRows = await provinciaService.updateProvincia(id, nome);
    if (affectedRows > 0) {
      res.status(200).json({ message: "Província atualizada com sucesso" });
    } else {
      res.status(404).json({ message: "Província não encontrada" });
    }
  } catch (error) {
    res.status(500).json({ error: "error.message" });
  }
};

// Deletar uma província
export const deleteProvincia = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const affectedRows = await provinciaService.deleteProvincia(id);
    if (affectedRows > 0) {
      res.status(200).json({ message: "Província deletada com sucesso" });
    } else {
      res.status(404).json({ message: "Província não encontrada" });
    }
  } catch (error) {
    res.status(500).json({ error: "error.message " });
  }
};
