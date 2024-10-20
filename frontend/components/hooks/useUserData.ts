import { useEffect, useState, useCallback } from "react";
import jwt from "jsonwebtoken";
import { getCookies, deleteAuthCookie } from "@/actions/auth.action";
import {
  useAllPessoas,
  useAllTiposUsuarios,
  useFetchUsuario,
} from "../hooks/allselect";

// Interface para os dados do usuário, permitindo que `id` seja null inicialmente
interface UserData {
  userName: string | null;
  userImage: string | null;
  permissions: {
    canDelete: boolean;
    canUpdate: boolean;
    canView: boolean;
    canCreate: boolean;
  };
  estado: boolean;
  tipoUser: string | null;
  id: number | null;
}

export const useUserData = (): UserData => {
  const [userName, setUserName] = useState<string | null>(null);
  const [id, setID] = useState<number | null>(null);
  const [userType, setUserType] = useState<string | null>(null);
  const [userImage, setUserImage] = useState<string | null>(null);
  const [permissions, setPermissions] = useState({
    canDelete: false,
    canUpdate: false,
    canView: true,
    canCreate: false,
  });
  const [estado, setEstado] = useState<boolean>(true);

  const { usuarios } = useFetchUsuario();
  const { pessoas } = useAllPessoas();
  const { tiposUsuario } = useAllTiposUsuarios();

  const handleLogout = useCallback(async () => {
    await deleteAuthCookie(); // Deleta o cookie de autenticação
    window.location.replace("/login"); // Redireciona para a página de login
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = await getCookies(); // Espera pela resolução da Promise
        if (token) {
          const decoded = jwt.decode(token) as {
            id: number;
            exp: number;
            nomeUsuario?: string;
          };

          // Verificar se o token expirou
          if (decoded?.exp && Date.now() >= decoded.exp * 1000) {
            handleLogout(); // Faz o logout se o token estiver expirado
            return;
          }

          if (decoded?.nomeUsuario) {
            const usuario = usuarios.find(
              (user) => user.nomeUsuario === decoded.nomeUsuario
            );

            if (usuario) {
              const pessoa = pessoas.find(
                (pessoa) => pessoa.id === usuario.pessoa_id
              );

              const tipousuario = tiposUsuario.find(
                (tipo) => tipo.id === usuario.tipo_usuario_id
              );

              if (pessoa) {
                setUserName(pessoa.nome);
                setUserImage(pessoa.imagem ?? null);
              }

              setUserType(tipousuario ? tipousuario.nome : null);
              setID(decoded?.id);

              setPermissions({
                canDelete: !!usuario.delete_permissao,
                canUpdate: !!usuario.update_permissao,
                canView: !!usuario.view_permissao,
                canCreate: !!usuario.create_permissao,
              });

              setEstado(!!usuario.estado);
            }
          }
        } else {
          handleLogout(); // Faz o logout se o token não estiver presente
        }
      } catch (error) {
        console.error("Erro ao obter ou decodificar o token:", error);
        handleLogout(); // Faz o logout em caso de erro na decodificação do token
      }
    };

    fetchUserData();
  }, [usuarios, pessoas, tiposUsuario, handleLogout]);

  return {
    userName,
    userImage,
    permissions,
    estado,
    tipoUser: userType,
    id,
  };
};
