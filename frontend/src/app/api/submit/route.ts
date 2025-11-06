import { prisma } from '../../lib/prisma';
import { updateRating } from '../../lib/rating';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { userId, questionId, verdict } = body;

    if (!userId || !questionId || verdict === undefined) {
      return NextResponse.json(
        { error: 'Missing required fields: userId, questionId, or verdict' },
        { status: 400 }
      );
    }

    // get question + domain
    const question = await prisma.question.findUnique({
      where: { id: questionId },
    });

    if (!question) {
      return NextResponse.json({ error: 'Question not found' }, { status: 404 });
    }

    // get user rating record (for that domain)
    let userRatingRecord = await prisma.domainRating.findFirst({
      where: { userId, domain: question.domain },
    });

    const currentRating = userRatingRecord?.rating ?? 1200;

    // update rating based on verdict (true = correct, false = incorrect)
    const newRating = updateRating(currentRating, question.difficulty, verdict);

    // upsert domain rating (create if first time, else update)
   let updatedRating;

if (userRatingRecord) {
  updatedRating = await prisma.domainRating.update({
    where: { id: userRatingRecord.id },
    data: { rating: newRating },
  });
} else {
  updatedRating = await prisma.domainRating.create({
    data: {
      userId,
      domain: question.domain,
      rating: newRating,
    },
  });
}


    // log submission
    await prisma.submission.create({
      data: {
        userId,
        questionId,
        verdict: verdict ? 'CORRECT' : 'WRONG',
      },
    });

    // log rating history
    await prisma.ratingHistory.create({
      data: {
        userId,
        domain: question.domain,
        old_rating: currentRating,
        new_rating: newRating,
        delta: newRating - currentRating,
      },
    });

    return NextResponse.json({
      message: 'Submission recorded and rating updated',
      newRating: updatedRating.rating,
      delta: newRating - currentRating,
    });
  } catch (err) {
    console.error('Error in /submit:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
