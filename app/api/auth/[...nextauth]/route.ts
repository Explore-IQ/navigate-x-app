// NextAuth.js catch-all route — handles sign-in, sign-out, and session callbacks
import { NextResponse } from 'next/server';
export const GET  = () => NextResponse.json({ status: 'auth not yet configured' }, { status: 501 });
export const POST = GET;

