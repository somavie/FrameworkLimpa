import { Request, Response } from "express";
import { GenericService } from "../services/GenericService";

export function createGenericController<T>(service: GenericService<T>) {
  return {
    getAll: async (req: Request, res: Response) => {
      try {
        const items = await service.getAll();
        res.json(items);
      } catch (error) {
        res.status(500).json({ error: "Erro ao buscar itens" });
      }
    },
    getById: async (req: Request, res: Response) => {
      try {
        const id = parseInt(req.params.id, 10);
        const item = await service.getById(id);
        if (item) {
          res.json(item);
        } else {
          res.status(404).json({ error: "Item não encontrado" });
        }
      } catch (error) {
        res.status(500).json({ error: "Erro ao buscar item" });
      }
    },
    create: async (req: Request, res: Response) => {
      try {
        const data = req.body;
        await service.create(Object.keys(data), Object.values(data));
        res.status(201).json({ message: "Item criado com sucesso" });
      } catch (error) {
        res.status(500).json({ error: "Erro ao criar item" });
      }
    },
    update: async (req: Request, res: Response) => {
      try {
        const id = parseInt(req.params.id, 10);
        const data = req.body;
        await service.update(Object.keys(data), Object.values(data), id);
        res.json({ message: "Item atualizado com sucesso" });
      } catch (error) {
        res.status(500).json({ error: "Erro ao atualizar item" });
      }
    },
    delete: async (req: Request, res: Response) => {
      try {
        const id = parseInt(req.params.id, 10);
        await service.softDelete(id);
        res.json({ message: "Item deletado com sucesso" });
      } catch (error) {
        res.status(500).json({ error: "Erro ao deletar item" });
      }
    },
  };
}
