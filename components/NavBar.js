'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export default function NavBar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const linkClass = (path) =>
    `block px-4 py-2 rounded hover:bg-blue-700 ${pathname === path ? 'bg-blue-700 text-white' : 'text-blue-100'}`;

  return (
    <nav className="bg-blue-600 text-white px-6 py-4 shadow-md">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold text-white">IdeaHub</h1>
        <div className="sm:hidden">
          <button
            onClick={toggleMenu}
            className="text-white focus:outline-none"
          >
            ☰
          </button>
        </div>
        <div className={`sm:flex space-x-4 ${isOpen ? 'block' : 'hidden'} sm:block`}> 
          <Link href="/" className={linkClass('/')}>Dashboard</Link>
          <Link href="/create" className={linkClass('/create')}>Submit Idea</Link>
        </div>
      </div>
    </nav>
  );
}