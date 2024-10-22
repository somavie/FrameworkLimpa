import pool from "./database";

export const checkDatabaseConnection = async () => {
  try {
    await pool.getConnection();
    console.log("Conexão com o banco de dados estabelecida com sucesso.");
  } catch (error) {
    console.error("Erro ao conectar ao banco de dados:", error);
    process.exit(1);
  }
};
