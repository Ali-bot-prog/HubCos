import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'data/faq.json');

// Interface for FAQ
interface FAQ {
  id: string;
  question: string;
  answer: string;
  order: number;
}

// Helper to read data
function getFAQs(): FAQ[] {
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
function saveFAQs(faqs: FAQ[]) {
  fs.writeFileSync(dataFilePath, JSON.stringify(faqs, null, 2), 'utf8');
}

export async function GET() {
  const faqs = getFAQs();
  return NextResponse.json(faqs.sort((a, b) => a.order - b.order));
}

export async function POST(req: Request) {
  try {
    const newFaq = await req.json();
    const faqs = getFAQs();
    
    // Add or Update
    const existingIndex = faqs.findIndex(f => f.id === newFaq.id);
    if (existingIndex > -1) {
        faqs[existingIndex] = { ...faqs[existingIndex], ...newFaq };
    } else {
        if (!newFaq.id) newFaq.id = Date.now().toString();
        if (!newFaq.order) newFaq.order = faqs.length + 1;
        faqs.push(newFaq);
    }
    
    saveFAQs(faqs);
    return NextResponse.json({ success: true, faq: newFaq });
  } catch (error) {
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
   const { searchParams } = new URL(req.url);
   const id = searchParams.get('id');
   
   if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });

   const faqs = getFAQs();
   const newFAQs = faqs.filter(f => f.id !== id);
   saveFAQs(newFAQs);
   
   return NextResponse.json({ success: true });
}

export async function PUT(req: Request) {
    return POST(req); 
}
