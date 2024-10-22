import { Usuario } from "../models/Usuario";
import pool from "../utils/database";
import { hashPassword, comparePassword } from "../utils/passwordUtils";
import { ResultSetHeader, RowDataPacket } from "mysql2";

class UsuarioService {
  static async createUsuario(
    usuario: Omit<
      Usuario,
      "id" | "data_criacao" | "data_alteracao" | "data_remocao"
    >
  ): Promise<Usuario> {
    const hashedPassword = await hashPassword(usuario.senha);
    const [result] = await pool.query<ResultSetHeader>(
      `INSERT INTO usuario 
      (pessoa_id, nomeUsuario, senha, tipo_usuario_id, delete_permissao, update_permissao, view_permissao, create_permissao, estado) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        usuario.pessoa_id,
        usuario.nomeUsuario,
        hashedPassword,
        usuario.tipo_usuario_id,
        usuario.delete_permissao,
        usuario.update_permissao,
        usuario.view_permissao,
        usuario.create_permissao,
        usuario.estado || 1,
      ]
    );
    const insertId = result.insertId;
    return { ...usuario, id: insertId };
  }

  async getAllusuario(): Promise<Usuario[] | null> {
    const [rows] = await pool.query("SELECT * FROM view_user WHERE estado = 1");
    return rows as Usuario[];
  }

  static async getUsuarioByNomeUsuario(
    nomeUsuario: string
  ): Promise<Usuario | null> {
    const [rows] = await pool.query<RowDataPacket[] & Usuario[]>(
      "SELECT * FROM usuario WHERE nomeUsuario = ? && estado = ?",
      [nomeUsuario, 1]
    );
    return rows[0] || null;
  }

  static async getUsuarioByID(id: number): Promise<Usuario | null> {
    const [rows] = await pool.query<RowDataPacket[] & Usuario[]>(
      "SELECT * FROM usuario WHERE id = ? && estado = ?",
      [id, 1]
    );
    return rows[0] || null;
  }

  static async validateUser(
    nomeUsuario: string,
    senha: string
  ): Promise<boolean> {
    const usuario = await UsuarioService.getUsuarioByNomeUsuario(nomeUsuario);
    if (!usuario) return false;
    return comparePassword(senha, usuario.senha);
  }

  // Método para atualizar um usuário
  static async updateUsuario(
    id: number,
    usuario: Partial<Usuario>
  ): Promise<boolean> {
    const fields: string[] = [];
    const values: any[] = [];

    if (usuario.nomeUsuario) {
      fields.push("nomeUsuario = ?");
      values.push(usuario.nomeUsuario);
    }

    if (usuario.senha) {
      const hashedPassword = await hashPassword(usuario.senha);
      fields.push("senha = ?");
      values.push(hashedPassword);
    }

    if (usuario.tipo_usuario_id) {
      fields.push("tipo_usuario_id = ?");
      values.push(usuario.tipo_usuario_id);
    }

    if (typeof usuario.estado !== "undefined") {
      fields.push("estado = ?");
      values.push(usuario.estado);
    }

    // Adicionando permissões
    if (typeof usuario.delete_permissao !== "undefined") {
      fields.push("delete_permissao = ?");
      values.push(usuario.delete_permissao);
    }

    if (typeof usuario.update_permissao !== "undefined") {
      fields.push("update_permissao = ?");
      values.push(usuario.update_permissao);
    }

    if (typeof usuario.view_permissao !== "undefined") {
      fields.push("view_permissao = ?");
      values.push(usuario.view_permissao);
    }

    if (typeof usuario.create_permissao !== "undefined") {
      fields.push("create_permissao = ?");
      values.push(usuario.create_permissao);
    }

    values.push(id);

    const [result] = await pool.query<ResultSetHeader>(
      `UPDATE usuario SET ${fields.join(", ")} WHERE id = ?`,
      values
    );

    return result.affectedRows > 0;
  }

  // Método para remoção segura (soft delete) de um usuário
  static async softDeleteUsuario(id: number): Promise<boolean> {
    const [result] = await pool.query<ResultSetHeader>(
      "UPDATE usuario SET estado = 0 WHERE id = ?",
      [id]
    );
    return result.affectedRows > 0;
  }

  // Método para atualizar as permissões de um usuário
  static async updatePermissoes(
    id: number,
    permissoes: {
      delete_permissao?: number;
      update_permissao?: number;
      view_permissao?: number;
      create_permissao?: number;
    }
  ): Promise<boolean> {
    const fields: string[] = [];
    const values: any[] = [];

    if (typeof permissoes.delete_permissao !== "undefined") {
      fields.push("delete_permissao = ?");
      values.push(permissoes.delete_permissao);
    }

    if (typeof permissoes.update_permissao !== "undefined") {
      fields.push("update_permissao = ?");
      values.push(permissoes.update_permissao);
    }

    if (typeof permissoes.view_permissao !== "undefined") {
      fields.push("view_permissao = ?");
      values.push(permissoes.view_permissao);
    }

    if (typeof permissoes.create_permissao !== "undefined") {
      fields.push("create_permissao = ?");
      values.push(permissoes.create_permissao);
    }

    values.push(id);

    const [result] = await pool.query<ResultSetHeader>(
      `UPDATE usuario SET ${fields.join(", ")} WHERE id = ?`,
      values
    );
    return result.affectedRows > 0;
  }
}

export default UsuarioService;
