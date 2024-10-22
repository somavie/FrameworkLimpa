// routes/authRoutes.ts
import { Router } from "express";
import * as usuarioController from "../controllers/usuarioController";

const router = Router();

// Rota para login de usuário
router.post("/login", usuarioController.loginUsuario);

// Rota para buscar todos os usuários
router.get("/", usuarioController.getAllUsuarios);

// Rota para criar um novo usuário
router.post("/", usuarioController.createUsuario);

// Rota para atualizar um usuário
router.put("/:id", usuarioController.updateUsuario);

// Rota para deletar (soft delete) um usuário
router.delete("/:id", usuarioController.deleteUsuario);

// Rota para atualizar permissões de um usuário
router.patch("/:id/permissoes", usuarioController.updatePermissoes);

// Rota para buscar usuário por nome de usuário
router.get(
  "/nomeUsuario/:nomeUsuario",
  usuarioController.getUsuarioByNomeUsuario
);

// Rota para buscar usuário por ID
router.get("/:id", usuarioController.getUsuarioByID);

export default router;
