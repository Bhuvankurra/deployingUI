import { NextResponse } from 'next/server';
import { getApiBase } from '../../lib/apiBase';

export const dynamic = 'force-dynamic';

export async function GET() {
  const base = getApiBase().replace(/\/$/, '');
  const url = `${base}/health`;
  let ok = false; let status = 0; let body: string | undefined; let error: string | undefined;
  try {
    const res = await fetch(url, { cache: 'no-store' });
    status = res.status;
    ok = res.ok;
    body = await res.text();
  } catch (e: any) {
    error = e.message;
  }
  return NextResponse.json({ ok, status, body, error, target: url, timestamp: new Date().toISOString() });
}
