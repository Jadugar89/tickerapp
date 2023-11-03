"use client";
import React from "react";
import Icon from "./Icon";
import { ReloadTickets } from "@/app/actions/ticket-form";

interface DeleteBlockProps {
  id: string;
}

export default function DeleteBlock({ id }: DeleteBlockProps) {
  const deleteTicket = async () => {
    const res = await fetch(`/api/ticket/${id}`, {
      method: "DELETE",
    });
    if (res.ok) {
      ReloadTickets();
    }
  };

  return (
    <Icon
      className="2px hover:bg-red-700 "
      name="x"
      size={12}
      onClick={deleteTicket}
    />
  );
}
