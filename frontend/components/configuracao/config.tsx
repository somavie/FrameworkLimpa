"use client";

import React, { useCallback } from "react";
import { useRouter } from "next/navigation";

const ButtonRedirects: React.FC = () => {
  const router = useRouter();

  // Funções de redirecionamento usando useCallback
  const handleProvinceRedirect = useCallback(() => {
    router.push("/admin/configuracao/provincia");
  }, [router]);

  const handleMunicipioRedirect = useCallback(() => {
    router.push("/admin/configuracao/municipio");
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-12 text-gray-800">
        Painel de Administrações
      </h1>

      {/* Seção de Endereços */}
      <div className="w-full max-w-md  shadow-lg rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-6 text-gray-700">
          Configurações de Endereços
        </h2>
        <div className="space-y-4">
          <button
            className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={handleProvinceRedirect}
          >
            Ir para Províncias
          </button>

          <button
            className="w-full px-4 py-2  bg-blue-500 text-white rounded hover:bg-green-600"
            onClick={handleMunicipioRedirect}
          >
            Ir para Municípios
          </button>
        </div>
      </div>
    </div>
  );
};

export default ButtonRedirects;
