'use client';
import { useEffect, useState } from 'react';
import IdeaActions from './IdeaActions';
import Link from 'next/link';

export function IdeasList() {
    const [ideas, setIdeas] = useState([]);
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);

    const fetchIdeas = async () => {
        const res = await fetch('/api/ideas');
        const data = await res.json();
        setIdeas(data);
    };

    useEffect(() => {
        fetchIdeas();
    }, []);

    const filteredIdeas = ideas.filter((idea) =>
        idea.summary.toLowerCase().includes(search.toLowerCase()) ||
        idea.description.toLowerCase().includes(search.toLowerCase())
    );

    const sortedIdeas = filteredIdeas.sort((a, b) => b.upvotes - a.upvotes);
    const paginatedIdeas = sortedIdeas.slice((page - 1) * 20, page * 20);

    const totalPages = Math.ceil(sortedIdeas.length / 20);

    return (
        <div className="max-w-5xl mx-auto mt-8 px-4">
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Search ideas..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full p-2 border rounded shadow-sm"
                />
            </div>

            {paginatedIdeas.length === 0 ? (
                <div className="text-center py-10 text-gray-500">
                    <p>There are no ideas to display. Please submit creative and innovative ideas.</p>
                    <Link href="/create">
                        <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                            Submit an Idea
                        </button>
                    </Link>
                </div>
            ) : (
                <ul className="space-y-4">
                    {paginatedIdeas.map((idea) => (
                        <li
                            key={idea.id}
                            className="p-4 bg-white rounded shadow border flex justify-between items-start hover:bg-gray-100"
                        >
                            <div className="flex-1">
                                <Link href={`/idea/${idea.id}`} className="text-lg font-semibold text-blue-700 hover:underline">
                                    {idea.summary}
                                </Link>
                                <p className="text-sm text-gray-600">Submitted by {idea.employee}</p>
                            </div>
                            <IdeaActions
                                id={idea.id}
                                upvotes={idea.upvotes}
                                downvotes={idea.downvotes}
                                onUpdate={fetchIdeas}
                            />
                        </li>
                    ))}
                </ul>
            )}

            {totalPages > 1 && (
                <div className="flex justify-center mt-6 space-x-2">
                    {[...Array(totalPages)].map((_, i) => (
                        <button
                            key={i}
                            className={`px-3 py-1 rounded ${page === i + 1 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
                            onClick={() => setPage(i + 1)}
                        >
                            {i + 1}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
