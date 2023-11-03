import TicketForm from "@/components/TicketForm";
import { Ticket } from "@/models/ticket";
import { notFound } from "next/navigation";
import React, { Suspense } from "react";

const getData = async (id: string): Promise<Ticket> => {
  const res = await fetch("http://localhost:3000/api/ticket/" + id, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }
  const body = await res.json();

  return body.ticket;
};

export default async function TicketPage({
  params,
}: {
  params: { id: string };
}) {
  const ticket = await getData(params.id);
  if (!ticket) {
    notFound();
  }
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="block m-2">
        <TicketForm values={ticket} />
      </div>
    </Suspense>
  );
}
