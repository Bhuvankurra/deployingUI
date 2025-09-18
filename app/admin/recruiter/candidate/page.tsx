"use client";
export const dynamic = 'force-dynamic';
import CandidateDashboard from '../../../components/CandidateDashboard';
import { Suspense } from 'react';

export default function CandidatePage(){
  return <Suspense fallback={<div style={{padding:40}}>Loading candidate dashboard…</div>}><CandidateDashboard /></Suspense>;
}
