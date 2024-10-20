"use client";
import React from "react";
import { ChevronDownIcon } from "../icons/sidebar/chevron-down-icon";
import { Accordion, AccordionItem } from "@nextui-org/react";
import clsx from "clsx";
import NextLink from "next/link";
import { usePathname } from "next/navigation";

interface Item {
  label: string;
  href: string;
  icon?: React.ReactNode;
  items?: Item[]; // Adicionando suporte para sub-itens
}

interface Props {
  icon: React.ReactNode;
  title: string;
  items: Item[];
}

export const CollapseItems = ({ icon, items, title }: Props) => {
  const pathname = usePathname();

  // Verifica se algum dos itens está ativo
  const isActive = items.some((item) => pathname === item.href);

  // Verifica se algum dos sub-itens está ativo
  const hasActiveSubItem = items.some((item) =>
    item.items?.some((subItem) => pathname === subItem.href)
  );

  return (
    <div className="flex gap-4 h-full items-center cursor-pointer">
      <Accordion className="px-0">
        <AccordionItem
          indicator={<ChevronDownIcon />}
          classNames={{
            indicator: "data-[open=true]:-rotate-180",
            trigger:
              "py-0 min-h-[44px] hover:bg-default-100 rounded-xl active:scale-[0.98] transition-transform px-3.5",
            title:
              "px-0 flex text-base gap-2 h-full items-center cursor-pointer",
          }}
          aria-label="Accordion 1"
          title={
            <div
              className={clsx(
                "flex flex-row gap-2",
                isActive || hasActiveSubItem
                  ? "text-primary-500 font-medium"
                  : "" // Adiciona o estilo ativo ao título do menu
              )}
            >
              <span>{icon}</span>
              <span>{title}</span>
            </div>
          }
        >
          <div className="pl-12">
            {items.map((item, index) => (
              <div key={index}>
                <NextLink href={item.href}>
                  <div
                    className={clsx(
                      "w-full flex gap-2 items-center text-default-500 hover:text-default-900 transition-colors cursor-pointer",
                      pathname === item.href
                        ? "text-primary-500 font-medium"
                        : ""
                    )}
                  >
                    {item.icon && <span>{item.icon}</span>}
                    <span>{item.label}</span>
                  </div>
                </NextLink>
                {/* Renderiza sub-itens se existirem */}
                {item.items && item.items.length > 0 && (
                  <div className="pl-4">
                    {item.items.map((subItem, subIndex) => (
                      <NextLink href={subItem.href} key={subIndex}>
                        <div
                          className={clsx(
                            "w-full flex gap-2 items-center text-default-500 hover:text-default-900 transition-colors cursor-pointer",
                            pathname === subItem.href
                              ? "text-primary-500 font-medium"
                              : ""
                          )}
                        >
                          {subItem.icon && <span>{subItem.icon}</span>}
                          <span>{subItem.label}</span>
                        </div>
                      </NextLink>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </AccordionItem>
      </Accordion>
    </div>
  );
};
