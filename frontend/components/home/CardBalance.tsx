// components/CardBalance.tsx
import { Card, CardBody } from "@nextui-org/react";
import React from "react";

interface CardBalanceProps {
  title: string;
  count: number;
  icon: React.ElementType;
  bgColor: string;
  textColor: string;
}

export const CardBalance: React.FC<CardBalanceProps> = ({
  title,
  count,
  icon: Icon,
  bgColor,
  textColor,
}) => (
  <Card className={`xl:max-w-sm ${bgColor} rounded-xl shadow-md px-3 w-full h-26`}>
    <CardBody className="py-5 overflow-hidden">
        <div className="flex flex-row gap-2.5">
          <Icon className="text-3xl md:text-3xl" />
          <span className={`text-2xl font-semibold ${textColor}`}>{title}</span>
          <span className={`text-2xl font-bold ${textColor}`}>{count}</span>
        </div>
          
    </CardBody>
  </Card>
);
