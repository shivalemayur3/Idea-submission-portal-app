// File: /app/api/ideas/route.js
import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'ideas.json');

export async function GET() {
  const data = fs.readFileSync(filePath, 'utf8');
  const ideas = JSON.parse(data);
  return Response.json(ideas);
}

export async function POST(req) {
  try {
    const newIdea = await req.json();
    const data = fs.readFileSync(filePath, 'utf8');
    const ideas = JSON.parse(data);
    newIdea.id = Date.now();
    newIdea.upvotes = 0;
    newIdea.downvotes = 0;
    ideas.unshift(newIdea);
    fs.writeFileSync(filePath, JSON.stringify(ideas, null, 2));
    return Response.json(newIdea);
  } catch (err) {
    console.error('Error writing idea:', err);
    return new Response('Failed to add idea', { status: 500 });
  }
}

