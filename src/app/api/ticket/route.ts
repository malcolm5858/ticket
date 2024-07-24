import prisma from "@/app/lib/prisma";
import { Ticket } from "@/app/lib/definitions";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const tickets: Ticket[] = await prisma.ticket.findMany();
  console.log(tickets);
  return NextResponse.json(tickets);
}

export async function POST(req: NextRequest) {
  const body: Ticket = await req.json();
  console.log(body);
  const ticket = await prisma.ticket.create({
    data: {
      name: body.name,
      email: body.email,
      description: body.description,
      status: "new",
    },
  });
  return NextResponse.json(ticket);
}

export async function PUT(req: NextRequest) {
  const body: Ticket = await req.json();
  const ticket = await prisma.ticket.update({
    where: {
      id: body.id,
    },
    data: {
      status: body.status,
    },
  });
  return NextResponse.json(ticket);
}
