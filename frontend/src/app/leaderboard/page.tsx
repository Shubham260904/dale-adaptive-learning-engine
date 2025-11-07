"use client";
import { useEffect, useState } from "react";

export default function LeaderboardPage() {
  const [domain, setDomain] = useState("GRAPH");
  const [leaders, setLeaders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLeaders() {
      setLoading(true);
      const res = await fetch(`/api/leaderboard?domain=${domain}`);
      const data = await res.json();
      setLeaders(data);
      setLoading(false);
    }
    fetchLeaders();
  }, [domain]);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-start py-10">
        
      <h1 className="text-3xl font-bold mb-6">Leaderboard</h1>

      <div className="flex gap-3 mb-8 flex-wrap justify-center">
        {[
          "ARRAY",
          "STRING",
          "BIT_MANIPULATION",
          "LINKED_LIST",
          "STACK_QUEUE",
          "BINARY_SEARCH",
          "BST",
          "GRAPH",
          "UNION_FIND",
          "RECURSION",
          "DP",
        ].map((d) => (
          <button
            key={d}
            onClick={() => setDomain(d)}
            className={`px-3 py-1 rounded-md border text-sm ${
              domain === d
                ? "bg-blue-600 border-blue-400 text-white"
                : "bg-transparent border-gray-600 text-gray-300 hover:bg-gray-800"
            }`}
          >
            {d.replace("_", " ")}
          </button>
        ))}
      </div>

      <div className="w-full max-w-2xl bg-zinc-900 p-8 rounded-2xl shadow-lg">
        {loading ? (
          <div className="text-center text-gray-400">Loading...</div>
        ) : leaders.length ? (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="py-2 px-4">#</th>
                <th className="py-2 px-4">User ID</th>
                <th className="py-2 px-4">Rating</th>
              </tr>
            </thead>
            <tbody>
              {leaders.map((l, i) => (
                <tr
                  key={l.id}
                  className="border-b border-gray-800 hover:bg-gray-800/50 transition-colors duration-200"
                >
                  <td className="py-2 px-4">{i + 1}</td>
                  <td className="py-2 px-4">{l.userId}</td>
                  <td className="py-2 px-4 font-semibold text-blue-400">{l.rating}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="text-center text-gray-400">No ratings yet for {domain}</div>
        )}
      </div>
    </div>
  );
}
