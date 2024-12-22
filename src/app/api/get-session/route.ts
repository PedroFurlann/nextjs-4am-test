import { kv } from '@vercel/kv';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { sessionId } = await req.json();

  if (!sessionId) {
    return NextResponse.json({ message: 'Missing sessionId' }, { status: 400 });
  }

  const sessionKey = `session:${sessionId}`;
  const sessionData = await kv.get(sessionKey);

  if (!sessionData) {
    return NextResponse.json({ message: 'Session not found' }, { status: 404 });
  }

  return NextResponse.json({ sessionData }, { status: 200 });
}
