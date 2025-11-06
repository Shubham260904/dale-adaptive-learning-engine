import { prisma } from '../../lib/prisma';
import { Domain } from '@prisma/client';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');
    const domainParam = searchParams.get('domain');

    // --- validate params ---
    if (!userId || !domainParam) {
      return NextResponse.json(
        { error: 'Missing userId or domain' },
        { status: 400 }
      );
    }

    const domain = domainParam as Domain;

    // --- fetch user's rating history for that domain ---
    const history = await prisma.ratingHistory.findMany({
      where: { userId, domain },
      orderBy: { createdAt: 'asc' },
    });

    if (history.length === 0) {
      return NextResponse.json(
        { message: `No rating history found for user ${userId} in ${domain}` },
        { status: 200 }
      );
    }

    return NextResponse.json(history);
  } catch (err) {
    console.error('Error fetching history:', err);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
