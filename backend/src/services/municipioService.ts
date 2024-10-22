import { RowDataPacket } from "mysql2/promise";
import pool from "../utils/database";

// Definindo a interface para municipio
interface Municipio extends RowDataPacket {
  id: number;
  nome: string;
  provincia_id: number;
  estado?: number;
  data_criacao?: Date;
  data_remocao?: Date;
  data_alteracao?: Date;
}

// Função para criar um município
export const createMunicipio = async (
  nome: string,
  provincia_id: number
): Promise<number> => {
  const [result] = await pool.query(
    `INSERT INTO municipio (nome, provincia_id)
     VALUES (?, ?)`,
    [nome, provincia_id]
  );
  return (result as any).insertId;
};

// Função para obter todos os municípios
export const getAllMunicipios = async (): Promise<Municipio[]> => {
  const [rows] = await pool.query(`
    SELECT * FROM view_municipios
  `);
  return rows as Municipio[];
};

// Função para obter um município por ID
export const getMunicipioById = async (
  id: number
): Promise<Municipio | null> => {
  const [rows] = await pool.query("SELECT * FROM municipio WHERE id = ?", [id]);
  const result = rows as Municipio[];
  return result.length > 0 ? result[0] : null;
};

// Função para atualizar um município
export const updateMunicipio = async (
  id: number,
  nome: string,
  provincia_id: number
): Promise<number> => {
  const [result] = await pool.query(
    `UPDATE municipio SET nome = ?, provincia_id = ? WHERE id = ?`,
    [nome, provincia_id, id]
  );
  return (result as any).affectedRows;
};

// Função para deletar um município
export const deleteMunicipio = async (id: number): Promise<number> => {
  const [result] = await pool.query("DELETE FROM municipio WHERE id = ?", [id]);
  return (result as any).affectedRows;
};
