// On-demand ISR revalidation endpoint — triggered by CMS/backend webhooks
import { NextResponse } from 'next/server';
export const POST = () => NextResponse.json({ revalidated: false, message: 'Not yet implemented' }, { status: 501 });
