import prisma from "@/lib/prisma";
import { TicketSchema } from "@/lib/types";
import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;

  let ok = false;
  if (id) {
    const res = await prisma.ticket.delete({
      where: {
        id: id,
      },
    });
    ok = true;
  }

  return Response.json({ ok });
}

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  try {
    let ticket = await prisma.ticket.findUnique({
      where: {
        id: id,
      },
    });

    return Response.json({ ticket });
  } catch (error) {
    return Response.json({ error });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  const body = await request.json();
  const result = TicketSchema.safeParse(body);

  let zodErrors = {};
  if (!result.success) {
    result.error.issues.forEach((issue) => {
      zodErrors = { ...zodErrors, [issue.path[0]]: issue.message };
    });
  } else {
    try {
      await prisma.ticket.update({
        where: {
          id: id,
        },
        data: {
          title: result.data.title,
          description: result.data.description,
          category: result.data.category,
          priority: result.data.priority,
        },
      });
    } catch (error) {
      console.log(error);
      return NextResponse.json({ message: "Error", error }, { status: 500 });
    }
  }
  const tag = request.nextUrl.searchParams.get("ticket");
  if (tag != null) revalidateTag(tag);
  const resultr =
    Object.keys(zodErrors).length > 0
      ? { errors: zodErrors }
      : { success: true };
  return NextResponse.json({ revalidated: true, resultr });
}
