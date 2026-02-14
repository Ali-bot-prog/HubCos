import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'data/posts.json');

// Interface for Post
interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  date: string;
  published: boolean;
}

// Helper to read data
function getPosts(): Post[] {
  if (!fs.existsSync(dataFilePath)) {
    fs.writeFileSync(dataFilePath, '[]', 'utf8');
    return [];
  }
  const fileData = fs.readFileSync(dataFilePath, 'utf8');
  try {
    return JSON.parse(fileData);
  } catch (error) {
    return [];
  }
}

// Helper to save data
function savePosts(posts: Post[]) {
  fs.writeFileSync(dataFilePath, JSON.stringify(posts, null, 2), 'utf8');
}

export async function GET() {
  const posts = getPosts();
  return NextResponse.json(posts);
}

export async function POST(req: Request) {
  try {
    const newPost = await req.json();
    const posts = getPosts();
    
    // Add or Update
    const existingIndex = posts.findIndex(p => p.id === newPost.id);
    if (existingIndex > -1) {
        posts[existingIndex] = { ...posts[existingIndex], ...newPost };
    } else {
        // Ensure ID and Date
        if (!newPost.id) newPost.id = Date.now().toString();
        if (!newPost.date) newPost.date = new Date().toLocaleDateString('tr-TR');
        if (!newPost.slug) newPost.slug = newPost.title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
        posts.push(newPost);
    }
    
    savePosts(posts);
    return NextResponse.json({ success: true, post: newPost });
  } catch (error) {
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
   const { searchParams } = new URL(req.url);
   const id = searchParams.get('id');
   
   if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });

   const posts = getPosts();
   const newPosts = posts.filter(p => p.id !== id);
   savePosts(newPosts);
   
   return NextResponse.json({ success: true });
}

export async function PUT(req: Request) {
    return POST(req); // Reuse POST for update logic as it handles both
}
