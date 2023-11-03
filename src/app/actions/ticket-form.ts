"use server";

import { revalidateTag } from "next/cache";

export async function ReloadTickets() {
  revalidateTag("tickets");
}

export async function ReloadTicket() {
  revalidateTag("ticket");
}
