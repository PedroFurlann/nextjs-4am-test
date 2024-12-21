import { kv } from '@vercel/kv';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { sessionId, field, value } = await req.json();

  if (!sessionId || !field || value === undefined) {
    return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
  }

  const sessionKey = `session:${sessionId}`;
  const currentSessionData = (await kv.get(sessionKey)) || {};

  const updatedSessionData = {
    ...currentSessionData,
    [field]: value,
  };

  await kv.set(sessionKey, updatedSessionData);

  return NextResponse.json({ message: 'Session updated successfully' }, { status: 200 });
}