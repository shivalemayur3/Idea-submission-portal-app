// File: /app/api/ideas/[id]/route.js
import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'ideas.json');

export async function PUT(req, { params }) {
  const { id } = params;
  const updates = await req.json();

  const data = fs.readFileSync(filePath, 'utf8');
  let ideas = JSON.parse(data);

  ideas = ideas.map(idea => {
    if (idea.id.toString() === id) {
      return { ...idea, ...updates };
    }
    return idea;
  });

  fs.writeFileSync(filePath, JSON.stringify(ideas, null, 2));
  return Response.json({ message: 'Updated' });
}

export async function DELETE(_, { params }) {
  const { id } = params;

  const data = fs.readFileSync(filePath, 'utf8');
  let ideas = JSON.parse(data);

  ideas = ideas.filter(idea => idea.id.toString() !== id);
  fs.writeFileSync(filePath, JSON.stringify(ideas, null, 2));
  return Response.json({ message: 'Deleted' });
}
