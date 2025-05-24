'use client';
import { useState } from 'react';
import { ThumbsUp, ThumbsDown, Trash2 } from 'lucide-react';

export default function IdeaActions({ id, upvotes, downvotes, onUpdate, isDelete }) {
    const [loading, setLoading] = useState(false);

    const updateVotes = async (delta) => {
        setLoading(true);
        const res = await fetch(`/api/ideas/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(delta),
        });
        if (res.ok) {
            onUpdate();
        }
        setLoading(false);
    };

    const handleDelete = async () => {
        setLoading(true);
        const res = await fetch(`/api/ideas/${id}`, { method: 'DELETE' });
        if (res.ok) {
            onUpdate();
        }
        setLoading(false);
    };

    return (
        <div className="flex gap-2 items-center">
            <button
                className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded flex gap-2 items-center"
                onClick={() => updateVotes({ upvotes: upvotes + 1 })}
                disabled={loading}
            >
                <ThumbsUp size={20} />{upvotes}
            </button>
            <button
                className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded flex gap-2 items-center"
                onClick={() => updateVotes({ downvotes: downvotes + 1 })}
                disabled={loading}
            >
                <ThumbsDown size={20} />{downvotes}
            </button>
            {!isDelete &&
                <button
                    className="text-sm text-gray-500 hover:text-red-500"
                    onClick={handleDelete}
                    disabled={loading}
                >
                    <Trash2 className="w-5 h-5" />
                </button>
            }
        </div>
    );
}