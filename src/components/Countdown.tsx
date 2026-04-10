"use client";

import { useEffect, useState } from "react";

const VM_KICKOFF = new Date("2026-06-11T19:00:00Z");

function getTimeLeft() {
  const now = new Date();
  const diff = VM_KICKOFF.getTime() - now.getTime();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export default function Countdown() {
  const [time, setTime] = useState<ReturnType<typeof getTimeLeft> | null>(null);

  useEffect(() => {
    setTime(getTimeLeft());
    const interval = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => clearInterval(interval);
  }, []);

  const units = [
    { label: "Dagar", value: time?.days ?? 0 },
    { label: "Timmar", value: time?.hours ?? 0 },
    { label: "Minuter", value: time?.minutes ?? 0 },
    { label: "Sekunder", value: time?.seconds ?? 0 },
  ];

  return (
    <div className="flex gap-4 justify-center flex-wrap">
      {units.map(({ label, value }) => (
        <div
          key={label}
          className="flex flex-col items-center bg-white/5 backdrop-blur border border-[#f5c518]/20 rounded-2xl px-6 py-4 min-w-[90px]"
        >
          <span className="text-4xl md:text-5xl font-black text-[#f5c518] tabular-nums">
            {time ? String(value).padStart(2, "0") : "--"}
          </span>
          <span className="text-xs text-gray-400 mt-1 uppercase tracking-wider">{label}</span>
        </div>
      ))}
    </div>
  );
}
