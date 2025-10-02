export default function EventVenue({ location }) {
  const simpleMapUrl = (location) => {
    const query = encodeURIComponent(`${location}`);
    return `https://maps.google.com/maps?q=${query}&output=embed`;
  };
  return (
    <div className="col-span-2 max-sm:col-span-full overflow-hidden rounded-lg bg-[#242526]">
      <div className="w-full">
        <iframe
          src={simpleMapUrl(location)}
          width="600"
          height="450"
          style={{ border: "0" }}
          allowFullscreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"></iframe>
      </div>
      <div className="p-4">
        <p className="text-[#9C9C9C] text-base mt-1">
          {/* Zilla Shilpakala Academy, Chattogram, Bangladesh */}
          {location}
        </p>
      </div>
    </div>
  );
}
