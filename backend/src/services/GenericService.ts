import pool from "../utils/database";
import { RowDataPacket } from "mysql2";

export class GenericService<T> {
  constructor(private tableName: string, private idField: string) {}

  async getAll(): Promise<T[] & RowDataPacket[]> {
    const [rows] = await pool.query<T[] & RowDataPacket[]>(
      `SELECT * FROM ${this.tableName} WHERE estado = true`
    );
    return rows;
  }

  async getById(id: number): Promise<T | null> {
    const [rows] = await pool.query<T[] & RowDataPacket[]>(
      `SELECT * FROM ${this.tableName} WHERE ${this.idField} = ? AND estado = true`,
      [id]
    );
    return rows.length ? rows[0] : null;
  }

  async create(columns: string[], values: any[]): Promise<void> {
    const placeholders = columns.map(() => "?").join(", ");
    const query = `INSERT INTO ${this.tableName} (${columns.join(
      ", "
    )}) VALUES (${placeholders})`;
    await pool.query(query, values);
  }

  async update(columns: string[], values: any[], id: number): Promise<void> {
    const setClause = columns.map((column) => `${column} = ?`).join(", ");
    const query = `UPDATE ${this.tableName} SET ${setClause}, updatedAt = NOW() WHERE ${this.idField} = ?`;
    await pool.query(query, [...values, id]);
  }

  async softDelete(id: number): Promise<void> {
    await pool.query(
      `UPDATE ${this.tableName} SET estado = false, deletedAt = NOW() WHERE ${this.idField} = ?`,
      [id]
    );
  }
}
