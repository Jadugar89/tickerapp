import { Ticket } from "@/models/ticket";
import React from "react";
import CardItem from "./CardItem";

interface CardListProps {
  CardList: Ticket[];
}

export default function CardList({ CardList }: CardListProps) {
  return (
    <div className="grid grid-cols-2 gp-4">
      {CardList.map((card) => (
        <CardItem key={card.id} Ticket={card} />
      ))}
    </div>
  );
}
