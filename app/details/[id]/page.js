import DetailContent from "@/components/event-details/detail-content";
import EventVenue from "@/components/event-details/event-venue";
import HeroSection from "@/components/event-details/hero-section";

export default function EventDetailsPage() {
  return (
    <>
      <HeroSection />
      <section className="container">
        <div className="grid grid-cols-5 gap-12 my-12">
          {/* main detailed content part */}
          <DetailContent />

          {/* map part - Venue */}
          <EventVenue />
        </div>
      </section>
    </>
  );
}
