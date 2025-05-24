'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import IdeaActions from './IdeaActions';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export function IdeaDetailsPage() {
    const { id } = useParams();
    const [idea, setIdea] = useState(null);

    const fetchIdea = async () => {
        const res = await fetch('/api/ideas');
        const data = await res.json();
        const foundIdea = data.find((idea) => idea.id.toString() === id);
        setIdea(foundIdea);
    };

    useEffect(() => {
        fetchIdea();
    }, [id]);

    if (!idea) {
        return <div className="text-center py-10 text-gray-500">Loading idea details...</div>;
    }

    return (
        <div className="max-w-3xl mx-auto mt-8 p-4 bg-white rounded shadow border">
            <div className="mt-6">
                <Link href="/" className="flex items-center text-blue-600 hover:underline mb-4">
                    <ArrowLeft className="mr-2" size={20} />
                    Back to Dashboard
                </Link>
            </div>
            <h2 className="text-2xl font-bold text-blue-700 mb-2">{idea.summary}</h2>
            <p className="text-sm text-gray-600 mb-4">Submitted by {idea.employee}</p>
            <p className="text-gray-800 mb-4 whitespace-pre-line">{idea.description}</p>
            <div className="mb-4">
                <span className="inline-block bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded">
                    Priority: {idea.priority || 'Low'}
                </span>
            </div>
            <IdeaActions
                id={idea.id}
                upvotes={idea.upvotes}
                downvotes={idea.downvotes}
                onUpdate={fetchIdea}
                isDelete={true}
            />
        </div>
    );
}
