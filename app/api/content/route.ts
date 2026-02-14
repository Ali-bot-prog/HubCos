import { NextResponse } from 'next/server';
import { getSiteConfig, updateSiteConfig } from '@/lib/config';

export async function GET() {
  const config = getSiteConfig();
  return NextResponse.json(config);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const updatedConfig = updateSiteConfig(body);
    return NextResponse.json(updatedConfig);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update config' }, { status: 500 });
  }
}
