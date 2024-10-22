// controllers/usuarioController.ts
import { Request, Response } from "express";
import UsuarioService from "../services/usuarioService";
import { generateToken } from "../middleware/authMiddleware";
import { Usuario } from "../models/Usuario";
import * as tipoUsuarioService from "../services/tipoUsuarioService";

// Buscar todos os usuários
export const getAllUsuarios = async (req: Request, res: Response) => {
  try {
    const usuarioService = new UsuarioService();
    const usuarios = await usuarioService.getAllusuario();
    if (usuarios) {
      res.status(200).json(usuarios);
    } else {
      res.status(404).json({ message: "Nenhum usuário encontrado" });
    }
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar usuários", error });
  }
};

// Criar novo usuário
export const createUsuario = async (req: Request, res: Response) => {
  try {
    const usuario = await UsuarioService.createUsuario(req.body);
    res.status(201).json(usuario);
  } catch (error) {
    res.status(500).json({ message: "Erro ao criar usuário", error });
  }
};

// Atualizar usuário
export const updateUsuario = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updatedUsuario = await UsuarioService.updateUsuario(
      Number(id),
      req.body
    );
    if (updatedUsuario) {
      res.json(updatedUsuario);
    } else {
      res.status(404).json({ message: "Usuário não encontrado" });
    }
  } catch (error) {
    res.status(500).json({ message: "Erro ao atualizar usuário", error });
  }
};

// Deletar usuário (soft delete)
export const deleteUsuario = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await UsuarioService.softDeleteUsuario(Number(id));
    if (result) {
      res.status(204).end();
    } else {
      res.status(404).json({ message: "Usuário não encontrado" });
    }
  } catch (error) {
    res.status(500).json({ message: "Erro ao remover usuário", error });
  }
};

// Atualizar permissões do usuário
export const updatePermissoes = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await UsuarioService.updatePermissoes(Number(id), req.body);
    if (result) {
      res.json(result);
    } else {
      res.status(404).json({ message: "Usuário não encontrado" });
    }
  } catch (error) {
    res.status(500).json({ message: "Erro ao atualizar permissões", error });
  }
};

// Login do usuário
export const loginUsuario = async (req: Request, res: Response) => {
  try {
    const { nomeUsuario, senha } = req.body;
    const isValid = await UsuarioService.validateUser(nomeUsuario, senha);
    if (!isValid) {
      return res.status(401).json({ message: "Credenciais inválidas" });
    }

    const usuario = await UsuarioService.getUsuarioByNomeUsuario(nomeUsuario);
    if (!usuario) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    const id = usuario?.id;
    const tipo_id = usuario?.tipo_usuario_id;

    const tipoUsuario = await tipoUsuarioService.getTipoUsuarioById(tipo_id);
    if (!tipoUsuario) {
      return res
        .status(404)
        .json({ message: "Tipo de usuário não encontrado" });
    }

    const token = generateToken({ nomeUsuario, id, tipo: tipoUsuario.nome });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: "Erro ao realizar login", error });
  }
};

// Buscar usuário por nome de usuário
export const getUsuarioByNomeUsuario = async (req: Request, res: Response) => {
  try {
    const { nomeUsuario } = req.params;
    const usuario = await UsuarioService.getUsuarioByNomeUsuario(nomeUsuario);
    if (!usuario) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }
    res.status(200).json(usuario);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar usuário", error });
  }
};

// Buscar usuário por ID
export const getUsuarioByID = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const usuario = await UsuarioService.getUsuarioByID(Number(id));
    if (!usuario) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }
    res.status(200).json(usuario);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar usuário", error });
  }
};
