
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
    // Diagnostic info
    const diagnostics: Record<string, any> = {
        cwd: process.cwd(),
        env: process.env.NODE_ENV,
        dbPath: process.env.DATABASE_URL || 'default (file:./dev.db)',
    };

    if (!prisma) {
        return NextResponse.json({
            error: 'Prisma client not initialized',
            diagnostics
        }, { status: 200 });
    }

    try {
        try {
            await prisma.$connect();
            diagnostics['connection'] = 'Success';
        } catch (connError: any) {
            diagnostics['connection'] = `Failed: ${connError.message}`;
            // Return 200 so we can read the body with read_url_content tool, but indicate failure in body
            return NextResponse.json(diagnostics, { status: 200 });
        }

        const username = 'HubCos';
        // Hash for the password
        const passwordHash = '$2b$10$FQetI6OD499PYQTZae6OO.oFz/u.pX.FYqEudZ4kpHuD5tFyxd1zC';

        const existing = await prisma.admin.findUnique({
            where: { username },
        });

        if (!existing) {
            await prisma.admin.create({
                data: {
                    username,
                    password: passwordHash,
                },
            });
            return NextResponse.json({ message: `Created admin user: ${username}`, diagnostics });
        } else {
            return NextResponse.json({ message: `Admin user ${username} already exists.`, diagnostics });
        }
    } catch (error: any) {
        return NextResponse.json({ error: error.message || String(error), cwd: process.cwd() }, { status: 200 });
    }
}
