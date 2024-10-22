import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import { getCookies } from "./actions/auth.action";

// Mapeamento de alias para rotas reais
const routeAliases: Record<string, string> = {
  "/pessoas": "/admEscolar/gPessoa/pessoa",

  "/enderecos": "/admEscolar/gPessoa/endereco",

  "/usuarios": "/admin/accounts",
  "/tipo-usuario": "/admin/gUsuarios/tipousuario",

  "/perfil": "/profile",
};

// Função para verificar se uma rota corresponde a uma protegida ou a um alias
function getRealPathname(pathname: string): string {
  return routeAliases[pathname] || pathname;
}

export function middleware(request: NextRequest) {
  let { pathname } = request.nextUrl;
  const token = getCookies(); // Pega o token dos cookies

  // Substituir o alias pelo caminho real, se existir
  pathname = getRealPathname(pathname);

  // Redirecionar usuários autenticados que tentam acessar login ou registro
  if ((pathname === "/login" || pathname === "/register") && token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Definir rotas que requerem autenticação
  const protectedRoutes = [
    "/admEscolar/gPessoa/pessoa",

    "/admEscolar/gPessoa/endereco",

    "/admin/accounts",
    "/admin/gUsuarios/tipousuario",

    "/profile",
  ];

  // Verifica se o usuário está autenticado
  if (token) {
    // Decodifica o token JWT
    const decoded = jwt.decode(token) as {
      nomeUsuario?: string;
      tipo?: string;
    };
    const userType = decoded?.tipo;

    // Define as rotas permitidas para cada tipo de usuário
    const accessControl: Record<string, string[]> = {
      Admin: protectedRoutes,

      Operador: [
        "/admEscolar/gPessoa/pessoa",

        "/admEscolar/gPessoa/endereco",

        "/profile",
      ],
    };

    // Redireciona se o usuário tentar acessar uma rota sem permissão
    if (
      protectedRoutes.includes(pathname) &&
      (!userType || !accessControl[userType]?.includes(pathname))
    ) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  } else {
    // Redireciona para login se o usuário não estiver autenticado e a rota for protegida
    if (protectedRoutes.includes(pathname)) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  // Caso tudo esteja correto, prossegue normalmente
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admEscolar/:path*",
    "/admin/:path*",

    "/pessoas",

    "/enderecos",

    "/usuarios",
    "/tipo-usuario",

    "/perfil",

    "/login",
    "/register",
  ],
};
