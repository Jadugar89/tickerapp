import CardList from "@/components/CardList";
import { Ticket } from "@/models/ticket";
import React from "react";

const getData = async (): Promise<Ticket[]> => {
  const res = await fetch("http://localhost:3000/api/ticket", {
    next: { tags: ["tickets"], revalidate: 3600 },
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }
  const tickets = await res.json();
  return tickets.tickets;
};

export default async function Dashboardpage() {
  const data = await getData();

  if (data) {
    return <CardList CardList={data} />;
  } else {
    return (
      <div>
        <p>Your are lucky! No tickets!</p>
      </div>
    );
  }
}
