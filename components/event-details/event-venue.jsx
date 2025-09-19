export default function EventVenue() {
  return (
    <div className="col-span-2 overflow-hidden rounded-lg bg-[#242526]">
      <div className="w-full">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3108.556181280908!2d91.8200511743949!3d22.35706324083725!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30acd9007beb2aff%3A0x8eb48684380bbc47!2sAuditorium%2C%20Zilla%20Shilpakala%20Academy%2C%20Chattogram%E2%80%8E!5e1!3m2!1sen!2sbd!4v1758315645821!5m2!1sen!2sbd"
          width="600"
          height="450"
          style={{ border: "0" }}
          allowFullscreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"></iframe>
      </div>
      <div className="p-4">
        <p className="text-[#9C9C9C] text-base mt-1">
          Zilla Shilpakala Academy, Chattogram, Bangladesh
        </p>
      </div>
    </div>
  );
}
