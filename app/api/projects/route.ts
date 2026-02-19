import { NextResponse } from 'next/server';
import { getProjects, addProject, updateProject, deleteProject, Project } from '@/lib/projects';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  const projects = await getProjects(); // AWAIT ADDED
  
  if (id) {
    const project = projects.find(p => p.id === id);
    if (project) return NextResponse.json(project);
    return NextResponse.json({ error: 'Project not found' }, { status: 404 });
  }

  return NextResponse.json(projects);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const newProject: Project = {
      id: Date.now().toString(),
      ...body
    };
    await addProject(newProject); // AWAIT ADDED
    return NextResponse.json(newProject);
  } catch (error) {
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    await updateProject(body); // AWAIT ADDED
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');
        if (id) {
          await deleteProject(id); // AWAIT ADDED
            return NextResponse.json({ success: true });
        }
        return NextResponse.json({ error: 'ID required' }, { status: 400 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed' }, { status: 500 });
    }
}
