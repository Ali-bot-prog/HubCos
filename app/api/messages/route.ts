import { NextResponse } from 'next/server';
import { getMessages, addMessage, markAsRead, deleteMessage, Message } from '@/lib/messages';

export async function GET() {
  const messages = await getMessages(); // AWAIT ADDED
  return NextResponse.json(messages);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const newMsg = await addMessage(body); // AWAIT ADDED
    return NextResponse.json(newMsg);
  } catch (error) {
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    if (body.id && body.action === 'markRead') {
      await markAsRead(body.id); // AWAIT ADDED
        return NextResponse.json({ success: true });
    }
    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');
        if (id) {
          await deleteMessage(id); // AWAIT ADDED
            return NextResponse.json({ success: true });
        }
        return NextResponse.json({ error: 'ID required' }, { status: 400 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed' }, { status: 500 });
    }
}
