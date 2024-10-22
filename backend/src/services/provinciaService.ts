import { RowDataPacket } from "mysql2/promise";
import pool from "../utils/database";

// Definindo a interface para província
interface Provincia extends RowDataPacket {
  id: number;
  nome: string;
  estado?: number;
  data_criacao?: Date;
  data_remocao?: Date;
  data_alteracao?: Date;
}

// Função para criar uma província
export const createProvincia = async (nome: string): Promise<number> => {
  const [result] = await pool.query(`INSERT INTO provincia (nome) VALUES (?)`, [
    nome,
  ]);
  return (result as any).insertId;
};

// Função para obter todas as províncias
export const getAllProvincia = async (): Promise<Provincia[]> => {
  const [rows] = await pool.query("SELECT * FROM provincia");
  return rows as Provincia[];
};

// Função para obter uma província por ID
export const getProvinciaById = async (
  id: number
): Promise<Provincia | null> => {
  const [rows] = await pool.query("SELECT * FROM provincia WHERE id = ?", [id]);
  const result = rows as Provincia[];
  return result.length > 0 ? result[0] : null;
};

// Função para atualizar uma província
export const updateProvincia = async (
  id: number,
  nome: string
): Promise<number> => {
  const [result] = await pool.query(
    `UPDATE provincia SET nome = ? WHERE id = ?`,
    [nome, id]
  );
  return (result as any).affectedRows;
};

// Função para deletar uma província
export const deleteProvincia = async (id: number): Promise<number> => {
  const [result] = await pool.query("DELETE FROM provincia WHERE id = ?", [id]);
  return (result as any).affectedRows;
};
