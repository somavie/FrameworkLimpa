/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["i.pravatar.cc", process.env.NEXT_PUBLIC_API_URL, "localhost"], // Adiciona o domínio i.pravatar.cc e seu domínio de API
  },
  async rewrites() {
    return [
      // Rotas de Administração Escolar

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
      {
        source: "/bloqueio-usuario",
        destination: "/admin/configuracoes/bloqueioUsuario",
      },
      {
        source: "/redefinir-usuario",
        destination: "/admin/configuracoes/redefinirUsuario",
      },
      {
        source: "/configuracoes",
        destination: "/admin/configuracao",
      },
    ];
  },
};

module.exports = nextConfig;
