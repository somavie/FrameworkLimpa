import { Request, Response, NextFunction } from "express";

interface UserPermissions {
  delete_permissao: number;
  update_permissao: number;
  view_permissao: number;
  create_permissao: number;
}

// Middleware para verificar permissões com base no método HTTP
export const checkPermissionsAuto = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userPermissionsArray: UserPermissions[] = (req as any).userPermissions;

  if (!userPermissionsArray || userPermissionsArray.length === 0) {
    return res.status(403).json({ message: "Permissões não fornecidas." });
  }

  // Acessa o primeiro objeto do array de permissões
  const userPermissions = userPermissionsArray[0];

  const method = req.method;

  // Mapeamento de métodos HTTP para permissões
  const permissionMap: { [key: string]: string } = {
    GET: "view_permissao",
    POST: "create_permissao",
    PUT: "update_permissao",
    DELETE: "delete_permissao",
  };

  const requiredPermission = permissionMap[method];

  // Usando find para verificar se o objeto contém a permissão necessária
  const foundPermission = Object.entries(userPermissions).find(
    ([key, value]) => key === requiredPermission && value === 1
  );

  if (!foundPermission) {
    return res
      .status(403)
      .json({ message: "Acesso negado. Permissão insuficiente." });
  }

  // Se a permissão está correta, continua para o próximo middleware ou rota
  next();
};
