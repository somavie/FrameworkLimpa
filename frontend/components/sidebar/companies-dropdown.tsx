"use client";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import React, { useState } from "react";
import { School } from "lucide-react";

interface Company {
  name: string;
  location: string;
  logo: React.ReactNode;
}

export const CompaniesDropdown = () => {
  const [company] = useState<Company>({
    name: "ESCOLA",
    location: "Humabo, Bailundo",
    logo: <School />, // Utiliza o ícone de escola
  });

  return (
    <Dropdown 
      isDisabled
      classNames={{
        base: "w-full min-w-[260px]",
      }}
    >
      <DropdownTrigger className="cursor-pointer">
        <div className="flex items-center gap-2">
          {company.logo}
          <div className="flex flex-col gap-4">
            <h3 className="text-xl font-medium m-0 text-default-900 -mb-4 whitespace-nowrap">
              {company.name}
            </h3>
            <span className="text-xs font-medium text-default-500">
              {company.location}
            </span>
          </div>
        </div>
      </DropdownTrigger>
      <DropdownMenu aria-label="Ações da Escola">
        <DropdownItem
          key="1"
          startContent={<School />}
          description="Lubango, Huila"
          classNames={{
            base: "py-4",
            title: "text-base font-semibold",
          }}
        >
          ESCOLA
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};
