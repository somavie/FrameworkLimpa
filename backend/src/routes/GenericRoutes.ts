import express from "express";
import { createGenericController } from "../controllers/GenericController";
import { GenericService } from "../services/GenericService";

// Função para criar rotas genéricas
export function createGenericRoutes<T>(tableName: string, idField: string) {
  const router = express.Router();
  const service = new GenericService<T>(tableName, idField);
  const controller = createGenericController(service);

  router.get("/", controller.getAll);
  router.get("/:id", controller.getById);
  router.post("/", controller.create);
  router.put("/:id", controller.update);
  router.delete("/:id", controller.delete);

  return router;
}
