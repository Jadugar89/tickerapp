import { cn } from "@/lib/utils";
import React from "react";

interface StatusProps {
  status: string;
  className?: string;
}

export default function Status({ status, className }: StatusProps) {
  const getColor = (status: string) => {
    let color;
    switch (status.toLowerCase()) {
      case "done":
        color = "bg-green-200";
        return color;

      case "started":
        color = "bg-yellow-200";
        return color;

      case "not started":
        color = "bg-red-200";
        return color;
      default:
        color = "bg-slate-700";
    }
    return color;
  };
  return (
    <span
      className={cn(
        `inline-block  rounded-full px-2 py-1 text-xs font-semibold text-gray-300 ${getColor(
          status
        )}`,
        className
      )}
    >
      {status}
    </span>
  );
}
