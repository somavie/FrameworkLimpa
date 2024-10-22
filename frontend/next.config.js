/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["i.pravatar.cc", process.env.NEXT_PUBLIC_API_URL, "localhost"], // Adiciona o domínio i.pravatar.cc e seu domínio de API
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.pravatar.cc",
        pathname: "**",
      },
    ],
  },
  async rewrites() {
    return [
      // Rotas de Administração Escolar

      {
        source: "/alunos/:alunoId",
        destination: "/admEscolar/gMatriculas/alunos/:alunoId",
      },

      {
        source: "/pessoas",
        destination: "/admEscolar/gPessoa/pessoa",
      },

      {
        source: "/enderecos",
        destination: "/admEscolar/gPessoa/endereco",
      },

      // Rotas de Administração
      {
        source: "/usuarios",
        destination: "/admin/accounts",
      },
      {
        source: "/tipo-usuario",
        destination: "/admin/gUsuarios/tipousuario",
      },

      // Rotas do Professor

      // Rotas do Aluno/Encarregado

      {
        source: "/perfil",
        destination: "/profile",
      },
      // Rotas de Meios

      // Rotas de Biblioteca

      // Rotas de Relatórios e Estatísticas
    ];
  },
};

module.exports = nextConfig;
