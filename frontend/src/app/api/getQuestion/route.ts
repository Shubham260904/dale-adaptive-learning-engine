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

    // --- get user’s current rating for this domain ---
    const rating = await prisma.domainRating.findFirst({
      where: { userId, domain },
    });

    const userRating = rating?.rating ?? 1200;

    // --- find the question closest to the user’s rating ---
    const question = await prisma.question.findFirst({
      where: { domain },
      orderBy: {
        difficulty: 'asc',
      },
      take: 1,
    });

    if (!question) {
      return NextResponse.json(
        { error: `No questions found for domain ${domain}` },
        { status: 404 }
      );
    }

    return NextResponse.json({
      question,
      userRating,
    });
  } catch (err) {
    console.error('Error fetching question:', err);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
