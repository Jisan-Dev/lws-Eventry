import EventList from "@/components/landing/event-list";
import Header from "@/components/landing/header";
import { getAllEvents } from "@/db/queries";

export default async function Home({ searchParams: { query } }) {
  return (
    <section className="container">
      <Header />
      <EventList query={query} events={await getAllEvents(query)} />
    </section>
  );
}
