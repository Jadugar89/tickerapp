"use client";
import React from "react";
import DeleteBlock from "./ui/DeleteBlock";
import Status from "./Status";
import { Progress } from "./ui/progress";
import Priority from "./Priority";
import { Ticket } from "@/models/ticket";
import { useRouter } from "next/navigation";

interface CardItemProps {
  Ticket: Ticket;
}

export default function CardItem({ Ticket }: CardItemProps) {
  const router = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    router.push("TicketPage/" + Ticket.id);
  };

  return (
    <div
      className="flex flex-col p-2 m-2 border-2 border-black rounded-md bg-slate-200 hover:outline"
      onClick={handleClick}
    >
      <div className="flex justify-between p-2 m-2">
        <Priority priority={+Ticket.priority} />
        <DeleteBlock id={Ticket.id} />
      </div>
      <h4 className="font-bold m-auto">{Ticket.title} </h4>
      <p className="text-center"> {Ticket.description}</p>
      <div className="flex items-center justify-between p-2 m-2">
        <Progress className="w-3/4" value={Ticket.progress} />
        <Status
          className="text-center font-bold w-1/4 ml-2"
          status={Ticket.status}
        />
      </div>
    </div>
  );
}
