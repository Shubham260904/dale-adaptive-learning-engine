"use client";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function QuestionPage() {
  const [question, setQuestion] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [userRating, setUserRating] = useState(1200);
  const [domain, setDomain] = useState("GRAPH");
  const userId = "1"; // test user

  async function fetchQuestion() {
    setLoading(true);
    const res = await fetch(`/api/getQuestion?userId=${userId}&domain=${domain}`);
    const data = await res.json();
    setQuestion(data.question);
    setUserRating(data.userRating);
    setLoading(false);
  }

  useEffect(() => {
    fetchQuestion();
  }, [domain]);

  if (loading) return <div className="text-center mt-10 text-lg">Loading question...</div>;

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
      <Toaster position="bottom-center" />

     <div className="flex flex-wrap gap-3 mb-6 justify-center">
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
        <h2 className="text-2xl font-semibold mb-4">{question?.title}</h2>
        <p className="text-gray-300 mb-8">{question?.statement}</p>

        <div className="flex gap-4 justify-center">
          <button
            onClick={() => handleSubmit(true)}
            className="px-6 py-2 bg-green-500 hover:bg-green-600 rounded-lg font-medium"
          >
            Correct
          </button>
          <button
            onClick={() => handleSubmit(false)}
            className="px-6 py-2 bg-red-500 hover:bg-red-600 rounded-lg font-medium"
          >
            Wrong
          </button>
        </div>

        <div className="text-center mt-6 text-sm text-gray-400">
          Current Rating: <span className="font-semibold text-white">{userRating}</span>
        </div>
      </div>
    </div>
  );

  async function handleSubmit(verdict: boolean) {
    const res = await fetch("/api/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId,
        questionId: question.id,
        verdict,
      }),
    });
    const data = await res.json();
    if (data.newRating) {
      toast.success(`Rating updated: ${data.newRating} (Δ${data.delta})`);
      setUserRating(data.newRating);
      fetchQuestion();
    } else {
      toast.error("Something went wrong");
    }
  }
}
