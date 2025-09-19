import EventList from "@/components/landing/event-list";
import Header from "@/components/landing/Header";

export default function Home() {
  return (
    <section className="container">
      <Header />
      <EventList />
    </section>
  );
}
