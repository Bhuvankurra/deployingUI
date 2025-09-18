import React from 'react';
import getApiBase from '../lib/apiBase';

async function fetchHealth(): Promise<{ ok: boolean; status: number; body?: string; error?: string }> {
  const base = getApiBase();
  try {
    const res = await fetch(`${base.replace(/\/$/, '')}/health`, { next: { revalidate: 0 }, cache: 'no-store' });
    const text = await res.text();
    return { ok: res.ok, status: res.status, body: text };
  } catch (e: any) {
    return { ok: false, status: 0, error: e.message };
  }
}

export const dynamic = 'force-dynamic';

export default async function HealthcheckPage() {
  const result = await fetchHealth();
  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Backend Healthcheck</h1>
      <p><strong>API Base:</strong> {getApiBase()}</p>
      {result.ok ? (
        <div style={{ color: 'green' }}>
          <p>Status: {result.status} (OK)</p>
          <pre style={{ background:'#f5f5f5', padding:'1rem', overflowX:'auto' }}>{result.body}</pre>
        </div>
      ) : (
        <div style={{ color: 'red' }}>
          <p>Request failed</p>
          <p>Status: {result.status}</p>
          <p>Error: {result.error}</p>
        </div>
      )}
      <p style={{marginTop:'1rem', fontSize:'0.85rem', color:'#555'}}>This page is not cached and always requests the backend directly.</p>
    </div>
  );
}
