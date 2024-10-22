import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import pool from "../utils/database"; // Importar a conexão com o banco de dados MySQL
// Middleware para verificar o token JWT
export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1]; // 'Bearer <token>'

  if (!token) {
    return res.status(403).json({ message: "Token não fornecido." });
  }

  try {
    // Verifica se o token é válido
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    (req as any).user = decoded;

    const [rows] = await pool.query(
      "SELECT delete_permissao, update_permissao, view_permissao, create_permissao FROM usuario WHERE id = ?",
      [(req as any).user.id]
    );
    // Usamos "as" para indicar ao TypeScript que `req.user` existe
    const userPermissions = rows;

    if (!userPermissions) {
      return res
        .status(403)
        .json({ message: "Permissões não encontradas para o usuário." });
    }

    // Armazena as permissões do usuário na requisição
    (req as any).userPermissions = userPermissions;

    next(); // Passa para o próximo middleware ou rota
  } catch (err) {
    return res.status(401).json({ message: "Token inválido ou expirado." });
  }
};
