import EventList from "@/components/landing/event-list";
import Header from "@/components/landing/header";
import LoadingSpinner from "@/components/loading-spinner";
import { getAllEvents } from "@/db/queries";
import { Suspense } from "react";

export default async function Home({ searchParams: { query } }) {
  return (
    <section className="container">
      <Header />
      <Suspense key={query} fallback={<LoadingSpinner />}>
        <EventList query={query} events={await getAllEvents(query)} />
      </Suspense>
    </section>
  );
}
