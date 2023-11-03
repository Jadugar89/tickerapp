import { TicketSchema } from "@/lib/types";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { revalidateTag } from "next/cache";

export async function POST(request: Request) {
  const body: unknown = await request.json();

  const result = TicketSchema.safeParse(body);

  let zodErrors = {};
  if (!result.success) {
    result.error.issues.forEach((issue) => {
      zodErrors = { ...zodErrors, [issue.path[0]]: issue.message };
    });
  } else {
    await prisma.ticket.create({
      data: {
        title: result.data.title,
        description: result.data.description,
        category: result.data.category,
        priority: result.data.priority,
        progress: 0,
        status: "new",
      },
    });
  }

  return NextResponse.json(
    Object.keys(zodErrors).length > 0
      ? { errors: zodErrors }
      : { success: true }
  );
}

export async function GET(request: NextRequest) {
  let tickets = await prisma.ticket.findMany();
  const tag = request.nextUrl.searchParams.get("tickets");
  if (tag != null) revalidateTag(tag);
  return Response.json({ revalidated: true, tickets });
}
