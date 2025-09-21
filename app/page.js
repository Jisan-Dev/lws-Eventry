import EventList from "@/components/landing/event-list";
import Header from "@/components/landing/Header";
import { getAllEvents } from "@/db/queries";

export default async function Home() {
  const events = await getAllEvents();

  return (
    <section className="container">
      <Header />
      <EventList events={events} />
    </section>
  );
}
