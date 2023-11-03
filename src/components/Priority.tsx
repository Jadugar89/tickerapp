import React from "react";
import Icon from "./ui/Icon";

interface PriorityProps {
  priority: number;
}

export default function Priority({ priority }: PriorityProps) {
  return (
    <div className="flex justify-start align-baseline">
      <Icon
        name="flame"
        className={` pr-1 ${
          priority > 0 ? " text-red-400" : " text-slate-400"
        }`}
      />
      <Icon
        name="flame"
        className={` pr-1 ${
          priority > 1 ? " text-red-400" : " text-slate-400"
        }`}
      />
      <Icon
        name="flame"
        className={`  pr-1 ${
          priority > 2 ? " text-red-400" : " text-slate-400"
        }`}
      />
      <Icon
        name="flame"
        className={` pr-1 ${
          priority > 3 ? " text-red-400" : " text-slate-400"
        }`}
      />
      <Icon
        name="flame"
        className={` ${priority > 4 ? " text-red-400" : " text-slate-400"}`}
      />
    </div>
  );
}
