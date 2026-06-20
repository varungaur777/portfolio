"use client";

import { useEffect, useState } from "react";

export default function Clock() {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    // Only run on client side to avoid hydration mismatch
    const updateTime = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      const seconds = String(now.getSeconds()).padStart(2, "0");
      setTime(`${hours}:${minutes}:${seconds}`);
    };

    updateTime(); // initial call
    const intervalId = setInterval(updateTime, 1000);

    return () => clearInterval(intervalId);
  }, []);

  if (!time) return null; // Wait for first client render

  return (
    <div className="fixed bottom-4 right-4 z-50 glass-panel px-4 py-2 rounded-full font-mono text-sm tracking-wider shadow-lg">
      {time}
    </div>
  );
}
