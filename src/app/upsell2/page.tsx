"use client"

import Button from "@/components/Button";
import Loader from "@/components/Loader";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

interface SessionDataProps {
  upsell1: boolean;
  upsell2: boolean;
}

export default function Upsell2() {
  const [sessionData, setSessionData] = useState<SessionDataProps | null>(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();


  const fetchSessionData = async () => {
    const sessionId = localStorage.getItem('sessionId');
    if (!sessionId) return;

    setLoading(true)

    try {
      const { data } = await axios.post('/api/get-session', { sessionId });
      setSessionData({
        upsell1: data.sessionData?.upsell1 ?? false,
        upsell2: data.sessionData?.upsell2 ?? false,
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(error);
      const message = error?.response?.data?.message
        ? error?.response?.data?.message :
        "Unable to fetch session data. Please try again later."
      toast.error(message, {
        position: "top-right",
        autoClose: 3000,
        theme: "dark",
        style: {
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontWeight: "bold",
        },
      });
    } finally {
      setLoading(false)
    }
  };


  const handleUpsellSelection = async (value: boolean) => {
    const sessionId = localStorage.getItem('sessionId');
    if (!sessionId) return;

    const field = "upsell2"

    try {
      const { data } = await axios.post('/api/update-session', { sessionId, field, value });

      const message = data.message

      toast.success(message, {
        position: "top-right",
        autoClose: 3000,
        theme: "dark",
        style: {
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontWeight: "bold",
        },
      });

      fetchSessionData()
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(error)
      const message = error?.response?.data?.message
        ? error?.response?.data?.message :
        "Unable to update session data. Please try again later."

      toast.error(message, {
        position: "top-right",
        autoClose: 3000,
        theme: "dark",
        style: {
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontWeight: "bold",
        },
      });
    }

  };


  useEffect(() => {
    fetchSessionData();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 overflow-y-auto">
      <div className="flex rounded-md flex-col items-center justify-center flex-grow md:flex-row">
        {loading ? (
          <Loader />
        ) : (
          <div className="flex flex-col gap-4 items-center justify-center p-8 md:w-96 bg-black rounded-md border-gray-800">
            <p className="text-xl text-gray-200 font-bold">Upsell 2</p>

            <div className="flex gap-8 items-center justify-center">
              <Button
                label="Go to Upsell 1"
                onClick={() => router.push("upsell1")}
              />

              <Button
                label={sessionData?.upsell2 ? "Disable" : "Active"}
                onClick={() => handleUpsellSelection(!sessionData?.upsell2)}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
