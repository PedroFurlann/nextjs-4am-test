"use client"

import Button from "@/components/Button";
import axios from "axios";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {

  const router = useRouter();

  const startSession = async () => {
    const existingSession = localStorage.getItem('sessionId');
    if (existingSession) return;

    const url = window.location.href;
    const response = await axios.post('/api/start-session', { url });

    const { sessionId } = response.data;
    localStorage.setItem('sessionId', sessionId);
  };

  useEffect(() => {
    startSession();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 overflow-y-auto">
      <div className="flex rounded-md flex-col items-center justify-center flex-grow md:flex-row">
        <div className="flex flex-col gap-4 items-center justify-center p-8 md:w-96 bg-black rounded-md border-gray-800">
          <Button
            label="Go to Upsell 1"
            onClick={() => router.push("upsell1")}
          />

          <Button
            label="Go to Upsell 2"
            onClick={() => router.push("upsell2")}
          />
        </div>
      </div>
    </div>
  );
}
