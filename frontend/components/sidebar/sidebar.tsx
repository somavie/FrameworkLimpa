import React from "react";
import Image from "next/image";
import { Sidebar } from "./sidebar.styles";
import { Tooltip } from "@nextui-org/react";
import { CompaniesDropdown } from "./companies-dropdown";
import { HomeIcon } from "../icons/sidebar/home-icon";
import { AccountsIcon } from "../icons/sidebar/accounts-icon";
import { IdentificationIcon } from "../icons/sidebar/identification-icon";
import { ReportsIcon } from "../icons/sidebar/reports-icon";
import { SettingsIcon } from "../icons/sidebar/settings-icon";
import { CollapseItems } from "./collapse-items";
import { useSidebarContext } from "../layout/layout-context";
import { usePathname, useRouter } from "next/navigation";
import { useUserData } from "../hooks/useUserData";
import {
  Calendar,
  LockIcon,
  UserCheckIcon,
  Users,
  UserXIcon,
  SchoolIcon,
  ClipboardListIcon,
  BriefcaseIcon,
  MapPinIcon,
  BookOpenIcon,
  BookAIcon,
} from "lucide-react";
import { SidebarItem } from "./sidebar-item";

export const SidebarWrapper = () => {
  const pathname = usePathname();
  const { collapsed, setCollapsed } = useSidebarContext();
  const { userImage, tipoUser } = useUserData();
  const router = useRouter();

  const handleProfileClick = () => {
    router.push("/profile");
  };

  return (
    <aside className="h-screen z-[20] sticky top-0">
      {collapsed ? (
        <div className={Sidebar.Overlay()} onClick={setCollapsed} />
      ) : null}
      <div className={Sidebar({ collapsed: collapsed })}>
        <div className={Sidebar.Header()}>
          <CompaniesDropdown />
        </div>
        <div className="flex flex-col justify-between h-full">
          <div className={Sidebar.Body()}>
            <SidebarItem title="Home" icon={<HomeIcon />} href="/" />

            {/* Exibir menus para ADMIN apenas */}
            {(tipoUser === "Admin" || tipoUser === "Operador") && (
              <>
                {/* Módulo: Administração Escolar */}
                <CollapseItems
                  title="Administração Escolar"
                  icon={<IdentificationIcon />}
                  items={[
                    {
                      label: "Alunos",
                      href: "/alunos", // Alias
                      icon: <SchoolIcon />,
                    },
                    {
                      label: "Horários e Calendários",
                      href: "/horarios", // Alias
                      icon: <Calendar />,
                    },
                    {
                      label: "Turmas",
                      href: "/turmas", // Alias
                      icon: <ClipboardListIcon />,
                    },
                    {
                      label: "Professores",
                      href: "/professores", // Alias
                      icon: <ClipboardListIcon />,
                    },
                    {
                      label: "Pessoas",
                      href: "/pessoas", // Alias
                      icon: <Users />,
                    },
                    {
                      label: "Encarregado",
                      href: "/encarregado", // Alias
                      icon: <Users />,
                    },
                    {
                      label: "Funcionários",
                      href: "/funcionarios", // Alias
                      icon: <BriefcaseIcon />,
                    },
                    {
                      label: "Endereços",
                      href: "/enderecos", // Alias
                      icon: <MapPinIcon />,
                    },
                    {
                      label: "Emitir Boletins",
                      href: "/boletins", // Alias
                      icon: <ReportsIcon />,
                    },
                    {
                      label: "Disciplinas",
                      href: "/disciplinas", // Alias
                      icon: <BookOpenIcon />,
                    },
                  ]}
                />
              </>
            )}
            {tipoUser === "Admin" && (
              <>
                {/* Módulo: Administração */}
                <CollapseItems
                  title="Admin"
                  icon={<AccountsIcon />}
                  items={[
                    {
                      label: "Usuários",
                      href: "/usuarios", // Alias
                      icon: <Users />,
                    },
                    {
                      label: "Tipo de Usuário",
                      href: "/tipo-usuario", // Alias
                      icon: <UserCheckIcon />,
                    },

                    {
                      label: "Configurações",
                      href: "/configuracoes", // Alias
                      icon: <SettingsIcon />,
                    },
                  ]}
                />
              </>
            )}

            {/* Módulo: Professor */}
            {(tipoUser === "Professor" || tipoUser === "Admin") && (
              <CollapseItems
                title="Professor"
                icon={<ReportsIcon />}
                items={[
                  {
                    label: "Minhas Turmas",
                    href: "/minhasTurmas", // Alias
                    icon: <ClipboardListIcon />,
                  },

                  {
                    label: "Avaliar Turmas",
                    href: "/Prova", // Alias
                    icon: <ClipboardListIcon />,
                  },
                ]}
              />
            )}

            {/* Módulo: Aluno/Encarregado */}
            {tipoUser === "Admin" && (
              <CollapseItems
                title="Aluno/Encarregado"
                icon={<ReportsIcon />}
                items={[
                  {
                    label: "Consultar Notas",
                    href: "/consultar-notas", // Alias
                    icon: <ReportsIcon />,
                  },
                  {
                    label: "Consultar Faltas",
                    href: "/consultar-faltas", // Alias
                    icon: <ReportsIcon />,
                  },
                  {
                    label: "Perfil",
                    href: "/profile",
                    icon: <ReportsIcon />,
                  },
                ]}
              />
            )}

            {/* Módulo: Relatórios e Estatísticas */}
            {tipoUser === "Admin" && (
              <CollapseItems
                title="Relatórios e Estatísticas"
                icon={<ReportsIcon />}
                items={[
                  {
                    label: "Relatórios de Desempenho",
                    href: "/relatorios-desempenho", // Alias
                    icon: <ReportsIcon />,
                  },
                  {
                    label: "Estatísticas de Presenças",
                    href: "/estatisticas-presencas", // Alias
                    icon: <ReportsIcon />,
                  },
                ]}
              />
            )}
            {/* Módulo: Biblioteca */}
            {(tipoUser === "Bibliotecario" || tipoUser === "Admin") && (
              <CollapseItems
                title="Biblioteca"
                icon={<BookAIcon />}
                items={[
                  {
                    label: "Livros",
                    href: "/livros", // Alias
                    icon: <ReportsIcon />,
                  },
                ]}
              />
            )}

            {/* Módulo: Meios */}
            {(tipoUser === "Bibliotecario" || tipoUser === "Admin") && (
              <CollapseItems
                title="Meios"
                icon={<BookAIcon />}
                items={[
                  {
                    label: "Meio",
                    href: "/meios", // Alias
                    icon: <ReportsIcon />,
                  },
                ]}
              />
            )}
          </div>
          <div className={Sidebar.Footer()}>
            <Tooltip content={"Configurações"} color="primary">
              <div className="max-w-fit">
                <SettingsIcon />
              </div>
            </Tooltip>
            <Tooltip content={"Perfil"} color="primary">
              <div
                style={{
                  position: "relative",
                  width: "50px",
                  height: "50px",
                  cursor: "pointer",
                }}
                onClick={handleProfileClick}
              >
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
            </Tooltip>
          </div>
        </div>
      </div>
    </aside>
  );
};
