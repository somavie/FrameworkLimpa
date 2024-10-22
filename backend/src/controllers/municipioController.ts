import { Request, Response } from "express";
import * as municipioService from "../services/municipioService";

// Criar um município
export const createMunicipio = async (req: Request, res: Response) => {
  try {
    const { nome, provincia_id } = req.body;
    const insertId = await municipioService.createMunicipio(nome, provincia_id);
    res.status(201).json({ id: insertId });
  } catch (error) {
    res.status(500).json({ error: "error.message" });
  }
};

// Obter todos os municípios
export const getAllMunicipios = async (_req: Request, res: Response) => {
  try {
    const municipios = await municipioService.getAllMunicipios();
    res.status(200).json(municipios);
  } catch (error) {
    res.status(500).json({ error: "error.message" });
  }
};

// Obter um município por ID
export const getMunicipioById = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const municipio = await municipioService.getMunicipioById(id);
    if (municipio) {
      res.status(200).json(municipio);
    } else {
      res.status(404).json({ message: "Município not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "error.message" });
  }
};

// Atualizar um município
export const updateMunicipio = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const { nome, provincia_id } = req.body;
    const affectedRows = await municipioService.updateMunicipio(
      id,
      nome,
      provincia_id
    );
    if (affectedRows > 0) {
      res.status(200).json({ message: "Município updated successfully" });
    } else {
      res.status(404).json({ message: "Município not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "error.message" });
  }
};

// Deletar um município
export const deleteMunicipio = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const affectedRows = await municipioService.deleteMunicipio(id);
    if (affectedRows > 0) {
      res.status(200).json({ message: "Município deleted successfully" });
    } else {
      res.status(404).json({ message: "Município not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "error.message" });
  }
};
