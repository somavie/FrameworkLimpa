import { RowDataPacket } from "mysql2/promise";
import pool from "../utils/database";

// Definindo a interface para endereco
interface Endereco extends RowDataPacket {
  id: number;
  municipio_id: number;
  numero_casa: string | null;
  bairro: string | null;
  estado?: number;
  data_criacao?: Date;
  data_remocao?: Date;
  data_alteracao?: Date;
}

// Função para criar um endereço
export const createEndereco = async (
  municipio_id: number,
  numero_casa: string | null,
  bairro: string | null
) => {
  const [result] = await pool.query(
    "INSERT INTO endereco (municipio_id, numero_casa, bairro) VALUES (?, ?, ?)",
    [municipio_id, numero_casa, bairro]
  );
  return (result as any).insertId;
};

// Função para obter todos os endereços
export const getAllEnderecos = async (): Promise<Endereco[]> => {
  const [rows] = await pool.query("SELECT * FROM view_enderecos");
  return rows as Endereco[];
};

// Função para obter um endereço por ID
export const getEnderecoById = async (id: number): Promise<Endereco | null> => {
  const [rows] = await pool.query("SELECT * FROM endereco WHERE id = ?", [id]);
  const result = rows as Endereco[];
  return result.length > 0 ? result[0] : null;
};

// Função para atualizar um endereço
export const updateEndereco = async (
  id: number,
  municipio_id: number,
  numero_casa: string | null,
  bairro: string | null
): Promise<number> => {
  const [result] = await pool.query(
    "UPDATE endereco SET municipio_id = ?, numero_casa = ?, bairro = ? WHERE id = ?",
    [municipio_id, numero_casa, bairro, id]
  );
  return (result as any).affectedRows;
};

// Função para deletar um endereço
export const deleteEndereco = async (id: number): Promise<number> => {
  const [result] = await pool.query("DELETE FROM endereco WHERE id = ?", [id]);
  return (result as any).affectedRows;
};
