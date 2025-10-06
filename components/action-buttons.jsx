"use client";

import { addInterestedEvent } from "@/actions";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

export default function ActionButtons({
  eventId,
  interestedUserIds,
  goingUserIds,
  fromDetails = false,
}) {
  const { auth } = useAuth();
  const router = useRouter();

  const isInterested = interestedUserIds?.find((id) => id.toString() === auth?._id);
  const isGoing = goingUserIds?.find((id) => id.toString() === auth?._id);

  const [interested, setInterested] = useState(isInterested);
  const [isPending, startTransition] = useTransition();

  const toggleInterest = async () => {
    if (auth) {
      setInterested(!interested);
      addInterestedEvent(eventId, auth?._id);
    } else {
      router.push("/login");
    }
  };

  const markGoing = () => {
    if (auth) {
      router.push(`/payment/${eventId}`);
    } else {
      router.push("/login");
    }
  };

  return (
    <div
      className={`w-full flex gap-4 mt-4 ${
        fromDetails && "max-sm:w-[230px] sm:flex-1 flex-col md:flex-row"
      }`}>
      <button
        onClick={() => startTransition(toggleInterest)}
        className={`w-full ${interested && "bg-indigo-600 hover:bg-indigo-800"}`}>
        {isPending ? "Processing..." : "Interested"}
      </button>
      <button
        disabled={auth && isGoing}
        onClick={markGoing}
        className={`text-center w-full bg-[#464849] py-2 px-2 rounded-md border border-[#5F5F5F]/50 shadow-sm cursor-pointer hover:bg-[#3C3D3D] transition-colors active:translate-y-1 ${
          auth && isGoing && "cursor-not-allowed bg-green-600 hover:bg-green-800"
        }`}>
        {isGoing ? "You are going" : "Mark as going"}
      </button>
    </div>
  );
}
