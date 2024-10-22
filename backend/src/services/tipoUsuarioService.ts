import { RowDataPacket } from "mysql2/promise";
import pool from "../utils/database";

// Definindo a interface para tipo de usuário
interface TipoUsuario extends RowDataPacket {
  id: number;
  nome: string;
  descricao?: string;
  estado?: number;
}

// Função para criar um tipo de usuário
export const createTipoUsuario = async (
  nome: string,
  descricao?: string
): Promise<number> => {
  const [result] = await pool.query(
    `INSERT INTO tipousuario (nome, descricao) VALUES (?, ?)`,
    [nome, descricao]
  );
  return (result as any).insertId;
};

// Função para obter todos os tipos de usuário
export const getAllTipoUsuario = async (): Promise<TipoUsuario[]> => {
  const [rows] = await pool.query("SELECT * FROM tipousuario");
  return rows as TipoUsuario[];
};

// Função para obter um tipo de usuário por ID
export const getTipoUsuarioById = async (
  id: number
): Promise<TipoUsuario | null> => {
  const [rows] = await pool.query("SELECT * FROM tipousuario WHERE id = ?", [
    id,
  ]);
  const result = rows as TipoUsuario[];
  return result.length > 0 ? result[0] : null;
};

// Função para atualizar um tipo de usuário
export const updateTipoUsuario = async (
  id: number,
  nome?: string,
  descricao?: string
): Promise<number> => {
  const [result] = await pool.query(
    `UPDATE tipousuario SET nome = ?, descricao = ? WHERE id = ?`,
    [nome, descricao, id]
  );
  return (result as any).affectedRows;
};

// Função para deletar um tipo de usuário
export const deleteTipoUsuario = async (id: number): Promise<number> => {
  const [result] = await pool.query("DELETE FROM tipousuario WHERE id = ?", [
    id,
  ]);
  return (result as any).affectedRows;
};
