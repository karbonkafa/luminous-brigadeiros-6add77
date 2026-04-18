import { db } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const characters = await db.character.findMany({
      include: {
        stats: true,
        connections: true,
      },
      orderBy: {
        code: 'asc',
      },
    });

    return NextResponse.json({ success: true, data: characters });
  } catch (error) {
    console.error('Failed to fetch characters:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch characters' },
      { status: 500 }
    );
  }
}
