import { kv } from '@vercel/kv';
import { v4 as uuidv4 } from 'uuid';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { url } = await req.json();

  if (!url) {
    return NextResponse.json({ message: 'Missing URL' }, { status: 400 });
  }

  const sessionId = uuidv4();
  const sessionKey = `session:${sessionId}`;

  const initialSessionData = {
    upsell1: false,
    upsell2: false
  };

  await kv.set(sessionKey, initialSessionData);

  return NextResponse.json({ sessionId }, { status: 200 });
}
