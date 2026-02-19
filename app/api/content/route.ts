import { NextResponse } from 'next/server';
import { getSiteConfig, updateSiteConfig } from '@/lib/config';
import { revalidatePath } from 'next/cache';

export async function GET() {
  const config = await getSiteConfig(); // AWAIT ADDED
  return NextResponse.json(config);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const updatedConfig = await updateSiteConfig(body); // AWAIT ADDED
    revalidatePath('/', 'layout'); // Revalidate everything as layout uses config
    return NextResponse.json(updatedConfig);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update config' }, { status: 500 });
  }
}
