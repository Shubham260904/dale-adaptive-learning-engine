"use client";
import "chartjs-adapter-date-fns";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
  Filler,
} from "chart.js";
import type { ChartOptions } from "chart.js";
import { Line } from "react-chartjs-2";
import { useEffect, useState } from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  TimeScale,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function HistoryPage() {
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const userId = "1";

  useEffect(() => {
    async function fetchHistory() {
      setLoading(true);
      const res = await fetch(`/api/history?userId=${userId}`);
      const data = await res.json();
      setHistory(Array.isArray(data) ? data : []);
      setLoading(false);
    }
    fetchHistory();
  }, []);

  if (loading) return <div className="text-center mt-10 text-lg">Loading history...</div>;
  if (!history.length) return <div className="text-center mt-10 text-gray-400">No rating history found</div>;

  // group history by domain
  const grouped: Record<string, any[]> = {};
  history.forEach((h) => {
    if (!grouped[h.domain]) grouped[h.domain] = [];
    grouped[h.domain].push(h);
  });

  // colors for domains
  const domainColors = [
    "rgb(59,130,246)",
    "rgb(34,197,94)",
    "rgb(239,68,68)",
    "rgb(234,179,8)",
    "rgb(147,51,234)",
    "rgb(14,165,233)",
    "rgb(251,146,60)",
    "rgb(244,63,94)",
    "rgb(168,85,247)",
    "rgb(20,184,166)",
    "rgb(132,204,22)",
  ];

  // build datasets with {x: Date, y: number} points
  const datasets = Object.keys(grouped).map((domain, idx) => ({
    label: domain,
    data: grouped[domain].map((h: any) => ({ x: new Date(h.createdAt), y: h.new_rating })),
    borderColor: domainColors[idx % domainColors.length],
    backgroundColor: domainColors[idx % domainColors.length].replace("rgb(", "rgba(").replace(")", ",0.25)"),
    tension: 0.3,
    fill: false,
    pointRadius: 3,
  }));

  const data = { datasets };

  const options: ChartOptions<"line"> = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
        labels: { color: "#e5e7eb" }, // light gray text
      },
      title: {
        display: true,
        text: "Adaptive Rating Progress (All Domains)",
        color: "#e5e7eb",
        font: { size: 16 },
      },
      tooltip: {
        mode: "nearest",
        intersect: false,
      },
    },
    scales: {
      x: {
        type: "time",
        time: { unit: "day", tooltipFormat: "PP p" },
        ticks: { color: "#cbd5e1" },
        grid: { color: "rgba(148,163,184,0.08)" },
      },
      y: {
        ticks: { color: "#cbd5e1" },
        grid: { color: "rgba(148,163,184,0.08)" },
        beginAtZero: false,
      },
    },
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-8">
      <div className="w-full max-w-4xl bg-zinc-900 p-6 rounded-2xl shadow-lg">
        <h2 className="text-xl font-semibold mb-4 text-center">Rating History — All Domains</h2>
        <div style={{ minHeight: 320 }}>
          <Line data={data} options={options} />
        </div>
      </div>
    </div>
  );
}
