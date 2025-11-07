 import { Domain } from "@prisma/client"; 
import { prisma } from "../../lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const domain = searchParams.get("domain");

  if (!domain) {
    return NextResponse.json({ error: "Missing domain parameter" }, { status: 400 });
  }

  try {
   

const topUsers = await prisma.domainRating.findMany({
  where: { domain: domain as Domain }, 
  orderBy: { rating: "desc" },
  take: 10,
  include: {
    user: true,
  },
});


    return NextResponse.json(topUsers);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
