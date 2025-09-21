import DetailContent from "@/components/event-details/detail-content";
import EventVenue from "@/components/event-details/event-venue";
import HeroSection from "@/components/event-details/hero-section";
import { getEventById } from "@/db/queries";

export default async function EventDetailsPage({ params: { id } }) {
  const event = await getEventById(id);

  return (
    <>
      <HeroSection event={event} />
      <section className="container">
        <div className="grid grid-cols-5 gap-12 my-12">
          {/* main detailed content part */}
          <DetailContent description={event?.details} swags={event?.swags} />

          {/* map part - Venue */}
          <EventVenue location={event?.location} />
        </div>
      </section>
    </>
  );
}
