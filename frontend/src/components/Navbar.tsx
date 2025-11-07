"use client";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full bg-zinc-950/90 backdrop-blur border-b border-zinc-800 z-50">
      <div className="max-w-5xl mx-auto flex justify-between items-center px-4 py-3">
        <h1 className="text-lg font-bold text-blue-400 tracking-wide">DALE</h1>
        <div className="flex gap-6 text-sm">
          <Link href="/question" className="hover:text-blue-400">Practice</Link>
          <Link href="/history" className="hover:text-blue-400">Progress</Link>
          <Link href="/leaderboard" className="hover:text-blue-400">Leaderboard</Link>
        </div>
      </div>
    </nav>
  );
}
