"use client";

import { addInterestedEvent } from "@/actions";
import useAuth from "@/hooks/useAuth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ActionButtons({ eventId, interestedUserIds, fromDetails = false }) {
  const { auth } = useAuth();
  console.log("id", auth?.id, "_id", auth?._id);
  const isInterested = interestedUserIds?.find((id) => id.toString() === auth?.id);
  const [interested, setInterested] = useState(isInterested);

  const router = useRouter();

  const toggleInterest = async () => {
    if (auth) {
      addInterestedEvent(eventId, auth?.id);
      setInterested(!interested);
    } else {
      router.push("/login");
    }
  };

  return (
    <div className={`w-full flex gap-4 mt-4 ${fromDetails && "flex-1"}`}>
      <button
        onClick={toggleInterest}
        className={`w-full ${interested && "bg-indigo-600 hover:bg-indigo-800"}`}>
        Interested
      </button>
      <Link
        href="/payment"
        className=" text-center w-full bg-[#464849] py-2 px-2 rounded-md border border-[#5F5F5F]/50 shadow-sm cursor-pointer hover:bg-[#3C3D3D] transition-colors active:translate-y-1">
        Going
      </Link>
    </div>
  );
}
