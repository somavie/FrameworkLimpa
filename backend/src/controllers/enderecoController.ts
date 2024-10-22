import { Request, Response } from "express";
import * as enderecoService from "../services/enderecoService";

// Handler para criar um endereço
export const createEndereco = async (req: Request, res: Response) => {
  try {
    const { municipio_id, numero_casa, bairro } = req.body;
    const insertId = await enderecoService.createEndereco(
      municipio_id,
      numero_casa,
      bairro
    );
    res.status(201).json({ id: insertId, municipio_id, numero_casa, bairro });
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar o endereço" });
  }
};

// Handler para obter todos os endereços
export const getAllEnderecos = async (req: Request, res: Response) => {
  try {
    const enderecos = await enderecoService.getAllEnderecos();
    res.status(200).json(enderecos);
  } catch (error) {
    res.status(500).json({ error: "Erro ao obter os endereços" });
  }
};

// Handler para obter um endereço por ID
export const getEnderecoById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const endereco = await enderecoService.getEnderecoById(Number(id));
    if (endereco) {
      res.status(200).json(endereco);
    } else {
      res.status(404).json({ error: "Endereço não encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: "Erro ao obter o endereço" });
  }
};

// Handler para atualizar um endereço
export const updateEndereco = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { municipio_id, numero_casa, bairro } = req.body;
    const affectedRows = await enderecoService.updateEndereco(
      Number(id),
      municipio_id,
      numero_casa,
      bairro
    );
    if (affectedRows > 0) {
      res
        .status(200)
        .json({ id: Number(id), municipio_id, numero_casa, bairro });
    } else {
      res.status(404).json({ error: "Endereço não encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar o endereço" });
  }
};

// Handler para deletar um endereço
export const deleteEndereco = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const affectedRows = await enderecoService.deleteEndereco(Number(id));
    if (affectedRows > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: "Endereço não encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: "Erro ao deletar o endereço" });
  }
};
