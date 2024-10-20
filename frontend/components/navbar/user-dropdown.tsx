import React, { useCallback } from "react";
import Image from "next/image";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Navbar,
  NavbarItem,
} from "@nextui-org/react";
import { DarkModeSwitch } from "./darkmodeswitch";
import { useRouter } from "next/navigation";
import { deleteAuthCookie } from "@/actions/auth.action";
import { useUserData } from "../hooks/useUserData"; // Importa o hook personalizado

export const UserDropdown = () => {
  const { userName, userImage } = useUserData(); // Usa o hook para obter o nome e imagem do usuário
  const router = useRouter();

  const handleLogout = useCallback(async () => {
    await deleteAuthCookie(); // Deleta o cookie de autenticação
    router.replace("/login"); // Redireciona para a página de login
  }, [router]);

  // Função para redirecionar para a página de perfil
  const handleProfileRedirect = useCallback(() => {
    router.push("/profile"); // Redireciona para a página de perfil
  }, [router]);

  return (
    <Dropdown>
      <NavbarItem>
        <DropdownTrigger>
          <div style={{ position: "relative", width: "50px", height: "50px" }}>
            <Image
              alt="Avatar do Usuário"
              src={
                userImage
                  ? `${process.env.NEXT_PUBLIC_API_URL}/uploads/${userImage}`
                  : "https://i.pravatar.cc/150?u=a042581f4e29026704d"
              }
              layout="fill"
              objectFit="cover"
              style={{ borderRadius: "50%" }}
            />
          </div>
        </DropdownTrigger>
      </NavbarItem>
      <DropdownMenu aria-label="Ações do menu do usuário">
        <DropdownItem
          key="profile-info"
          className="flex flex-col justify-start w-full items-start"
        >
          <p>Conectado como:</p>
          <p>{userName || "Carregando..."}</p> {/* Exibe o nome da pessoa */}
        </DropdownItem>

        {/* Redirecionar para o perfil ao clicar */}
        <DropdownItem key="configurations" onClick={handleProfileRedirect}>
          Perfil
        </DropdownItem>

        <DropdownItem
          key="logout"
          color="danger"
          className="text-danger"
          onPress={handleLogout}
        >
          Terminar Sessão
        </DropdownItem>
        <DropdownItem key="switch">
          <DarkModeSwitch />
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};
