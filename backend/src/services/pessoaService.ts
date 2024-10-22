import { ResultSetHeader, RowDataPacket } from "mysql2/promise";
import pool from "../utils/database";

// Definindo a interface para pessoa
interface Pessoa extends RowDataPacket {
  id: number;
  nome: string;
  data_nascimento: Date;
  genero: "Masculino" | "Feminino" | "Outro";
  imagem?: string; // Campo imagem opcional
  estado?: number;
  data_criacao?: Date;
  data_remocao?: Date;
  data_alteracao?: Date;
  endereco_id?: number;
  municipio_id?: number;
}

// Função para criar uma pessoa
export const createPessoa = async (
  nome: string,
  data_nascimento: Date | string,
  genero: "Masculino" | "Feminino" | "Outro",
  endereco_id?: number,
  municipio_id?: number,
  imagem?: string // Campo imagem como parâmetro opcional
): Promise<number> => {
  try {
    const [result] = await pool.query(
      `INSERT INTO pessoa (nome, data_nascimento, genero, endereco_id, municipio_id, imagem, estado)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [nome, data_nascimento, genero, endereco_id, municipio_id, imagem, 1] // Define estado como ativo (1)
    );
    console.log("Query SQL:", result);
    return (result as ResultSetHeader).insertId; // Alterado para usar ResultSetHeader
  } catch (error) {
    console.error("Erro ao criar pessoa:", error);
    throw error; // Lance o erro para tratamento posterior
  }
};

// Função para obter todas as pessoas
export const getAllPessoas = async (): Promise<Pessoa[]> => {
  const [rows] = await pool.query("SELECT * FROM view_pessoas");
  return rows as Pessoa[];
};

// Função para obter uma pessoa por ID
export const getPessoaById = async (id: number): Promise<Pessoa | null> => {
  const [rows] = await pool.query("SELECT * FROM pessoa WHERE id = ?", [id]);
  const result = rows as Pessoa[];
  return result.length > 0 ? result[0] : null;
};

// Função para atualizar uma pessoa
export const updatePessoa = async (
  id: number,
  pessoa: {
    nome?: string;
    data_nascimento?: Date | string;
    genero?: "Masculino" | "Feminino" | "Outro";
    endereco_id?: number;
    municipio_id?: number;
  }
): Promise<boolean> => {
  const fields: string[] = [];
  const values: any[] = [];

  // Verifica quais campos foram fornecidos para atualização
  if (pessoa.nome) {
    fields.push("nome = ?");
    values.push(pessoa.nome);
  }

  if (pessoa.data_nascimento) {
    fields.push("data_nascimento = ?");
    values.push(pessoa.data_nascimento);
  }

  if (pessoa.genero) {
    fields.push("genero = ?");
    values.push(pessoa.genero);
  }

  if (pessoa.endereco_id) {
    fields.push("endereco_id = ?");
    values.push(pessoa.endereco_id);
  }

  if (pessoa.municipio_id) {
    fields.push("municipio_id = ?"); // Adiciona o campo município
    values.push(pessoa.municipio_id);
  }

  // Se não houverem campos para atualizar, retorna falso
  if (fields.length === 0) {
    return false;
  }

  // Adiciona o ID no final dos valores para o WHERE
  values.push(id);

  try {
    const [result] = await pool.query<ResultSetHeader>(
      `UPDATE pessoa SET ${fields.join(", ")} WHERE id = ?`,
      values
    );

    // Verifica se alguma linha foi afetada
    return result.affectedRows > 0;
  } catch (error) {
    console.error("Erro ao atualizar pessoa:", error);
    throw error; // Lance o erro para tratamento posterior
  }
};

// Soft delete (remoção segura) de pessoa
export const softDeletePessoa = async (id: number): Promise<boolean> => {
  const [result] = await pool.query<ResultSetHeader>(
    "UPDATE pessoa SET estado = 0 WHERE id = ?",
    [id]
  );

  // Verifica se alguma linha foi afetada
  return result.affectedRows > 0;
};

// Função para deletar uma pessoa
export const deletePessoa = async (id: number): Promise<number> => {
  const [result] = await pool.query("DELETE FROM pessoa WHERE id = ?", [id]);
  return (result as ResultSetHeader).affectedRows; // Alterado para usar ResultSetHeader
};

// Função para atualizar a imagem de uma pessoa
export const updatePessoaImagem = async (
  id: number,
  imagem: string
): Promise<number> => {
  const [result] = await pool.query(
    `UPDATE pessoa SET imagem = ? WHERE id = ?`,
    [imagem, id]
  );
  return (result as ResultSetHeader).affectedRows; // Alterado para usar ResultSetHeader
};
