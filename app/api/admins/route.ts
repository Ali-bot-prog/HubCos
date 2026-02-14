import { NextResponse } from 'next/server';
import { getUsers, addUser, deleteUser } from '@/lib/users';

export async function GET() {
  const users = getUsers();
  // Return users without sensitive data
  const safeUsers = users.map(u => ({
    id: u.id,
    username: u.username,
    name: u.name,
    role: u.role
  }));
  return NextResponse.json(safeUsers);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    if (!body.username || !body.password || !body.name) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    const newUser = await addUser({
      username: body.username,
      password: body.password,
      name: body.name,
      role: body.role || 'admin'
    });

    return NextResponse.json(newUser);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Error creating user' }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ error: 'ID required' }, { status: 400 });
        }

        deleteUser(id);
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: 'Error deleting user' }, { status: 500 });
    }
}
