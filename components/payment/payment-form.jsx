"use client";

import { addGoingEvent } from "@/actions";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

export default function PaymentForm({ eventId }) {
  const { auth } = useAuth();
  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await addGoingEvent(eventId, auth);
    if (res) {
      alert(
        "Payment successful! You are marked as going. Please check your email for confirmation."
      );
      router.push("/");
    } else {
      alert("Payment failed! Please try again.");
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="my-4 space-y-2">
        <label htmlFor="name" className="block">
          Name
        </label>
        <input
          type="text"
          id="name"
          className="w-full bg-[#27292F] border border-[#CCCCCC]/20 py-1 px-2 rounded-md"
        />
      </div>

      <div className="my-4 space-y-2">
        <label htmlFor="email" className="block">
          Email
        </label>
        <input
          type="email"
          id="email"
          className="w-full bg-[#27292F] border border-[#CCCCCC]/20 py-1 px-2 rounded-md"
        />
      </div>

      <div className="my-4 space-y-2">
        <label htmlFor="card" className="block">
          Card Number
        </label>
        <input
          type="text"
          id="card"
          className="w-full bg-[#27292F] border border-[#CCCCCC]/20 py-1 px-2 rounded-md"
        />
      </div>

      <div className="my-4 space-y-2">
        <label htmlFor="expiry" className="block">
          Expiry Date
        </label>
        <input
          type="text"
          id="expiry"
          className="w-full bg-[#27292F] border border-[#CCCCCC]/20 py-1 px-2 rounded-md"
        />
      </div>

      <div className="my-4 space-y-2">
        <label htmlFor="cvv" className="block">
          CVV
        </label>
        <input
          type="text"
          id="cvv"
          className="w-full bg-[#27292F] border border-[#CCCCCC]/20 py-1 px-2 rounded-md"
        />
      </div>

      <button
        type="submit"
        className="w-full my-8 bg-indigo-600 hover:bg-indigo-800 py-2 rounded-md">
        Pay Now
      </button>
    </form>
  );
}
