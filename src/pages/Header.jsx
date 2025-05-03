import React from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <>
      {/* Header Bar */}
      <header className="bg-gray-800 text-white py-4 px-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center">
            <span className="bg-white text-black px-3 py-2 font-bold text-xl rounded">Ontario</span>
            <svg className="ml-3" width="32" height="32" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="12" fill="white"/>
              <path d="M12 5l4.33 7.5H7.67L12 5zm0 2.5L9.13 12h5.74L12 7.5zM7.5 14c.83 1.67 2.5 3 4.5 3s3.67-1.33 4.5-3h-9z" fill="#232a2f"/>
            </svg>
          </div>
          <div className="hidden md:flex gap-8 ml-10 text-lg">
            <Link to="/" className="hover:underline">Applications</Link>
            <Link to="/" className="hover:underline">Part-time apps</Link>
            <Link to="/" className="hover:underline">Help</Link>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <a href="#" className="text-base hover:underline">français</a>
          <button className="bg-gray-200 text-gray-800 px-5 py-2 rounded text-base">Log out</button>
        </div>
      </header>
      
      {/* Mobile Sub-header */}
      <div className="bg-yellow-50 py-3 px-6 md:hidden">
        <div className="flex gap-8">
          <Link to="/" className="text-base">Applications</Link>
          <Link to="/" className="text-base">Part-time apps</Link>
          <Link to="/" className="text-base">Help</Link>
        </div>
      </div>
    </>
  );
}